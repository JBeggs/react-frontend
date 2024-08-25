import "./About.css";
import React, { Component } from "react";
import { handleEdit, handleSave } from "../../utils/saveContent";
import { UploadHeroImage } from "../../Components/FileUploads";

function About() {

    const is_admin = localStorage.getItem("is_admin");
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            <section className="about-section text-center">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8">
                            <h2 
                            className="text-white mb-4"
                            onClick={handleEdit}
                            onBlur={handleSave}
                            contentEditable={is_admin}
                            suppressContentEditableWarning={is_admin}
                            field={"paragraph_1"}
                            id={localStorage.getItem("home_id")}
                            page={"about"}
                            >
                              {localStorage.getItem("home_paragraph_1")}
                            </h2>
                            <p 
                              className="text-white-50"
                              onClick={handleEdit}
                              onBlur={handleSave}
                              contentEditable={is_admin}
                              suppressContentEditableWarning={is_admin}
                              field={"paragraph_2"}
                              id={localStorage.getItem("home_id")}
                              page={"about"}
                            >
                                {localStorage.getItem("home_paragraph_2")}
                            </p>
                        </div>
                    </div>
                    <img 
                      className="img-fluid" 
                      src={localStorage.getItem("about_hero_image")} 
                      alt={localStorage.getItem("about_name")}
                    />
                    {is_admin && <UploadHeroImage page="2" />}
                </div>
            </section>
      </div>
      </div>
      </div>
    );
}

export default About;



