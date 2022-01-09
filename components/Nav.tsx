import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "react-date-range";

import styles from "../styles/Nav.module.css";

export const BIRTHDATE_KEY = "BIRTHDATE";
export const TODAY = new Date();

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
          date={birthDate}
          maxDate={TODAY}
          onChange={(date) => {
            setBirthDate(date);
            localStorage.setItem(BIRTHDATE_KEY, date.toISOString());
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
);
