import React from 'react';
import ReactDOM from 'react-dom';

import 'fomantic-ui-css/semantic.min.css';

import { App } from "./views/App";
import { PlaylistsProvider } from './state/PlaylistsProvider';
import { playlistsStorage } from './api/PlaylistsStorage';
import { examplePlaylists } from './domain/playlist';
import { TracksProvider } from './state/TracksProvider';
import { tracksStorage } from './api/TracksStorage';
import { exampleTracks } from './domain/track';

const render = () =>
  ReactDOM.render(
    <TracksProvider>
      <PlaylistsProvider>
        <App />
      </PlaylistsProvider>
    </TracksProvider>,
    document.getElementById('root')
  );

async function start() {
  // const newPlaylists = await playlistsStorage.fill(examplePlaylists)
  // console.log(newPlaylists);
  // const newTracks = await tracksStorage.fill(exampleTracks)
  // console.log(newTracks);

  // const newPlaylist = await playlistsStorage.create({ title: 'Something', tracks: [] })
  // console.log(newPlaylist);

  // const playlists = await playlistsStorage.getAll()
  // console.log(playlists);

  render()
}
start()