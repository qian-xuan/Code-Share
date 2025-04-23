import { createBrowserRouter, Navigate } from "react-router-dom";
import CreateCodePage from "../pages/CreateCodePage";
import CodeListPage from "../pages/CodeListPage";
import CardSharePage from "../pages/CardSharePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to ="/codeList" />,
  },
  {
    path: "/codeList",
    element: <CodeListPage />,
  },
  {
    path: "/create",
    element: <CreateCodePage />,
  },
  {
    path:"/cardShare",
    element:<CardSharePage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,  // 404 重定向 [[7]][[10]]
  },
]);

export default router;
