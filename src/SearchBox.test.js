import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchBox } from './SearchBox';
const { queryByTestId, queryByPlaceholderText } = render(<SearchBox/>)
it('renders correctly', () => {
    expect(queryByTestId("search-button")).toBeTruthy()
    expect(queryByPlaceholderText('Search')).toBeTruthy()

    // it('query by test id', function() {
    //     expect(queryByTestId("search-button")).toBeTruthy()
    // })
    
    // it('query by placeholder text', function() {
    //     expect(queryByPlaceholderText('Search')).toBeTruthy()
    // })
})

describe("Input value", () => {
    it("updates on change", () => {
        const { queryByPlaceholderText } = render(<SearchBox/>)

        const searchInput = queryByPlaceholderText('Search');

        fireEvent.change(searchInput, {target: {value: "value"}})

        expect(searchInput.value).toBe('value')
    })
})

describe("Search Button", () => {
    describe('with empty query', () => {
        it("does note trigger request search function", () => {
            const requestSearch = jest.fn();

            const { queryByTestId, queryByPlaceholderText } = render(<SearchBox requestSearch={requestSearch}/>)

            fireEvent.click(queryByTestId('search-button'))
            expect(requestSearch).not.toHaveBeenCalled()

        })
    })

    describe("with data inside query", () => {
        it("triggers requestSearch function", () => {
            const requestSearch = jest.fn();
            const { queryByTestId, queryByPlaceholderText } = render(<SearchBox requestSearch={requestSearch}/>)

            const searchInput = queryByPlaceholderText('Search');

            fireEvent.change(searchInput, {target: {value: "test"}})
            fireEvent.click(queryByTestId('search-button'))
            expect(requestSearch).toHaveBeenCalled();
        })
    });
})