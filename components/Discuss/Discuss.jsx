import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import paths from '../../src/paths';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '130px 0 20px',
    [theme.breakpoints.down('xs')]: {
      margin: '50px 0 20px',
    },
  },
  disqusWrapper: {
    margin: '10px 0',
    '& .striped-bar': {
      display: 'none',
    },
  },
}));

const Discuss = ({ identifier, slug, title }) => {
  const classes = useStyles();
  const disqusConfig = {
    url: `${paths.root}/${slug}`,
    identifier,
    title,
  };
  return (
    <div id="disqus" className={classes.disqusWrapper}>
      <DiscussionEmbed
        shortname={process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME}
        config={disqusConfig}
      />
    </div>
  );
};

Discuss.propTypes = {
  identifier: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Discuss;
