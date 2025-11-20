import React, { Key, useEffect, useState } from "react";

import styles from "./solution.module.scss";
import { Dropdown, MenuProps, Tabs, Tree } from "antd";

import { v4 as uuidv4 } from "uuid";
import "@/config/styleOverride.css";
import {
  addChildToNode,
  deleteNode,
  FileFolderTree,
  findNodeFromTreeFileFolder,
  folderGoFisrt,
  getAllKeys,
  onTreeDropService,
  putNodeToNode,
  toJSONData,
  transformTreeListIcons,
} from "@/entity/solution/FileFolderTree";
import { IconFileFolder } from "@/component/icon-foulder/IconFileFolder";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import {
  ADD_FILE,
  ADD_FOLDER,
  COPY,
  DELETE,
  PASTE,
  RENAME,
  rightClickFileMenu,
  rightClickFolderMenu,
} from "@/config/folder-data/rightClickMenu";
import { ModalCreate } from "./ModalCreate";
import { ContextMenu } from "./ContextMenu";
import {
  createFile,
  deleteFile,
  getSessionCacheValueByKey,
  getNodeOpenIcon,
} from "./service";
import { ModalRename } from "./ModalRename";
import {
  CSS,
  FOLDER,
  REACT,
  ROOT_FOLDER,
  SASS,
  SOLUTION_JSON,
  SPRING,
  TYPE_SCRIPT,
} from "@/config/folder-data/fileType";
import { getMessageInstance } from "@/config/messageContext";
import { NodeDragEventParams } from "rc-tree/lib/contextTypes";
import { EventDataNode } from "antd/es/tree";
import { ModalDelete } from "./ModalDelete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFileClick } from "../canvas/canvasSlice";
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { LAST_OPEN_FILE } from "@/config/folder-data/sessionCachingKey";

