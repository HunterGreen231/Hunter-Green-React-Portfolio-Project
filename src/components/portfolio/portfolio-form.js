import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "technology",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleBannerDrop = this.handleBannerDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);
  }

  handleThumbDrop() {
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }

  handleBannerDrop() {
    return {
      addedfile: file => this.setState({ banner_image: file })
    };
  }

  handleLogoDrop() {
    return {
      addedfile: file => this.setState({ logo: file })
    };
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

  handleSubmit(event) {
    axios
      .post(
        "https://huntergreen.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
      })
      .catch(error => {
        console.log("Portfolio form handle submit error: ", error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[position]", this.state.position);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[description]", this.state.description);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }

    return formData;
  }

  render() {
    return (
      <div>
        <h1>PortfolioForm</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Portfolio Item Name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <input
              type="text"
              name="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={this.state.position}
              onChange={this.handleChange}
            />

            <select
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              <option value="technology">Technology</option>
              <option value="social media">Social Media</option>
              <option value="search engine">Search Engine</option>
            </select>
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="image-uploaders">
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            />
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleBannerDrop()}
            />
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleLogoDrop()}
            />
          </div>

          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}