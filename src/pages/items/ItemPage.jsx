import { useEffect, useState } from "react"
import { usePagination } from "@/hooks/usePagination"
import { useBreakPoint } from "@/hooks/useBreakpoint"

import { ItemHeader } from "@/components/UI/Nav/ItemHeader"
import { DropDown } from "@/components/UI/Button/DropDown"
import { Footer } from "@/components/UI/Footer/Footer"
import { CardList } from "@/components/UI/Card/CardList"
import { FavoriteCardList } from "@/components/UI/Card/FavoriteCardList"
import { Input } from "@/components/UI/Input/Input"
import { Pagination } from "@/components/Pagination/Pagination"

import styles from './ItemPage.module.css'

export default function ItemPage() {
  const [keyword, setKeyword] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(null);
  const [sortType, setSortType] = useState('recent');

  // custom hooks
  const { isTablet, isMobile } = useBreakPoint();
  const {
    currentPage,
    setTotalItems,
    goToPage,
    totalPages
  } = usePagination(1, itemsPerPage)
  // 모바일 기기별 가져올 페이지 세팅 (초기에 먼저 렌더링)

  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(4);
    } else if (isTablet) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(10);
    }
  }, [isMobile, isTablet])

  const initialItemPerPage = isMobile ? 4 : isTablet ? 6 : 10
  const initialFavoritePerPage = isMobile ? 1 : isTablet ? 2 : 4;

  // search
  const handleSearch = (value) => {
    setKeyword(value);
    goToPage(1); // 검색 시 첫페이지로
  }

  return (
    <>
      <ItemHeader />
      <main className={styles.mainContainer}>

        <div className={styles.bestItemList}>
          <p className={styles.bestItemPara}>베스트 상품</p>
          <FavoriteCardList
            page={initialFavoritePerPage}
          />
        </div>

        <div className={styles.sellItemContainerPostion}>
          {!isMobile ? (
            <div className={styles.sellItemContainer}>
              <p className={styles.sellItemPara}>판매 중인 상품</p>
              <div className={styles.sellItemFilter}>
                <Input className={styles.sellItemInput} onSearch={handleSearch} />
                <button className={styles.sellItemButton} >상품 등록하기</button>
                <DropDown onChange={setSortType} page={goToPage} />
              </div>
            </div>
          ) : (
            <div className={styles.sellItemContainer}>
              <div className={styles.sellItemTop}>
                <p className={styles.sellItemPara}>판매 중인 상품</p>
                <button className={styles.sellItemButton}>상품 등록하기</button>
              </div>
              <div className={styles.sellItemFilter}>
                <Input className={styles.sellItemInput} onSearch={handleSearch} />
                <DropDown deviceType={"mobile"} onChange={setSortType} page={goToPage} />
              </div>
            </div>
          )}
          <CardList
            currentPage={currentPage}
            page={initialItemPerPage}
            keyword={keyword}
            sortType={sortType}
            setTotalItems={setTotalItems}
            backKeyword={handleSearch}
          />
        </div>
      </main>

      <div>
        {/** pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
      {isMobile ? (
        <Footer type={'mobile'} />
      ) : (
        <Footer />
      )}
    </>
  )
}