import React, { Component } from 'react';
import './ListPage.css';
import store from '../../redux/store';

class ListPage extends Component {
    state = {
        movies: [],
        title: '',
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        // console.log('id: ', id);

        if (id) {
            const link = `https://acb-api.algoritmika.org/api/movies/list/${id}`;
            console.log('link: ', link);
            fetch(link)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        movies: data.movies,
                        title: data.title,
                    })
                    // console.log('data: ', data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            console.log(`Список не найден по id ${id}`);
        }

        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID

    }

    render() {
        // console.log(state.movies);
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        let link = item.id;
                        let filmLink = `https://www.imdb.com/title/${link}/`
                        return (
                            <li key={item.imdbID}>
                                <a href={filmLink} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;