import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 50,
    borderTop: `2px solid ${theme.palette.primary.main}`,
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100px',
    textAlign: 'center',
    padding: 20,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <div className={classes.footerContent}>
          <span>
            <strong>nextjs-blog-template</strong>
            <br />
            {' '}
            2020
          </span>
          <div>
            <IconButton
              href="https://github.com/sarmat86/blog-page-template"
            >
              <GitHubIcon />
            </IconButton>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
