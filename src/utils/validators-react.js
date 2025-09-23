const NICKNAME_MIN_LENGTH = 2;
const PASSWORD_MIN_LENGTH = 8;

export const EmailValidator = (input) => {
  const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input) {
    return "이메일을 입력해주세요.";
  }
  if (!EMAIL_REG.test(input)) {
    return "잘못된 이메일 형식입니다.";
  }
  return "";
};

export const NicknameValidator = (input) => {
  if (!input) return "닉네임을 입력해주세요.";
  if (input.length < NICKNAME_MIN_LENGTH)
    return `닉네임은 ${NICKNAME_MIN_LENGTH}자 이상 입력해주세요.`;
  return "";
};

export const PasswordValidator = (input) => {
  if (!input) {
    return "비밀번호를 입력해주세요.";
  } else if (input.length < PASSWORD_MIN_LENGTH) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`;
  }
  return "";
};

export const PasswordCheckValidator = (input, compare) => {
  if (!input) {
    return "비밀번호를 입력해주세요.";
  }
  if (input !== compare) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};
