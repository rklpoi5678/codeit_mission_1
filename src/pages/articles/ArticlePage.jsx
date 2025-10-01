import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticleList } from "@/api/ArticleService";
import { usePagination } from "@/hooks/usePagination";
import { DropDown } from "@/components/UI/Button/DropDown";
import { Pagination } from "@/components/Pagination/Pagination";
import { Input } from "@/components/UI/Input/Input";
import styles from "./ArticlePage.module.css";
import { ArticleBestSection } from "./components/ArticleBestSection";
import { ArticleSection } from "./components/ArticleSection";

const LIMIT_PAGE = 4;

export function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const { currentPage, setTotalItems, goToPage, totalPages } = usePagination();

  useEffect(() => {
    setLoading(true);
    async function fetchArticle() {
      try {
        const data = await getArticleList(
          currentPage,
          LIMIT_PAGE,
          keyword,
          sortType,
        );
        const bestData = [...data.data]
          .sort((a, b) => b.view - a.view)
          .slice(0, 3);
        setArticles(data.data);
        console.log(data);
        console.log(bestData);
        setBestArticles(bestData);
        setTotalItems(data.pagination.total);
      } catch (error) {
        console.error("Failed getArticle", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [currentPage, keyword, setTotalItems, sortType]);

  const handleSearch = (value) => {
    setKeyword(value);
    goToPage(1);
  };

  return (
    <main className={styles.main}>
      {/* 베스트 게시글 영역 */}
      <ArticleBestSection bestArticles={bestArticles} />

      {/* 게시글 영역 */}
      <section className={styles.articles}>
        <div className={styles.articlesHeader}>
          <p>게시글</p>
          <Link className={styles.articleBtn} to="registration">
            글쓰기
          </Link>
        </div>

        <div className={styles.articlesTools}>
          <div className={styles.searchBox}>
            <Input className={styles.search} onSearch={handleSearch} />
          </div>
          <DropDown onChange={setSortType} />
        </div>

        {/* 게시글 리스트 */}
        <ArticleSection articles={articles} />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </section>
    </main>
  );
}
