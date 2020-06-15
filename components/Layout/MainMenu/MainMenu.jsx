import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';

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
    </List>
    <Divider />
  </>
);

export default MainMenu;
