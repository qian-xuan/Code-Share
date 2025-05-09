import { Editor, useMonaco } from '@monaco-editor/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, StateType } from '../store/store';
import { updateCode } from '../store/editPageSlice';
import { updateCodesRef } from '../store/editorSettingsSlice';

// interface CodeEditorProps {
//   language?: string,
//   page: number,
//   readOnly: boolean,
//   forceUpdate?: Number
// };


const CodeEditor = () => {
  const editorRef = useRef<any>(null); // 引用 Editor 实例
  const monaco = useMonaco();

  const dispatch: DispatchType = useDispatch();
  const page = useSelector((state: StateType) => state.editorSettings.page);
  const codesRef = useSelector((state: StateType) => state.editorSettings.codesRef);
  const ifReadOnly = useSelector((state: StateType) => state.editorSettings.ifReadOnly);
  const forceUpdate = useSelector((state: StateType) => state.editorSettings.forceUpdate);

  // 获取编辑器实例
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor; // 保存 Editor 实例
  };

  const setEditorValue = () => {
    if ( editorRef.current === null ) return;
    // console.log(editorRef.current)
    // console.log(editorRef.current.getValue());
    editorRef.current.setValue(codesRef[page].code);
  };

  const setEditorLanguage = () => {
    if (editorRef.current === null) return;
    const model = editorRef.current.getModel();
    if (model && monaco) {
      monaco.editor.setModelLanguage(model, codesRef[page].language);
    }
  };

  // ref 变动时更新 editor
  useEffect(() => {
    setEditorValue();
    setEditorLanguage();
  }, [page, codesRef, forceUpdate]);

  // 编辑器内容变更
  const onchange = (value: string | undefined) => {
    dispatch(updateCodesRef({page: page, code: value}));
    dispatch(updateCode({page: page, code: value}));
  }

  return (
    <Editor
    // defaultLanguage="html"
    theme="vs-dark"  // 主题：vs, vs-dark, hc-black
    language={codesRef[page].language}
    defaultValue={codesRef[page].code}
    onChange={onchange}
    onMount={handleEditorDidMount}
    options={{
      minimap: { enabled: false },  // 禁用小地图
      mouseWheelZoom: true,         // 滚轮缩放
      readOnly: ifReadOnly,
      folding: true,
      smoothScrolling: true,
      scrollbar: {vertical: "hidden"},
    }}
    className="h-96"
    />
  )
};

export default CodeEditor;
