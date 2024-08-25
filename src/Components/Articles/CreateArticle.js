import "./HomeArticles.css";
import React from 'react';
import { newArticle, saveArticle, deleteArticle } from "../../utils/saveContent.js"


export function CreateArticle() {

    return (
        <div id="wrapper" className="fade-in">
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">There are no Articles, Be the first to add one...</h1>
                <div className="col-lg-6 mx-auto">
                <p className="lead mb-4"></p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button 
                        type="button" 
                        className="btn" 
                        onClick={() => newArticle("My first article", "name")}
                    >
                            Create Article
                    </button>
                </div>
                </div>
            </div>
        </div>     
    );
}

export function UpdateArticle(props) {

    const is_owner = props.article.creator__username ===  localStorage.getItem("username") || props.article.creator ===  localStorage.getItem("username")

    return (
        <section>
            {is_owner &&
            
            <div id="" className="fade-in">
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">Tools</h1>
                    <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">If you are happy you can publish the article to appear on the home page.</p>
                    <p className="lead mb-4">Or delete the article.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" className="btn" onClick={() => 
                            {saveArticle(props.article.id, true, "active"); }
                            
                        }>
                            Publish Article
                        </button>
                        <button type="button" className="btn" onClick={() => 
                            {deleteArticle(props.article.id, true, "active"); }
                            
                        } >Delete Article</button>
                    </div>
                    </div>
                </div>
            </div>}   
        </section>
    
    );
}

export function CreateNewArticle() {

    const user = localStorage.getItem("username");
    const is_admin = localStorage.getItem("is_admin");

    return (
        <section>
            { user && !is_admin && <div id="wrapper" className="fade-in">
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">Want add a new article, please login or signup...</h1>
                    <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4"></p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button 
                            type="button" 
                            className="btn" 
                            onClick={() => newArticle("New Article", "name")}
                        >
                                Create New Article
                        </button>
                    </div>
                    </div>
                </div>
            </div>}
        </section>  
    );
}
