import React from 'react';
import './dogo-card.scss';
import Spinner from "./spinner";

const dogoCard = ({imageUrl, isDogoLoading, onAddFavorite, onRemoveFavorite, hideLikeBtn, showLikedLabel, showDeleteLabel}) => {
    debugger;
    return (
        <div className='dogo-card'>
            <img className='dogo-card-image' alt={"Cute dogo image"} src={imageUrl}/>

            {showDeleteLabel ?
                <div className='dogo-card-dislike' onClick={() => onRemoveFavorite(imageUrl)}>
                <span className="icon">
                    <i className="fas fa-bone"></i>
                </span>
                    <span className="text">
                    Remove
                </span>
                </div> : null}

            {isDogoLoading ? <Spinner/> : null}

            {showLikedLabel && !isDogoLoading ?
                <div className='dogo-card-like-success'>
                <span className="icon">
                    <i className="fas fa-paw"></i>
                </span>
                    <span className="text">
                    Woof!
                </span>
                </div> : null}

            {hideLikeBtn || isDogoLoading ? null : <div className='dogo-card-like-button' onClick={onAddFavorite}>
                <span className="icon">
                    <i className="fab fa-gratipay"></i>
                </span>
                <span className="text">
                    Like me!
                </span>
            </div>}
        </div>
    )
};

export default dogoCard;
