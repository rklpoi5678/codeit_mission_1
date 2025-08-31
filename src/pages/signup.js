import {
  EmailValidator,
  PasswordValidator,
  PasswordCheckValidator,
  NicknameValidator,
} from "../../src/utils/validators.js";
import modalShow from "./modal/LoginModal.js";
import USER_DATA from "../db.js";

document.addEventListener("DOMContentLoaded", () => {
  const $email = document.getElementById("email");
  const $emailError = document.getElementById("email-error");

  const $nickName = document.getElementById("nickname");
  const $nickNameError = document.getElementById("nickname-error");

  const $pw = document.getElementById("password");
  const $pwError = document.getElementById("pw-error");

  const $pwCheker = document.getElementById("pw-check");
  const $pwChekerError = document.getElementById("pw-check-error")

  const $submitBtn = document.getElementById("submit-btn");
  const $pwEyeBtn = document.querySelectorAll(".btn_visibility_icon");

  const $login = document.getElementById("login");

  // 클래스 객체 생성 
  const emailValidator = new EmailValidator($email, $emailError);
  const nicknameValidator = new NicknameValidator($nickName, $nickNameError);
  const pwValidator = new PasswordValidator($pw, $pwError);
  const pwChekerValidator = new PasswordCheckValidator($pwCheker, $pwChekerError, $pw);

  /**
   *     이메일-비밀번호 유효성 검사
   */
  function checkFormValid() {
    const isValid =
      emailValidator.validate() && nicknameValidator.validate() && pwValidator.validate() && pwChekerValidator.validate(); 
    $submitBtn.disabled = !isValid;
  }

  $email.addEventListener("focusout", () => {
    emailValidator.validate();
    checkFormValid();
  });

  $nickName.addEventListener("focusout", () => {
    nicknameValidator.validate(); 
    checkFormValid();
  });

  $pw.addEventListener("focusout", () => {
    pwValidator.validate();
    checkFormValid();
  });

  $pwCheker.addEventListener("focusout", () => {
    pwChekerValidator.validate();
    checkFormValid();
  });

  /**
   * 4. 제출후 페이지 이동
   *
   * @event submit
   * @param {SubmitEvent} e - 폼 제출 이벤트 객체
   *
   */
  $login.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = $email.value;
    const user = USER_DATA.find(
      (user) => user.email === email
    )
    // const authMessage = userSignupAuth(email);

    if (user) {
      modalShow("사용 중인 이메일입니다");
    } else {
      location.href = "/login.html";
    }
  });

  /**
   * 5. 비밀번호 표시 on/off
   */
  $pwEyeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrapper = btn.closest(".password-wrapper");
      const input = wrapper.querySelector("input");
      const icon = wrapper.querySelector("img");

      if (input.type === "password") {
        input.type = "text";
        icon.src = "../../public/images/btn_visibility_on.svg";
      } else {
        input.type = "password";
        icon.src = "../../public/images/btn_visibility_off.svg";
      }
    });
  });
});
