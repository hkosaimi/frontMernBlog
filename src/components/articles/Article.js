import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
const Article = () => {
  const { id } = useParams();

  // Fetch the specific article data based on the ID
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch article data based on the ID from the server
    fetch(`/api/blogs/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  return (
    <div>
      {/* This is temporary test for the front end design on github */}
      <div className="article">
        <h2>
          Unraveling the Elegance of Differential Equations: A Deep Dive into Mathematical Dynamics
        </h2>
        <span>By Hussain Al-Osaimi</span>
        <span>24/1/2024 4:23 AM</span>

        <p>
          Differential equations, the backbone of mathematical modeling, serve as the elegant
          language through which nature expresses its dynamic processes. These equations, weaving
          through various scientific disciplines, provide a profound understanding of how quantities
          change in relation to each other. In this exploration, we embark on a journey through the
          intricacies of differential equations and their transformative role in deciphering the
          laws governing the ever-changing world around us. The Essence of Differential Equations At
          its essence, a differential equation captures the relationship between a function and its
          derivatives. These equations become powerful tools for modeling phenomena where rates of
          change are fundamental, such as population dynamics, heat diffusion, or the motion of
          celestial bodies. The beauty lies in their ability to articulate the evolution of a system
          over time, making them indispensable in fields ranging from physics and engineering to
          biology and economics. Types of Differential Equations Differential equations come in
          various forms, each catering to different scenarios. Ordinary Differential Equations
          (ODEs) describe systems involving a single variable, while Partial Differential Equations
          (PDEs) extend their reach to systems with multiple variables. Linear, nonlinear, and
          stochastic differentials provide a spectrum of complexity, allowing mathematicians and
          scientists to model systems with increasing precision and accuracy.
        </p>
      </div>

      {article ? (
        <>
          <div className="article">
            <h2>{article.title}</h2>
            <span>By {article.author}</span>
            <span>{format(new Date(article.createdAt), "dd/MM/yyyy h:mm a")}</span>

            <p>{article.content}</p>
          </div>
        </>
      ) : (
        <p>{/* Article not found */}</p>
      )}
    </div>
  );
};

export default Article;
