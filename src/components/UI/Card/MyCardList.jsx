import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getItemsList } from "@/api/ProductMyService";
import { SearchX } from "lucide-react";

import styles from './CardList.module.css';

export function MyCardList({ page, currentPage, sortType, setTotalItems, backKeyword }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // undefined시 작동지연
    if (!page) return;

    setLoading(true);
    async function fetchItems() {
      try {
        let data = [];
        data = await getItemsList(currentPage, page, sortType); // 전체상품
        setItems(data.data);
        setTotalItems(data.pagination.total);
      } catch (err) {
        console.error('Failed getItems:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [currentPage, page, sortType, setTotalItems]);

  const handleClick = () => {
    backKeyword('');
  };

  if (!items.length) return <div className={styles.emptyQuery}><SearchX />검색 결과가 없습니다.<button onClick={handleClick}>검색초기화</button></div>;

  return (
    <div className={styles.cardContainer}>
      {items.map((item) => (
        <Card
          key={item._id}
          name={item.name}
          price={item.price}
          images={item.images}
          loading={loading}
        />
      ))}
    </div>
  );
}