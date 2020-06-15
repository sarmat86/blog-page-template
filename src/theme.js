import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        color: '#000',
      },
    },
  },
  palette: {
    props: {
      MuiSvgIcon: {
        htmlColor: 'red',
      },
    },
    primary: {
      main: '#e22323',
    },
    secondary: {
      main: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default theme;
