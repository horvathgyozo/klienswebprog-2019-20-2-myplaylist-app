import React, { useEffect } from 'react';

import { Playlists } from './playlists/Playlists';
import { Layout } from './layout/Layout';
import { Home } from './home/Home';
import { Tracks } from './tracks/Tracks';
import { Search } from './search/Search';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from '../state/playlists/actions';
import { fetchTracks } from '../state/tracks/actions';

export function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPlaylists())
    dispatch(fetchTracks())
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