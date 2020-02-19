import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from "react-router-dom";

import DogoCard from '../components/dogo-card';
import './dogos-grid-screen.scss';

import {selectDogosWithFavoritesInfo} from "../redux/reducers/dogo-reducer";
import {addFavoriteAsync, fetchFavorites} from "../redux/action-creators/favorites-dogo-actions";
import {fetchDogos} from "../redux/action-creators/dogo-actions";
import {queueNotification} from "../redux/action-creators/notifiation-actions";
import Spinner from "../components/spinner";

function AllDogosScreen({fetchDogos, fetchFavorites, addFavorite, dogosWithFavoritesInfo, userInfo, showNotification, isAllDogosLoading}) {

    useEffect(() => {
        if (dogosWithFavoritesInfo.length === 0) {
            fetchDogos();
        }
        fetchFavorites();
    }, []);

    const history = useHistory();


    const dogoCards = dogosWithFavoritesInfo.map(({dogoImageUrl, favoriteDogoExists, isDogoLoading}) => {
        return <div key={dogoImageUrl} className="dogos-item">
            <DogoCard showLikedLabel={favoriteDogoExists}
                      hideLikeBtn={favoriteDogoExists}
                      imageUrl={dogoImageUrl}
                      isDogoLoading={isDogoLoading}
                      onAddFavorite={() => {
                          if (userInfo) {
                              addFavorite(dogoImageUrl)
                          } else {
                              history.push("/login");
                              showNotification("error", "Please log in to add a dogo to favorites")
                          }
                      }}/>
        </div>
    });

    return (
        <div className="dogos-container">
            {isAllDogosLoading ?
                <div className="dogos-container__spinner">
                    <Spinner/>
                </div> : dogoCards}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dogosWithFavoritesInfo: selectDogosWithFavoritesInfo(state.dogos.items, state.favorites.items),
        isAllDogosLoading: state.dogos.isLoading,
        userInfo: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDogos: () => {
            dispatch(fetchDogos())
        },
        fetchFavorites: () => {
            dispatch(fetchFavorites())
        },
        addFavorite: (imageUrl) => {
            dispatch(addFavoriteAsync(imageUrl))
        },
        showNotification: (type, message) => {
            dispatch(queueNotification(type, message))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDogosScreen);
