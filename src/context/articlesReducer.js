import paths from '../paths';

export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
export const UPDATE_LIKES = 'UPDATE_LIKES_COUNT';
export const VOTE = 'VOTE';

const updateStorageVote = (newVote) => {
  let storageVotes = localStorage.getItem(`${paths.root}-vote`);
  if (storageVotes) {
    storageVotes = JSON.parse(storageVotes);
    const index = storageVotes.findIndex((votes) => votes.id === newVote.id);
    if (index !== -1) {
      storageVotes[index] = newVote;
    } else {
      storageVotes.push(newVote);
    }
    localStorage.setItem(`${paths.root}-vote`, JSON.stringify(storageVotes));
  } else {
    localStorage.setItem(`${paths.root}-vote`, JSON.stringify([{ ...newVote }]));
  }
};

const updateArticles = (state, action) => {
  let storageVotes = localStorage.getItem(`${paths.root}-vote`);
  let updatedArticles = [];
  if (storageVotes) {
    storageVotes = JSON.parse(storageVotes);
    updatedArticles = action.articles.map((article) => {
      const foundVote = storageVotes.find((vote) => vote.id === article.id);
      if (foundVote) {
        return {
          ...article,
          liked: foundVote.liked,
          disliked: foundVote.disliked,
        };
      }
      return {
        ...article,
        liked: false,
        disliked: false,
      };
    });
  } else {
    updatedArticles = action.articles.map((article) => ({
      ...article,
      liked: false,
      disliked: false,
    }));
  }
  return [
    ...state,
    ...updatedArticles,
  ];
};
const vote = (state, action) => state.map((article) => {
  if (article.id === action.articleId) {
    let actionKey = null;
    let likeKey = null;
    if (action.likeType === 'like') {
      likeKey = 'liked';
      actionKey = 'likes';
    } else if (action.likeType === 'dislike') {
      likeKey = 'disliked';
      actionKey = 'dislikes';
    }
    updateStorageVote({
      id: article.id,
      [likeKey]: true,
    });

    return {
      ...article,
      [actionKey]: article[actionKey] + 1,
      [likeKey]: true,
    };
  }
  return article;
});

const updateLikes = (state, action) => state.map((article) => {
  if (article.id === action.payload.id) {
    return {
      ...article,
      ...action.payload,
    };
  }
  return article;
});

const articlesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ARTICLES: return updateArticles(state, action);
    case VOTE: return vote(state, action);
    case UPDATE_LIKES: return updateLikes(state, action);
    default:
      return state;
  }
};

export default articlesReducer;
