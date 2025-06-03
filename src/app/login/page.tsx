/** @format */

import AuthForm from "@/features/auth/ui/AuthForm";
import { getDictionary } from "@/shared/i18n/dictionary";
import type { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: dict.auth.loginTitle,
    description: dict.auth.loginDescription,
  };
}

export default function LoginPage() {
  return <AuthForm />;
}
