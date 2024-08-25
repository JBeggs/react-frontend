import "./HomeArticles.css";
import React from 'react';

import { format } from "date-fns";
import { CreateArticle } from "./CreateArticle";


export default function ArticlesHome() {

    const articles = JSON.parse(localStorage.getItem("articles"));

    function excludeAdmin() {
        if(!articles){
            return [];
        }

        return articles.filter(article => article.creator__username !== "admin");
    }

    const main_article = excludeAdmin()[0]
    const article_list = excludeAdmin().slice(1);

    function format_date(mewdate) {
        var date = new Date(mewdate);
        var formattedDate = format(date, "MMMM do, yyyy H:mma");
        
        return formattedDate;
    }
    return (
        <div id="wrapper" className="fade-in">

            <div id="main">

                {main_article ? 
                <article className="post featured">
                    <header className="major">
                    <h3>{format_date(main_article.created_at)}</h3><br />
                    <h3>{main_article.category}</h3>
                    <span>Updated by {main_article.creator__first_name } {main_article.creator__last_name}</span>
                        <h2><a rel="noreferrer" href={"/article/" + main_article.slug}>{main_article.title}</a></h2>
                        <p>{main_article.paragraph_1}</p>
                    </header>
                    <span>Full article found at <a href={main_article.link} target="_blank" rel="noreferrer">Here</a></span>
                    <a rel="noreferrer" href={"/article/" + main_article.slug}  className="image main"><img src={main_article.hero_image !== "" ? process.env.REACT_APP_BACKEND_URL + "/media/" + main_article.hero_image : process.env.REACT_APP_PUBLIC_HTML + '/images/background1.jpg'} alt={main_article.tile} /></a>
                    <ul className="">
                        <li><a href={"/article/" + main_article.slug}  className="button">Full Story</a></li>
                    </ul>
                </article> : 
                
                <CreateArticle />
                }

                {article_list &&
                <section className="posts">
                    {article_list.map(article => (

                            <article key={article.id}>
                                <header>
                                    <span className="date">{format_date(article.created_at)}</span>
                                    <h2><a href={"/article/" + article.slug}>{article.title}</a></h2>
                                    <h3>{article.category}</h3>
                                </header>
                                <a href={"/article/" + article.slug}  className="image fit">
                                    <img 
                                        src={article.hero_image !== "" ? process.env.REACT_APP_BACKEND_URL + "/media/" + article.hero_image : process.env.REACT_APP_PUBLIC_HTML + '/images/background1.jpg'}
                                        alt={article.title} />
                                    </a>
                                <p>{article.paragraph_1} </p>
                                <ul className="actions">
                                    <li><a href={"/article/" + article.slug} className="button">Full Story</a></li>
                                </ul>
                                <span>Updated by { article.creator__first_name } { article.creator__last_name }</span>
                                <br />
                                <span>Full article found at <a href={article.link} target="_blank" rel="noreferrer">Here</a></span>
                            </article>

                        ))}

                </section>}
            </div>


        </div>     
        
    );
  }