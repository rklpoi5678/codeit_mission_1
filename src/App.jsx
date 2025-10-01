import { Route, Routes } from "react-router-dom";

import { HomeLayout } from "@/pages/home/HomeLayout";
import { LoginPage } from "@/pages/home/auth/LoginPage";
import { SignUpPage } from "@/pages/home/auth/SignUpPage";
import { ProductPage } from "@/pages/products/ProductPage";
import { ProductLayout } from "@/pages/products/ProductLayout";
import { ItemsPage } from "@/pages/products/Items/page";
import { ItemsDetailPage } from "@/pages/products/Items/Items-detail/page";
import { RegistrationPage } from "@/pages/products/registration/page";
import { ArticleLayout } from "@/pages/articles/ArticleLayout";
import { ArticlePage } from "@/pages/articles/ArticlePage";
import { ArticleRegistration } from "@/pages/articles/registration/page";
import { ArticleDetailPage } from "@/pages/articles/article-detail/page";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/products" element={<ProductLayout />} >
        <Route index element={<ProductPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="items/detail/:itemId" element={<ItemsDetailPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>
      <Route path="/articles" element={<ArticleLayout />} >
        <Route index element={<ArticlePage />} />
        <Route path="registration" element={<ArticleRegistration />} />
        <Route path="detail/:articleId" element={<ArticleDetailPage />} />
      </Route>
    </Routes>
  );
}