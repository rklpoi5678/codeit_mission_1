import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "@/api/ProductService";
import styles from "./ItemsDetailPage.module.css";

export function ItemsDetailPage() {
  const { itemId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!itemId) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getProduct(itemId);
        setItems(data);
      } catch (error) {
        console.error('Failed fetchItems', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  if (loading) return <div>loading ...</div>;

  return (
    <>
      {/* flow bite */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.imageLight}
                src={items.images}
                alt="iMac"
              />
              <img
                className={styles.imageDark}
                src={items.images}
                alt="iMac Dark"
              />
            </div>

            <div className={styles.content}>
              <h1 className={styles.title}>
                {items.name}
              </h1>

              <div className={styles.priceRow}>
                <p className={styles.price}>{items.price}원</p>
                <div className={styles.reviewBox}>
                  <span className={styles.stars}>★★★★★</span>
                  <p className={styles.rating}>(5.0)</p>
                  <a href="#" className={styles.reviewLink}>345 Reviews</a>
                </div>
              </div>

              <div className={styles.actions}>
                <a href="#" className={styles.favoriteBtn}>Add to favorites</a>
                <a href="#" className={styles.cartBtn}>Add to cart</a>
              </div>

              <hr className={styles.divider} />

              <p className={styles.desc}>
                {items.description}
              </p>

              <hr className={styles.divider} />
              <ul>
                <li>{items.tags ? "Test" : "Not Found"}</li>
                <li>{items.ownerNickname}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 