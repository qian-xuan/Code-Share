import AppleDots from "../AppleDots";
import EditableCodeTabs from "./EditableCodeTabs";


const EditCodeBox: React.FC<{fcName: string}> = ( {fcName} ) => {
  return (
    <div className="flex-row bg-AC-0 rounded-t-xl p-4 pt-3 box-border">

      {/* 标题栏 */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center space-x-2">
          <AppleDots />
          <label className="text-text font-bold">{ fcName || "代码片段" }</label>
        </div>
      </div>

      {/* 可编辑代码 tabs */}
      <EditableCodeTabs />

    </div>
  );
}

export default EditCodeBox;
