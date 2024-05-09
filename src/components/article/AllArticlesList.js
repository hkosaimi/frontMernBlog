import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useArticleContext } from "../../hooks/useArticleContext";
import { format } from "date-fns";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaRegTrashAlt } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
function AllArticlesList() {
  const location = useLocation();
  const { articles, dispatch } = useArticleContext();
  const { user } = useAuthContext();
  console.log(articles);

  const handleDelete = async (articleId) => {
    try {
      // Perform the deletion request here
      await fetch(`https://mernback-875f.onrender.com/api/blogs/articles/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          // You may need to include authorization headers if required
        },
      });
      // Update the UI by removing the deleted article from the articles array
      dispatch({ type: "DELETE_ARTICLE", payload: articleId });
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center  flex-col mt-[60px] lg:mt-[100px] mb-[100px]  ">
        <h1 className="font-[Poppins] text-[30px] px-9 mb-5 lg:text-center">All Articles</h1>
        {articles?.map((a) => (
          <div className="p-[2rem]    font-[Poppins] mb-[30px] w-[90%] lg:w-[40%] m-auto cursor-pointer rounded-[20px] text-white text-[20px] bg-[#121212] shadow-[5px_5px_5px_#000]">
            <Link to={`/article/${a._id}`} className="title">
              {a.title}
            </Link>
            <p className="author">By {a.author}</p>
            <div className="tag_holder">
              {a.tags.map((tag) => (
                <span className="tag">{tag}</span>
              ))}
            </div>
            <div className="article_footer">
              <p>{format(new Date(a.createdAt), "MMM dd, yyyy | h:mm a")}</p>
              {user && <FaRegTrashAlt onClick={() => handleDelete(a._id)} />}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default AllArticlesList;
