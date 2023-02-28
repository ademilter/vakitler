"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Country = { code: string; name: string };
type Region = string;
type City = string;

export default function Settings() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const selectDefaultValue = "-";

  const [country, setCountry] = useState(selectDefaultValue);
  const [region, setRegion] = useState(selectDefaultValue);
  const [city, setCity] = useState(selectDefaultValue);

  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const fetchCountries = async () => {
    const res = await fetch("https://namaz-vakti.vercel.app/api/countries");
    const data = await res.json();

    if (data.error) return;
    setCountries(data);

    const item = searchParams?.get("country");
    const findItem = data.find((c: Country) => c.name === item);
    if (findItem) {
      setCountry(findItem.name);
    }
  };

  const fetchRegions = async () => {
    const res = await fetch(
      `https://namaz-vakti.vercel.app/api/regions?country=${country}`
    );
    const data = await res.json();

    if (data.error) return;
    setRegions(data);

    const item = searchParams?.get("region");
    const findItem = data.find((c: string) => c === item);
    if (findItem) {
      setRegion(findItem);
    }
  };

  const fetchCities = async () => {
    const res = await fetch(
      `https://namaz-vakti.vercel.app/api/cities?country=${country}&region=${region}`
    );
    const data = await res.json();

    if (data.error) return;
    setCities(data);

    const item = searchParams?.get("city");
    const findItem = data.find((c: string) => c === item);
    if (findItem) {
      setCity(findItem);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country === selectDefaultValue) return;
    fetchRegions();
  }, [country]);

  useEffect(() => {
    if (region === selectDefaultValue) return;
    fetchCities();
  }, [region]);

  return (
    <div className="fixed inset-x-0 top-0 grid place-items-center space-y-4 py-10">
      <select
        className="w-64 rounded-md border border-gray-300 p-2"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setRegion(selectDefaultValue);
            setCity(selectDefaultValue);
        }}
      >
        <option disabled value={selectDefaultValue}>
          {selectDefaultValue}
        </option>
        {countries.map((c) => (
          <option key={c.code} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="w-64 rounded-md border border-gray-300 p-2"
        value={region}
        onChange={(e) => {
          setRegion(e.target.value);
            setCity(selectDefaultValue);
        }}
      >
        <option disabled value={selectDefaultValue}>
          {selectDefaultValue}
        </option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        className="w-64 rounded-md border border-gray-300 p-2"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      >
        <option disabled value={selectDefaultValue}>
          {selectDefaultValue}
        </option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="w-64 rounded-md border border-gray-300 p-2 disabled:opacity-50"
        disabled={
          country === selectDefaultValue ||
          region === selectDefaultValue ||
          city === selectDefaultValue
        }
        onClick={() => {
          push(`/?country=${country}&region=${region}&city=${city}`);
        }}
      >
        Kaydet
      </button>
    </div>
  );
}
