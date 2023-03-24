import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings-list";
import { ICountry } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";
import SubPage from "@/components/layout/sub";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { _settings, _setSettings } = useContext(CommonStoreContext);

  const [data, setData] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCountries = async () => {
    try {
      setLoading(true);

      const url = new URL("/api/countries", window.location.origin);

      const res = await fetch(url.toString());
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <SubPage>
      <Container className="py-8">
        <SettingsList
          inputProps={{
            placeholder: t("settingsSearchCountry"),
            name: "country",
          }}
          // Populer Country (vercel analytics)
          // 2 = Türkiye,
          // 13 = Almanya,
          // 33 = ABD,
          // 4 = Hollanda,
          // 39 = Polonya,
          // 15 = İngiltere
          // 11 = Belçika
          // 36 = Norveç
          // 52 = Canada
          pushFirst={["2", "13", "33", "4", "39", "15", "11", "36", "52"]}
          onChange={id => {
            const country = data.find(c => c.UlkeID === id);
            _setSettings({ ..._settings, country });
            push(`/settings/region`);
          }}
          data={data.map(c => ({
            value: c.UlkeID,
            label: c[t("settingsCountryKey") as keyof ICountry],
          }))}
          loading={loading}
          backButtonProps={{
            hidden: true,
          }}
        />
      </Container>
    </SubPage>
  );
}
