import Container from '@material-ui/core/Container';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { renderMetaTags } from 'react-datocms';
import PropTypes from 'prop-types';
import Footer from './Footer/Footer';
import TopBar from './TopBar/TopBar';
import { initGA, logPageView } from '../../src/utils/analytics';
import paths from '../../src/paths';

const useStyles = makeStyles({
  content: {
    textAlign: 'center',
  },
  wrapper: {
    position: 'relative',
    marginTop: 70,
  },
});
const Layout = ({ children, title, seo }) => {
  const classes = useStyles();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALITICS && !window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  return (
    <>
      <Head>
        <title>
          {`${paths.root} - ${title}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        {seo ? renderMetaTags(seo) : (
          <>
            <meta
              name="description"
              content="lorem ipsum"
            />
            <meta
              property="og:description"
              content="lorem ipsum"
            />
            <meta
              name="twitter:description"
              content="lorem ipsum"
            />
          </>
        )}
      </Head>
      <TopBar />
      <Container maxWidth="md">
        <div className={classes.wrapper}>
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: paths.root,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  seo: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default Layout;
