import React from 'react';
import classnames from 'classnames';
import './button.scss';

const Button = ({children, variant, ...rest}) => {
    const cls = classnames('dogo-button', 'button', variant || "default");
    return (
        <button {...rest} type="button" className={cls}>
            {children}
        </button>
    )
};

export default Button;
