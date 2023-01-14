import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import FrontPage from "./components/frontPage/FrontPage";
import ArticlesPage from "./components/articles/ArticlesPage";
import ArticlePage from "./components/articles/article/ArticlePage";
import PageNotFound from "./components/layout/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      <Route path="" element={<FrontPage />} />

      <Route path="articles" element={<ArticlesPage />} />
      <Route path="articles/article/:article_id" element={<ArticlePage />} />

      <Route path="topic/:topic" element={<ArticlesPage />} />
      <Route
        path="topic/:topic/article/:article_id"
        element={<ArticlePage />}
      />

      <Route path="sort/:query" element={<ArticlesPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default router;