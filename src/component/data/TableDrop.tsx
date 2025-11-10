"use client";
import {
  Table,
  TableProps,
  Row,
  Col,
  Tooltip,
  Drawer,
  Modal,
  message,
} from "antd";
import "@/config/styleOverride.css";
import {
  SyncOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoSearchSharp, IoSettingsSharp } from "react-icons/io5";
import { ReactNode, useEffect, useState } from "react";
import { ColumnType } from "antd/es/table";
import { FaFileArrowDown } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";
import { Key } from "antd/es/table/interface";
import { BaseDataTable } from "@/entity/BaseDataTable";
import { InputDrop } from "./InputDrop";
import { ButtonDrop } from "../control/ButtonDrop";
import { ButtonCustom } from "../componentCustom/ButtonCustom";
import { CollapseCustom } from "../componentCustom/CollapseCustom";
import styles from "./style/table.module.scss";
import { WrapperDropComponent } from "./WrapperDropComponent";
// Interface mở rộng props
export interface ExtendFunction<T> {
  buttonAddTitle?: string;
  size?: "small" | "middle" | "large";
  toggleViewMode?: (mode: boolean) => void;
  disableAddData?: boolean;
  handleUpdateDataSource?: (data: T[]) => void;
  buttonReloadFunction?: () => void;
  isSupportExport?: boolean;
  isSupportZoom?: boolean;
  isExportFromServer?: boolean;
  handleExportData?: () => void;
  disableExportData?: boolean;
  andOn?: "table" | "drawer" | "page";
  formOnDrawer?: ReactNode;
  handleConfirm?: () => void;
}

