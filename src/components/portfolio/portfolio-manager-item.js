import React from "react"

export default function portfolioMangerItem(props) {
    const { id, name, description, url, category, position, thumb_image_url, banner_image, logo} = props.item

    return (
        <div className="portfolio-item-thumb">
            <div className="portfolio-thumb-image">
                <img src={thumb_image_url} />
            </div>
            <h2>{id}</h2>
            <h1 className="title">{name}</h1>
        </div>
    )
}