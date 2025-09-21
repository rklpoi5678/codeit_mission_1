/**
 * 유효성 검사 부모 클래스
 * - 필드 검증 클래스 상속자 역활
 * - 기능: 에러 메시지 표시, 값가져오기
 */
class Validator {
  constructor($input, $error) {
    this.$input = $input;
    this.$error = $error;
  }

  get Value() {
    return this.$input.value.trim();
  }

  showError(message) {
    this.$error.textContent = message;
    this.$input.classList.add("input-error");
  }

  clearError() {
    this.$error.textContent = "";
    this.$input.classList.remove("input-error");
  }

  validate() {
    throw new Error("해당 코드는 하위 클래스에서 구현이 되어야 합니다");
  }
}

/**
 * 이메일 형식 검증
 * (부모 클래스의 Value로)공백 제거후 이메일 정규식으로 형식을 확인합니다.
 *
 * @class
 * @param {HTMLElement} $email
 * @param {HTMLElement} $emailError
 * @returns {Boolean}
 */
export class EmailValidator extends Validator {
  validate() {
    const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = this.Value;

    if (!value) {
      this.showError("이메일을 입력해주세요.");
      return false;
    }

    if (!EMAIL_REG.test(value)) {
      this.showError("잘못된 이메일 형식입니다.");
      return false;
    }

    this.clearError();
    return true;
  }
}

/**
 * 닉네임 검증
 * @param {HTMLElement} $nickname
 * @param {HTMLElement} $nicknameError
 * @param {Number} minLength(옵션)
 * @returns {Boolean}
 */
export class NicknameValidator extends Validator {
  constructor($input, $error, minLength = 2) {
    super($input, $error);
    this.minLength = minLength;
  }

  validate() {
    const value = this.Value;

    if (!value) {
      this.showError("닉네임을 입력해주세요.");
      return false;
    }

    if (value.length < this.minLength) {
      this.showError(`닉네임은 ${this.minLength}자 이상 입력해주세요.`);
      return false;
    }

    this.clearError();
    return true;
  }
}

/**
 * 패스워드 검증
 *
 * @param {HTMLElement} $pw
 * @param {HTMLElement} $pwError
 * @param {Number} minLength-(옵션)
 * @returns {Boolean}
 */
export class PasswordValidator extends Validator {
  constructor($input, $error, minLength = 8) {
    super($input, $error);
    this.minLength = minLength;
  }

  validate() {
    const value = this.Value;

    if (!value) {
      this.showError("비밀번호를 입력해주세요.");
      return false;
    }

    if (value.length < this.minLength) {
      this.showError(`비밀번호는 ${this.minLength}자 이상 입력해주세요.`);
      return false;
    }

    this.clearError();
    return true;
  }
}

/**
 *  패스워드 체커
 * @param {HTMLElement} $pwCheker
 * @param {HTMLElement} $pwChekerError
 * @param {HTMLElement} $pw
 * @returns {Boolean}
 */
export class PasswordCheckValidator extends Validator {
  constructor($input, $error, $compare) {
    super($input, $error);
    this.$compare = $compare;
  }

  validate() {
    const value = this.Value;
    const original = this.$compare.value.trim();

    if (!value) {
      this.showError("비밀번호를 입력해주세요.");
      return false;
    }

    if (value !== original) {
      this.showError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    this.clearError();
    return true;
  }
}
