import React, { useState } from 'react';

import { PlaylistForm } from "./Playlistform";
import { PlaylistList } from "./PlaylistList";
import { TrackList } from "./TrackList";
import { TrackDetails } from "./TrackDetails";

import { exampleTracks } from "../../domain/track";
import { examplePlaylists } from "../../domain/playlist";
import { useParams } from 'react-router-dom';

export function Playlists() {
  const { playlistId: playlistIdParam, trackId: trackIdParam } = useParams()
  const playlistId = Number.parseInt(playlistIdParam)
  const trackId = Number.parseInt(trackIdParam)

  const [playlists, setPlaylists] = useState(examplePlaylists)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(playlistId)
  const [selectedTrackId, setSelectedTrackId] = useState(trackId)

  const selectedPlaylist = playlists.find(pl => pl.id === selectedPlaylistId)
  const selectedTrack = exampleTracks.find(tr => tr.id === selectedTrackId)

  function handlePlaylistChange(id) {
    setSelectedPlaylistId(id)
    setSelectedTrackId(null)
  }

  const addNewPlaylist = title => {
    const id = playlists.reduce((maxId, pl) => Math.max(maxId, pl.id), 0) + 1
    setPlaylists([...playlists, { id, title, tracks: [] }])
  }

  return (
    <div className="ui container">
      <h1>My Playlists</h1>
      <div className="ui stackable two column grid">
        <div className="ui six wide column">
          <h3>Playlists</h3>
          <PlaylistForm onSubmit={addNewPlaylist} />
          <PlaylistList playlists={playlists} selectedPlaylistId={selectedPlaylistId}
            onSelect={handlePlaylistChange} />
        </div>
        <div className="ui ten wide column">
          <TrackList playlist={selectedPlaylist} selectedTrackId={selectedTrackId}
            onSelect={setSelectedTrackId} />
        </div>
      </div>
      <div className="ui divider"></div>
      <TrackDetails track={selectedTrack} />
    </div>
  )
}