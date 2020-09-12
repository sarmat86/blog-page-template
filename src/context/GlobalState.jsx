import { useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Context from './context';
import voteReducer, { UPDATE_ARTICLES_VOTES, UPDATE_LIKES, VOTE } from './voteReducer';
import categoriesReducer, { UPDATE_CATEGORIES } from './categoriesReducer';

const GlobalState = ({ children }) => {
  const initialState = [];

  const [articlesVotesState, articlesVoteDispatch] = useReducer(voteReducer, initialState);
  const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, initialState);

  const updateCategories = (categories) => {
    categoriesDispatch({
      type: UPDATE_CATEGORIES,
      categories,
    });
  };
  const updateArticlesVotes = (articles) => {
    articlesVoteDispatch({
      type: UPDATE_ARTICLES_VOTES,
      articles,
    });
  };

  const getVotesData = (articleIdsArr) => {
    const query = {
      articles: articleIdsArr,
    };
    axios.post(`${process.env.NEXT_PUBLIC_FETCH_LIKES_URL}/articles`, query)
      .then((response) => {
        updateArticlesVotes(response.data);
      })
      .catch((response) => {
        console.log('Error occurred during social-likes data fetching.', response);
      });
  };

  const voteQuery = (articleId, likeType) => {
    axios.post(`${process.env.NEXT_PUBLIC_FETCH_LIKES_URL}/articles/setlikes`, {
      id: articleId,
      action: likeType,
    })
      .then((response) => {
        const { id, likes, dislikes } = response.data;
        articlesVoteDispatch({
          type: UPDATE_LIKES,
          payload: {
            id,
            dislikes,
            likes,
          },
        });
      })
      .catch((response) => {
        console.log('Error occurred during vote data fetching.', response);
      });
  };

  const vote = (articleId, likeType) => {
    articlesVoteDispatch({
      type: VOTE,
      articleId,
      likeType,
    });
    voteQuery(articleId, likeType);
  };
  return (
    <Context.Provider value={{
      articlesVotesState,
      categoriesState,
      updateArticlesVotes,
      vote,
      getVotesData,
      updateCategories,
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
