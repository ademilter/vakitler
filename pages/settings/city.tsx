import { useCallback, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings-list";
import { ICity } from "@/lib/types";
import { useRouter } from "next/router";
import { useStore, useCommonStoreActions } from "@/stores";
import useFetchData from "@/hooks/use-fetch-data";

import SubPage from "@/components/layout/sub";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { setSettings } = useCommonStoreActions();
  const { _settings, settings } = useStore();

  const [fetchData] = useFetchData();

  const [data, setData] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = useCallback(async () => {
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
    fetchCities();
  }, [_settings, fetchCities]);

  return (
    <SubPage>
      <Container className="pt-8 pb-40">
        <SettingsList
          inputProps={{
            placeholder: t("settings:searchCity"),
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
          loading={loading}
          data={data.map(c => ({
            value: c.IlceID,
            label: c[t("cityKey") as keyof ICity],
          }))}
        />
      </Container>
    </SubPage>
  );
}
