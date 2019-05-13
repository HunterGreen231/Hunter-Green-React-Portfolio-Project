import React, { Component } from "react";

import PortfolioItem from './portfolio-item'

export default class PortfolioContainer extends Component {
    // Class Component
        // State
            // Lifecycle hooks
    constructor() {
        super()

        this.state = {
            isLoading: false,
            pageTitle: "Welcome to my portfolio!",
            data: [
                {title: 'Quip', category: 'eCommerce', slug: 'quip'},
                {title: 'Eventbrite', category: 'Scheduling', slug: 'eventbright'},
                {title: 'Ministry Safe', category: 'Enterprise', slug: 'ministry-safe'},
                {title: 'SwingAway', category: 'eCommerce', slug: 'swingaway'}
            ]
        }

        this.handleFilter = this.handleFilter.bind(this)
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter
            })
        })
    }

    portfolioItems() {        
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url={'google.com'} slug={item.slug}/>
        })
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading......</div>
        }
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                {this.portfolioItems()}

                <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
            </div>
        );
    }
}