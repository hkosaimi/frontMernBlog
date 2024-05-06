import { useReducer, createContext } from "react";

export const ArticleContext = createContext();

const articleReducer = (state, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        articles: action.payload,
      };
    case "DELETE_ARTICLE":
      return {
        articles: state.articles.filter((w) => w._id !== action.payload._id),
      };
    case "POST_ARTICLE":
      return {
        articles: [action.payload, ...state.articles],
      };
    default:
      return state;
  }
};

export const ArticleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(articleReducer, {
    articles: null,
  });
  return (
    <ArticleContext.Provider value={{ ...state, dispatch }}>{children}</ArticleContext.Provider>
  );
};
