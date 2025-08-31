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

// /**
//  * 1.     검증 이메일
//  * 1-1.   공백  제거 포함 이메일 형식 검증 입력값을 검증하고 오류 메시지를 표시
//  * @returns {boolean}
//  */
// export function validateEmail() {
//   const value = $id.value.trim();
//   const isValid = EMAIL_REG.test(value);
//   if (isValid) {
//     $idError.textContent = "";
//     $id.classList.remove("input-error");
//     return true;
//   } else {
//     $idError.textContent = !value
//       ? ($idError.textContent = "이메일을 입력해주세요.")
//       : ($idError.textContent = "잘못된 이메일 형식입니다.");
//     $id.classList.toggle("input-error", !false);
//     return false;
//   }
// }

// /**
//  * 2.     공백 제거한 비밀번호를, 비밀 번호 길이 검증
//  * 2-1.   빈문자열 , 8자리이하 false리턴
//  * @returns {boolean}
//  */
// export function validatePassword() {
//   const value = $pw.value.trim();
//   const isValid = value.length >= PW_CHECK_LENGTH;
//   // console.log(isVaild)
//   if (isValid) {
//     $pwError.textContent = "";
//     $pw.classList.remove("input-error");
//     return true;
//   } else {
//     $pwError.textContent = !value
//       ? ($pwError.textContent = "비밀번호를 입력해주세요.")
//       : ($pwError.textContent = `비밀번호는 ${PW_CHECK_LENGTH}자 이상 입력해주세요.`);
//     $pw.classList.toggle("input-error", !false);
//     return false;
//   }
// }

// /**
//  * 3.     닉네임 검증
//  * @returns {boolean}
//  */
// export function validateNickName() {
//   const value = $nickName.value.trim();
//   const isValid = value.length >= MIN_NAME_LENGTH;
//   if (isValid) {
//     $nickNameError.textContent = "";
//     $nickName.classList.remove("input-error");
//     return true;
//   } else {
//     $nickNameError.textContent = !value
//       ? ($nickNameError.textContent = "닉네임을 입력해주세요.")
//       : ($nickNameError.textContent = `닉네임은 ${MIN_NAME_LENGTH}자 이상 입력해주세요.`);
//     $nickName.classList.toggle("input-error", !false);
//     return false;
//   }
// }

// /**
//  * 4.     검증 이메일
//  *        빈값일 경우, 현재 패스워드 비교
//  * @returns {boolean}
//  */
// export function validatePasswordCheker() {
//   const value = $pwCheker.value.trim();
//   const isValid = Boolean(value) && value === $pw.value.trim();
//   if (isValid) {
//     $pwChekerError.textContent = "";
//     $pwCheker.classList.remove("input-error");
//     return true;
//   } else {
//     $pwChekerError.textContent =
//       !value || isValid
//         ? ($pwChekerError.textContent = "비밀번호를 입력해주세요.")
//         : ($pwChekerError.textContent = `비밀번호가 일치하지 않습니다.`);
//     $pwCheker.classList.toggle("input-error", !false);
//     return false;
//   }
// }


/**
 * 1. validator공통 속성 (보여준다. 문제 없을때)
 */
class Validator {
  constructor(inputEl, errorEl) {
    this.inputEl = inputEl,
    this.errorEl = errorEl
  }

  get Value() {
    return this.inputEl.value.trim();
  }

  showError(message){
    this.errorEl.textContent = message;
    this.inputEl.classList.add("input-error");
  }
  
  clearError() {
    this.errorEl.textContent = "";
    this.inputEl.classList.remove("input-error");
  }

  validate() {
    throw new Error("validator() must be implemented by subclass");
  }
}

export class EmailValidator extends Validator {
  validate() {
    const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = this.Value;

    if(!value) {
      this.showError("이메일을 입력해주세요.");
      return false;
    }

    if(!EMAIL_REG.test(value)){
      this.showError("잘못된 이메일 형식입니다.");
      return false;
    }

    this.clearError();
    return true;
  }
}

export class PasswordValidator extends Validator {
  constructor(inputEl, errorEl, minLength = 8) {
    super(inputEl, errorEl);
    this.minLength = minLength;
  }

  validate() {
    const value = this.Value;

    if(!value) {
      this.showError("비밀번호를 입력해주세요.")
      return false;
    }

    if(value.length < this.minLength) {
      this.showError(`비밀번호는 ${this.minLength}자 이상 입력해주세요.`);
      return false;
    }

    this.clearError();
    return true;
  }
}

export class PasswordCheckValidator extends Validator {
  constructor(inputEl, errorEl, compareEl) {
    super(inputEl, errorEl);
    this.compareEl = compareEl;
  }

  validate() {
    const value = this.Value;
    const original = this.compareEl.value.trim();

    if(!value) {
      this.showError("비밀번호를 입력해주세요.");
      return false;
    }

    if(value !== original) {
      this.showError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    this.clearError();
    return true;
  }
}

export class NicknameValidator extends Validator {
  constructor(inputEl, errorEl, minLength = 2) {
    super(inputEl,errorEl);
    this.minLength = minLength;
  }

  validate() {
    const value = this.Value;

    if(!value) {
      this.showError("닉네임을 입력해주세요.");
      return false;
    }

    if(value.length < this.minLength) {
      this.showError(`닉네임은 ${this.minLength}자 이상 입력해주세요.`);
      return false;
    }

    this.clearError();
    return true;
  }
}