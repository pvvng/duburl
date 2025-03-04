export const URL_ERROR_MESSAGES = {
  REQUIRED: "필수 입력 항목입니다.",
  INVALID_TYPE: "올바른 타입이 아닙니다.",
  INVALID_URL: "올바른 URL 형식이 아닙니다.",
} as const;

export const NICKNAME_ERROR_MESSAGES = {
  REQUIRED: "필수 입력 항목입니다.",
  INVALID_TYPE: "올바른 타입이 아닙니다.",
  INVALID_NICKNAME: "올바른 별명 형식이 아닙니다.",
  MIN_LENGTH: (min = 0) => `별명의 최소 길이는 ${min} 입니다`,
  MAX_LENGTH: (max = 15) => `별명의 최대 길이는 ${max} 입니다`,
} as const;
