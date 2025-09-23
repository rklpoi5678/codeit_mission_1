import styles from './LoginModal.module.css';

export function LoginModal({close,msg}) {

  return (
    <div className={styles.modalShow}>
      <div className={`${styles.modalContainer} ${styles.paraContainer}`}>
        <p className={styles.modalPara}>{msg}</p>
        <button className={styles.modalButton} onClick={close}>확인</button>
      </div>
    </div>
  );
}
