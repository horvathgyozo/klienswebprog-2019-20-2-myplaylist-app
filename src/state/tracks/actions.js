import { deleteTrackFromAllPlaylists } from "../playlists/actions"
import { tracksApi } from "../../api/rest"

export const SET_TRACKS = "SET_TRACKS"
export const ADD_TRACK = "ADD_TRACK"
export const UPDATE_TRACK = "UPDATE_TRACK"
export const DELETE_TRACK = "DELETE_TRACK"

// Sync
export const setTracks = tracks => ({
  type: SET_TRACKS,
  payload: tracks
})

export const addTrackToStore = track => ({
  type: ADD_TRACK,
  payload: { ...track, id: Date.now().toString() }
})

export const updateTrackInStore = track => ({
  type: UPDATE_TRACK,
  payload: track
})

export const deleteTrackFromStore = track => ({
  type: DELETE_TRACK,
  payload: track
})

// Async
export const fetchTracks = () => async dispatch => {
  const tracks = await tracksApi.getAll()
  dispatch(setTracks(tracks))
}

export const addTrack = track => async dispatch => {
  const newTrack = await tracksApi.create(track)
  dispatch(addTrackToStore(newTrack))
}

export const updateTrack = track => async dispatch => {
  const updatedTrack = await tracksApi.update(track)
  dispatch(updateTrackInStore(updatedTrack))
}

export const deleteTrack = track => async dispatch => {
  await tracksApi.delete(track.id)
  dispatch(deleteTrackFromStore(track))
  dispatch(deleteTrackFromAllPlaylists(track))
}