import React from 'react';
import logo from '../../assets/logo.png'
import { NavLink, Link } from 'react-router-dom';
import { Menu as MenuComp } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getUser } from "../../state/auth/selectors";
import { logout } from '../../state/auth/actions';

export function Menu() {
  const isLoggedIn = useSelector(getIsLoggedIn)
  const user = useSelector(getUser)
  const dispatch = useDispatch()

  const handleLogout = e => {
    dispatch(logout())
  }

  return (
    <nav className="ui secondary menu">
      <img src={logo} alt="" />
      <NavLink className="item" exact to="/"><i className="home icon"></i> Home</NavLink>
      <NavLink className="item" to="/playlists"><i className="headphones icon"></i> My Playlists</NavLink>
      <NavLink className="item" to="/tracks"><i className="music icon"></i> Tracks</NavLink>
      <NavLink className="item" to="/search"><i className="search icon"></i> Search</NavLink>
      <MenuComp.Menu position="right">
        {isLoggedIn ?
          <a onClick={handleLogout} href="#logout" className="item">Log out ({user.email})</a>
          :
          <Link to="/" className="item">Log in</Link>
        }
      </MenuComp.Menu>
    </nav>
  )
}


