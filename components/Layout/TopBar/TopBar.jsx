import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Drawer from '../MenuDrawer/MenuDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: -12,
  },
  toolBarRoot: {
    padding: 0,
  },
  appBarRoot: {
    boxShadow: 'none',
  },
  topSocial: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },
  gridWrtapper: {
    display: 'flex',
  },
  gridItem: {
    width: '50%',
  },
}));

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  const onClickHandler = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="inherit"
          classes={{ root: classes.appBarRoot }}
        >
          <Toolbar
            variant="dense"
            classes={{ root: classes.toolBarRoot }}
          >
            <Container maxWidth="md">
              <div className={classes.gridWrtapper}>
                <div className={classes.gridItem}>
                  <IconButton className={classes.menuButton} onClick={onClickHandler}>
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.gridItem}>
                  <div className={classes.topSocial}>
                    <IconButton
                      href="https://www.facebook.com/"
                      target="_blank"
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      href="https://www.instagram.com/"
                      target="_blank"
                    >
                      <InstagramIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};

export default TopBar;
