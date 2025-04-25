export class CodeData {
  codes: {
    language: string;
    code: string | undefined;
  }[];
  settings: {
    title: string | undefined;
    tags: string[];
    overtime: number;
    description: string;
  };

  constructor() {
    this.codes = [];
    this.settings = {
      title: "",
      tags: [],
      overtime: 0,
      description: "",
    };
  }

  // 示例方法：添加代码
  // addCode(code: string, type: string) {
  //   this.codes.push({ code, type });
  // }
}
