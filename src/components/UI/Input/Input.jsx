import { useState } from 'react'
import { Search } from 'lucide-react';

import styles from './Input.module.css'

export function Input({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleKeyDown = (e) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <div className={styles.InputContainer}>
      <Search className={styles.InputIcon} width={24} height={24} />
      <input
        className={styles.ItemInput}
        placeholder="검색할 상품을 입력해주세요"
        onChange={(e) => setKeyword(e.target.value.trim())}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}