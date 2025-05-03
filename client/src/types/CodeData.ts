export type LanguageType = 'javascript' | 'html';

export type CodeData = {
  codes: {
    language: LanguageType,
    code: string | undefined,
  }[],
  settings: {
    title: string | undefined,
    tags: string[],
    overtime: string | undefined,
    description: string,
  };
}

export const defaultCodeData:CodeData = {
  codes: [],
  settings: {
    title: '',
    tags: [],
    overtime: undefined,
    description: '',
  }
}



// constructor() {
//   this.codes = [];
//   this.settings = {
//     title: "",
//     tags: [],
//     overtime: undefined,
//     description: "",
//   };
// }

// 示例方法：添加代码
// addCode(code: string, type: string) {
//   this.codes.push({ code, type });
// }
// }
