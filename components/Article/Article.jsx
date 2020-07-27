import { DiscussionEmbed } from 'disqus-react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import paths from '../../src/paths';
import ArticleTile from './ArticleTile/ArticleTile';

const useStyles = makeStyles({
  wrapper: {
    marginBottom: 20,
  },
  disqusWrapper: {
    margin: '10px 0',
    '& .striped-bar': {
      display: 'none',
    },
  },
});

const Article = ({ data }) => {
  const classes = useStyles();
  const disqusConfig = {
    url: `${paths.root + paths.articles}/${data.slug}`,
    identifier: data.id,
    title: data.title,
  };
  return (
    <div className={classes.wrapper}>
      <h1>{data.title}</h1>
      <ArticleTile
        id={data.id}
        title={data.title}
        content={data.content}
        slug={data.slug}
        thumbnail={data.thumbnail}
        video={data.video}
        createdAt={data.createdAt.substring(0, data.createdAt.indexOf('T'))}
        sources={data.sources}
        fullInfo
      />
      <div id="disqus" className={classes.disqusWrapper}>
        <DiscussionEmbed
          shortname={process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME}
          config={disqusConfig}
        />
      </div>
    </div>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sources: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.array.isRequired,
    video: PropTypes.object,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
