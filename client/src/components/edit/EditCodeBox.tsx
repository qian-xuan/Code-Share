import { Card, ConfigProvider } from "antd";
import AppleDots from "../AppleDots";
import EditableCodeTabs from "./EditableCodeTabs";
import { useSelector } from "react-redux";
import { StateType } from "../../store/store";


const EditCodeBox = () => {
  const fcName = useSelector((state: StateType) => state.edit.editPageData.settings.title);
  return (
    <ConfigProvider theme={{components:{Card:{bodyPadding: 0,}}}}>
    <Card className="flex-row rounded-t-xl p-4 pt-3">

      {/* 标题栏 */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center space-x-2">
          <AppleDots />
          <label className="text-text font-bold">{ fcName || "代码片段" }</label>
        </div>
      </div>

      {/* 可编辑代码 tabs */}
      <EditableCodeTabs />

    </Card>
    </ConfigProvider>
  );
}

export default EditCodeBox;
