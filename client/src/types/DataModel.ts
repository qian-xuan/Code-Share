import { CodeData, defaultCodeData } from "./CodeData";

// 后端返回的数据模型
export type DataModel = {
  codedata: CodeData,
  id: -1,
  encrypted: boolean,
  createdAt: '',
};

export const defaultDataModel: DataModel = {
  codedata: defaultCodeData,
  id: -1,
  encrypted: false,
  createdAt: '',
};
