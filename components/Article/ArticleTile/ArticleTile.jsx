import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import UiLink from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { CommentCount } from 'disqus-react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LikeSection from '../../LikeSection/LikeSection';
import paths from '../../../src/paths';
import SocialShare from '../../SocialShare/SocialShare';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: 20,
  },
  leftActions: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  comments: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
    marginLeft: 10,
    color: theme.palette.text.primary,
  },
  chatIcon: {
    marginRight: 10,
  },
}));

const ArticleTile = ({
  id, title, shortDescription, slug, thumbnail, rate, createdAt,
}) => {
  const classes = useStyles();
  const upXs = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const disqusConfig = {
    url: `${paths.root + paths.articles}/${slug}#disqus_thread`,
    identifier: id,
    title,
  };
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
        <Link href={`${paths.articles}/[slug]`} as={`${paths.articles}/${slug}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={thumbnail.title}
              image={thumbnail.url}
              title={thumbnail.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {shortDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className={classes.leftActions}>
                <SocialShare url={`${paths.root + paths.articles}/${slug}`} />
                <LikeSection articleId={id} />
                { upXs ? (
                  <Link href={`${paths.articles}/[slug]`} as={`${paths.articles}/${slug}#disqus_thread`}>
                    <UiLink className={classes.comments}>
                      <ChatBubbleOutlineIcon className={classes.chatIcon} />
                      <CommentCount
                        shortname={process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME}
                        config={disqusConfig}
                      />
                    </UiLink>
                  </Link>
                ) : null}
              </div>
            </Grid>
            <Grid item xs={4} className={classes.rightActions}>
              <Link href={`${paths.articles}/[slug]`} as={`${paths.articles}/${slug}`}>
                <UiLink>
                  <Button size="small" color="primary">
                    Read more
                  </Button>
                </UiLink>
              </Link>
            </Grid>
          </Grid>

        </CardActions>
      </Card>
    </div>
  );
};
ArticleTile.defaultProps = {
  thumbnail: {
    url: 'https://via.placeholder.com/912',
    title: 'img placeholder',
  },
  rate: 0,
};
ArticleTile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    height: PropTypes.number,
  }),
  rate: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
};

export default ArticleTile;
