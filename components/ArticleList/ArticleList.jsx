import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ArticleTile from '../Article/ArticleTile/ArticleTile';
import Context from '../../src/context/context';

const ArticleList = ({ articles, activeCategory }) => {
  const { getVotesData } = useContext(Context);
  const articleIds = articles.map((article) => article.id);
  useEffect(() => {
    getVotesData(articleIds);
  }, []);
  return articles
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    .map((article) => (
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
    ));
};
ArticleList.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
  activeCategory: PropTypes.string,
};
export default ArticleList;
