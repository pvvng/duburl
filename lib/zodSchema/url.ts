import { z } from "zod";
import { URL_ERROR_MESSAGES } from "../errorMessages/url";
import validator from "validator";

const trimUrl = (url: string) => (url.endsWith("/") ? url.slice(0, -1) : url);

export const urlSchema = z
  .string({
    required_error: URL_ERROR_MESSAGES.REQUIRED,
    invalid_type_error: URL_ERROR_MESSAGES.INVALID_TYPE,
  })
  .trim()
  .transform(trimUrl)
  .refine((url) => validator.isURL(url), URL_ERROR_MESSAGES.INVALID_URL);
