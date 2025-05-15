// !页面搁置废弃

import { Input, Button, Popover, QRCode, ConfigProvider, Card, Tag } from "antd";
import AppleDots from "../components/AppleDots";
import DisplayCodeTabs from "../components/DisplayCodeTabs";
import Tags from "../components/Tags";
import { ParseMarkdown } from "../utils/MarkdownEditor";
import { formatDate } from "../utils/utils";
import { LockFilled, UnlockFilled, ShareAltOutlined, MoreOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { DataModel, defaultDataModel } from "../types/DataModel";

const DisplayCodePage = () => {
  const queryParams = new URLSearchParams(window.location.search);

  let fetchURL = '/api/get/codedata';
  if (queryParams.get('pwd')) fetchURL += '/encrypted';
  fetchURL += window.location.search;
  // TODO: alert no id
  const encrypted = queryParams.get('pwd') === null;

  // 定义本地状态
  const [data, setData] = useState<DataModel>(defaultDataModel);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(fetchURL, { method: 'GET' })
    .then(res => {
      if (!res.ok) throw new Error('网络错误');
      return res.json();
    })
    .then(resJson => {
     setData({...resJson});
     setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [fetchURL])

   // 根据 loading 和 error 状态渲染
  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败: {error}</div>;

  // TODO: check
  const shareLink = window.origin + '/display' + window.location.search;

  console.log(data);
  const settings = data.codedata.settings;

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

      {/* 代码展示 tabs */}
      <DisplayCodeTabs />

      {/* 底边栏 */}
      <div className="flex justify-between pt-2">
        <div>
          <Tag color={data.encrypted? 'red':'green'} className="rounded-xl">
            {data.encrypted? 'Private':'Public'}</Tag>
          <Tags tags={settings.tags}></Tags>
        </div>
        <div>
          过期时间：{ settings.overtime === undefined ? '永久':settings.overtime }
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <div>创建于 { formatDate(data.createdAt) }</div>
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

export default DisplayCodePage;