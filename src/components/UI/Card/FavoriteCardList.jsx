import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getProductList } from "@/api/ProductService";

import styles from './FavoriteCardList.module.css';
import { Link } from "react-router-dom";

export function FavoriteCardList({ page }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!page) return;

    setLoading(true);
    async function fetchProduct() {
      try {
        const data = await getProductList(1, page, '', 'favorite');
        setProducts(data.list);
      } catch (err) {
        console.error('Failed getProduct:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [page]);

  return (
    <div className={styles.favoriteContainer}>
      {products.map((item) => (
        <Link className={styles.favoriteLink} to={`items/detail/${item.id}`} key={item.id}>
          <Card
            name={item.name}
            price={item.price}
            images={item.images}
            type={"favorite"}
            loading={loading}
          />
        </Link>
      ))}
    </div>
  );
}