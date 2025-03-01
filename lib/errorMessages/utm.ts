export const UTM_COMMON_ERROR_MESSAGES = {
  REQUIRED: "필수 입력 항목입니다.",
  INVALID_TYPE: "올바른 타입이 아닙니다.",
  INVALID_CHAR: "특수문자, 공백은 사용할 수 없습니다.",
};

export const UTM_SOURCE_ERROR_MESSAGES = {
  MAX_LENGTH: (max = 15) => `홍보 경로의 최대 길이는 ${max} 입니다`,
};

export const UTM_MEDIUM_ERROR_MESSAGES = {
  MAX_LENGTH: (max = 20) => `유입 방식의 최대 길이는 ${max} 입니다`,
};

export const UTM_CAMPAIGN_ERROR_MESSAGES = {
  MAX_LENGTH: (max = 50) => `이름의 최대 길이는 ${max} 입니다`,
};
