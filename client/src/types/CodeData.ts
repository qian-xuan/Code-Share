export class CodeData {
  codes: {
    type: string;
    code: string | undefined;
  }[];
  setting: {
    title: string | undefined;
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
  // addCode(code: string, type: string) {
  //   this.codes.push({ code, type });
  // }
}
