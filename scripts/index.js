// script.js

document.addEventListener("DOMContentLoaded", () => {
  const articleList = document.getElementById("article-list");
  const featuredArticles = []; // Empty for now

  articleList.innerHTML = "";

  if (featuredArticles.length === 0) {
    const fallback = document.createElement("li");
    fallback.textContent = "No featured articles available at the moment. Check back soon!";
    articleList.appendChild(fallback);
  } else {
    featuredArticles.forEach(article => {
      const li = document.createElement("li");
      li.textContent = article;
      articleList.appendChild(li);
    });
  }
});