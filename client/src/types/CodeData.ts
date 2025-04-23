export class CodeData {
  codes: { page: number; code: string }[];
  setting: {
    title: string;
    tags: string[];
    overtime: number;
    description: string;
  };

  constructor() {
    this.codes = [];
    this.setting = {
      title: "",
      tags: [],
      overtime: 0,
      description: "",
    };
  }

  // 示例方法：添加代码
  addCode(page: number, code: string) {
    this.codes.push({ page, code });
  }
}

// TODO
// 1. 改用fetch请求
// 2. 修改接口，使用CodeData类
// 3. 添加代码页