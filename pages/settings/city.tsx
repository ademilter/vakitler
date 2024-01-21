import React, { useCallback, useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings/list";
import { ICity } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";
import SubPage from "@/components/layout/sub";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { settings, saveSettings, fetchData, setSettings } =
    useContext(CommonStoreContext);

  const [data, setData] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = useCallback(async () => {
    try {
      setLoading(true);

      const url = new URL("/api/cities", window.location.origin);
      url.searchParams.set("regionID", settings._region?.SehirID as string);

      const res = await fetch(url.toString());
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [settings._region?.SehirID]);

  useEffect(() => {
    if (!settings._region) return;
    fetchCities();
  }, [settings, fetchCities]);

  return (
    <SubPage>
      <Container className="pt-8 pb-40">
        <SettingsList
          loading={loading}
          inputProps={{
            placeholder: t("settings:searchCity"),
            name: "city",
          }}
          onChange={async id => {
            const city = data.find(o => o.IlceID === id) as ICity;

            setSettings({
              ...settings,
              country: settings._country,
              region: settings._region,
              city,
            });

            saveSettings({
              ...settings,
              country: settings._country,
              region: settings._region,
              city,
            });

            await fetchData(city.IlceID);
            await push(`/`);
          }}
          data={data.map(c => ({
            value: c.IlceID,
            label: c[t("cityKey") as keyof ICity],
          }))}
        >
          <div className="bg-blue-50 dark:bg-blue-500/20 dark:text-blue-300 text-blue-600 rounded-xl px-6 py-3 mb-4">
            <h4 className="font-semibold">{t("settings:cityAlertTitle")}</h4>
            <p>{t("settings:cityAlertDesc")}</p>
          </div>
        </SettingsList>
      </Container>
    </SubPage>
  );
}
