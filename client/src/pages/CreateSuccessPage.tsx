import { Button, Card, ConfigProvider } from "antd";
import store from "../store/store";
import AppleDots from "../components/AppleDots";
import DisplayCodeTabs from "../components/DisplayCodeTabs";
import { ParseMarkdown } from "../utils/MarkdownEditor";


const CreateSuccessPage = () => {
  const settings = store.getState().edit.editPageData.settings;

  // const id = store.getState().edit.id;
  // fetch(`/api/get/codedata?id=${id}`, {
  //       method: 'GET',
  //     })
  //     .then(res => {
  //       if (res.ok) return res.json();
  //     })
  //     .then(resJson => {
  //      console.log(resJson);
  //     });
  
  return (
    <ConfigProvider theme={{components:{Card:{bodyPadding: 0,}}}}>
    <Card className="flex-row rounded-xl p-4 pt-3">

      {/* 标题栏 */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center space-x-2">
          <AppleDots />
          <label className="text-text font-bold">{ settings.title }</label>
        </div>
        <div className="flex items-center space-x-2">
          <Button>编辑</Button>
          <Button>分享</Button>
        </div>
      </div>

      {/* TODO: 调整 description 样式 */}
      <div className="flex justify-between items-center pb-4">
        <ParseMarkdown text={ settings.description } />
      </div>

      {/* 可编辑代码 tabs */}
      <DisplayCodeTabs />

      {/* 底边栏 */}
      <div className="flex justify-between">
        <div>
          test
        </div>
        <div>
          过期时间：{settings.overtime}
        </div>
      </div>

    </Card>
    </ConfigProvider>
  );
}

export default CreateSuccessPage;
