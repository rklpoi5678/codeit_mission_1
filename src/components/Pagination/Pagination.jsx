import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './Pagination.module.css';
/**
 * @see https://www.notion.so/Pagination-jsx-26f856d064408013b3eef306e810566e?source=copy_link
 */
export function Pagination({ currentPage, totalPages, onPageChange }) {
  const MAX_VISIBLE = 5;
  const half = Math.floor(MAX_VISIBLE / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE - 1);

  // 페이지 끝에 가까울 때 startPage 조정합니다.
  // endPage가 totalPages를 넘으면 조정
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className={styles.pagination}>
      <div className={styles.arrow} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft
          width={16}
          height={16}
          strokeWidth={3}
        />
      </div>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? styles.active : ''}
        >
          {page}
        </button>
      ))}

      <div className={styles.arrow} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight
          width={16}
          height={16}
          strokeWidth={3}
        />
      </div>
    </div>
  )
}