import React from 'react';

export const SearchButton = ({onClick, testid}) => {
    return (
        <button onClick={onClick} data-testid={testid}>Search</button>
    );
}