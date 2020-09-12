import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '../MenuDrawer/MenuDrawer';
import paths from '../../../src/paths';

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
    [theme.breakpoints.down('xs')]: {
      width: '15%',
    },
  },
  centralPlaceholder: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '85%',
    },
  },
  title: {
    fontSize: '1.2rem',
    textAlign: 'center',
    margin: '0 auto',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
    },
  },
}));

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  const upXs = useMediaQuery((theme) => theme.breakpoints.up('sm'));
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
                <div className={classes.centralPlaceholder}>
                  <Link href="/">
                    <span className={classes.title}>
                      nextjs-blog-template
                    </span>
                  </Link>
                </div>
                <div className={classes.gridItem}>
                  {upXs ? (
                    <div className={classes.topSocial}>
                      {paths.fb ? (
                        <IconButton
                          href={`${paths.fb}`}
                          target="_blank"
                        >
                          <FacebookIcon />
                        </IconButton>
                      ) : null}
                      {paths.insta ? (
                        <IconButton
                          href={`${paths.insta}`}
                          target="_blank"
                        >
                          <InstagramIcon />
                        </IconButton>
                      ) : null}
                    </div>
                  ) : null}
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
