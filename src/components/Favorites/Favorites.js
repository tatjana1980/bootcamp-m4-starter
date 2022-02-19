import React, { Component } from 'react';
import './Favorites.css';
import store from '../../redux/store';
import { Link } from "react-router-dom";


class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        isClick: false,
        listId: '',
    }

    removeFavorites(imdbID) {
        store.dispatch({
            type: 'REMOVE_FAVORITES',
            payload: {

                id: imdbID,
            }
        })
    }

    componentDidMount() {
        store.subscribe(() => {
            const favList = store.getState();
            this.setState({ movies: favList.favoriteList });
        })
    }

    favoriteListChangeHandler = (e) => {
        this.setState({ title: e.target.value });
    };

    saveListHandler = (e) => {
        this.setState({ isClick: true });
        const data = this.state

        fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {

                let listId = data.id
                // console.log('listId save:', listId);
                this.setState({ listId: listId })

            })
            .catch((error) => {
                console.log(error);
            })

    }

    getListId = (listId) => {
        store.dispatch({
            type: 'GET_LIST_ID',
            payload: {

                listId: listId,
            }
        })
    }

    render() {
        const { title, isClick, listId } = this.state;
        // console.log('listId: ', { listId });
        // console.log('movies: ', {state.movies});
        return (
            <div className="favorites">
                <input
                    value={title}
                    className="favorites__name"
                    placeholder='Введите название списка'
                    onChange={this.favoriteListChangeHandler}
                    disabled={this.state.isClick}
                />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.id}>
                                <button
                                    className="remove-favorite-movie"
                                    onClick={() => this.removeFavorites(item.id)}
                                >
                                    X
                                </button>
                                {item.title} ({item.year})
                            </li>

                        );
                    })}
                </ul>

                {!isClick ? (
                    <button type="button"
                        className="favorites__save"
                        onClick={this.saveListHandler}
                    >
                        Сохранить список
                    </button>
                ) : (
                    <button type="button" className="favorites__save_link">
                        <Link
                            to={`/list/${this.state.listId}`}
                        // to={"/list/" + { listId }}
                        >
                            Перейти к выбранным фильмам
                        </Link>
                    </button>
                )}
            </div>
        );
    }
}

export default Favorites;