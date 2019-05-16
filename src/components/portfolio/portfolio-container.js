import React, { Component } from "react";
import axios from 'axios'

import PortfolioItem from './portfolio-item'
import { toASCII } from "punycode";

export default class PortfolioContainer extends Component {
    // Class Component
        // State
            // Lifecycle hooks
    constructor() {
        super()

        this.state = {
            isLoading: false,
            pageTitle: "Welcome to my portfolio!",
            data: []
        }

        this.handleFilter = this.handleFilter.bind(this)
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category.toLowerCase() === filter
            })
        })
    }

    getPortfolioItems() {
        axios.get('https://huntergreen.devcamp.space/portfolio/portfolio_items')
          .then(response => {
            this.setState({
                data: response.data.portfolio_items
            })
          })
          .catch(error =>  {
            console.log(error);
          });
      }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem
            key={item.id}
            item={item}/>
        })
    }

    componentDidMount() {
        this.getPortfolioItems()
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading......</div>
        }
        return (
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter('technology')}>Technology</button>
                <button className="btn" onClick={() => this.handleFilter('social media')}>Social Media</button>
                <button className="btn" onClick={() => this.handleFilter('search engine')}>Search Engine</button>

                {this.portfolioItems()}
            </div>
        );
    }
}