import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from 'next/link';
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
    </List>
    <Divider />
  </>
);

export default MainMenu;
