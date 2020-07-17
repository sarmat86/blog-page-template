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

const LikeSection = ({ articleId }) => {
  const classes = useStyles();

  const { articlesVotesState, vote } = useContext(Context);
  const votesData = articlesVotesState.length
    ? articlesVotesState.find((art) => art.id === articleId)
    : null;
  const handleClick = (type) => () => {
    vote(articleId, type);
  };
  return (
    <>
      <Badge
        classes={{
          badge: classes.root,
        }}
        color="primary"
        overlap="circle"
        badgeContent={votesData ? votesData.dislikes : 0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        max={999}
      >
        <IconButton
          aria-label="thumb down"
          onClick={handleClick('dislike')}
          disabled={votesData ? (votesData.disliked || votesData.liked) : false}
          className={clsx(classes.button, votesData && votesData.disliked && classes.clicked)}
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
        badgeContent={votesData ? votesData.likes : 0}
        max={9999}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <IconButton
          aria-label="thumb down"
          onClick={handleClick('like')}
          disabled={votesData ? (votesData.disliked || votesData.liked) : false}
          className={clsx(classes.button, votesData && votesData.liked && classes.clicked)}
        >
          <ThumbUpAltIcon />
        </IconButton>
      </Badge>
    </>

  );
};

LikeSection.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default LikeSection;
