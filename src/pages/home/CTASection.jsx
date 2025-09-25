
export function CTASection() {
  return (
    <section className="panda-section">
      <div className="panda-content">
        <h2 className="panda-text">
          믿을 수 있는<br />
          판다마켓 중고 거래
        </h2>
        <div className="pandas">
          <picture>
            <source media="(min-width: 650px)" srcSet="/images/landing/Img_home_bottom.png" />
            <img src="/images/landing/Img_home_bottom.png" alt="pandas!" />
          </picture>
        </div>
      </div>
    </section>
  );
}