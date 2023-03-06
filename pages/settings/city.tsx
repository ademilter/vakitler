import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings-list";
import { ICity, IRegion } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { cityKey, changeSettings, _settings } = useContext(CommonStoreContext);

  const [data, setData] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData1 = async () => {
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
  };

  useEffect(() => {
    if (!_settings.region) return;
    fetchData1();
  }, [_settings]);

  return (
    <Container className="py-10">
      {data.length > 0 && (
        <SettingsList
          searchPlaceholder={t("settings.searchCity")}
          onChange={async id => {
            const city = data.find(o => o.IlceID === id) as ICity;

            await changeSettings({
              ..._settings,
              city,
            });

            await push(`/`);
          }}
          data={data.map(c => ({
            value: c.IlceID,
            label: c[cityKey],
          }))}
        />
      )}
    </Container>
  );
}
