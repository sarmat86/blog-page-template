import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { DiscussionEmbed } from 'disqus-react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import SocialShare from '../SocialShare/SocialShare';
import paths from '../../src/paths';

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
    textAlign: 'right',
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
});

const Article = ({
  title, image, id, thumbnail, sources, content, rate, slug,
}) => {
  const classes = useStyles();
  const disqusConfig = {
    url: paths.root,
    identifier: id,
    title,
  };
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME;
  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
          subheader="10.06.2020"
          title={rate}
          classes={{
            root: classes.cardHeader,
          }}
        />

        <CardMedia
          component="img"
          alt={image.title ? image.title : title}
          height="300"
          image={image.url ? image.url : thumbnail.url}
          title={image.title ? image.title : title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body1" color="textSecondary" component="p">
            {sources}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.leftActions} />
            <Grid item xs={6} className={classes.rightActions}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <SocialShare url={`${paths.root + paths.articles}/${slug}`} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <div className={classes.disqusWrapper}>
        <DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </div>
  );
};

Article.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  sources: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
