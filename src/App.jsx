import { Route, Routes } from "react-router-dom";

import { HomeLayout } from "@/pages/home/HomeLayout";
import { LoginPage } from "@/pages/home/auth/LoginPage";
import { SignUpPage } from "@/pages/home/auth/SignUpPage";
import { ProductPage } from "@/pages/products/ProductPage";
import { ProductLayout } from "@/pages/products/ProductLayout";
import { ItemsPage } from "@/pages/products/Items/page";
import { ItemsDetailPage } from "@/pages/products/Items/Items-detail/page";
import { RegistraionPage } from "@/pages/products/registration/page";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/products" element={<ProductLayout />} >
        <Route index element={<ProductPage />} />
        <Route path="/products/items" element={<ItemsPage />} />
        <Route path="/products/items/detail/:itemId" element={<ItemsDetailPage />}/>
        <Route path="/products/registration" element={<RegistraionPage />} />
      </Route>
    </Routes>
  );
}