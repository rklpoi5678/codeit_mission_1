import { Link } from "react-router-dom";
import styles from "./ArticleSection.module.css";

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("Ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export function ArticleSection({ articles }) {
  return (
    <div className={styles.articleList}>
      {articles.map((article) => (
        <Link
          to={`detail/${article.id}`}
          key={article.id}
          className={styles.articleCard}
        >
          <div className={styles.articleImgTitleBox}>
            <img
              className={styles.articleImg}
              src={article.images ? article.images[0] : "/image/logo.png"}
              alt="썸네일"
            />
            <p className={styles.title}>{article.title}</p>
          </div>
          <div className={styles.articleInfo}>
            <div className={styles.articleInfoMeta}>
              <img
                className={styles.metaUserAvatar}
                src={article.author.userProfile.photoUrl}
                alt="author-avatar"
              />
              <p className={styles.meta}>{article.author.name}</p>
              <p className={styles.createdAt}>
                {formatDate(article.createdAt)}
              </p>
            </div>
            <div className={styles.view}>조회수 {article.view}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
