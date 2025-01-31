import React, { Component } from 'react';
import './MovieItem.css';
import store from '../../redux/store';

class MovieItem extends Component {

    addToFavorites(Title, Year, Poster, imdbID) {
        store.dispatch({
            type: 'ADD_TO_FAVORITES',
            payload: {
                title: Title,
                year: Year,
                poster: Poster,
                id: imdbID
            }
        })
        
    }

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year});</h3>
                    <button
                        type="button"
                        className="movie-item__add-button"
                        onClick={() => { this.addToFavorites(Title, Year, Poster, imdbID) }}> Добавить в список </button>
                </div>
            </article>
        );
    }
    
}

export default MovieItem;