import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../redux/store';

class Movies extends Component {
    state = {
        searchLine:[],
        movies: []
    }
        
    componentDidMount() {
        store.subscribe(()=>{
                const globalstate=store.getState();
                fetch (`https://www.omdbapi.com/?apikey=c91de501&s=${globalstate.searchLine}`)
                .then (resp=>{
                    return resp.json();
                })
                .then (data=>{
                    data.response === false?
                    this.setState({movies: 0}):
                    this.setState({movies: data.Search});
                })
                
                .catch((error)=> {
                    console.log("Error : ", error);
                })
        })
    }

    render() {
        return (
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    
                    </li>
                ))}
            </ul>
        );
    }
}

export default Movies;