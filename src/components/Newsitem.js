import React, { Component } from 'react'

export default class Newsitem extends Component {

    render() {
        let { title, description,urlToImage,url } = this.props;
        return (
           
                <div className="col-lg-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={urlToImage} className="card-img-top" alt="..." height="161" />
                        <div className="card-body" style={{height:'300px'}}>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={`/getNewsDetail/${url}`} className="btn btn-primary">Get detail</a>
                        </div>
                    </div>
                </div>
        
        )
    }
}
