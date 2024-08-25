import axios from "axios";
import { AuthUrls } from "../constants/urls";
import history from "../utils/historyUtils";

function saveContent(id, value=null, field=null, page=null, image=null) {
    
    const updateURL = AuthUrls.UPDATE_CONTENT + id + "/";

    const contentValues = {
        [field] : value,
        page : page,
        id : id,
        creator: localStorage.getItem("username"),
    }

    if (image){
        contentValues["image"] = image
    }

    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: " +  localStorage.getItem("token"),
          },
    }

    return axios.put(updateURL, contentValues, config).then((response) => {
        // setTimeout(() => {
        //     window.location.reload();
        //   }, 5000);
        

    }).catch(error => {
        //alert(error);
    });
}


export function saveArticle(id, value=null, field=null, image=null) {
    
    const updateURL = AuthUrls.UPDATE_ARTICLE + id + "/";

    const contentValues = {
        [field] : value,
        id : id,
        creator: localStorage.getItem("username"),
    }

    if (image){
        contentValues["image"] = image
    }

    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: " +  localStorage.getItem("token"),
          },
    }

    return axios.put(updateURL, contentValues, config).then((response) => {


    }).catch(error => {
        //alert(error);
    });
}

export const handleEdit = (e) => {

    let change = document.getElementsByClassName("editing")
    if(change.length > 0){
      change[0].className = change[0].className.replace(" editing", "");
    }
    e.target.className = e.target.className  + " editing";
};

export const handleSave = (e) => {

    const strip=(text) =>{
        return (new DOMParser()?.parseFromString(text,"text/html"))
        ?.body?.textContent
    }

    if(document.getElementsByClassName("editing").length > 0 ){
        const content = strip(document.getElementsByClassName("editing")[0].innerHTML);
        document.getElementsByClassName("editing")[0].innerHTML = content;
        e.target.className = e.target.className.replace(" editing", "");
    
        saveContent(
            e.target.getAttribute("id"), 
            content, 
            e.target.getAttribute("field"),
            e.target.getAttribute("page"),
    
        );
    }
    //window.location.reload();
};

export const handleArticleSave = (e) => {

    const strip=(text) =>{
        return (new DOMParser()?.parseFromString(text,"text/html"))
        ?.body?.textContent
    }
    if(document.getElementsByClassName("editing").length > 0 ){
        const content = strip(document.getElementsByClassName("editing")[0].innerHTML);
        document.getElementsByClassName("editing")[0].innerHTML = content;
        e.target.className = e.target.className.replace(" editing", "");
        if (content != "..."){
            saveArticle(
                e.target.getAttribute("id"), 
                content, 
                e.target.getAttribute("field"),
                e.target.getAttribute("page"),
    
            );
        }

    }
    //window.location.reload();

};


export function newArticle(value=null, field=null) {
    
    const user = localStorage.getItem("username");

    if(!user){
        history.push("login");
        window.location.reload();
    }

    const updateURL = AuthUrls.UPDATE_ARTICLE;

    const contentValues = {
        [field] : value,
        creator: localStorage.getItem("username"),
        "title" : "Default title"
    }
    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: " +  localStorage.getItem("token"),
          },
    }

    return axios.post(updateURL, contentValues, config).then((response) => {
        history.push("article/new-article");
        window.location.reload();

    }).catch(error => {
        //alert(error);
    });
}


export function deleteArticle(id) {
    
    const updateURL = AuthUrls.UPDATE_ARTICLE + id + "/";

    const contentValues = {
        id : id,
        creator: localStorage.getItem("username"),
    }

    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: " +  localStorage.getItem("token"),
          },
    }

    return axios.delete(updateURL, contentValues, config).then((response) => {
        history.push("/articles");
        window.location.reload();

    }).catch(error => {
        //alert(error);
    })}