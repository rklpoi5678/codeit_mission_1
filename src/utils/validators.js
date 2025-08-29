const $id = document.getElementById("email");
const $idError = document.getElementById("emailError");

const $pw = document.getElementById("password");
const $pwError = document.getElementById("pwError");

const $pwCheker = document.getElementById("pw-check");
const $pwChekerError = document.getElementById("pwErrorCheck");

const $nickName = document.getElementById("nickname");
const $nickNameError = document.getElementById("nickNameError");

const PW_CHECK_LENGTH = 8;
const MIN_NAME_LENGTH = 2;

const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 1.     검증 이메일
 * 1-1.   공백  제거 포함 이메일 형식 검증 입력값을 검증하고 오류 메시지를 표시
 * @returns {boolean}
 */
export function validateEmail() {
  const value = $id.value.trim();
  const isValid = EMAIL_REG.test(value);
  if (isValid) {
    $idError.textContent = "";
    $id.classList.remove("input-error");
    return true;
  } else {
    $idError.textContent = !value
      ? ($idError.textContent = "이메일을 입력해주세요.")
      : ($idError.textContent = "잘못된 이메일 형식입니다.");
    $id.classList.toggle("input-error", !false);
    return false;
  }
}

/**
 * 2.     공백 제거한 비밀번호를, 비밀 번호 길이 검증
 * 2-1.   빈문자열 , 8자리이하 false리턴
 * @returns {boolean}
 */
export function validatePassword() {
  const value = $pw.value.trim();
  const isValid = value.length >= PW_CHECK_LENGTH;
  // console.log(isVaild)
  if (isValid) {
    $pwError.textContent = "";
    $pw.classList.remove("input-error");
    return true;
  } else {
    $pwError.textContent = !value
      ? ($pwError.textContent = "비밀번호를 입력해주세요.")
      : ($pwError.textContent = `비밀번호는 ${PW_CHECK_LENGTH}자 이상 입력해주세요.`);
    $pw.classList.toggle("input-error", !false);
    return false;
  }
}

/**
 * 3.     닉네임 검증
 * @returns {boolean}
 */
export function validateNickName() {
  const value = $nickName.value.trim();
  const isValid = value.length >= MIN_NAME_LENGTH;
  if (isValid) {
    $nickNameError.textContent = "";
    $nickName.classList.remove("input-error");
    return true;
  } else {
    $nickNameError.textContent = !value
      ? ($nickNameError.textContent = "닉네임을 입력해주세요.")
      : ($nickNameError.textContent = `닉네임을 ${MIN_NAME_LENGTH}자 이상 입력해주세요.`);
    $nickName.classList.toggle("input-error", !false);
    return false;
  }
}

/**
 * 4.     검증 이메일
 *        빈값일 경우, 현재 패스워드 비교
 * @returns {boolean}
 */
export function validatePasswordCheker() {
  const value = $pwCheker.value.trim();
  const isValid = Boolean(value) && value === $pw.value.trim();
  console.log(value);
  console.log($pw.value.trim());
  if (isValid) {
    console.log(isValid);
    $pwChekerError.textContent = "";
    $pwCheker.classList.remove("input-error");
    return true;
  } else {
    $pwChekerError.textContent =
      !value || isValid
        ? ($pwChekerError.textContent = "비밀번호를 입력해주세요.")
        : ($pwChekerError.textContent = `비밀번호가 일치하지 않습니다.`);
    $pwCheker.classList.toggle("input-error", !false);
    return false;
  }
}

// TODO: 클래스를 사용하여 리펙토링