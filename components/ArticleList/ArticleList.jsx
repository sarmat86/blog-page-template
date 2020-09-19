import { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ArticleTile from '../Article/ArticleTile/ArticleTile';
import Context from '../../src/context/context';

const ArticleList = ({ allArticles, activeCategory }) => {
  const perPage = +process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(0);
  const artFrom = currentPage * perPage;
  const countPages = allArticles.length / perPage;
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
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={countPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};
ArticleList.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  activeCategory: PropTypes.string,
};
export default ArticleList;
