import React, { Component } from "react";
import axios from "axios";

import PortfolioManagerItem from "../portfolio/portfolio-manager-item";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(
      this
    );
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleSuccessfulFormSubmission(portfolioItem) {
    // TODO
    // update the data state
    // and add the portfolioItem to the list
  }

  handleFormSubmissionError(error) {
    console.log("An error occured submitting the form: ", error);
  }

  getPortfolioItems = () => {
    axios
      .get("https://huntergreen.devcamp.space/portfolio/portfolio_items", {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          data: response.data.portfolio_items
        });
      })
      .catch(error => {
        console.log("There was an error retrieving data from the api: ", error);
      });
  };

  renderPortfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioManagerItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
          />
        </div>
        <div className="right-column">
          <div className="portfolio-manager-items-wrapper">
            {this.renderPortfolioItems()}
          </div>
        </div>
      </div>
    );
  }
}
