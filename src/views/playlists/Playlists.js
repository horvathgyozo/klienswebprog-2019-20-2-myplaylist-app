import React, { useState, useContext } from 'react';

import { PlaylistForm } from "./Playlistform";
import { PlaylistList } from "./PlaylistList";
import { TrackList } from "./TrackList";
import { TrackDetails } from "./TrackDetails";

import { exampleTracks } from "../../domain/track";
import { useParams } from 'react-router-dom';
import { PlaylistsContext } from '../../state/PlaylistsProvider';

export function Playlists() {
  const { playlistId: selectedPlaylistId, trackId: selectedTrackId } = useParams()

  const { playlists, addNewPlaylist } = useContext(PlaylistsContext)

  const playlistsWithTracks = playlists.map(playlist => ({
    ...playlist,
    tracks: playlist.tracks.map(trackId => exampleTracks.find(track => track.id === trackId))
  }))

  const selectedPlaylist = playlistsWithTracks.find(pl => pl.id === selectedPlaylistId)
  const selectedTrack = exampleTracks.find(tr => tr.id === selectedTrackId)

  return (
    <div className="ui container">
      <h1>My Playlists</h1>
      <div className="ui stackable two column grid">
        <div className="ui six wide column">
          <h3>Playlists</h3>
          <PlaylistForm onSubmit={addNewPlaylist} />
          <PlaylistList playlists={playlistsWithTracks} selectedPlaylistId={selectedPlaylistId} />
        </div>
        <div className="ui ten wide column">
          <TrackList playlist={selectedPlaylist} selectedTrackId={selectedTrackId} />
        </div>
      </div>
      <div className="ui divider"></div>
      <TrackDetails track={selectedTrack} />
    </div>
  )
}