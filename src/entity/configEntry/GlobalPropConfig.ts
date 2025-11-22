import { NodeDropData } from "@/views/main/canvas/Canvas";
import { TableDefaultProps } from "./TabbleProps";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { TablePropsCustom } from "@/component/data/TableDrop";

export type GLOBAL_PROP_CONFIG = TableDefaultProps;

export const getDefaultProps = (item: NodeDropData) => {
  switch (item.type) {
    case DATA_TYPE.TABLE: {
      const config = {} as TablePropsCustom<object>;
      config.columns = [
        {
          title: "STT",
          dataIndex: "stt",
          key: "stt",
          width: 100,
        },
      ];
      return config;
    }
    default: {
      return {};
    }
  }
};
