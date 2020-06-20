import { useReducer } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import articlesReduces, { UPDATE_ARTICLES, UPDATE_LIKES_COUNT } from './articlesReducer';

const GlobalState = ({ children }) => {
  const initialState = [];

  const [articlesState, articleDispatch] = useReducer(articlesReduces, initialState);

  const updateArticles = (articles) => {
    articleDispatch({
      type: UPDATE_ARTICLES,
      articles,
    });
  };
  const updateLikes = (articleId, likeType) => {
    articleDispatch({
      type: UPDATE_LIKES_COUNT,
      articleId,
      likeType,
    });
  };

  return (
    <Context.Provider value={{
      articles: articlesState,
      updateArticles,
      updateLikes,
    }}
    >
      {children}
    </Context.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalState;
