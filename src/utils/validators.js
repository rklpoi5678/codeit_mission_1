
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