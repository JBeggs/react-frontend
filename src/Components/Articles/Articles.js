import "./Articles.css";
import React from 'react';
import { format } from "date-fns";
import {handleEdit, handleSave} from "../../utils/saveContent";
import { CreateArticle } from "./CreateArticle";


export default function Articles() {

    function format_date(date) {
        var date = new Date(date);
        var formattedDate = format(date, "MMMM do, yyyy H:mma");
        
        return formattedDate;
    }

    const is_admin = localStorage.getItem("is_admin");
    const articles = JSON.parse(localStorage.getItem("user_articles")) ? JSON.parse(localStorage.getItem("user_articles")) : [];

    return (
        <div className="container">
            <div className="row">
    
            <div className="col-lg-12">
                <section className="" id="about">
                    <div className="container">
                        <div className="text-center">
                            <h2 
                                onClick={handleEdit}
                                onBlur={handleSave}
                                className="section-heading text-uppercase"
                                contentEditable={is_admin}
                                suppressContentEditableWarning={is_admin}
                                field={"paragraph_3"}
                                id={localStorage.getItem("article_id")}
                                page={"article"}
                            >
                                {localStorage.getItem("article_paragraph_3")}
                            </h2>
                            <h3 
                                onClick={handleEdit}
                                onBlur={handleSave}
                                className="section-subheading text-muted"
                                contentEditable={is_admin}
                                suppressContentEditableWarning={is_admin}
                                field={"paragraph_4"}
                                id={localStorage.getItem("article_id")}
                                page={"article"}
                            >
                                {localStorage.getItem("article_paragraph_4")}
                            </h3>
                        </div>

                        <ul className="timeline">

                            {articles.map((article, index) => (

                                <li key={index} className={index % 2 === 0 ? 'timeline-inverted' : null}>
                                    <div className="timeline-image">
                                        <img 
                                            className="rounded-circle img-fluid" 
                                            src={article.hero_image != null ? article.hero_image : process.env.REACT_APP_PUBLIC_HTML + '/images/background1.jpg'} 
                                            alt={article.title}
                                        />
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                            <p>{format_date(article.created_at)}</p>
                                            <h4 className="subheading">{article.title}</h4>
                                        </div>
                                        <div className="timeline-body"><p className="text-muted">{article.title_description}</p></div>
                                        <div><a href={"/article/" + article.slug}><i className="fa fa-link"></i> Read more</a></div>
                                    </div>
                                </li>
                            ))}
                            
                            <li className="timeline-inverted">
                                <div className="timeline-image">
                                    <h4>
                                        Be Part
                                        <br />
                                        Of Our
                                        <br />
                                        Story!
                                    </h4>
                                </div>
                            </li>
                        </ul>
                        {!articles && <CreateArticle />}
                    </div>
                </section>

            </div>
        </div>
      </div>
    );
  }