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
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

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

const SocialShare = ({ size, round, url }) => {
  const classes = useStyles();
  return (
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