export interface SolutionPanelProps {
  justClick: boolean;
}
export const SolutionPanel = ({ justClick }: SolutionPanelProps) => {
  const [tabs] = useState([
    {
      label: "Solution",
    },
  ]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
  const [isOpenModalRename, setIsOpenModalRename] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [isCreateFolder, setIsCreateFolder] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [solutionInfomation, setSolutionInformation] = useState(
    [] as FileFolderTree[]
  );
  const [defaultKey, setDefaultKey] = useState<string>("");
  const [nodeCopy, setNodeCopy] = useState<FileFolderTree | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>({
    visible: false,
    x: 0,
    y: 0,
  });
  const messageApi = getMessageInstance();
  const global = useSelector((state: RootState) => state.global);
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const dispatch = useDispatch();

  // ⚙️ Khi chuột phải vào node
  const handleRightClick = (info: {
    event: React.MouseEvent;
    node: FileFolderTree;
  }) => {
    info.event.preventDefault(); // Ngăn menu chuột phải mặc định

    if (info.node.fileType != "folder") {
      setMenuItems(rightClickFileMenu);
    } else {
      if (ROOT_FOLDER.includes(info.node.key)) {
        setMenuItems(
          rightClickFolderMenu?.map((item) => {
            if (
              item &&
              "disabled" in item &&
              (item.key === COPY ||
                item.key === RENAME ||
                item.key === DELETE ||
                item.key === PASTE)
            ) {
              item.disabled = true;
            }

            if (item && "disabled" in item && item.key === PASTE && nodeCopy) {
              item.disabled = false;
            }
            return item;
          })
        );
      } else {
        setMenuItems(
          rightClickFolderMenu?.map((item) => {
            if (item && "disabled" in item) {
              item.disabled = false;
            }
            if (item && "disabled" in item && item.key === PASTE && !nodeCopy) {
              item.disabled = true;
            }
            return item;
          })
        );
      }
    }

    setContextMenu({
      visible: true,
      x: info.event.clientX,
      y: info.event.clientY,
      node: info.node,
    });
  };

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (!contextMenu || !contextMenu.node) {
      return;
    }

    switch (key) {
      case ADD_FILE: {
        setIsCreateFolder(false);
        setIsOpenModalCreate(true);
        break;
      }
      case ADD_FOLDER: {
        setIsCreateFolder(true);
        setIsOpenModalCreate(true);
        break;
      }
      case RENAME: {
        setIsOpenModalRename(true);
        break;
      }
      case DELETE: {
        setIsOpenModalDelete(true);
        break;
      }
      case COPY: {
        setNodeCopy(contextMenu.node);
        break;
      }
      case PASTE: {
        const newData = toJSONData(
          putNodeToNode(
            nodeCopy as FileFolderTree,
            contextMenu.node.key,
            solutionInfomation
          )
        );
        setNodeCopy(null);
        await window.electronAPI.writeFile(SOLUTION_JSON, newData);
        getUIData();
        break;
      }
    }
  };
  const getUIData = async () => {
    const content = await window.electronAPI.readFile(SOLUTION_JSON);
    const data = JSON.parse(content);

    const normalizedData = Array.isArray(data) ? data : [data];
    const treeData = transformTreeListIcons(normalizedData);

    setSolutionInformation(folderGoFisrt(treeData));
  };

  const handleNodeClick = (
    _selectedKeys: React.Key[],
    info: { node: { key: string; fileType: string } }
  ) => {
    const key = info.node.key; // lấy key node được click
    setDefaultKey(key);
    if (info.node.fileType != FOLDER) {
      const file = global.fileList.find((item: FileInfo) => {
        return item.key === key;
      });

      if (file) {
        // nếu là file code thì mở giao diện code không thì giao diện UI
        switch (info.node.fileType) {
          case TYPE_SCRIPT:
          case CSS:
          case SASS:
          case SPRING: {
            break;
          }
          case REACT: {
            break;
          }
        }
        dispatch(setFileClick(file));
      }
    }
    setExpandedKeys((prev) => {
      if (prev.includes(key)) {
        // nếu đã mở rồi thì thu lại
        return prev.filter((k) => k !== key);
      } else {
        // nếu chưa mở thì mở ra
        return [...prev, key];
      }
    });
  };

  const handleCloseOpenAll = () => {
    if (expandedKeys.length > 0) {
      setExpandedKeys([]);
    } else {
      setExpandedKeys(getAllKeys(solutionInfomation));
    }
  };

  const handleCancelCreate = () => {
    setIsOpenModalCreate(false);
  };
  const handleCancelRename = () => {
    setIsOpenModalRename(false);
  };
  const handleCancelDelete = () => {
    setIsOpenModalDelete(false);
  };
  const handleDelete = async () => {
    if (contextMenu?.node) {
      const file = findNodeFromTreeFileFolder(
        solutionInfomation,
        contextMenu.node?.key
      );

      if (!file || ROOT_FOLDER.includes(file.key)) {
        messageApi.error("Không được xóa folder gốc!");
        return;
      }

      const res = deleteNode(file.key, solutionInfomation);
      const newData = toJSONData(res);
      if (file.fileType != FOLDER) {
        await deleteFile(file.key, file.fileType);
      }
      await window.electronAPI.writeFile(SOLUTION_JSON, newData);
      getUIData();
      setIsOpenModalDelete(false);
    }
  };
  const handleRename = async (name: string) => {
    if (contextMenu?.node) {
      const file = findNodeFromTreeFileFolder(
        solutionInfomation,
        contextMenu.node?.key
      );

      if (!file || ROOT_FOLDER.includes(file.key)) {
        messageApi.error("Không được đổi tên folder gốc!");
        return;
      }
      file.title = name;

      setSolutionInformation((prev) =>
        prev.map((item) =>
          item.key === contextMenu.node?.key ? { ...item, title: name } : item
        )
      );
      const newData = toJSONData(solutionInfomation);
      await window.electronAPI.writeFile(SOLUTION_JSON, newData);
      getUIData();
    }
    setIsOpenModalRename(false);
  };
  const handleCreate = async (name: string, fileType?: string) => {
    if (!contextMenu || !contextMenu.node) {
      return;
    }
    let newData = null;
    if (isCreateFolder) {
      const newFolder = {
        title: name,
        fileType: "folder",
        key: uuidv4(),
        isLeaf: false,
      } as FileFolderTree;
      const updatedTree = addChildToNode(
        solutionInfomation,
        contextMenu.node.key,
        newFolder
      );
      setSolutionInformation(updatedTree);
      newData = toJSONData(updatedTree);
    } else {
      const newFile = {
        title: name,
        fileType: fileType,
        key: uuidv4(),
        isLeaf: true,
      } as FileFolderTree;

      const updatedTree = addChildToNode(
        solutionInfomation,
        contextMenu.node.key,
        newFile
      );

      setSolutionInformation(updatedTree);
      newData = toJSONData(updatedTree);
      createFile(newFile.key, fileType as string, "");
    }

    await window.electronAPI.writeFile(SOLUTION_JSON, newData);
    getUIData();
    setIsOpenModalCreate(false);
  };

  const onTreeDrop = async (
    info: NodeDragEventParams<FileFolderTree> & {
      dragNode: EventDataNode<FileFolderTree>;
      dragNodesKeys: Key[];
      dropPosition: number;
      dropToGap: boolean;
    }
  ) => {
    if (ROOT_FOLDER.includes(info.dragNode.key)) {
      messageApi.error("Không được di chuyển folder gốc!");
      return;
    }
    onTreeDropService(info, solutionInfomation);
    setSolutionInformation(solutionInfomation);
    const newData = toJSONData(solutionInfomation);
    await window.electronAPI.writeFile(SOLUTION_JSON, newData);
    getUIData();
  };
  useEffect(() => {
    getUIData();
  }, []);
  useEffect(() => {
    if (sessionCaching.length > 0) {
      setExpandedKeys(getAllKeys(solutionInfomation));
      const key = getSessionCacheValueByKey(sessionCaching, LAST_OPEN_FILE);
      setDefaultKey(key);
    }
  }, [sessionCaching, solutionInfomation]);
  useEffect(() => {
    setContextMenu({
      node: contextMenu?.node,
    } as ContextMenu);
  }, [justClick]);
  return (
    <div className={styles.solutionContainer}>
      <div className={styles.fileTree}>
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={tabs.map((_, i) => {
            const id = String(i + 1);
            return {
              label: _.label,
              key: id,
              children: (
                <div>
                  <div className={styles.extraBtn}>
                    <ButtonCustom
                      onClick={handleCloseOpenAll}
                      type="text"
                      size="small"
                      isIconBtn={true}
                    >
                      <IconFileFolder
                        icon={expandedKeys.length > 0 ? "minimize" : "maximize"}
                        height={18}
                        width={18}
                      />
                    </ButtonCustom>
                  </div>
                  <Tree
                    className="tree-folder"
                    showLine={true}
                    showIcon={true}
                    expandedKeys={expandedKeys}
                    selectedKeys={[defaultKey]}
                    treeData={solutionInfomation}
                    expandAction="click"
                    onSelect={handleNodeClick}
                    switcherIcon={getNodeOpenIcon}
                    onRightClick={handleRightClick}
                    onDrop={onTreeDrop}
                    draggable
                  />
                </div>
              ),
            };
          })}
        />
        {/* ⚙️ Hiển thị menu context tại đúng vị trí chuột */}
        {contextMenu && contextMenu.visible && (
          <div
            style={{
              position: "fixed",
              top: contextMenu.y,
              left: contextMenu.x,
              zIndex: 9999,
            }}
            onClick={() => setContextMenu({ ...contextMenu, visible: false })}
          >
            <Dropdown
              menu={{ items: menuItems, onClick: handleMenuClick }}
              open={true}
              trigger={[]}
            >
              <span />
            </Dropdown>
          </div>
        )}
      </div>
      <div className={styles.componentList}>
        <Tree
          showLine={true}
          showIcon={true}
          treeData={solutionInfomation}
          expandAction="click"
          onSelect={handleNodeClick}
        />
      </div>
      <ModalCreate
        isCreateFolder={isCreateFolder}
        contextMenu={contextMenu}
        handleCancel={handleCancelCreate}
        handleOk={handleCreate}
        isModalOpen={isOpenModalCreate}
      />
      <ModalRename
        treeData={solutionInfomation}
        contextMenu={contextMenu}
        handleCancel={handleCancelRename}
        handleOk={handleRename}
        isModalOpen={isOpenModalRename}
      />
      <ModalDelete
        contextMenu={contextMenu}
        handleCancel={handleCancelDelete}
        handleOk={handleDelete}
        isModalOpen={isOpenModalDelete}
      />
    </div>
  );
};
