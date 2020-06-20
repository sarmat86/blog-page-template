import { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import Context from '../../src/context/context';

const useStyles = makeStyles((theme) => ({
  likeWrapper: {
    display: 'flex',
  },
  root: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
  button: {
    '&:disabled': {
      color: theme.palette.text.primary,
    },
  },
  clicked: {
    color: `${theme.palette.primary.main}!important`,
  },

}));

const LikeSection = ({ articleId, likes, dislikes }) => {
  const classes = useStyles();
  const { articles, updateLikes } = useContext(Context);
  const currArticle = articles ? articles.find((art) => art.id === articleId) : null;

  const handleClick = (type) => () => {
    updateLikes(articleId, type);
  };
  return (
    <>
      <Badge
        classes={{
          badge: classes.root,
        }}
        color="primary"
        overlap="circle"
        badgeContent={currArticle ? currArticle.dislikes : 0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        max={999}
      >
        <IconButton
          aria-label="thumb down"
          onClick={handleClick('dislikes')}
          disabled={currArticle ? (currArticle.disliked || currArticle.liked) : false}
          className={clsx(classes.button, currArticle && currArticle.disliked && classes.clicked)}
        >
          <ThumbDownAltIcon />
        </IconButton>
      </Badge>
      <Badge
        classes={{
          badge: classes.root,
        }}
        color="primary"
        overlap="circle"
        badgeContent={currArticle ? currArticle.likes : 0}
        max={9999}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <IconButton
          aria-label="thumb down"
          onClick={handleClick('likes')}
          disabled={currArticle ? (currArticle.disliked || currArticle.liked) : false}
          className={clsx(classes.button, currArticle && currArticle.liked && classes.clicked)}
        >
          <ThumbUpAltIcon />
        </IconButton>
      </Badge>

    </>

  );
};

LikeSection.defaultProps = {
  likes: 0,
  dislikes: 0,
};

LikeSection.propTypes = {
  likes: PropTypes.number,
  dislikes: PropTypes.number,
};

export default LikeSection;
