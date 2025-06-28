"use client";
import styles from "./page.module.scss";
import { useUser } from "@/context/user-context";

import { useAuth } from "@/hooks/useAuth";

function page() {
  const { logout } = useUser();
  const { user } = useAuth(true);

  if (!user) return;

  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>
        <div className={styles["dashboard__userCard"]}>
          {user && (
            <h2>
              Hello {user?.name?.title} {user?.name?.first} {user?.name?.last}
            </h2>
          )}
          <button onClick={logout}>Logout</button>
        </div>
      </main>
    </div>
  );
}

export default page;
