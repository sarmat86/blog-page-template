import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    flexDirection: 'row',
    display: 'flex',
    flex: '1',
  },
  content: {
    flex: '1',
  },
  description: {
    fontSize: '1.3rem',
    textAlign: 'center',
    margin: '10px auto',
  },
  mainTitle: {
    margin: '70px auto 0',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: 10,
    [theme.breakpoints.up('md')]: {
      margin: '100px auto 0',
    },
    cursor: 'pointer',

  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
    '& span': {
      color: theme.palette.primary.main,
    },
  },
}));

const TopHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainTitle}>
      <Link href="/">
        <h1 className={classes.title}>
          lorem
          <span>ipsum</span>
          header
          <span>.</span>
          pl
        </h1>
      </Link>
      <p className={classes.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, consectetur voluptatem? Est eligendi fugiat quae odit fugit iure ea facilis. Alias quasi corrupti quos reprehenderit doloremque, nisi a culpa? Assumenda!
      </p>
    </div>
  );
};

export default TopHeader;
