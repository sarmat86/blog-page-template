import Container from '@material-ui/core/Container';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TopHeader from './TopHeader/TopHeader';
import Footer from './Footer/Footer';
import TopBar from './TopBar/TopBar';

const useStyles = makeStyles({
  content: {
    marginTop: 50,
    textAlign: 'center',
  },
  wrapper: {
    position: 'relative',
  },
});
const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </title>
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      <TopBar />
      <Container maxWidth="md">
        <div className={classes.wrapper}>
          <TopHeader />
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
