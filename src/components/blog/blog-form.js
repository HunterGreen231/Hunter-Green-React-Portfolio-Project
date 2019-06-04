import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
      content: "",
      featured_image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(
      this
    );

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

    this.featuredImageRef = React.createRef();
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: file => this.setState({ featured_image: file })
    };
  }

  handleRichTextEditorChange(content) {
    this.setState({ content });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    if (this.state.featured_image) {
      formData.append(
        "portfolio_blog[featured_image]",
        this.state.featured_image
      );
    }

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "https://huntergreen.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        if (this.state.featured_image) {
          this.featuredImageRef.current.dropzone.removeAllFiles();
        }

        this.setState({
          title: "",
          blog_status: "",
          content: "",
          featured_image: ""
        });

        this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);
      })
      .catch(error => {
        console.log("handleSubmit for blog error: ", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            onChange={this.handleChange}
            name="title"
            type="text"
            placeholder="Blog Title"
            value={this.state.title}
          />
          <input
            onChange={this.handleChange}
            name="blog_status"
            type="text"
            placeholder="Blog Status"
            value={this.state.blog_status}
          />
        </div>

        <div className="one-column">
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
          />
        </div>

        <div className="image-uploaders">
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFeaturedImageDrop()}
          >
            <div className="dz-message">Featured Image</div>
          </DropzoneComponent>
        </div>

        <button className="btn" type="submit">
          save
        </button>
      </form>
    );
  }
}
