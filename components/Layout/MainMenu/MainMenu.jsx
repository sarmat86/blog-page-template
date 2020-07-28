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
import paths from '../../../src/paths';

const MainMenu = () => (
  <>
    <List>
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
      <Divider />
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

export default MainMenu;
