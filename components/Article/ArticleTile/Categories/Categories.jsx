import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    textAlign: 'right',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    marginLeft: 5,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 8,
    },
  },
  activeCategory: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: '#000',
  },
}));

const Categories = ({ categories, active }) => {
  const classes = useStyles();

  const categoriesToRender = categories
    .map((category) => (
      <Link
        key={category.name}
        href={`/category/${category.name}`}
      >
        <Chip
          label={`${category.name}`}
          component="a"
          clickable
          variant="outlined"
          size="small"
          classes={{ root: classes.chip }}
          className={active === category.id ? classes.activeCategory : ''}
        />
      </Link>
    ));
  return (
    <div className={classes.wrapper}>
      {categoriesToRender}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  active: PropTypes.string.isRequired,
};

export default Categories;
