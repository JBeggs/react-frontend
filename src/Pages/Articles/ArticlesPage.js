import "../../App.css";
import React, { Component } from "react";
import About from "../../Components/About";
import Contact from "../../Components/Contact";
import Articles from "../../Components/Articles/Articles.js";
import ArticleHero from "../../Components/Hero/ArticleHero";
import { CreateNewArticle } from "../../Components/Articles/CreateArticle.js";

class ArticlesPage extends Component {

  render() {
    return (
      <div>
        <ArticleHero />
        <Articles />
        <CreateNewArticle />
        <Contact />
      </div>
      
    );
  }
}

export default ArticlesPage;
