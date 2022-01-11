import chroma from "chroma-js";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "react-date-range";
import { subYears } from "date-fns";

import styles from "../styles/Nav.module.css";

export const BIRTHDATE_KEY = "BIRTHDATE";
export const YEARS = 80;
export const TODAY = new Date();
export const DATE_YEARS_AGO = subYears(TODAY, YEARS);

const THEME_1 = ["#43cea2", "#185a9d"]; // Endless River
const THEME_2 = ["#c33764", "#1d2671"]; // Celestial
const THEME_3 = ["#ff7e5f", "#feb47b"]; // Sunset
const THEME_4 = ["#bdc3c7", "#2c3e50"]; // Shades of grey
export const ACTIVE_THEME = THEME_2;

interface NavProps {
  birthDate: Date;
  isNavVisible: boolean;
  setBirthDate: (d: Date) => void;
  setIsNavVisible: (b: boolean) => void;
}

export const Nav = ({
  birthDate,
  isNavVisible,
  setBirthDate,
  setIsNavVisible,
}: NavProps) => (
  <>
    <AnimatePresence>
      {isNavVisible && (
        <motion.nav
          animate={{ opacity: 1 }}
          className={styles.nav}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <label className={styles.calLabel}>Birth date</label>
          <Calendar
            color={chroma(ACTIVE_THEME[1]).brighten(1).css()}
            date={birthDate}
            maxDate={TODAY}
            minDate={DATE_YEARS_AGO}
            onChange={(date) => {
              setBirthDate(date);
              localStorage.setItem(BIRTHDATE_KEY, date.toISOString());
              setIsNavVisible(false);
            }}
          />
          <button
            className={styles.close}
            onClick={(e) => {
              e.preventDefault();
              setIsNavVisible(false);
            }}
          >
            Close
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
    <button
      className={styles.close}
      onClick={(e) => {
        e.preventDefault();
        setIsNavVisible(true);
      }}
    >
      Menu
    </button>
  </>
);
