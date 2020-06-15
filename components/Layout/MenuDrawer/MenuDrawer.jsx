import { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import MainMenu from '../MainMenu/MainMenu';

const useStyles = makeStyles((theme) => ({
  drawer: {
    minWidth: 320,
  },
  closeWrapper: {
    textAlign: 'right',
    paddingRight: 10,
  },
}));
const MenuDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  useEffect(() => {
    Router.events.on('routeChangeStart', onClose);
    return () => {
      Router.events.off('routeChangeStart');
    };
  }, []);
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawer,
      }}
    >
      <div className={classes.closeWrapper}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <MainMenu />
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MenuDrawer;
