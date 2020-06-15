import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import PropTypes from 'prop-types';
import SocialShare from '../../SocialShare/SocialShare';

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
});

const ArticleTile = ({ articleId, articleUrl }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
          subheader="10.06.2020"
          title="lorem"
          classes={{
            root: classes.cardHeader,
          }}
        />
        <Link href="/articles/[id]" as={`/articles/${articleId}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="img"
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
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.leftActions}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <SocialShare url={articleUrl} />
            </Grid>
            <Grid item xs={6} className={classes.rightActions}>
              <Button size="small" color="primary">
                Read more
              </Button>
            </Grid>
          </Grid>

        </CardActions>
      </Card>
    </div>
  );
};

ArticleTile.defaultProps = {

};

ArticleTile.propTypes = {
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
};

export default ArticleTile;
