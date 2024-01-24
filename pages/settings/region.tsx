import React, { useCallback, useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings/list";
import { IRegion } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";
import SettingsLayout from "@/components/settings/layout";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { settings, setSettings } = useContext(CommonStoreContext);

  const [data, setData] = useState<IRegion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRegionData = useCallback(async () => {
    try {
      setLoading(true);

      const url = new URL("/api/regions", window.location.origin);
      url.searchParams.set("countryID", settings._country?.UlkeID as string);

      const res = await fetch(url.toString());
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [settings._country?.UlkeID]);

  useEffect(() => {
    if (!settings._country) return;
    fetchRegionData();
  }, [settings, fetchRegionData]);

  return (
    <SettingsLayout>
      <Container className="pt-8 pb-40">
        <SettingsList
          inputProps={{
            placeholder: t("settings:searchRegion"),
            name: "region",
          }}
          pushFirst={["539", "506"]}
          onChange={id => {
            const region = data.find(o => o.SehirID === id);

            setSettings({
              ...settings,
              _region: region,
            });

            return push(`/settings/city`);
          }}
          loading={loading}
          data={data.map(c => ({
            value: c.SehirID,
            label: c[t("regionKey") as keyof IRegion],
          }))}
        />
      </Container>
    </SettingsLayout>
  );
}
