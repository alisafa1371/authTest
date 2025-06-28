"use client";
import React, { useCallback, useState } from "react";
import styles from "./page.module.scss";
import PhoneInput from "@/components/phone-input";
import LoginButton from "@/components/login-button";
import { useRouter } from "next/navigation";
import { iranMobileSchema } from "@/lib/phoneValidation";
import { safeParse } from "zod/v4-mini";
import { useUser } from "@/context/user-context";

function page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    try {
      setIsLoading(true);
      setError("");

      //getting validation result from zod schema
      const validationResult = iranMobileSchema.safeParse(phoneNumber);

      if (!validationResult.success) {
        setError(validationResult.error.errors[0].message);
        return;
      }

      //login
      await login(validationResult.data);
      router.push("/dashboard");
    } catch (e) {
      clearTimeout(timeoutId);

      if (e === "AbortError") {
        setError("Request timed out");
      } else {
        setError(`${e}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber]);

  return (
    <div className={styles.authPage}>
      <main className={styles.main}>
        <div className={styles["login-card"]}>
          <div className={styles["login-card__header"]}>
            <h2>Login page</h2>
            <p>Please enter your credentials to login</p>
          </div>

          <div className={styles["login-card__body"]}>
            <PhoneInput onChange={setPhoneNumber} value={phoneNumber} />
            <LoginButton
              onClick={handleLogin}
              disabled={isLoading || !phoneNumber}
              loading={isLoading}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
