import React, { Component } from "react"
import axios from "axios"

import PortfolioManagerItem from "../portfolio/portfolio-manager-item"

export default class PortfolioManager extends Component {
    constructor() {
        super()

        this.state = {
            data: []
        }
    }

    getPortfolioItems = () => {
        axios.get("https://huntergreen.devcamp.space/portfolio/portfolio_items", { withCredentials: true })
        .then(response => {
            this.setState({
                data: response.data.portfolio_items
            })
            console.log(this.state.data)
        }).catch(error => {
            console.log("There was an error retrieving data from the api: ", error)
        })
    }

    renderPortfolioItems() {
        return (
            this.state.data.map(item => {
                return(
                    <PortfolioManagerItem
                    key={item.id}
                    item={item}
                    />
                )
            })
        )
    }

    componentDidMount() {
        this.getPortfolioItems()
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <h1>Portfolio form....</h1>
                </div>
                <div className="right-column">
                     <div className="portfolio-manager-items-wrapper">
                        {this.renderPortfolioItems()}
                    </div>
                </div>
            </div>
        )
    }
}
