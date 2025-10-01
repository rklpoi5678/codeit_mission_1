const NAME_MIN_LEN = 1;
const NAME_MAX_LEN = 30;
const DESCRIBE_MIN_LEN = 10;
const DESCRIBE_MAX_LEN = 100;

export const articleNameValidate = (input) => {
  if (!input) return "제목을 입력해주세요";
  if (input.length < NAME_MIN_LEN) return "1자 이상 입력해주세요";
  if (input.length > NAME_MAX_LEN) return "30자 이내로 입력해주세요";
  return "";
};

export const articleDescribeValidate = (input) => {
  if (!input) return "내용을 입력해주세요";
  if (input.length < DESCRIBE_MIN_LEN) return "최소 10자 이상 입력해주세요";
  if (input.length > DESCRIBE_MAX_LEN) return "최대 100자 이내로 입력해주세요";
  return "";
};

export const articleImagesValidate = (input) => {
  if (!input) return "판매가격을 입력해주세요";
  const value = parseInt(input); // number로 형타입 변경 가능
  if (Number.isNaN(value)) return "숫자를 입력해주세요";
  return "";
};
