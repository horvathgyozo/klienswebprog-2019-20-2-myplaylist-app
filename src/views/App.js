import React from 'react';

import { Menu } from "./menu/Menu";
import { PlaylistForm } from "./playlists/Playlistform";
import { PlaylistList } from "./playlists/PlaylistList";
import { TrackList } from "./playlists/TrackList";
import { TrackDetails } from "./playlists/TrackDetails";

import { exampleTracks } from "../domain/track";
import { examplePlaylists } from "../domain/playlist";

export function App() {
  const selectedPlaylist = examplePlaylists[0]
  const selectedTrack = exampleTracks[2]

  return (
    <div className="ui container">
      <Menu />
      <div className="ui container">
        <h1>My Playlists</h1>
        <div className="ui stackable two column grid">
          <div className="ui six wide column">
            <h3>Playlists</h3>
            <PlaylistForm />
            <PlaylistList playlists={examplePlaylists} selectedPlaylistId={2} />
          </div>
          <div className="ui ten wide column">
            <TrackList playlist={selectedPlaylist} selectedTrackId={3} />
          </div>
        </div>
        <div className="ui divider"></div>
        <TrackDetails track={selectedTrack} />
      </div>
    </div>
  )
}