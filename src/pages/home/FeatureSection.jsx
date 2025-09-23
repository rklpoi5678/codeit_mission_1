export function FeatureSection() {
  return (
    <main>
      <section className="feature-section">
        <div className="feature-one">
          <div className="feature-card">
            <img src="/images/landing/Img_home_01.png" alt="" />
            <div className="feature-title">
              <p className="feature-one-para">Hot item</p>
              <h2 className="feature-one-heading">인기 상품을<br className="feature-card-br" />확인해 보세요</h2>
              <p className="feature-description">
                가장 HOT한 중고거래 물품을<br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-section">
        <div className="feature-two">
          <div className="feature-two-card">
            <img src="/images/landing/Img_home_02.png" alt="" />
            <div className="feature-two-title">
              <p className="feature-two-para">search</p>
              <h2 className="feature-two-heading">
                구매를 원하는<br className="feature-card-br" />
                상품을 검색하세요
              </h2>
              <p className="feature-description">구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</p>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-section">
        <div className="feature-one">
          <div className="feature-card">
            <img src="/images/landing/Img_home_03.png" alt="" />
            <div className="feature-title">
              <p className="feature-one-para">Register</p>
              <h2 className="feature-one-heading">판매를 원하는<br className="feature-card-br" />
                상품을 등록하세요
              </h2>
              <p className="feature-description">어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}