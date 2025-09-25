import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getItemsList } from "@/api/ProductMyService";
import { SearchX } from "lucide-react";

import styles from './CardList.module.css';
import { Link } from "react-router-dom";

export function MyCardList({ page, currentPage, sortType, setTotalItems, onSearch, keyword }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // undefined시 작동지연
    if (!page) return;

    setLoading(true);
    async function fetchItems() {
      try {
        let data = [];
        data = await getItemsList(currentPage, page, keyword, sortType); // 전체상품
        setItems(data.data);
        setTotalItems(data.pagination.total);
      } catch (err) {
        console.error('Failed getItems:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [currentPage, page, sortType, setTotalItems, keyword]);

  const handleClick = () => {
    onSearch('');
  };

  if (!items.length) return <div className={styles.emptyQuery}><SearchX />검색 결과가 없습니다.<button onClick={handleClick}>검색초기화</button></div>;

  return (
    <div className={styles.cardContainer}>
      {items.map((item) => (
        <Link to={`items/detail/${item._id}`} key={item._id}>
          <Card
            name={item.name}
            price={item.price}
            images={item.images}
            loading={loading}
          />
        </Link>
      ))}
    </div>
  );
}