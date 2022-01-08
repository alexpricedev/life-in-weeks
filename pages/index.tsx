import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import classnames from "classnames";
import chroma from "chroma-js";
import { differenceInWeeks } from "date-fns";
import { Calendar } from "react-date-range";

import styles from "../styles/Home.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const YEARS = 80;
const YEARS_ARR = Array(YEARS).fill("");
const WEEKS_IN_YEAR = 52;
const WEEKS_IN_YEAR_ARR = Array(WEEKS_IN_YEAR).fill("");
const WEEKS_IN_LIFE = YEARS * WEEKS_IN_YEAR;

const BIRTHDATE_KEY = "BIRTHDATE";
const TODAY = new Date();

const THEME_1 = ["#43cea2", "#185a9d"]; // Endless River
const THEME_2 = ["#c33764", "#1d2671"]; // Celestial
const THEME_3 = ["#ff7e5f", "#feb47b"]; // Sunset
const THEME_4 = ["#bdc3c7", "#2c3e50"]; // Shades of grey
const COLOUR_SCALE = chroma.scale(THEME_2).domain([0, WEEKS_IN_LIFE]);

// TODO:
//    FAB
//    Theme picker
//    Date picker
//    Deploy
//    number/number

const Home: NextPage = () => {
  const [birthDate, setBirthDate] = useState(new Date("1952-12-16T00:00:00"));
  const delta = differenceInWeeks(TODAY, birthDate);

  // Grab the saved birth date from local storage
  useEffect(() => {
    const birthDateStore = localStorage.getItem(BIRTHDATE_KEY);
    if (birthDateStore) {
      setBirthDate(new Date(birthDateStore));
    }
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
        <nav className={styles.nav}>
          <Calendar
            date={birthDate}
            onChange={(date) => {
              setBirthDate(date);
              localStorage.setItem("", "");
            }}
          />
        </nav>
      </main>
    </div>
  );
};

export default Home;
