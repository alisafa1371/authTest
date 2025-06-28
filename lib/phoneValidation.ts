import { z } from "zod";

export const iranMobileSchema = z
  .string()
  .min(1, "شماره موبایل الزامی است")
  .regex(
    /((0?9)|(\+?989))\d{9}/g,
    "شماره موبایل معتبر ایران وارد کنید (مثال: 09123456789 یا 9123456789 یا 989123456789)"
  )
  .transform((val) => {
    //deleting not digits characters
    const digitsOnly = val.replace(/\D/g, "");

    //changing to international format
    if (digitsOnly.startsWith("98") && digitsOnly.length === 11) {
      return `+${digitsOnly}`;
    }
    if (digitsOnly.startsWith("0") && digitsOnly.length === 11) {
      return `+98${digitsOnly.slice(1)}`;
    }
    if (digitsOnly.length === 10) {
      return `+98${digitsOnly}`;
    }
    if (digitsOnly.startsWith("0098") && digitsOnly.length === 13) {
      return `+${digitsOnly.slice(2)}`;
    }

    return `+98${digitsOnly}`;
  });
