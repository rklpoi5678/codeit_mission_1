import modalShow from "../src/modal/LoginModal.js";
import {
  validateEmail,
  validateNickName,
  validatePassword,
  validatePasswordCheker,
} from "../src/utils/validators.js";
import { USER_DATA } from "../src/db.js";

const $email = document.getElementById("email");
const $nickName = document.getElementById("nickname");
const $pw = document.getElementById("password");
const $pwCheker = document.getElementById("pw-check");
const $submitBtn = document.getElementById("submit-btn");
const $pwEyeBtn = document.querySelectorAll(".btn_visibility_icon");
const $login = document.getElementById("login");

function checkEmail() {
  const isPass = validateEmail();
  return isPass;
}

function checkName() {
  const isPass = validateNickName();
  return isPass;
}

function checkPassword() {
  const isPass = validatePassword();
  return isPass;
}

function checkPasswordCheker() {
  const isPass = validatePasswordCheker();
  return isPass;
}

/**
 * 3.    이메일-비밀번호 유효성 검사
 * 3-3.  로그인 버튼 활성화 여부
 */
function checkFormValid() {
  const isValid =
    checkEmail() && checkName() && checkPassword() && checkPasswordCheker();
  // !true로 토글
  $submitBtn.disabled = !isValid;
}

function userSignupAuth(email) {
  const user = USER_DATA.find((user) => user.email === email);
  if (user) return "사용 중인 이메일입니다";
  return "";
}

// 이벤트리스너 등록 - 이벤트 발생시 호출
$email.addEventListener("focusout", () => {
  checkEmail();
  checkFormValid();
});

$nickName.addEventListener("focusout", () => {
  checkName();
  checkFormValid();
});

$pw.addEventListener("focusout", () => {
  checkPassword();
  checkFormValid();
});

$pwCheker.addEventListener("focusout", () => {
  checkPasswordCheker();
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

  const authMessage = userSignupAuth(email);

  if (authMessage) {
    modalShow(authMessage);
  } else {
    location.href = "/login";
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
      icon.src = "./public/images/btn_visibility_on.svg";
    } else {
      input.type = "password";
      icon.src = "./public/images/btn_visibility_off.svg";
    }
  });
});
