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
  }
};

export const defaultCodeData: CodeData = {
  codes: [],
  settings: {
    title: '',
    tags: [],
    overtime: undefined,
    description: '',
  }
}
