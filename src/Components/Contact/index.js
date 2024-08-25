import "./Contact.css";
import React, {useState, useEffect} from "react";
import { format } from "date-fns";
import axios from "axios";
import $ from "jquery";

import { AuthUrls } from "../../constants/urls";
import Avatar from "../../Pictures/avatar.png";

export default function Contact(){

    const [toggle, setToggle] = useState(localStorage.getItem("username"))

    return (

        <div>
            <footer className="footer bg-black small text-center text-white-50"><div className="container px-4 px-lg-5">Copyright &copy; Python Solutions 2024</div></footer>
        </div>
    )

}

export function Messages(props){

    const [toggle, setToggle] = useState(localStorage.getItem("token"))
    const [messages, setMessages] = useState([])
    const {article} = props; 
    const updateURL = AuthUrls.ADD_MESSAGE;
    const user = localStorage.getItem("username");

    const config = {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: " +  localStorage.getItem("token"),
          },
    }

    function format_date(date) {
        var date = new Date(date);
        var formattedDate = format(date, "MMMM do, yyyy H:mma");
        
        return formattedDate;
    }

    $("#message_error").hide();
    function SaveMessage(event) {
        const sent_message = $("#message").val();
        if(sent_message){
            const contentValues = {
                "message" : $("#message").val(),
                user: localStorage.getItem("username"),
                "message_id" : "",
                "article": article.id
            }
        
            return axios.post(updateURL, contentValues, config).then((response) => {
                window.location.reload();
            }).catch(error => {
    
            });
        } else {
            $("#message_error").show();
            $("#message_error").html("Please leave a message")
        }

    }

    useEffect(() => {
        {!messages == [] &&
            axios.get(updateURL + "?search=" + article.id, config).then((response) => {
                setMessages(response.data);
            }).catch(error => {
            });
        }
    }, []);
    
    return (
        <div>
            {toggle &&<div className="">
                
                <div className="text-center" style={{padding:"50px 0"}}>
                <div className="alert alert-info" id="message_error"></div>
                    <div className="main-message-1">
                            <div className="main-all-forms-1">
                                <div className="comments">
                                        <textarea name="message" id="message" className="form-control" placeholder="Your Comment*" style={{width:"310px"}}></textarea>
                                </div>
                                <button type="button" className="main-form-button" onClick={SaveMessage}>
                                    <i className="fa fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />

                    <div class="row d-flex justify-content-center">
                        <div class="col-md-12 col-lg-10">
                            <div class="card text-body">
                            <div class="card-body p-4">
                                <h4 class="mb-0">Recent comments</h4>
                                <p class="fw-light mb-4 pb-2">Latest Comments section by users</p>

                                    {messages.map(message => (

                                        <message key={message.id}>

                                                <div class="d-flex flex-start">
                                                    <img class="rounded-circle shadow-1-strong me-3" src={Avatar} alt="avatar" width={"60"} height={"60"} />
                                                    <div>
                                                    <h6 class="fw-bold mb-1">{message.first_name} {message.last_name}</h6>
                                                    <div class="d-flex align-items-center mb-3">
                                                        <p class="mb-0">
                                                        {format_date(message.created_at)}
                                                        {/* <span class="badge bg-primary">Pending</span> */}
                                                        </p>
                                                        <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                                                        <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
                                                        <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
                                                    </div>
                                                        <p class="mb-0">
                                                            { message.message }
                                                        </p>
                                                    </div>
                                                </div>
                                                <br />
                                                <hr class="my-0" style={{height: "1px"}} />
                                        </message>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )

}