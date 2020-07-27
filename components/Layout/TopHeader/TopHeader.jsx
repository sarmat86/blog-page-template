import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  top: {
    borderBottom: '2px solid red',
  },
  accordion: {
    background: 'none',
    boxShadow: 'none',
    '&:before': {
      content: 'none',
    },
  },
  summary: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      flexDirection: 'column',
    },
  },
  summaryContent: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  description: {
    fontSize: '1.3rem',
    textAlign: 'center',
    margin: '10px auto',
    fontWeight: 'normal',
    [theme.breakpoints.down('xs')]: {
      margin: '0',
      fontSize: '1.1rem',
    },

  },
  expandIcon: {
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
  topMenu: {
    padding: '10px 0',
    textAlign: 'right',
  },
  link: {
    '&:hover': {
      background: 'none',
    },
  },
  details: {
    textAlign: 'justify',
    textIndent: 20,
    display: 'block',
  },
  text: {
    textAlign: 'center',
    fontSize: '1.2rem',
    paddingTop: 10,
    fontStyle: 'italic',
    display: 'block',
  },
}));

const TopHeader = () => {
  const classes = useStyles();
  const [topExpanded, setTopExpanded] = useState(false);
  const onClickHandler = () => {
    setTopExpanded(!topExpanded);
  };
  return (
    <div className={classes.top}>
      <Accordion
        expanded={topExpanded}
        square
        classes={{
          root: classes.accordion,
        }}
      >
        <AccordionSummary
          onClick={onClickHandler}
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.summary,
            content: classes.summaryContent,
            expandIcon: classes.expandIcon,
          }}
        >
          <h1 className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perferendis! Minus quae enim maxime incidunt laborum dignissimos tempora aut cum ducimus aliquam voluptatem tenetur excepturi, hic animi vero, harum nisi.</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TopHeader;
