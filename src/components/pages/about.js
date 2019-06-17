import React from "react";
import profilePicture from "../../../static/assets/images/Hunter-Small.jpg";

export default function() {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column"
        style={{
          background: `url(${profilePicture}) no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column">
        I discovered I had a passion for coding at the beginning of High School
        when I took my first coding class in JavaScript. Ever since then I knew
        that one day I would become a software developer. I also have a passion
        for overcoming difficult challenges and learning from them. After High
        School I attended a coding boot camp at Bottega and learned everything I
        need to know to be able to build a website from start to finish. I'm
        currently working on multiple professional photography websites. I will
        help your company with my systematic approach to solving problems, and
        passion for solutions.
      </div>
    </div>
  );
}
