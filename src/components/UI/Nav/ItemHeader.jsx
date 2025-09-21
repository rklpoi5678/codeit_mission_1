import { useBreakPoint } from "@/hooks/useBreakpoint"
import styles from './ItemHeader.module.css';

export function ItemHeader() {
  const { isDesktop, isTablet, isMobile } = useBreakPoint();

  return (
    <nav className={styles.logoContainer}>
      <div className={styles.logoBox}>
        <div className={styles.logo}>
          <div>
            <a className={styles.logoTitleLink} href="/"><img className={styles.logoImg} src="/images/logo.png" alt="pandamarket" />판다마켓</a>
          </div>
          <div className={styles.logoParaContainer}>
            <p className={styles.logoPara}>자유게시판</p>
            <p className={styles.logoPara}>중고마켓</p>
          </div>
        </div>
        {isDesktop && (
          <a className={styles.logoBoxLink} href="../../pages/login.html">로그인</a>
        )}
        {(isTablet || isMobile) && (
          <img className={styles.logoAvatar} src="/images/default_user_logo.svg" alt="asd"/>
        )}
      </div>
    </nav>
  )
}