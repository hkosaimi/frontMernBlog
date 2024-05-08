import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "../Navbar";
import { FaReact } from "react-icons/fa";
import { useArticleContext } from "../../hooks/useArticleContext";
import Footer from "../Footer";

const Article = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { articles, dispatch } = useArticleContext();
  // Fetch the specific article data based on the ID
  const [article, setArticle] = useState(null);
  console.log(article);
  useEffect(() => {
    const fetchData = async () => {
      // Set isLoading to true while fetching data
      setIsLoading(true);

      // Fetch data
      try {
        const response = await fetch(`https://mernback-875f.onrender.com/api/blogs/articles/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Set the fetched data
        setArticle(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }

      // Set isLoading to false when data fetching is complete
      setIsLoading(false);
    };

    fetchData();
  }, []);

  /* 
.article {
  font-family: "Poppins";
  width: 80%;
  margin: 0 auto;
  padding: 2rem 1rem;
  height: 100vh;
}
.article h2 {
  text-align: start;
  color: #28b4ad;
  line-height: 35px;
  margin-bottom: 10px;
}
.article span {
  color: rgb(128, 126, 126);
  margin-right: 20px;
  font-size: 14px;
}
.article p {
  margin-top: 20px;
  text-indent: 50px;
  text-align: start;
} */
  return (
    <>
      <div>
        <Navbar />
        {isLoading ? (
          <FaReact className="loading" />
        ) : (
          article && (
            <div className="py-[2rem] px-[2rem] lg:px-[20rem]">
              <h2 className="text-[30px] lg:text-[40px] text-[#28b4ad] text-center font-bold mb-5">
                {article.title}
              </h2>
              <span className="text-gray-400">By {article.author} | </span>
              <span className="text-gray-400">
                {format(new Date(article.createdAt), "dd/MM/yyyy h:mm a")}
              </span>
              <p className="pb-[100px] text-[25px] mt-[20px] lg:text-[25px]">{article.content}</p>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default Article;
