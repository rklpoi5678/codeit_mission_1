import styles from './Footer.module.css';

export function Footer({ type }) {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerDiv}>
        <p className={styles.footerDivPara}>@codeit - 2024</p>
        <div className={type === 'mobile' ? styles.footerBottom : ''}>
          <div className={styles.footerLink}>
            <a className={styles.footerDivLikes} href="./privacy">Privacy Policy</a>
            <a className={styles.footerDivLikes} href="./faq">FAQ</a>
          </div>
          <div className={styles.snsImages}>
            <a className={styles.footerDivLikes} href="https://www.youtube.com/results?search_query=코드잇_판다마켓" target="_blank"><img src="/images/sns/ic_youtube.svg" alt="youtube" /></a>
            <a className={styles.footerDivLikes} href="https://www.facebook.com/" target="_blank"><img src="/images/sns/ic_fb.svg" alt="facebook" /></a>
            <a className={styles.footerDivLikes} href="https://www.instagram.com/" target="_blank"><img src="/images/sns/ic_instagram.svg" alt="instagram" /></a>
            <a className={styles.footerDivLikes} href="https://www.twitter.com/" target="_blank"><img src='/images/sns/ic_twitter.svg' alt="twitter" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}