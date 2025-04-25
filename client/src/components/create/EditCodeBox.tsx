import React, { useContext } from "react";
import AppleDots from "./AppleDots";
import DisplayCodes from "../CodeTabs";
import { CodeDataContext } from "../../contexts/CodeDataContext";


const EditCodeBox: React.FC<{fcName: string}> = ( {fcName} ) => {
  const codeData = useContext(CodeDataContext);

  return (
    <div className="flex-row bg-AC-0 rounded-t-xl p-4 pt-3 box-border">


      {/* 标题栏 */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center space-x-2">
          <AppleDots />
          <label className="text-text font-bold">{ fcName || "代码片段" }</label>
        </div>
        <div className="box-border bg-AC-0 w-32 rounded-sm text-text text-[12px] p-[2px]">
          
        </div>
      </div>

      {/* 代码页选项 Radio & language 选项 */}
      {/* useing tabs */}
      <DisplayCodes />

    </div>
  );
}

export default EditCodeBox;
