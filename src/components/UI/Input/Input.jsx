import { useState } from 'react';
import { Search } from 'lucide-react';

import styles from './Input.module.css';

export function Input({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  return (
    <div className={styles.InputContainer}>
      <Search className={styles.InputIcon} width={24} height={24} />
      <input
        className={styles.ItemInput}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}