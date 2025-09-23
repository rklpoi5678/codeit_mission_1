import { useBreakPoint } from "@/hooks/useBreakpoint";
import { Link, NavLink } from "react-router-dom";
import styles from './ItemHeader.module.css';

export function ItemHeader() {
  const { isDesktop, isTablet, isMobile } = useBreakPoint();

  return (
    <nav className={styles.logoContainer}>
      <div className={styles.logoBox}>
        <div className={styles.logo}>
          <div>
            <Link className={styles.logoTitleLink} to="/"><img className={styles.logoImg} src="/images/logo.png" alt="pandamarket" />판다마켓</Link>
          </div>
          <div className={styles.logoParaContainer}>
            <p className={styles.logoPara}>자유게시판</p>
            <NavLink to="/products/items"
              className={({ isActive }) => isActive
                ? `${styles.logoPara} ${styles.active}`
                : styles.logoPara}
            >
              중고마켓
            </NavLink>
          </div>
        </div>
        {
          isDesktop && (
            <Link className={styles.logoBoxLink} to="/login">로그인</Link>
          )
        }
        {
          (isTablet || isMobile) && (
            <img className={styles.logoAvatar} src="/images/default_user_logo.svg" alt="판다마켓 로고" />
          )
        }
      </div >
    </nav >
  );
}