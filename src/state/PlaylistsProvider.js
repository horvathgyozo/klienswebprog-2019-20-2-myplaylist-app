import React, { useState, useEffect } from "react";
import { playlistsStorage } from "../api/PlaylistsStorage";

const usePlaylistsService = () => {
  // Data
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const getAll = async () => setPlaylists(await playlistsStorage.getAll())
    getAll()
  }, [])
  // console.log(playlists);

  // Operations
  const addNewPlaylist = async title => {
    const newPlaylist = await playlistsStorage.create({ title, tracks: [] })
    setPlaylists([...playlists, newPlaylist])
  }
  const deleteTrackFromPlaylist = async (playlist, trackId) => {
    const modifiedPlaylist = { ...playlist, tracks: playlist.tracks.filter(id => id !== trackId) }
    return await playlistsStorage.update(modifiedPlaylist)
  }
  const deleteTrackFromMultiplePlaylists = async trackId => {
    setPlaylists(await Promise.all(playlists.map(async playlist => await deleteTrackFromPlaylist(playlist, trackId))))
  }
  const addTrackToPlaylist = async (playlistId, trackId) => {
    const playlist = playlists.find(pl => pl.id === playlistId)
    if (!playlist) return

    if (playlist.tracks.includes(trackId)) return

    const modifiedPlaylist = { ...playlist, tracks: playlist.tracks.concat(trackId) }
    const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist)
    setPlaylists(playlists.map(pl => pl.id !== playlistId ? pl : updatedPlaylist))
  }

  // Service
  const playlistsService = { playlists, addNewPlaylist, deleteTrackFromPlaylist, deleteTrackFromMultiplePlaylists, addTrackToPlaylist }

  return playlistsService
}

export const PlaylistsContext = React.createContext()
export const PlaylistsProvider = ({ children }) => {
  const playlistsService = usePlaylistsService()
  return <PlaylistsContext.Provider value={playlistsService}>{children}</PlaylistsContext.Provider>
}