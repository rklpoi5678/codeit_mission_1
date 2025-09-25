import { useState } from "react";
import { Link } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";
import { useOutletContext } from "react-router-dom";

import { DropDown } from "@/components/UI/Button/DropDown";
import { CardList } from "@/components/UI/Card/CardList";
import { FavoriteCardList } from "@/components/UI/Card/FavoriteCardList";
import { Input } from "@/components/UI/Input/Input";
import { Pagination } from "@/components/Pagination/Pagination";

import styles from './ProductPage.module.css';

export function ProductPage() {
  const { isMobile, isTablet, itemsPerPage } = useOutletContext();
  const [keyword, setKeyword] = useState('');
  const [sortType, setSortType] = useState('recent');

  const initialItemPerPage = isMobile ? 4 : isTablet ? 6 : 10;
  const initialFavoritePerPage = isMobile ? 1 : isTablet ? 2 : 4;
  // custom hooks
  const {
    currentPage,
    setTotalItems,
    goToPage,
    totalPages
  } = usePagination(1, itemsPerPage);
  // 모바일 기기별 가져올 페이지 세팅 (초기에 먼저 렌더링)

  // search
  const handleSearch = (value) => {
    setKeyword(value);
    goToPage(1); // 검색 시 첫페이지로
  };

  return (
    <>
      <main className={styles.mainContainer}>

        <div className={styles.bestItemList}>
          <p className={styles.bestItemPara}>베스트 상품</p>
          <FavoriteCardList
            page={initialFavoritePerPage}
          />
        </div>

        <div className={styles.sellItemContainerPostion}>
          <div className={styles.sellItemContainer}>
            <div className={isMobile ? styles.sellItemTop : ""}>
              <p className={styles.sellItemPara}>판매 중인 상품</p>
              <div className={styles.sellItemFilter}>
                <Input className={styles.sellItemInput} onSearch={handleSearch} />
                <DropDown onChange={setSortType} page={goToPage} />
                {!isMobile ? (
                  <Link to="/products/registration" className={styles.sellItemButton} >상품 등록하기</Link>
                ) : (
                  <button className={styles.sellItemButton}>상품 등록하기</button>
                )}
              </div>
            </div>
          </div>
          <CardList
            currentPage={currentPage}
            page={initialItemPerPage}
            keyword={keyword}
            sortType={sortType}
            setTotalItems={setTotalItems}
            onSearch={handleSearch}
          />
        </div>
      </main >
      <div>
        {/** pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </>
  );
}