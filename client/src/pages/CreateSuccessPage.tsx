import { Button, Card, ConfigProvider, Input, Popover, QRCode, Tag } from "antd";
import store from "../store/store";
import AppleDots from "../components/AppleDots";
import DisplayCodeTabs from "../components/DisplayCodeTabs";
import { ParseMarkdown } from "../utils/MarkdownEditor";
import { LockFilled, UnlockFilled, ShareAltOutlined, MoreOutlined, QrcodeOutlined } from '@ant-design/icons';
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

  const shareLink = window.origin + '/display' + window.location.search;
  const queryParams = new URLSearchParams(window.location.search);

  // 分享按钮弹窗
  const shareContent = (
    <div className="flex-row items-center space-y-4 p-2">
      <div className="flex justify-between items-center space-x-2">
        <Input value={ shareLink } disabled></Input>
        <Button type="primary"
          onClick={() => {
            navigator.clipboard.writeText(shareLink)
            .then(() => {
              alert('链接已复制到剪贴板');
            })
            .catch((err) => {
              alert('复制失败:' + err);
            });
          }}
        >复制链接</Button>
        <div className="w-auto">
          {/* QRCode */}
          <Popover content={<QRCode value={shareLink} />}
            placement="bottomLeft"
          >
            <Button icon={<QrcodeOutlined />}></Button>
          </Popover>
        </div>
      </div>
      <div className="flex justify-between items-center space-x-2">
        <div>分享范围</div>
        <div>{ encrypted? '加密':'公开' }</div>
        {/* <Select
           variant="borderless" style={{width:100}}
          //  defaultValue={store.getState().edit.encrypted? 'private':'public'}
          options={[{ value: 'public', label: '公开' }, { value: 'private', label: '加密' }]}
        /> */}
      </div>
      { encrypted && (
      <div className="flex justify-between items-center space-x-2">
        <div>密码</div>
        <div>{queryParams.get('pwd')}</div>
      </div>)}
      <div className="flex justify-between items-center space-x-2">
        <div>过期时间</div>
        <div>{settings.overtime === undefined ? '永久':settings.overtime}</div>
      </div>
    </div>
  );

  const othersContent = (
    <>
      <div> test1 </div>
      <div> test2 </div>
      <div> test3 </div>
    </>
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
          <Popover content={shareContent} title={(<div className="text-center">分享代码片段</div>)}
            arrow={false}
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
          <Popover content={othersContent}
            arrow={false}
            placement="bottom"
            trigger='click'
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
