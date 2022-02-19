const initialState = {
    searchLine: [],
    movies: [],
    favoriteList: [],
    idList: '',
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SEARCH':
            const searchLine = action.payload.searchLine;
            return {
                ...state,
                searchLine: action.payload.searchLine,
                movies: action.payload.movies
            }

        case 'ADD_TO_FAVORITES':

            const id = action.payload.id;
            const favAction = action.payload;
            const arr = [...state.favoriteList];
            const movieInFav = arr.find(item => item.id === id);
           
            if (movieInFav) {
                return state;
            } else { arr.push(favAction) };

            return {
                ...state,
                favoriteList: arr
            }

        case 'REMOVE_FAVORITES':
            const newFilms = state.favoriteList.filter(
                item => item.id !== action.payload.id
            );
            
            return { 
                ...state, 
                favoriteList: newFilms 
            };

        case 'GET_LIST_ID':
            return { 
                ...state, 
                idList: action.payload.listId 
            };

            break;
        default:
            return state;
    }
}
export default reducer;