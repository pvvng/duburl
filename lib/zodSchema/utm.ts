import {
  UTM_CAMPAIGN_ERROR_MESSAGES,
  UTM_COMMON_ERROR_MESSAGES,
  UTM_MEDIUM_ERROR_MESSAGES,
  UTM_SOURCE_ERROR_MESSAGES,
} from "@/lib/errorMessages/utm";
import { z } from "zod";

const regex = /^[a-zA-Z0-9_-]+$/;

export const utmSchema = z.object({
  utm_source: z
    .string({
      required_error: UTM_COMMON_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: UTM_COMMON_ERROR_MESSAGES.INVALID_TYPE,
    })
    .max(15, UTM_SOURCE_ERROR_MESSAGES.MAX_LENGTH(15))
    .regex(regex, UTM_COMMON_ERROR_MESSAGES.INVALID_CHAR)
    .trim(),
  utm_medium: z
    .string({
      required_error: UTM_COMMON_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: UTM_COMMON_ERROR_MESSAGES.INVALID_TYPE,
    })
    .max(20, UTM_MEDIUM_ERROR_MESSAGES.MAX_LENGTH(20))
    .regex(regex, UTM_COMMON_ERROR_MESSAGES.INVALID_CHAR)
    .trim(),
  utm_campaign: z
    .string({
      required_error: UTM_COMMON_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: UTM_COMMON_ERROR_MESSAGES.INVALID_TYPE,
    })
    .max(50, UTM_CAMPAIGN_ERROR_MESSAGES.MAX_LENGTH(50))
    .regex(regex, UTM_COMMON_ERROR_MESSAGES.INVALID_CHAR)
    .trim(),
  utm_term: z
    .string({
      required_error: UTM_COMMON_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: UTM_COMMON_ERROR_MESSAGES.INVALID_TYPE,
    })
    .trim()
    .refine(
      (value) => value === "" || regex.test(value),
      UTM_COMMON_ERROR_MESSAGES.INVALID_CHAR
    ),
  utm_content: z
    .string({
      required_error: UTM_COMMON_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: UTM_COMMON_ERROR_MESSAGES.INVALID_TYPE,
    })
    .trim()
    .refine(
      (value) => value === "" || regex.test(value),
      UTM_COMMON_ERROR_MESSAGES.INVALID_CHAR
    ),
});
