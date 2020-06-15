import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 50,
    borderTop: `2px solid ${theme.palette.primary.main}`,
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100px',
    textAlign: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <div className={classes.footerContent}>
          <span>
            footer
            <br />
            {' '}
            2020
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
