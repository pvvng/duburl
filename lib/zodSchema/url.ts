import { z } from "zod";
import {
  NICKNAME_ERROR_MESSAGES,
  URL_ERROR_MESSAGES,
} from "../errorMessages/url";
import validator from "validator";
import { SITE_NAME } from "@/util/constants/sitename";

const trimUrl = (url: string) => (url.endsWith("/") ? url.slice(0, -1) : url);

export const urlSchema = z
  .string({
    required_error: URL_ERROR_MESSAGES.REQUIRED,
    invalid_type_error: URL_ERROR_MESSAGES.INVALID_TYPE,
  })
  .trim()
  .transform(trimUrl)
  .refine((url) => validator.isURL(url), URL_ERROR_MESSAGES.INVALID_URL)
  .refine(
    (url) => !url.includes(SITE_NAME),
    URL_ERROR_MESSAGES.CIRCULAR_CONVERT
  );

export const nicknameScehma = z
  .string({
    required_error: NICKNAME_ERROR_MESSAGES.REQUIRED,
    invalid_type_error: NICKNAME_ERROR_MESSAGES.INVALID_TYPE,
  })
  .trim()
  .min(0, NICKNAME_ERROR_MESSAGES.MIN_LENGTH(0))
  .max(20, NICKNAME_ERROR_MESSAGES.MAX_LENGTH(20));

export const memberUrlScema = z.object({
  url: urlSchema,
  nickname: nicknameScehma,
});
