import React, { useState, useEffect } from "react";
import { exampleTracks } from "../domain/track";

const useTracksService = () => {
  // Data
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const getAll = () => setTracks(exampleTracks)
    getAll()
  }, [])

  // Operations
  const addNewTrack = track => {
    setTracks([...tracks, { ...track, id: Date.now().toString() }])
  }
  const editTrack = track => {
    setTracks(tracks.map(tr => tr.id !== track.id ? tr : track))
  }
  const deleteTrack = track => {
    setTracks(tracks.filter(tr => tr.id !== track.id))
  }

  // Service
  const tracksService = { tracks, addNewTrack, editTrack, deleteTrack }

  return tracksService
}

export const TracksContext = React.createContext()
export const TracksProvider = ({ children }) => {
  const tracksService = useTracksService()
  return <TracksContext.Provider value={tracksService}>{children}</TracksContext.Provider>
}