import React, { useEffect } from 'react';

import { Playlists } from './playlists/Playlists';
import { Layout } from './layout/Layout';
import { Home } from './home/Home';
import { Tracks } from './tracks/Tracks';
import { Search } from './search/Search';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylists } from '../state/playlists/actions';
import { fetchTracks } from '../state/tracks/actions';
import { wsConnect } from '../state/messages/actions';
import { getIsLoggedIn } from '../state/auth/selectors';
import { restoreUser } from '../state/auth/actions';

export function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPlaylists())
      dispatch(fetchTracks())
    }
  }, [isLoggedIn, dispatch])

  useEffect(() => {
    dispatch(wsConnect())
  }, [dispatch])

  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/playlists/:playlistId?/:trackId?">
            <Playlists />
          </PrivateRoute>
          <PrivateRoute path="/tracks">
            <Tracks />
          </PrivateRoute>
          <Route path="/search">
            <Search />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const PrivateRoute = ({ children, ...props }) => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to="/" />}
    </Route>
  )
}