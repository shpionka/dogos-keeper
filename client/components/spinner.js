import React from 'react';
import './dogos-spinner.scss';

export default function Spinner() {
    return (
        <div className="dogos-spinner">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
        </div>
    )
};
