import { NodeDropData } from "@/views/main/canvas/Canvas";
import { TableDefaultProps } from "./TabbleProps";
import { DATA_TYPE } from "@/config/TypeComponent";
import { ExtendFunction, TablePropsCustom } from "@/component/data/TableDrop";

export type GLOBAL_PROP_CONFIG = TableDefaultProps;

export const getDefaultProps = (item: NodeDropData) => {
  switch (item.type) {
    case DATA_TYPE.TABLE: {
      const config = {} as TablePropsCustom<object>;
      const btn = {
        buttonAddTitle: "Thêm mới",
        buttonAddFunction() {},
        isSupportExport: true,
        handleExportData() {},
      } as ExtendFunction<object>;
      config.columns = [
        {
          title: "STT",
          dataIndex: "stt",
          key: "stt",
          width: 100,
        },
      ];
      config.extendFunction = btn;
      return config;
    }
    default: {
      return {};
    }
  }
};
