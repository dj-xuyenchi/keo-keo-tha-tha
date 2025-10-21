import React, { useEffect, useState } from "react";

import styles from "./solution.module.scss";
import { Dropdown, MenuProps, Tabs, Tree, TreeNodeProps } from "antd";

import { v4 as uuidv4 } from "uuid";
import "@/config/styleOverride.css";
import {
  addChildToNode,
  FileFolderTree,
  getAllKeys,
  toJSONData,
  transformTreeListIcons,
} from "@/entity/solution/FileFolderTree";
import { IconFileFolder } from "@/component/icon-foulder/IconFileFolder";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import {
  ADD_FILE,
  ADD_FOLDER,
  rightClickFileMenu,
  rightClickFolderMenu,
} from "@/config/rightClickMenu";
import { ModalCreate } from "./ModalCreate";
import { ContextMenu } from "./ContextMenu";
export interface SolutionPanelProps {
  selected: string | null;
  justClick: boolean;
}
export const SolutionPanel = ({ justClick, selected }: SolutionPanelProps) => {
  const [tabs, setTabs] = useState([
    {
      label: "Solution",
    },
  ]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
  const [isCreateFolder, setIsCreateFolder] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [solutionInfomation, setSolutionInformation] = useState(
    [] as FileFolderTree[]
  );

  const [contextMenu, setContextMenu] = useState<ContextMenu | null>({
    visible: false,
    x: 0,
    y: 0,
  });

  // ⚙️ Khi chuột phải vào node
  const handleRightClick = (info: {
    event: React.MouseEvent;
    node: FileFolderTree;
  }) => {
    info.event.preventDefault(); // Ngăn menu chuột phải mặc định

    if (info.node.fileType != "folder") {
      setMenuItems(rightClickFileMenu);
    } else {
      setMenuItems(rightClickFolderMenu);
    }

    setContextMenu({
      visible: true,
      x: info.event.clientX,
      y: info.event.clientY,
      node: info.node,
    });
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
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
    }
  };
  const getUIData = async () => {
    const content = await window.electronAPI.readFile("solution.json");
    const data = JSON.parse(content);

    const normalizedData = Array.isArray(data) ? data : [data];
    const treeData = transformTreeListIcons(normalizedData);

    setSolutionInformation(treeData);
  };
  const handleNodeClick = (
    _selectedKeys: React.Key[],
    info: { node: { key: string } }
  ) => {
    const key = info.node.key; // lấy key node được click

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

  const getNodeOpenIcon = (node: TreeNodeProps) => {
    const open = node.expanded;
    switch (node.data.key) {
      case "0-0-0":
        return open ? (
          <IconFileFolder icon="uiOpen" height={18} width={18} />
        ) : (
          <IconFileFolder icon="ui" height={18} width={18} />
        );
      case "1-0-0":
        return open ? (
          <IconFileFolder icon="utilOpen" height={18} width={18} />
        ) : (
          <IconFileFolder icon="util" height={18} width={18} />
        );
      case "2-0-0":
        return open ? (
          <IconFileFolder icon="settingOpen" height={18} width={18} />
        ) : (
          <IconFileFolder icon="setting" height={18} width={18} />
        );
      default:
        return open ? (
          <IconFileFolder icon="openFolder" height={18} width={18} />
        ) : (
          <IconFileFolder icon="folder1" height={18} width={18} />
        );
    }
  };

  const handleCancelCreate = () => {
    setIsOpenModalCreate(false);
  };
  const handleCreate = async (name: string, typeFile?: string) => {
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
        fileType: typeFile,
        key: uuidv4(),
        isLeaf: false,
      } as FileFolderTree;

      const updatedTree = addChildToNode(
        solutionInfomation,
        contextMenu.node.key,
        newFile
      );

      setSolutionInformation(updatedTree);
      newData = toJSONData(updatedTree);
    }

    await window.electronAPI.writeFile("solution.json", newData);

    setIsOpenModalCreate(false);
  };

  useEffect(() => {
    getUIData();
  }, []);
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
                    onSelect={handleNodeClick}
                    treeData={solutionInfomation}
                    switcherIcon={getNodeOpenIcon}
                    onRightClick={handleRightClick}
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
      <div className={styles.componentList}></div>
      <ModalCreate
        isCreateFolder={isCreateFolder}
        contextMenu={contextMenu}
        handleCancel={handleCancelCreate}
        handleOk={handleCreate}
        isModalOpen={isOpenModalCreate}
      />
    </div>
  );
};
