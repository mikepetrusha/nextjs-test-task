"use client";

import { Country } from "@/types/country";
import ImageWithFallback from "./ImageWithFallback";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";

export const CountryList = ({ countries }: { countries: Country[] }) => {
  const [currentCountries, setCurrentCountries] = useState(() => countries);

  const handleDeleteCountry = (isoCode3: string) => {
    setCurrentCountries((prevCountries) =>
      prevCountries.filter((country) => country.iso_code3 !== isoCode3)
    );
  };

  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {currentCountries.map((country) => (
          <motion.li
            initial={{ height: 0, opacity: 0, x: -200 }}
            animate={{ height: "auto", opacity: 1, x: 0 }}
            exit={{ height: 0, opacity: 0, x: 200 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-between"
            key={country.iso_code3}
          >
            <motion.div
              className={clsx([
                "flex items-center justify-between",
                "px-4 py-2 w-full rounded-xl",
                "bg-neutral-50 border border-gray-300",
              ])}
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.98,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.98,
                filter: "blur(4px)",
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2">
                <ImageWithFallback
                  src={`https:${country.flag_url}`}
                  fallbackSrc="https://static.wikia.nocookie.net/kongregate/images/9/96/Unknown_flag.png/revision/latest?cb=20100825093317"
                  width={22}
                  height={15}
                  alt={country.name_ru}
                />
                <span>{country.name_ru}</span>
              </div>

              <Button onClick={() => handleDeleteCountry(country.iso_code3)}>
                Delete
              </Button>
            </motion.div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
