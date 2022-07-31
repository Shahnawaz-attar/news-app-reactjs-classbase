import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class News extends Component {
    // destructuring the props
    static defaultProps = {
        pageSize : 10,
        page : 1,
        country : 'in',
        category : 'general'
    }
    static propTypes = {
        pageSize : propTypes.number.isRequired,
        page : propTypes.number.isRequired,
        country : propTypes.string.isRequired,
        category : propTypes.string.isRequired
    }

  
    constructor(props){
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page : 1,
            totalResults: 0,
      

        }
        document.title = `${this.props.category.slice(0,1).toUpperCase()}${this.props.category.slice(1)} - News Monkey`
    }
    // 2b9b082eea624280a279a9b7eef96ff3
    // b6b6704f63ef40bd8772d0c8036edd0e
    async componentDidMount(){
        this.setState({loading: true})
        const res = await fetch('https://newsapi.org/v2/top-headlines?country='+this.props.country+'&category='+this.props.category+'&apiKey=2b9b082eea624280a279a9b7eef96ff3&pageSize='+this.props.pageSize+'&page='+this.state.page)
        const data = await res.json()
        this.setState({articles: data.articles, loading: false , totalResults: data.totalResults})
    }
    handlePreClick = () => {
        this.setState({page: this.state.page - 1})
        this.componentDidMount()
    }

    handleNextClick = () => {


        this.setState({page: this.state.page + 1})
        this.componentDidMount()


    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1})
        const res = await fetch('https://newsapi.org/v2/top-headlines?country='+this.props.country+'&category='+this.props.category+'&apiKey=2b9b082eea624280a279a9b7eef96ff3&pageSize='+this.props.pageSize+'&page='+this.state.page)
        this.setState({loading: true})
        const data = await res.json()
        setTimeout(() => {
            this.setState({articles: [...this.state.articles, ...data.articles], loading: false , totalResults: data.totalResults})
        }, 3000)
    }


  render() {
    

    return (
      <div className='container'>
       
        
        <h1 className='text-center my-3'>News Monkey on {this.props.category.slice(0,1).toUpperCase()}{this.props.category.slice(1)} Category</h1>
        {/* { this.state.loading ? <Spinner /> : null } */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={ this.state.loading ? <Spinner /> : null } 
        >
        <div className="container">
        <div className="row mt-5">
        {
            this.state.articles.map((article,index) => {
                return  <Newsitem key={index} {...article} />
            }
            )
        }
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className='container  d-flex justify-content-between my-5'>
        <div>Page No {this.state.page}</div>
        <div>No of articles in this page {this.state.articles.length}</div>

        </div> */}
      
        {/* <div className='container  d-flex justify-content-between my-5'> */}
          
                {/* add  pre and next */}
                {/* <button disabled={this.state.page<=1} className='btn btn-primary' onClick={this.handlePreClick} > Pre</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-primary' onClick={this.handleNextClick} > Next</button> */}
        
      {/* </div> */}

    </div>
    )
  }
}
