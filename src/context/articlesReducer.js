export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
export const UPDATE_LIKES_COUNT = 'UPDATE_LIKES_COUNT';

const updateArticles = (state, action) => [
  ...state,
  ...action.articles.map((article) => ({
    ...article,
    liked: false,
    disliked: false,
  })),
];
const updateLikesCount = (state, action) => state.map((article) => {
  if (article.id === action.articleId) {
    const newData = {
      ...article,
      [action.likeType]: article[action.likeType] + 1,
    };
    if (action.likeType === 'likes') {
      newData.liked = true;
    } else if (action.likeType === 'dislikes') {
      newData.disliked = true;
    }
    return newData;
  }
  return article;
});
const articlesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ARTICLES: return updateArticles(state, action);
    case UPDATE_LIKES_COUNT: return updateLikesCount(state, action);
    default:
      return state;
  }
};

export default articlesReducer;
