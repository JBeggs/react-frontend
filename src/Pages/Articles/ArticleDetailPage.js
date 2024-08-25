import "../../App.css";
import React, { Component } from "react";
import About from "../../Components/About";
import Contact from "../../Components/Contact";
import ArticleDetail from "../../Components/Articles/ArticleDetail";
import ArticleDetailHero from "../../Components/Hero/ArticleDetailHero";


class ArticleDetailPage extends Component {

  render() {
    return (
      <div>
        <ArticleDetailHero />
        <ArticleDetail />
        <Contact />
      </div>
      
    );
  }
}

export default ArticleDetailPage;
