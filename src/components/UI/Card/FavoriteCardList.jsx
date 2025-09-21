import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getProductList } from "@/api/ProductService";

import styles from './FavoriteCardList.module.css'

export function FavoriteCardList({ page }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!page) return;

    setLoading(true)
    async function fetchProduct() {
      try {
        const data = await getProductList(1, page, '', 'favorite')
        setProducts(data.list);
      } catch (err) {
        console.error('Failed getProduct:', err);
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [page]);

  return (
    <div className={styles.favoriteContainer}>
      {products.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          price={item.price}
          images={item.images}
          type={"favorite"}
          loading={loading}
        />
      ))}
    </div>
  )
}