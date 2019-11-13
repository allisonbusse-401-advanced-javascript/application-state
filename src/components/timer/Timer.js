import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Timer.css';

const Timer = ({ time, startTimer }) => {

  useEffect(()=> {
    const unSubscribe = setTimeout(() => {
      startTimer();
    }, 1000);
    return () => clearTimeout(unSubscribe);
  }, [time]);
  return (
    <p className={styles.Timer} onLoad={startTimer}>{time} seconds left</p>

  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired
};

export default Timer;
