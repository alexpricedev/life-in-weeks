import { useCallback, useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import classnames from "classnames";
import chroma from "chroma-js";
import { differenceInWeeks } from "date-fns";

import {
  ACTIVE_THEME,
  BIRTHDATE_KEY,
  Nav,
  TODAY,
  YEARS,
} from "../components/Nav";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "../styles/Home.module.css";

const TOTAL_FADE_TIME = 2.5; // 2 seconds
const FADE_DELAY = TOTAL_FADE_TIME / YEARS; // Used to fade in each of the cells

const YEARS_ARR = Array(YEARS).fill("");
const WEEKS_IN_YEAR = 52;
const WEEKS_IN_YEAR_ARR = Array(WEEKS_IN_YEAR).fill("");
const WEEKS_IN_LIFE = YEARS * WEEKS_IN_YEAR;

const COLOUR_SCALE = chroma.scale(ACTIVE_THEME).domain([0, WEEKS_IN_YEAR]);

// TODO:
//    FAB
//    Theme picker
//    Date picker
//    Deploy ✅
//    set life expectancy
//    number/number tooltips
//    Animate in all of the squares ✅

const Home: NextPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const [{ birthDate, isForward }, setBirthDateState] = useState({
    birthDate: new Date("1992-12-16T00:00:00"),
    isForward: true,
  });
  const delta = differenceInWeeks(TODAY, birthDate);

  // Helper for setting the birth date
  const setBirthDate = useCallback(
    (d: Date) => {
      setBirthDateState({ birthDate: d, isForward: d <= birthDate });
    },
    [birthDate, setBirthDateState]
  );

  // Grab the saved birth date from local storage
  useEffect(() => {
    if (!isLoaded) {
      const birthDateStore = localStorage.getItem(BIRTHDATE_KEY);
      if (birthDateStore) {
        setBirthDate(new Date(birthDateStore));
      }

      // Start the render of all of the cells
      setTimeout(() => {
        setIsLoaded(true);
      }, 250);
    }
  }, [setIsLoaded, isLoaded, setBirthDate]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Life in weeks</title>
        <meta name="description" content="Your life in weeks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.life}>
          {YEARS_ARR.map((_, yearIdx) => {
            const background = COLOUR_SCALE(yearIdx).css();
            const borderColor = chroma(background).darken(0.1).css();

            const transitionDelay = isForward
              ? `${yearIdx * FADE_DELAY}s`
              : `${TOTAL_FADE_TIME - yearIdx * FADE_DELAY}s`;

            return (
              <div key={yearIdx} className={styles.year}>
                {WEEKS_IN_YEAR_ARR.map((_, weekIdx) => {
                  const weekOfLife = yearIdx * WEEKS_IN_YEAR + (weekIdx + 1);
                  const isPast = weekOfLife < delta && isLoaded;

                  return (
                    <div
                      key={weekOfLife}
                      className={styles.week}
                      style={{
                        background,
                        borderColor,
                        opacity: isPast ? 1 : 0.8,
                        transitionDelay,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </section>
        <Nav
          birthDate={birthDate}
          isNavVisible={isNavVisible}
          setBirthDate={setBirthDate}
          setIsNavVisible={setIsNavVisible}
        />
      </main>
    </div>
  );
};

export default Home;
