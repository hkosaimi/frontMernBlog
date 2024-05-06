import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  return context;
};
