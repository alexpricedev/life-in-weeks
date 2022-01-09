import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import classnames from "classnames";
import chroma from "chroma-js";
import { differenceInWeeks } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "../styles/Home.module.css";
import { BIRTHDATE_KEY, Nav, TODAY } from "../components/Nav";

const YEARS = 80;
const YEARS_ARR = Array(YEARS).fill("");
const WEEKS_IN_YEAR = 52;
const WEEKS_IN_YEAR_ARR = Array(WEEKS_IN_YEAR).fill("");
const WEEKS_IN_LIFE = YEARS * WEEKS_IN_YEAR;

const THEME_1 = ["#43cea2", "#185a9d"]; // Endless River
const THEME_2 = ["#c33764", "#1d2671"]; // Celestial
const THEME_3 = ["#ff7e5f", "#feb47b"]; // Sunset
const THEME_4 = ["#bdc3c7", "#2c3e50"]; // Shades of grey
const ACTIVE_THEME = THEME_2;
const COLOUR_SCALE = chroma.scale(ACTIVE_THEME).domain([0, WEEKS_IN_LIFE]);

// TODO:
//    FAB
//    Theme picker
//    Date picker
//    Deploy
//    number/number tooltips
//    Do I still need react-use?

const Home: NextPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const [birthDate, setBirthDate] = useState(new Date("1992-12-16T00:00:00"));
  const delta = differenceInWeeks(TODAY, birthDate);

  // Grab the saved birth date from local storage
  useEffect(() => {
    const birthDateStore = localStorage.getItem(BIRTHDATE_KEY);
    if (birthDateStore) {
      setBirthDate(new Date(birthDateStore));
    }
    setTimeout(() => {
      setIsNavVisible(true);
    }, 500);
  }, [setBirthDate]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Life in weeks</title>
        <meta name="description" content="Your life in weeks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.life}>
          {YEARS_ARR.map((_, i) => (
            <div key={i} className={styles.year}>
              {WEEKS_IN_YEAR_ARR.map((_, j) => {
                const weekOfLife = i * 52 + (j + 1);
                const isPast = weekOfLife < delta;
                const cls = classnames([
                  styles.week,
                  isPast ? styles.past : null,
                ]);
                const background = COLOUR_SCALE(weekOfLife).css();
                const borderColor = chroma(background).darken(0.1).css();
                return (
                  <div
                    key={weekOfLife}
                    className={cls}
                    style={{ background, borderColor }}
                  />
                );
              })}
            </div>
          ))}
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
