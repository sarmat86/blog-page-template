import { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Context from '../../src/context/context';
import ArticleTile from '../Article/ArticleTile/ArticleTile';

const useStyles = makeStyles((theme) => ({
  paginationWrapper: {
    '& ul.pagination': {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 0,
      '& li': {
        '& > a': {
          outline: 'none',
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        },
        '&:not(.disabled):hover': {
          color: theme.palette.primary.main,
        },
        '&.active': {
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        },
      },
      '& li.previous, & li.next': {
        '&.disabled': {
          opacity: 0.5,
          '& > a': {
            cursor: 'default',
          },
        },
      },
    },
  },
}));

const ArticleList = ({ allArticles, activeCategory }) => {
  const classes = useStyles();
  const perPage = +process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(0);
  const artFrom = currentPage * perPage;
  const countPages = Math.ceil(allArticles.length / perPage);

  const articles = allArticles
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    .slice(artFrom, artFrom + perPage);
  const { getVotesData, articlesVotesState } = useContext(Context);

  useEffect(() => {
    const articleIds = articles
      .map((article) => article.id)
      .filter((id) => !articlesVotesState.find((item) => item.id === id));
    if (articleIds.length) {
      getVotesData(articleIds);
    }
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="wrapper">
      {
      articles.map((article) => (
        <ArticleTile
          key={article.id}
          id={article.id}
          title={article.title}
          shortDescription={article.shortDescription}
          slug={article.slug}
          thumbnails={article.thumbnails}
          rate={article.rate}
          categories={article.categories}
          activeCategory={activeCategory}
          createdAt={article.createdAt.substring(0, article.createdAt.indexOf('T'))}
        />
      ))
}
      {' '}
      {countPages > 1 ? (
        <div className={classes.paginationWrapper}>
          <ReactPaginate
            previousLabel={(
              <ArrowBackIosIcon />
        )}
            nextLabel={(
              <ArrowForwardIosIcon />
        )}
            breakLabel={(
              <MoreHorizIcon />
        )}
            breakClassName="break-me"
            pageCount={countPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="pag-item"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      ) : null}

    </div>
  );
};
ArticleList.defaultProps = {
  activeCategory: '',
};
ArticleList.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  activeCategory: PropTypes.string,
};
export default ArticleList;
