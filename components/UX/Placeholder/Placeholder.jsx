import React from 'react';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import classes from './placeholder.module.css';

const Placeholder = () => (
  <div className={classes.wrapper}>
    <BrokenImageIcon
      color="primary"
      fontSize="large"
      classes={{
        root: classes.color,
      }}
    />
  </div>
);

export default Placeholder;
