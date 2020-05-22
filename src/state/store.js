import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { playlistsReducer } from "./playlists/reducer"
import { tracksReducer } from "./tracks/reducer"
import { messagesReducer } from "./messages/reducer"
import { authReducer } from "./auth/reducer"

// const rootReducer = (state, action) => {
//   const { type, payload } = action

//   return {
//     playlists: playlistsReducer(state.playlists, action),
//     tracks: tracksReducer(state.tracks, action)
//   }
// }

const rootReducer = combineReducers({
  tracks: tracksReducer,
  playlists: playlistsReducer,
  messages: messagesReducer,
  auth: authReducer,
})

const logger = createLogger({
  collapsed: true
});

export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))
}