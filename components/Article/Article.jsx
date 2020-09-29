import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ArticleTile from './ArticleTile/ArticleTile';
import Discuss from '../Discuss/Discuss';

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

const Article = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <h1>{data.title}</h1>
      <ArticleTile
        id={data.id}
        title={data.title}
        content={data.content}
        slug={data.slug}
        thumbnails={data.thumbnails}
        video={data.video}
        createdAt={data.createdAt.substring(0, data.createdAt.indexOf('T'))}
        sources={data.sources}
        categories={data.categories}
        fullInfo
      />
      <Discuss identifier={data.id} title={data.title} slug={data.slug} />
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
    thumbnails: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    video: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      provider: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
  }).isRequired,
};

export default Article;
