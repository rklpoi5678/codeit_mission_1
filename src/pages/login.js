import modalShow from "./modal/LoginModal.js";
import USER_DATA from "../db.js";
import { EmailValidator, PasswordValidator } from "../utils/validators.js";

// DOM이 로드시(방어코드)
document.addEventListener("DOMContentLoaded", () => {
  const $email = document.getElementById("email");

  const $emailError = document.getElementById("emailError");
  const $pw = document.getElementById("password");
  const $pwError = document.getElementById("pwError");

  const $submitBtn = document.getElementById("submit-btn");
  const $login = document.getElementById("login");
  const $pwEyeBtn = document.querySelectorAll(".btn_visibility_icon");

  // 클래스 객체 생성 
  const emailValidator = new EmailValidator($email, $emailError);
  const pwValidator = new PasswordValidator($pw, $pwError);

  /**
   * 3.    이메일-비밀번호 유효성 검사
   */
  function checkFormValid() {
    const isValid = emailValidator.validate() && pwValidator.validate();
    $submitBtn.disabled = !isValid;
  }

  $email.addEventListener("focusout", () => {
    emailValidator.validate();
    checkFormValid();
  });

  $pw.addEventListener("focusout", () => {
    pwValidator.validate();
    checkFormValid();
  });

  // form submit
  $login.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $email.value.trim();
    const password = $pw.value.trim();

    const user = USER_DATA.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      modalShow("비밀번호가 일치하지 않습니다.");
    } else {
      location.href = "/items";
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
