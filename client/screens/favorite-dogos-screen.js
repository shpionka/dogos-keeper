import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';

import DogoCard from '../components/dogo-card';
import './dogos-grid-screen.scss';

import {deleteFavoriteAsync, fetchFavoritesAsync} from "../redux/action-creators/favorites-dogo-actions";
import Button from "../components/button";


const FavoriteDogosScreen = ({fetchFavorites, deleteFavorite, favoriteDogos}) => {
    const history = useHistory();
    useEffect(() => {
        fetchFavorites();
    }, []);


    const emptyState = (
        <div className={"dogos-no-favorites-container"}>
            <h3>Looks like you are missing out on some woof...</h3>
            <Button variant={"success"} onClick={() => history.push("/")}>
                <i className="fas fa-paw"></i>
                 Add more woof!
            </Button>
        </div>
    );


    const dogoCards = Object.keys(favoriteDogos).map(dogoImageUrl => {
        return <div key={dogoImageUrl} className="dogos-item column">
            <DogoCard imageUrl={dogoImageUrl}
                      onRemoveFavorite={(dogoToDelete) => deleteFavorite(dogoToDelete)}
                      showDeleteLabel={true}
                      hideLikeBtn={true}
            />
        </div>
    });

    return (
        <div className="dogos-container">
            {dogoCards.length > 0 ? dogoCards : emptyState}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        favoriteDogos: state.favorites.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavorites: () => {
            dispatch(fetchFavoritesAsync())
        },

        deleteFavorite: (imageUrl) => {
            dispatch(deleteFavoriteAsync(imageUrl));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteDogosScreen);
