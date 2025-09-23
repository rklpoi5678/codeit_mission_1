import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EmailValidator, PasswordValidator } from '@/utils/validators-react';
import USER_DATA from '@/db';
import { AuthTitle } from '@/pages/home/auth/components/AuthTitle';
import { LoginModal } from '@/components/Modal/LoginModal';
import './login.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleEmailValueChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handleEmailFouseOut = () => {
    setEmailError(EmailValidator(email));
  };

  const handlePasswordValueChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handlePasswordFouseOut = () => {
    setPasswordError(PasswordValidator(password));
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormEvent = (e) => {
    e.preventDefault();

    const user = USER_DATA.find(
      (u) => u.email === email && u.password === password);

    if (!user) {
      setShowModal(true);
    } else {
      navigate('/products');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      <AuthTitle />
      <form id="login" method="POST" action="/items" autoComplete="off" onSubmit={handleFormEvent}>
        <label htmlFor="email">이메일</label>
        <input id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailValueChange}
          onFocus={handleEmailFouseOut}
          placeholder="이메일을 입력해주세요"
          aria-label="이메일을 입력해주세요"
          required />
        {emailError &&
          <span id="email-error" className="error">{emailError}</span>
        }

        <label htmlFor="password">비밀번호</label>
        <div className="password-wrapper">
          <input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            onChange={handlePasswordValueChange}
            onFocus={handlePasswordFouseOut}
            placeholder="비밀번호를 입력해주세요"
            aria-label="비밀번호를 입력해주세요"
            required
          />
          <img className="btn_visibility_icon"
            src={passwordVisible ? "/images/btn_visibility_on.svg" : "/images/btn_visibility_off.svg"}
            onClick={handlePasswordVisible}
          />

          {passwordError &&
            <span id="pw-error" className="error">{passwordError}</span>
          }
        </div>

        <button id="submit-btn" type="submit">로그인</button>
      </form>

      <div className="third-party-auth">
        <p>간편 로그인하기</p>
        <div className="third-party-auth-imgs">
          <a href="https://www.google.com"><img src="/images/sns/auth_ic_google.png" /></a>
          <a href="https://www.kakaocorp.com/page/"><img src="/images/sns/auth_ic_kakao.png" /></a>
        </div>
      </div>

      <p className="signup-para">판다마켓이 처음이신가요?<Link className="signup-para-a" to="/signup">회원가입</Link></p>

      {showModal &&
        <LoginModal close={handleCloseModal} msg={"비밀번호가 일치하지 않습니다."} />
      }
    </main>
  );
}