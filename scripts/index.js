// script.js

document.addEventListener("DOMContentLoaded", () => {
  const articleList = document.getElementById("article-list");
  const featuredArticles = [
    "The Origin of Sinco",
    "Timeline of the Retold Universe",
    "Major Factions Explained",
    "Key Characters: Vol 1",
    "Artifacts and Technology"
  ];

  articleList.innerHTML = "";

  featuredArticles.forEach(article => {
    const li = document.createElement("li");
    li.textContent = article;
    articleList.appendChild(li);
  });
});