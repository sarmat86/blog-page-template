export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';

const updateCategories = (state, action) => {
  return [
    ...action.categories,
  ];
};

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES: return updateCategories(state, action);
    default:
      return state;
  }
};

export default categoriesReducer;
