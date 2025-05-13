import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "../store/store";
import { useEffect } from "react";
import { fetchCodeDatas } from "../store/codeDatasSlice";

const CodeListPage: React.FC = () => {
  const dispatch = useDispatch<DispatchType>();
  const { codedatas, loading, error } = useSelector((state: StateType) => state.codeDatas);

  useEffect(() => {
    dispatch(fetchCodeDatas());
  }, [dispatch]);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  // console.log(codedatas);

  return (
    <>
      {/* <h1>{datas}</h1> */}
    </>
  );
}

export default CodeListPage;
