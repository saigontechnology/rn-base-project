import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
export const booksAdapter = createEntityAdapter({
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => {
    return a.title.localeCompare(b.title)
  },
})

//initialState will look like:
// {
// The unique IDs of each item. Must be strings or numbers
//      ids: [],
// A lookup table mapping entity IDs to the corresponding entity objects
//      entities: {}
// }
export const initialState = booksAdapter.getInitialState()

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    bookUpdated: booksAdapter.updateOne,
  },
  extraReducers: builder => {},
})

export const {bookAdded, bookUpdated} = booksSlice.actions

export const booksSelectors = booksAdapter.getSelectors(state => {
  return state.books
})
// EXAMPLE using booksSelectors: booksSelectors.selectIds(store.getState())

export default booksSlice.reducer
