import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Context from './context';
import articlesReduces, { UPDATE_ARTICLES, UPDATE_LIKES, VOTE } from './articlesReducer';

const GlobalState = ({ children }) => {
  const initialState = [];

  const [articlesState, articlesDispatch] = useReducer(articlesReduces, initialState);

  const updateArticles = (articles) => {
    articlesDispatch({
      type: UPDATE_ARTICLES,
      articles,
    });
  };
  const voteQuery = (articleId, likeType) => {
    axios.post(`${process.env.NEXT_PUBLIC_FETCH_LIKES_URL}/articles/setlikes`, {
      id: articleId,
      action: likeType,
    })
      .then((response) => {
        const { id, likes, dislikes } = response.data;
        articlesDispatch({
          type: UPDATE_LIKES,
          payload: {
            id,
            dislikes,
            likes,
          }
        });
      })
      .catch((response) => {
        console.log('Error occurred during vote data fetching.', response);
      });
  };

  const vote = (articleId, likeType) => {
    articlesDispatch({
      type: VOTE,
      articleId,
      likeType,
    });
    voteQuery(articleId, likeType);
  };
  useEffect(() => {
    console.log('====================================');
    console.log('state', articlesState);
    console.log('====================================');

  } )

  return (
    <Context.Provider value={{
      articles: articlesState,
      updateArticles,
      vote,
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
