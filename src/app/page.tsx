import { CountryList } from "@/components/CountryList";
import { Country } from "@/types/country";

export default async function Home() {
  const data = await fetch(
    "https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json"
  );
  const countries: Country[] = await data.json();

  return (
    <div className="flex my-10 flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Country List</h1>
      <CountryList countries={countries} />
    </div>
  );
}
