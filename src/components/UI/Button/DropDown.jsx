import { useState } from "react";
import { ArrowDownWideNarrow, ChevronDown, ChevronUp } from "lucide-react";

import styles from "./DropDown.module.css";

export function DropDown({ deviceType, onChange, page }) {
  const [showPanel, setShowPanel] = useState(false);
  const [filterTitle, setFilterTitle] = useState('최신순');

  const handleOnClick = () => {
    setShowPanel(!showPanel);
  };

  const handleOnChange = (value) => {
    onChange?.(value);
    if (value === 'recent') setFilterTitle('최신순');
    else if (value === 'favorite') setFilterTitle('좋아요순');
    setShowPanel(false);
    page(1);
  };

  return (
    <div className={styles.dropdownContainer}>
      {deviceType !== 'mobile' ? (
        <button
          className={`${styles.dropdownBtn} ${showPanel && styles.dropdownActive}`}
          onClick={handleOnClick}>
          {filterTitle}
          {showPanel
            ?
            <ChevronDown width={24} height={24} />
            :
            <ChevronUp width={24} height={24} />}
        </button>
      ) : (
        <button
          className={`${styles.dropdownBtn} ${showPanel && styles.dropdownActive}`}
          onClick={handleOnClick}>
          <ArrowDownWideNarrow width={24} height={24} />
        </button>
      )}

      {showPanel && (
        <ul className={styles.dropdownFilter}>
          {/** 두가지 클래스를 붙이려면 템플릿 리터럴 사용 */}
          <li onClick={() => handleOnChange('recent')} className={`${styles.dropdownElement} ${styles.topElement}`}>최신순</li>
          <hr className={styles.dropdownHorizen} />
          <li onClick={() => handleOnChange('favorite')} className={styles.dropdownElement}>좋아요순</li>
        </ul>
      )}
    </div>
  );
}
