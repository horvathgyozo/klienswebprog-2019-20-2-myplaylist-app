import React from 'react';
import ReactDOM from 'react-dom';

import 'fomantic-ui-css/semantic.min.css';

import { App } from "./views/App";
import { PlaylistsProvider } from './state/PlaylistsProvider';
import { playlistsStorage } from './api/PlaylistsStorage';
import { examplePlaylists } from './domain/playlist';

const render = () =>
  ReactDOM.render(
    <PlaylistsProvider>
      <App />
    </PlaylistsProvider>,
    document.getElementById('root')
  );

async function start() {
  const newPlaylists = await playlistsStorage.fill(examplePlaylists)
  // console.log(newPlaylists);

  // const newPlaylist = await playlistsStorage.create({ title: 'Something', tracks: [] })
  // console.log(newPlaylist);

  // const playlists = await playlistsStorage.getAll()
  // console.log(playlists);

  render()
}
start()