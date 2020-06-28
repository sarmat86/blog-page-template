import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { DiscussionEmbed } from 'disqus-react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import SocialShare from '../SocialShare/SocialShare';
import paths from '../../src/paths';
import LikeSection from '../LikeSection/LikeSection';

const useStyles = makeStyles({
  wrapper: {
    marginBottom: 20,
  },
  leftActions: {
    textAlign: 'left',
  },
  rightActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    order: 2,
  },
  subheader: {
    order: 1,
  },
  divider: {
    margin: '10px 0',
  },
  disqusWrapper: {
    margin: '10px 0',
    '& .striped-bar': {
      display: 'none',
    },
  },
  videoResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: '0',
    '& iframe': {
      left: '0',
      top: '0',
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },
  media: {
    minHeight: 320,
  },

});

const Article = ({
  title, createdAt, id, thumbnail, sources, content, rate, slug, video,
}) => {
  const classes = useStyles();
  const disqusConfig = {
    url: `${paths.root + paths.articles}/${slug}`,
    identifier: id,
    title,
  };
  const cardMedia = video ? (
    <div className={classes.videoResponsive}>
      <CardMedia
        component="iframe"
        src={video.url}
        height={video.height}
        width={video.width}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  ) : (
    <div className={classes.media}>
      <CardMedia
        component="img"
        alt={thumbnail[0].title || title}
        title={thumbnail[0].title || title}
        src={thumbnail[0].url}
        height={thumbnail[0].height < 720 ? thumbnail[0].height : 720}
      />
    </div>
  );
  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
          subheader={createdAt}
          title={rate ? `${rate} / 10` : null}
          classes={{
            content: classes.cardHeader,
            title: classes.title,
            subheader: classes.subheader,
          }}
        />
        {cardMedia}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
          {sources ? (
            <>
              <Divider className={classes.divider} />
              <Typography gutterBottom variant="h5" component="h4">
                Sources
              </Typography>
              <ReactMarkdown source={sources} />
            </>
          ) : null}
        </CardContent>

        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.rightActions}>
              <SocialShare
                url={`${paths.root + paths.articles}/${slug}`}
                horizontalPosition={-20}
              />
              <LikeSection articleId={id} />
            </Grid>
          </Grid>

        </CardActions>
      </Card>
      <div id="disqus" className={classes.disqusWrapper}>
        <DiscussionEmbed
          shortname={process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME}
          config={disqusConfig}
        />
      </div>
    </div>
  );
};
Article.defaultProps = {
  thumbnail: {
    url: 'https://via.placeholder.com/912',
    title: 'img placeholder',
  },
  rate: 0,
};
Article.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sources: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  ),
  video: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  rate: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
};

export default Article;
