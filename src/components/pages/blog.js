import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Blog extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Blog Page</h2>
        <div>
          <Link to="/about-me">Read more about me</Link>
        </div>
      </div>
    );
  }
}
