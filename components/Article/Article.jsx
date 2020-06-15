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

const Article = ({ title, img, articleId, articleUrl }) => {
  const classes = useStyles();

  const disqusConfig = {
    url: 'http://localhost:3000',
    identifier: 'article-id',
    title: 'Title of Your Article',
  };
  const disqusShortname = '';
  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
          subheader="10.06.2020"
          title={title}
          classes={{
            root: classes.cardHeader,
          }}
        />

        <CardMedia
          component="img"
          alt="jakiś img"
          height="300"
          image="https://via.placeholder.com/912"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Illum sint cumque dolor molestias recusandae.
            Ex quam ea ut tempora corporis magnam recusandae.
            Excepturi ex voluptates voluptate, blanditiis dolores accusantium nobis?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Illum sint cumque dolor molestias recusandae.
            Ex quam ea ut tempora corporis magnam recusandae.
            Excepturi ex voluptates voluptate, blanditiis dolores accusantium nobis?
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body1" color="textSecondary" component="p">
            Sources
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.leftActions} />
            <Grid item xs={6} className={classes.rightActions}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <SocialShare url={articleUrl} />
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

Article.defaultProps = {

};

Article.propTypes = {
  articleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Article;
