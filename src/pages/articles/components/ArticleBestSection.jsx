import { Link } from "react-router-dom";
import styles from "./ArticleBestSection.module.css";

const truncateText = (text, maxLength) => {
  if (!text) {
    return "";
  }
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("Ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export function ArticleBestSection({ bestArticles }) {
  return (
    <section className={styles.bestArticles}>
      <h2>베스트 게시글</h2>
      <div className={styles.bestList}>
        {bestArticles.map((article) => (
          <Link
            to={`detail/${article.id}`}
            key={article.id}
            className={styles.bestCard}
          >
            <div className={styles.BadgeBox}>
              <img src="/images/article/ic_medal.svg" alt="Best-Badge" />
              <p>Best</p>
            </div>
            <div className={styles.bestImgCard}>
              <div className={styles.imgBox}>
                <img
                  className={styles.bestImg}
                  src={article.images ? article.images[0] : "/images/logo.png"}
                  alt="썸네일"
                />
              </div>
              <p className={styles.title}>{truncateText(article.title, 30)}</p>
            </div>
            <div className={styles.bestInfo}>
              <div className={styles.meta}>
                {article.author.name} · 조회수 {article.view}
              </div>
              <div className={styles.time}>{formatDate(article.createdAt)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
