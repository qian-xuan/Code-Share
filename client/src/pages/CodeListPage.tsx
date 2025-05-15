import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "../store/store";
import { useEffect } from "react";
import { fetchCodeDatas } from "../store/codeDatasSlice";
import { Card, ConfigProvider, ThemeConfig } from "antd";
import Tags from "../components/Tags";
import { ParseMarkdown } from "../utils/MarkdownEditor";
import { useNavigate } from "react-router-dom";


const theme:ThemeConfig = {
  components: {
    Card: {
      bodyPadding: 10,
    }
  }
}

const CodeListPage: React.FC = () => {
  const dispatch = useDispatch<DispatchType>();
  const { codedatas, loading, error } = useSelector((state: StateType) => state.codeDatas);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCodeDatas());
  }, [dispatch]);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  const onCardClick = (id: number) => {
    navigate('/display?id=' + id);
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="flex flex-wrap justify-between gap-6">
        { codedatas.map((data) => {
          return (
          <Card key={data.id} onClick={ () => onCardClick(data.id) }
          className="flex-auto min-w-[370px]">
            <div className="flex-row space-y-1">
              <div>
                <div className="font-bold">{data.codedata.settings.title}</div>
                {/* 省略 */}
              </div>
              <div className="text-xs" > 创建时间 {data.createdAt} </div>
              <Card type="inner" className="h-20">
                {ParseMarkdown({
                  text: '```'+ data.codedata.codes[0].language + '\n'
                  + data.codedata.codes[0].code + '\n```'
                  })}
              </Card>
              <div className="flex justify-between">
                <Tags tags={data.codedata.settings.tags} />
                
              </div>
            </div>
          </Card>
          );
        }) }
      </div>
    </ConfigProvider>
  );
}

export default CodeListPage;
