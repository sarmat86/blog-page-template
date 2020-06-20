import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';

const useStyles = makeStyles({

  socialShareWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    '& > *': {
      margin: '0 5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
});

const SocialShare = ({
  size, round, url,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleShareClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <IconButton aria-label="share" variant="contained" onClick={handleShareClick}>
        <ShareIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleShareClose}
        anchorOrigin={{
          horizontal: 100,
          vertical: 'center',
        }}
        transformOrigin={{
          vertical: 30,
          horizontal: 100,
        }}
      >
        <div className={classes.socialShareWrapper}>
          <EmailShareButton url={url}>
            <EmailIcon size={size} round={round} />
          </EmailShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon size={size} round={round} />
          </FacebookShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={size} round={round} />
          </WhatsappShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={size} round={round} />
          </TwitterShareButton>
          <InstapaperShareButton url={url}>
            <InstapaperIcon size={size} round={round} />
          </InstapaperShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={size} round={round} />
          </LinkedinShareButton>
        </div>
      </Popover>
    </>

  );
};

SocialShare.defaultProps = {
  size: 32,
  round: true,
};

SocialShare.propTypes = {
  size: PropTypes.number,
  round: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

export default SocialShare;
