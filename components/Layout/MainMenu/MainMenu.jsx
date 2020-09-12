import { useContext } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from 'next/link';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ListSubheader from '@material-ui/core/ListSubheader';
import paths from '../../../src/paths';
import Context from '../../../src/context/context';

const MainMenu = () => {
  const { categoriesState } = useContext(Context);
  const categoriesToRender = categoriesState.map((category) => (
    <Link href={`${paths.category}/${category.name}`} key={category.name}>
      <ListItem button>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
      </ListItem>
    </Link>
  ));
  return (
    <>
      <List disablePadding>
        <ListSubheader>Menu</ListSubheader>
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Main Page" />
          </ListItem>
        </Link>
        <Link href={`${paths.contact}`}>
          <ListItem button>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>

        {categoriesToRender.length ? (
          <>
            <Divider />
            <ListSubheader>Categories</ListSubheader>
          </>
        ) : null}
        {categoriesToRender}
        <Divider />
        {paths.fb || paths.insta
          ? <ListSubheader>Socialmedia</ListSubheader>
          : null}
        {paths.fb ? (
          <Link href={`${paths.contact}`}>
            <ListItem button>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </ListItem>
          </Link>
        ) : null}
        {paths.insta ? (
          <Link href={`${paths.contact}`}>
            <ListItem button>
              <ListItemIcon>
                <InstagramIcon />
              </ListItemIcon>
              <ListItemText primary="Instagram" />
            </ListItem>
          </Link>
        ) : null}
      </List>

    </>
  );
};

export default MainMenu;
