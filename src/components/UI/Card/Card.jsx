import { Heart } from "lucide-react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export function Card({ name, price, images, type, loading }) {
  return (
    <>
      {loading ? (
        <>
          <div className={styles.skeletonWrapper}>
            <div className={styles.skeletonImage}>
              <p className={styles.skeletonTitle}></p>
              <p className={styles.skeletonPrice}></p>
              <div className={styles.skeletonTextShort}></div>
            </div>
          </div>
        </>
      ) : (

        <div className={styles.cardContainer}>
          <img className={type === 'favorite' ? styles.favoriteImage : styles.cardImage}
            src={images?.[0] || "/images/default_items_img.svg"}
            alt="image" />
          <div className={styles.cardDescription}>
            <p className={styles.cardTitle}>{name}</p>
            <p className={styles.cardPrice}>{price}</p>
            <div className={styles.cardLikes}><Heart width={16} height={16} /> 240</div>
          </div>
        </div>
      )}
    </>
  );
}