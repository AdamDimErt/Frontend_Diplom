/** @format */

"use client";

import { useAuthUser } from "@/features/auth/model/useAuthUser";
import { useTranslations } from "next-intl";
import { Profile } from "@/features/profile/ui/Profile";
import Link from "next/link";

export const AuthHeaderNav = () => {
  const { user, isLoading } = useAuthUser();
  const t = useTranslations("header");

  if (isLoading) return <span>{t("loading")}</span>;
  if (user) return <Profile />;

  return (
    <Link href='/login' className='text-sm underline'>
      {t("signIn")}
    </Link>
  );
};
