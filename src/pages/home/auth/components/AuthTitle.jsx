import { Link } from "react-router-dom";

export function AuthTitle() {
  return (
    <div className="auth-header">
      <Link to="/"><img src='/images/logo.png' alt="판다마켓 로고" /></Link>
      <p>판다마켓</p>
    </div>
  );
}