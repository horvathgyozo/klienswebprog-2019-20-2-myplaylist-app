import React, { useEffect } from 'react';

import { Playlists } from './playlists/Playlists';
import { Layout } from './layout/Layout';
import { Home } from './home/Home';
import { Tracks } from './tracks/Tracks';
import { Search } from './search/Search';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlaylists } from '../state/playlists/actions';
import { examplePlaylists } from '../domain/playlist';
import { setTracks } from '../state/tracks/actions';
import { exampleTracks } from '../domain/track';

export function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPlaylists(examplePlaylists))
    dispatch(setTracks(exampleTracks))
  }, [dispatch])

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/playlists/:playlistId?/:trackId?">
            <Playlists />
          </Route>
          <Route path="/tracks">
            <Tracks />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}