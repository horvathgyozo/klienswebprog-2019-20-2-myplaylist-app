import React, { useContext } from 'react';

import { PlaylistForm } from "./Playlistform";
import { PlaylistList } from "./PlaylistList";
import { TrackList } from "./TrackList";
import { TrackDetails } from "./TrackDetails";

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylistsWithTracks } from '../../state/selectors';
import { addPlaylist } from '../../state/playlists/actions';

export function Playlists() {
  const { playlistId: selectedPlaylistId, trackId: selectedTrackId } = useParams()

  const dispatch = useDispatch()
  const playlistsWithTracks = useSelector(getPlaylistsWithTracks)

  const selectedPlaylist = playlistsWithTracks.find(pl => pl.id === selectedPlaylistId)
  const selectedTrack = selectedPlaylist && selectedPlaylist.tracks.find(tr => tr.id === selectedTrackId)

  const handleNewPlaylist = title => {
    dispatch(addPlaylist(title))
  }

  return (
    <div className="ui container">
      <h1>My Playlists</h1>
      <div className="ui stackable two column grid">
        <div className="ui six wide column">
          <h3>Playlists</h3>
          <PlaylistForm onSubmit={handleNewPlaylist} />
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