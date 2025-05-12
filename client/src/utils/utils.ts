// 格式化后端返回时间
export const formatDate = (isoString: string) => {
  return isoString.replace(/T(\d{2}:\d{2}):\d{2}\.\d{3}Z$/, ' $1');
};