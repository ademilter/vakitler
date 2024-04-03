import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import SettingsLayout from "components/settings/layout";
import {
  Header,
  HeaderBackButton,
  HeaderContent,
  HeaderContentTitle,
  HeaderLeft,
} from "components/page-header";
import { LOCAL_KEYS } from "utils/const";

export default function Country() {
  const { t } = useTranslation("common");

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.FeedbackModal, JSON.stringify(false));
  }, []);

  return (
    <SettingsLayout>
      <Header className="mb-0">
        <HeaderLeft>
          <HeaderBackButton href="/settings" />
        </HeaderLeft>
        <HeaderContent>
          <HeaderContentTitle>{t("settings:feedbackTitle")}</HeaderContentTitle>
        </HeaderContent>
      </Header>

      <div className="relative p-4">
        <iframe
          className="bg-transparent border-none rounded-xl"
          src="https://airtable.com/embed/appXYoGXmgiZd5HqP/pagZy890atZvMkWu7/form"
          width="100%"
          height="800"
        />
      </div>
    </SettingsLayout>
  );
}
