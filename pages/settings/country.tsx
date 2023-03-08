import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings-list";
import { ICountry } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { countryKey, _settings, _setSettings } =
    useContext(CommonStoreContext);

  const [data, setData] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const url = new URL("/api/countries", window.location.origin);

      const res = await fetch(url.toString());
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="py-10">
      <SettingsList
        inputProps={{
          placeholder: t("settingsSearchCountry"),
          name: "country",
        }}
        pushFirst={["2", "13", "4", "35", "15", "21"]}
        onChange={id => {
          const country = data.find(c => c.UlkeID === id);
          _setSettings({ ..._settings, country });
          push(`/settings/region`);
        }}
        data={data.map(c => ({
          value: c.UlkeID,
          label: c[countryKey],
        }))}
      />
    </Container>
  );
}
