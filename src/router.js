import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import FrontPage from "./components/frontPage/FrontPage";
import ArticlesPage from "./components/articles/ArticlesPage";
import ArticlePage from "./components/articles/article/ArticlePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<FrontPage />} />
      <Route path="articles" element={<ArticlesPage />} />
      <Route path="articles/article/:article_id" element={<ArticlePage />} />
    </Route>
  )
);

export default router;