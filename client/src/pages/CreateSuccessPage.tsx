import { Button, Card, ConfigProvider, Popconfirm, Popover, Tag } from "antd";
import store from "../store/store";
import AppleDots from "../components/AppleDots";
import DisplayCodeTabs from "../components/DisplayCodeTabs";
import { ParseMarkdown } from "../utils/MarkdownEditor";
import { LockFilled, UnlockFilled, ShareAltOutlined, MoreOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setValidated } from "../store/editPageSlice";
import { useNavigate } from "react-router-dom";
import { setIfReadOnly } from "../store/editorSettingsSlice";
import Tags from "../components/Tags";
import { formatDate } from "../utils/utils";


const CreateSuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = store.getState().edit.editPageData.settings;
  const encrypted = store.getState().edit.encrypted;

  const shareContent = (
    <div>
    <p>Content</p>
    <p>Content</p>
  </div>
  );

  const othersContent = (
    <div>
    <p>Content</p>
    <p>Content</p>
  </div>
  );

  
  return (
    <ConfigProvider theme={{components:{Card:{bodyPadding: 0,}}}}>
    <Card className="flex-row rounded-xl p-4 pt-3">

      {/* 标题栏 */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center space-x-2">
          <AppleDots />
          <label className="text-text font-bold">{ settings.title }</label>
          { encrypted && (
            <LockFilled className="text-primary" />
          )}
          { !encrypted && (
            <UnlockFilled className="text-primary" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => {
              dispatch(setValidated(true));
              dispatch(setIfReadOnly(false));
              navigate('/edit');
            }}>编辑</button>
          <Popover content={shareContent} title="Title"
            arrow={false}
            placement="bottom"
          >
            <Button type="primary" shape="round" iconPosition="end" icon={<ShareAltOutlined />} >分享</Button>
          </Popover>
        </div>
      </div>

      {/* TODO: 调整 description 样式 */}
      <div className="flex justify-between items-center pb-4">
        <Card className="w-full p-2">
        <ParseMarkdown text={ settings.description } />
        </Card>
      </div>

      {/* 可编辑代码 tabs */}
      <DisplayCodeTabs />

      {/* 底边栏 */}
      <div className="flex justify-between pt-2">
        <div>
          <Tag color={store.getState().edit.encrypted? 'red':'green'} className="rounded-xl">
            {store.getState().edit.encrypted? 'Private':'Public'}</Tag>
          <Tags tags={settings.tags}></Tags>
        </div>
        <div>
          过期时间：{ settings.overtime === undefined ? '永久':settings.overtime }
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <div>创建于 { formatDate(store.getState().edit.createdAt) }</div>
        {/* 其他 */}
          <Popover content={othersContent} title="Title"
            arrow={false}
            placement="bottom"
          >
            <button><MoreOutlined /></button>
          </Popover>
        {/* <button><MoreOutlined /></button> */}
      </div>

    </Card>
    </ConfigProvider>
  );
}

export default CreateSuccessPage;
