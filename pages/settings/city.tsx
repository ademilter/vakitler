import React, { useCallback, useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings-list";
import { ICity } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { _settings, fetchData, setSettings, settings } =
    useContext(CommonStoreContext);

  const [data, setData] = useState<ICity[]>([]);
  const [_, setLoading] = useState(false);

  const fetchCityData = useCallback(async () => {
    try {
      setLoading(true);

      const url = new URL("/api/cities", window.location.origin);
      url.searchParams.set("regionID", _settings.region?.SehirID as string);

      const res = await fetch(url.toString());
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [_settings.region?.SehirID]);

  useEffect(() => {
    if (!_settings.region) return;
    fetchCityData();
  }, [_settings, fetchCityData]);

  return (
    <Container className="py-6">
      {data.length > 0 && (
        <SettingsList
          inputProps={{
            placeholder: t("settingsSearchCity"),
            name: "city",
          }}
          onChange={async id => {
            const city = data.find(o => o.IlceID === id) as ICity;

            setSettings({
              ...settings,
              country: _settings.country,
              region: _settings.region,
              city,
            });

            await fetchData(city.IlceID);
            await push(`/`);
          }}
          data={data.map(c => ({
            value: c.IlceID,
            label: c[t("settingsCityKey") as keyof ICity],
          }))}
        />
      )}
    </Container>
  );
}