// Props cho TableCustom
export interface TablePropsCustom<T> extends TableProps<T> {
  dataSource?: T[];
  extendFunction?: ExtendFunction<T>;
  columns: ColumnTypeCustom<T>[];
  columnsEdit: ColumnTypeCustom<T>[];
  fixedCollap?: boolean;
  viewMode?: boolean;
  isSupportMultiSelect?: boolean;
  tableName: string;
}
export interface ColumnTypeCustom<T> extends ColumnType<T> {
  sortNumber?: number;
  children?: ColumnTypeCustom<T>[];
  isOpenChildren?: boolean;
}
// Component TableDrop
export const TableDrop = <T extends BaseDataTable>({
  style,
  columns,
  columnsEdit,
  extendFunction,
  fixedCollap = false,
  viewMode,
  loading,
  dataSource,
  tableName,
  isSupportMultiSelect,
  ...restProps
}: TablePropsCustom<T>) => {

  const [isShowSetting, setIsShowSetting] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns || []);
  const [activeCollap, setActiveCollap] = useState(["1"]);
  const [isEditAddBtn, setIsEditAddBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBeforeConfirmModalOpen, setIsBeforeConfirmModalOpen] =
    useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as Key[]);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Logic setting table
  const handleChangeCollap = (value: string[]) => {
    if (fixedCollap) {
      return;
    }
    setActiveCollap(value);
  };
  const handleShowSetting = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsShowSetting(true);
  };

  const handleZoom = (zoom: boolean) => {
    setIsZoomOut(zoom);
  };

  // Logic data
  const handleEditAddDataTable = () => {
    setIsEditAddBtn(true);
    if (extendFunction?.toggleViewMode) {
      extendFunction.toggleViewMode(false);
    }
    if (extendFunction?.andOn === "table") {
      // Mở nút thêm dòng và mở lại hết các cột nếu đang bị ẩn
      setVisibleColumns(columns);
    }
    if (extendFunction?.andOn === "drawer") {
      // mở drawer
    }
    if (extendFunction?.andOn === "page") {
      // điều hướng trang tạo mới
    }
  };
  const addRowData = () => {
    if (extendFunction) {
      if (extendFunction.handleUpdateDataSource) {
        dataSource?.unshift({
          rowUUID: crypto.randomUUID(),
          isNewRow: true,
        } as T);
        extendFunction.handleUpdateDataSource(dataSource as []);
      }
    }
  };
  const handleCloseEditAddTable = () => {
    let isHasChange = false;
    for (const data of dataSource || []) {
      if (data.isEdited || data.isNewRow) {
        isHasChange = true;
        break;
      }
    }
    if (isHasChange) {
      showModal();
    } else {
      handleClose(isHasChange);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = (isHasChange: boolean) => {
    setIsModalOpen(false);
    setIsEditAddBtn(false);
    if (isHasChange) {
      if (extendFunction?.buttonReloadFunction) {
        extendFunction.buttonReloadFunction();
      }
    }
    if (extendFunction?.toggleViewMode) {
      extendFunction.toggleViewMode(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleBeforeConfirm = () => {
    handleOpenBeforeConfirm();
  };
  const handleConfirm = () => {
    try {
      if (extendFunction) {
        if (extendFunction.handleConfirm) {
          extendFunction.handleConfirm();
        }
      }
    } catch (e) {
      console.error(e);
      messageApi.open({
        type: "error",
        content: "e",
      });
    } finally {
      handleCloseBeforeConfirm();
      setIsEditAddBtn(false);
      if (extendFunction?.toggleViewMode) {
        extendFunction.toggleViewMode(true);
      }
    }
  };
  const handleCloseBeforeConfirm = () => {
    setIsBeforeConfirmModalOpen(false);
  };
  const handleOpenBeforeConfirm = () => {
    setIsBeforeConfirmModalOpen(true);
  };

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    setVisibleColumns(viewMode ? columns : columnsEdit);
  }, [viewMode, columns]);
  return (
    <WrapperDropComponent >
      <div
        className={clsx(
          "table-custom-container",
          styles.tableDrop,
          viewMode && "view-mode"
        )}

      >
        {contextHolder}
        <CollapseCustom
          activeKey={activeCollap}
          onChange={handleChangeCollap}
          items={[
            {
              key: "1",
              label: "Kết quả",
              children: (
                <>
                  <Table<T>
                    rowKey="rowUUID"
                    className="table-custom"
                    loading={loading}
                    style={{ ...style }}
                    rowSelection={isSupportMultiSelect ? rowSelection : undefined}
                    bordered
                    columns={visibleColumns}
                    dataSource={dataSource?.filter((row: T) => {
                      if (row.isDeleted) {
                        return false;
                      }
                      if (!row.rowUUID) {
                        row.rowUUID = crypto.randomUUID();
                      }
                      return true;
                    })}
                    scroll={{ x: "100%" }}
                    {...restProps}
                  />
                </>
              ),
              extra: (
                <>
                  {extendFunction && activeCollap.length !== 0 && (
                    <Row align="middle">
                      <Col>
                        <InputDrop
                          style={{
                            width: "200px",
                          }}
                          prefix={<IoSearchSharp />}
                          placeholder="Tìm kiếm nhanh..."
                        />

                        {isEditAddBtn && (
                          <>
                            <Modal
                              title={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                  }}
                                >
                                  <WarningOutlined
                                    style={{ color: "#faad14", fontSize: 26 }}
                                  />
                                  <span>Dữ liệu thay đổi chưa được lưu!</span>
                                </div>
                              }
                              open={isModalOpen}
                              centered
                              width={400}
                              footer={
                                <>
                                  <div>
                                    <ButtonDrop
                                      title={"Giữ và ở lại"}
                                      onClick={handleCancel}
                                      type="primary"
                                      style={{
                                        marginLeft: "8px",
                                      }}
                                    />
                                    <ButtonCustom
                                      title={"Thoát và bỏ thay đổi"}
                                      style={{
                                        marginLeft: "8px",
                                      }}
                                      onClick={() => {
                                        handleClose(true);
                                      }}
                                      danger
                                    />
                                  </div>
                                </>
                              }
                            >
                              <p>
                                Các thay đổi ở bảng {tableName} chưa được lưu. Bạn
                                muốn bỏ những thay đổi này
                              </p>
                            </Modal>
                            <ButtonCustom
                              icon={<CgClose />}
                              size={extendFunction.size || "middle"}
                              title={"Huỷ"}
                              style={{
                                marginLeft: "8px",
                              }}
                              onClick={handleCloseEditAddTable}
                              danger
                            />
                            {extendFunction.andOn === "table" && (
                              <ButtonCustom
                                icon={<FaPlus />}
                                size={extendFunction.size || "middle"}
                                title={
                                  extendFunction.buttonAddTitle || "Thêm dòng"
                                }
                                onClick={addRowData}
                                disabled={extendFunction.disableAddData}
                                type="primary"
                                style={{
                                  marginLeft: "8px",
                                }}
                              />
                            )}
                            <Modal
                              title={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                  }}
                                >
                                  <InfoCircleOutlined
                                    style={{ color: "#05428c", fontSize: 26 }}
                                  />
                                  <span>Lưu các thay đổi!</span>
                                </div>
                              }
                              open={isBeforeConfirmModalOpen}
                              centered
                              width={400}
                              footer={
                                <>
                                  <div>
                                    <ButtonCustom
                                      title={"Chỉnh sửa tiếp"}
                                      style={{
                                        marginLeft: "8px",
                                      }}
                                      onClick={handleCloseBeforeConfirm}
                                    />
                                    <ButtonCustom
                                      title={"Lưu thay đổi"}
                                      onClick={handleConfirm}
                                      type="primary"
                                      style={{
                                        marginLeft: "8px",
                                      }}
                                    />
                                  </div>
                                </>
                              }
                            >
                              <p>
                                Bạn muốn lưu những thay đổi ở bảng {tableName}?
                              </p>
                            </Modal>
                            <ButtonCustom
                              icon={<SiTicktick />}
                              size={extendFunction.size || "middle"}
                              title={"Xác nhận"}
                              style={{
                                marginLeft: "8px",
                              }}
                              onClick={handleBeforeConfirm}
                              type="primary"
                            />
                          </>
                        )}

                        {!isEditAddBtn && (
                          <ButtonCustom
                            icon={<FaPlus />}
                            size={extendFunction.size || "middle"}
                            title={
                              extendFunction.buttonAddTitle || "Chỉnh sửa tạo mới"
                            }
                            onClick={handleEditAddDataTable}
                            type="primary"
                            style={{
                              marginLeft: "8px",
                            }}
                          />
                        )}
                        {extendFunction.isSupportExport && !isEditAddBtn && (
                          <ButtonCustom
                            size={extendFunction.size || "middle"}
                            title="Export"
                            onClick={extendFunction.handleExportData}
                            style={{
                              marginLeft: "8px",
                            }}
                            disabled={
                              extendFunction.disableExportData ||
                              !extendFunction.handleExportData
                            }
                            icon={<FaFileArrowDown />}
                          />
                        )}
                        <Tooltip
                          title={
                            isEditAddBtn
                              ? "Đang ở chế độ tạo sửa không cho phép reload dữ liệu!"
                              : "Reload dữ liệu"
                          }
                        >
                          <ButtonCustom
                            style={{
                              marginLeft: "8px",
                            }}
                            disabled={isEditAddBtn}
                            onClick={extendFunction.buttonReloadFunction}
                            size={extendFunction.size || "middle"}
                            type="link"
                            shape="circle"
                            icon={<SyncOutlined />}
                          />
                        </Tooltip>
                        {extendFunction.isSupportZoom && (
                          <Tooltip
                            title={
                              isEditAddBtn
                                ? "Đang ở chế độ tạo sửa không cho phép zoom!"
                                : "Zoom toàn màn hình!"
                            }
                          >
                            <ButtonCustom
                              style={{
                                marginLeft: "8px",
                              }}
                              disabled={isEditAddBtn}
                              onClick={() => {
                                handleZoom(true);
                              }}
                              size={extendFunction.size || "middle"}
                              type="link"
                              shape="circle"
                              icon={<MdOutlineZoomOutMap />}
                            />
                          </Tooltip>
                        )}
                        <Tooltip
                          title={
                            isEditAddBtn
                              ? "Đang ở chế độ tạo sửa không cho phép cài đặt!"
                              : "Cài đặt bảng dữ liệu!"
                          }
                        >
                          <ButtonCustom
                            style={{
                              marginLeft: "8px",
                            }}
                            disabled={isEditAddBtn}
                            onClick={handleShowSetting}
                            size={extendFunction.size || "middle"}
                            type="link"
                            shape="circle"
                            icon={<IoSettingsSharp />}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  )}
                </>
              ),
            },
          ]}
          noBorder={true}
        />

        {extendFunction?.andOn === "drawer" && (
          <Drawer
            title="Basic Drawer"
            closable={{ "aria-label": "Close Button" }}
            open={true}
          >
            {extendFunction.formOnDrawer}
          </Drawer>
        )}
      </div>
    </WrapperDropComponent>
  );
};
