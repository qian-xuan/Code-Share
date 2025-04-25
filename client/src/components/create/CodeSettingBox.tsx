import { Input } from "antd";
import { Dispatch, SetStateAction, useContext } from "react";
import { CodeDataContext } from "../../contexts/CodeDataContext";

const CodeSettingBox: React.FC<{setFcName: Dispatch<SetStateAction<string>>}> = ( {setFcName} ) => {
  const codeData = useContext(CodeDataContext);

  return (
    <div className="flex-row space-y-4">
      {/* Input 区域 */}
      <div className="flex justify-between space-x-3">
        {/* 函数名称 */}
        <Input
          className="w-full"
          placeholder="请输入代码片段标题"
          aria-valuemax={20}
          defaultValue={codeData.settings.title}
          onChange={ (e) => {
            codeData.settings.title = e.target.value;
            setFcName(e.target.value);
          } }
        />
        {/* 标签 */}
        <Input
          className="w-full"
          placeholder="请输入代码片段标题"
          aria-valuemax={20}
          defaultValue={codeData.settings.title}
          onChange={ (e) => {
            codeData.settings.title = e.target.value;
            setFcName(e.target.value);
          } }
        />
        {/* 过期时间 */}
        <Input
          className="w-full"
          placeholder="请输入代码片段标题"
          aria-valuemax={20}
          defaultValue={codeData.settings.title}
          onChange={ (e) => {
            codeData.settings.title = e.target.value;
            setFcName(e.target.value);
          } }
        />
      </div>

      {/* Markdown-it 区域 */}
      <div className="h-20 border-[1px] border-gray-600 bg-AC-4">

      </div>
    </div>
  )
}

export default CodeSettingBox;