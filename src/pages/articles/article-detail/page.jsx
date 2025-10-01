import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById, patchArticleViews } from "@/api/ArticleService";
import { EllipsisVertical, Heart, Undo2 } from "lucide-react";
import styles from "./ArticleDetailPage.module.css";

export function ArticleDetailPage() {
  const { articleId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!articleId) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        await patchArticleViews(articleId);
        const data = await getArticleById(articleId);
        setArticles(data.data);
      } catch (error) {
        console.error("Failed fetchItems", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [articleId]);

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  if (loading) return <div>loading ...</div>;

  return (
    <main className={styles.container}>
      {/* 게시글 제목 + 좋아요 */}
      <section className={styles.header}>
        <h2 className={styles.title}>{articles.title}</h2>
        <div className={styles.authorBox}>
          <div className={styles.authorMeta}>
            <img
              src={articles.author?.userProfile?.photoUrl || "/images/logo.png"}
              alt="authorAvatar"
              className={styles.authorAvatar}
            />
            <p>{articles.author?.name}</p>
            <span>{articles.author?.updatedAt}</span>
          </div>
          <div className={styles.authorBoxHr}></div>
          <button className={styles.likeBtn}>
            <Heart className={styles.heartIcon} />
            <span>123</span>
          </button>
        </div>
      </section>

      {/* 본문 */}
      <section className={styles.content}>{articles.content}</section>

      {/* 댓글 입력 */}
      <section className={styles.commentForm}>
        <h3>댓글달기</h3>
        <form className={styles.commentSection}>
          <textarea
            className={styles.textarea}
            onChange={handleOnChange}
            placeholder="댓글을 입력해주세요..."
          />
          <div className={styles.submitBtnPos}>
            <button className={styles.submitBtn}>등록</button>
          </div>
        </form>
      </section>

      {/* 댓글 리스트 */}
      <section className={styles.commentList}>
        {articles.Comment && articles.Comment.length > 0 ? (
          articles.Comment.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <div className={styles.commentContentBox}>
                <p className={styles.commentContent}>{comment.context}</p>
                <EllipsisVertical
                  className={styles.commentContentIcon}
                  width={24}
                  height={24}
                />
              </div>
              <div className={styles.commentHeader}>
                <img
                  src={
                    comment.author?.userProfile?.photoUrl || "/images/logo.png"
                  }
                  alt="avatar"
                  className={styles.avatar}
                />
                <div className={styles.commentAuthorBox}>
                  <span className={styles.commentAuthor}>
                    {comment.author?.name}
                  </span>
                  <p className={styles.commentUpdateTime}>
                    {comment.createdAt}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <>
            <img
              className={styles.noCommentImg}
              src="/images/article/Img_reply_empty.svg"
              alt="empty-img"
            />
            <p className={styles.noComment}>
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </p>
          </>
        )}
      </section>

      <Link className={styles.backToArticles} to="/articles">
        <p className={styles.backToArticlesBtn}>목록으로 돌아가기</p>
        <Undo2 width={24} height={24} />
      </Link>
    </main>
  );
}
