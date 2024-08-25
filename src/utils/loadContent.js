import axios from "axios";
import Cookies from "js-cookie";
import $ from "jquery";

import { AuthUrls } from "../constants/urls";
import history from "../utils/historyUtils";


export default function loadContent(page=null, field=null, image=null, dispatch) {

    const loadURL = AuthUrls.LOAD_CONTENT;

    const contentValues = {
        field : field,
        page : page,
    }

    if (image){
        contentValues["image"] = image
    }

    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
    }

    const accepted = localStorage.getItem("terms_acctepted");

    function accept_terms(){
        history.push("/accept_terms");
        window.location.reload();
    }

    if(!accepted && window.location.href.search("accept_terms") === -1){
        setTimeout(accept_terms, 10000)
    }

    return axios.post(loadURL, contentValues, config).then((response) => {
        console.log("Starting to save data")

        if(response.data.home !== ""){
            const home_data = response.data.home[0];
            localStorage.setItem("home_id", home_data.id);
            localStorage.setItem("home_name", home_data.name);
            localStorage.setItem("home_title", home_data.title);
            localStorage.setItem("home_description", home_data.title_description);
            localStorage.setItem("home_paragraph_1", home_data.paragraph_1);
            localStorage.setItem("home_paragraph_2", home_data.paragraph_2);
            localStorage.setItem("home_paragraph_3", home_data.paragraph_3);
            localStorage.setItem("home_paragraph_4", home_data.paragraph_4);
            localStorage.setItem("home_paragraph_5", home_data.paragraph_5);
            localStorage.setItem("page_name", home_data.name);
            if (home_data.hero_image === ""){
                localStorage.setItem("home_hero_image", process.env.REACT_APP_PUBLIC_HTML + "/images/background1.jpg");
            } else {
                localStorage.setItem("home_hero_image", process.env.REACT_APP_BACKEND_URL + "/media/" + home_data.hero_image);
            }
        };

        if(response.data.about !== ""){
            const about_data = response.data.about[0];
            localStorage.setItem("about_id", about_data.id);
            localStorage.setItem("about_name", about_data.name);
            localStorage.setItem("about_title", about_data.title);
            localStorage.setItem("about_description", about_data.title_description);
            localStorage.setItem("about_paragraph_1", about_data.paragraph_1);
            localStorage.setItem("about_paragraph_2", about_data.paragraph_2);
            localStorage.setItem("about_paragraph_3", about_data.paragraph_3);
            localStorage.setItem("about_paragraph_4", about_data.paragraph_4);
            localStorage.setItem("about_paragraph_5", about_data.paragraph_5);
            if (about_data.hero_image === ""){
                localStorage.setItem("about_hero_image", process.env.REACT_APP_PUBLIC_HTML + "/images/background1.jpg");
            } else {
                localStorage.setItem("about_hero_image", process.env.REACT_APP_BACKEND_URL + "/media/" + about_data.hero_image);
            }
        };


        response.data.articlepage.map(function(article_data){

            localStorage.setItem("article_id", article_data.id);
            localStorage.setItem("article_name", article_data.name);
            localStorage.setItem("article_title", article_data.title);
            localStorage.setItem("article_description", article_data.title_description);
            localStorage.setItem("article_header_1", article_data.header_1);
            localStorage.setItem("article_header_2", article_data.header_2);
            localStorage.setItem("article_header_3", article_data.header_3);
            localStorage.setItem("article_header_4", article_data.header_4);
            localStorage.setItem("article_header_5", article_data.header_5);

            localStorage.setItem("article_paragraph_1", article_data.paragraph_1);
            localStorage.setItem("article_paragraph_2", article_data.paragraph_2);
            localStorage.setItem("article_paragraph_3", article_data.paragraph_3);
            localStorage.setItem("article_paragraph_4", article_data.paragraph_4);
            localStorage.setItem("article_paragraph_5", article_data.paragraph_5);
            localStorage.setItem("article_paragraph_6", article_data.paragraph_6);
            localStorage.setItem("article_paragraph_7", article_data.paragraph_7);
            localStorage.setItem("article_name", article_data.name);

            if (article_data.hero_image === ""){
                localStorage.setItem("article_hero_image", process.env.REACT_APP_PUBLIC_HTML + "/images/background1.jpg");
            } else {
                localStorage.setItem("article_hero_image", process.env.REACT_APP_BACKEND_URL + "/media/" + article_data.hero_image);
            }
            return []
        })

        if(response.data.articlepage){
            

        };

        localStorage.setItem("csrf_token", response.data.csrf_token);
        localStorage.setItem("articles", JSON.stringify(response.data.articles));
        localStorage.setItem("articles_gallery", JSON.stringify(response.data.articles_gallery));
        if(!localStorage.getItem("username")){
            localStorage.setItem("username", "anonymous");
            window.location.reload();
        }
    }).catch(error => {


        const error_html = '<span><div class="notif notif--info"><div class="notif__icon"></div><div class="notif__content"><span class="notif__message">{message}</span></div><div class="notif__close"></div></div></span>';

        if("message" in error && "code" in error){
            const message = error.message + " with code : " + error.code;
            $(".notif__container span").html(error_html.replace("{message}", message));
            localStorage.setItem("user_articles", JSON.stringify([]));
        }
    });

}


export async function loadUserContent() {

    const loadURL = AuthUrls.UPDATE_ARTICLE + "?search=" + localStorage.getItem("username");

    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: Token " +  localStorage.getItem("token"),
            "X-CSRFTOKEN": Cookies.get("csrftoken")
          },
    }

    return await axios.get(loadURL, config).then((response) => {



        if(response.data !== ""){
            localStorage.setItem("csrf_token", response.data.csrf_token);
            localStorage.setItem("user_articles", JSON.stringify(response.data));
        }

    }).catch(error => {

        const error_html = '<span><div class="notif notif--info"><div class="notif__icon"></div><div class="notif__content"><span class="notif__message">{message}</span></div><div class="notif__close"></div></div></span>';

        if("message" in error && "code" in error){
            const message = error.message + " with code : " + error.code;
            $(".notif__container span").html(error_html.replace("{message}", message)).animate(10).hide("slow");
            localStorage.setItem("user_articles", JSON.stringify([]));
        }
        //alert(JSON.stringify(error));
    });
}