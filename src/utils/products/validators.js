const NAME_MIN_LEN = 1; 
const NAME_MAX_LEN = 10; 
const DESCRIBE_MIN_LEN = 10; 
const DESCRIBE_MAX_LEN = 100; 
const TAG_MAX_LEN = 5; 

export const productNameValidate = (input) => {
  if (!input) return "상품명을 입력해주세요"; 
  if (input.length < NAME_MIN_LEN) return "1자 이상 입력해주세요";
  if (input.length > NAME_MAX_LEN) return "10자 이내로 입력해주세요";
  return "";
};

export const productDescribeValidate = (input) => {
  if (!input) return "상품소개을 입력해주세요"; 
  if (input.length < DESCRIBE_MIN_LEN)  return "10자 이상 입력해주세요";
  if (input.length > DESCRIBE_MAX_LEN)  return "100자 이내로 입력해주세요";
  return "";
};

export const productPriceValidate = (input) => {
  if (!input) return "판매가격을 입력해주세요"; 
  const value = parseInt(input); // number로 형타입 변경 가능
  if (Number.isNaN(value)) return "숫자를 입력해주세요";
  return "";
};

export const productTagValidate = (input) => {
  if (!input) return "태그를 입력해주세요"; 
  if (input.length > TAG_MAX_LEN) return "5글자 이내로 입력해주세요";
  return "";
};