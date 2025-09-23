import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginModal } from '@/components/Modal/LoginModal';
import { AuthTitle } from './components/AuthTitle';
import { EmailValidator, NicknameValidator, PasswordValidator, PasswordCheckValidator } from '@/utils/validators-react';
import USER_DATA from '@/db';
import './login.css';

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nickName, setNickName] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordChecker, setPasswordChecker] = useState('');
  const [passwordCheckerError, setPasswordCheckerError] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckerVisible, setPasswordCheckerVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleEmailValueChange = (e) => {
    setEmail(e.target.value.trim());
    setEmailError(EmailValidator(email));
  };

  const handleNicknameValueChange = (e) => {
    setNickName(e.target.value.trim());
    setNicknameError(NicknameValidator(nickName));
  };

  const handlePasswordValueChange = (e) => {
    setPassword(e.target.value.trim());
    setPasswordError(PasswordValidator(password));
  };

  const handlePasswordCheckvalueChange = (e) => {
    setPasswordChecker(e.target.value.trim());
    setPasswordCheckerError(PasswordCheckValidator(passwordChecker, password));
  };

  const handlepasswordCheckFouseOut = () => {
    setPasswordCheckerError(PasswordCheckValidator(passwordChecker, password));
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordCheckerVisible = () => {
    setPasswordCheckerVisible(!passwordCheckerVisible);
  };

  const handleFormEvent = (e) => {
    e.preventDefault();

    if (emailError || nicknameError || passwordError || passwordCheckerError) {
      alert("입력값을 확인해주세요.");
      return;
    }

    const user = USER_DATA.find((u) => u.email === email);

    if (user) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      <AuthTitle />

      <form id="login" method="POST" onSubmit={handleFormEvent} action="/items" autoComplete="off">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleEmailValueChange}
          placeholder="이메일을 입력해주세요"
          aria-label="이메일을 입력해주세요"
          required
        />
        {emailError &&
          <span id="email-error" className="error">{emailError}</span>
        }
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          onChange={handleNicknameValueChange}
          placeholder="닉네임을 입력해주세요"
          aria-label="닉네임을 입력해주세요"
          required
        />
        {nicknameError &&
          <span id="nickname-error" className="error">{nicknameError}</span>
        }

        <label htmlFor="password">비밀번호</label>
        <div className="password-wrapper">
          <input
            id="password"
            className="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            onChange={handlePasswordValueChange}
            placeholder="비밀번호를 입력해주세요"
            aria-label="비밀번호를 입력해주세요"
            required
          />
          <img className="btn_visibility_icon"
            src={passwordVisible ? "/images/btn_visibility_on.svg" : "/images/btn_visibility_off.svg"}
            alt="비밀번호 표시"
            onClick={handlePasswordVisible}
          />
          {passwordError &&
            <span id="pw-error" className="error">{passwordError}</span>
          }
        </div>

        <label htmlFor="pw-check">비밀번호 확인</label>
        <div className="password-wrapper">
          <input
            id="pw-check"
            className="password"
            name="passwordConfirm"
            type={passwordCheckerVisible ? "text" : "password"}
            onChange={handlePasswordCheckvalueChange}
            onFocus={handlepasswordCheckFouseOut}
            placeholder="비밀번호를 입력해주세요"
            aria-label="비밀번호를 입력해주세요"
            required
          />
          <img
            className="btn_visibility_icon"
            src={passwordCheckerVisible ? "/images/btn_visibility_on.svg" : "/images/btn_visibility_off.svg"}
            alt="비밀번호 표시"
            onClick={handlePasswordCheckerVisible}
          />
          {passwordCheckerError &&
            <span id="pw-check-error" className="error">{passwordCheckerError}</span>
          }
        </div>

        {/* <!--조건에 맞지 않으면 비활성화--> */}
        <button id="submit-btn" type="submit" >로그인</button>
      </form>

      <div className="third-party-auth">
        <p>간편 로그인하기</p>
        <div className="third-party-auth-imgs">
          <a href="https://www.google.com"><img src="/images/sns/auth_ic_google.png" alt="구글 계정을 사용하여 회원가입" /></a>
          <a href="https://www.kakaocorp.com/page/"><img src="/images/sns/auth_ic_kakao.png" alt="카카오 계정을 사용하여 회원가입" /></a>
        </div>
      </div>

      <p className="signup-para">이미 회원이신가요?<Link className='signup-para-a' to="/login">로그인</Link></p>
      {showModal &&
        <LoginModal close={handleCloseModal} msg={"사용 중인 이메일입니다."} />
      }
    </main>
  );
}