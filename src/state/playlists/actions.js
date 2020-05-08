export const SET_PLAYLISTS = "SET_PLAYLISTS"
export const ADD_PLAYLIST = "ADD_PLAYLIST"
export const ADD_TRACK_TO_PLAYLIST = "ADD_TRACK_TO_PLAYLIST"

export const setPlaylists = playlists => ({
  type: SET_PLAYLISTS,
  payload: playlists
})

export const addPlaylist = title => ({
  type: ADD_PLAYLIST,
  payload: {
    id: Date.now().toString(),
    title,
    tracks: []
  }
})

export const addTrackToPlaylist = (playlistId, trackId) => ({
  type: ADD_TRACK_TO_PLAYLIST,
  payload: { playlistId, trackId }
})