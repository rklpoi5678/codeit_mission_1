import { Link } from "react-router-dom";

export function HomeNav() {
  return (
    <nav>
      <div className="logo-box">
        <div className="logo">
          <div className="logo-title">
            <Link to="/"><img src="/images/logo.png" alt="pandamarket"/>판다마켓</Link>
          </div>
        </div>
        <a href="/login">로그인</a>
      </div>
    </nav>
  );
}