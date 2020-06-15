import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';
import SocialShare from '../../SocialShare/SocialShare';
import PropTypes from 'prop-types';

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

const ArticleTile = ({ articleId }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSocialClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSocialClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
              <IconButton aria-label="share" aria-describedby={id} variant="contained" color="primary" onClick={handleSocialClick}>
                <ShareIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} className={classes.rightActions}>
              <Button size="small" color="primary">
                Read more
              </Button>
            </Grid>
          </Grid>
          <div className="social-sharing">
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleSocialClose}
              anchorOrigin={{
                vertical: 'right',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <SocialShare url={`https://test/articles/${articleId}`} round size={32} onClose={handleSocialClose} />
            </Popover>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

ArticleTile.defaultProps = {

};

ArticleTile.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default ArticleTile;
