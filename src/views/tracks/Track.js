import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../../state/playlists/selectors';
import { addTrackToPlaylist } from '../../state/playlists/actions';

export function Track({ track, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const playlists = useSelector(getPlaylists)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = (e) => {
    if (e && e.target && e.target.matches('.dropdown *:not(.icon)')) return
    setOpen(false)
  }
  const handleClick = (playlistId, trackId) => {
    dispatch(addTrackToPlaylist(playlistId, trackId))
    handleClose()
  }

  return (
    <tr>
      <td><i className="user icon"></i> {track.artist}</td>
      <td><i className="music icon"></i> {track.title}</td>
      <td className="right aligned collapsing">
        <Dropdown onOpen={handleOpen} onClose={handleClose} open={open} icon="plus" className="ui icon top right pointing dropdown button">
          <Dropdown.Menu className="menu">
            <div className="header">Add to playlist</div>
            <div className="ui search icon input">
              <i className="search icon"></i>
              <input type="text" placeholder="Search playlists..." />
            </div>
            {playlists.map(playlist =>
              <div onClick={() => handleClick(playlist.id, track.id)} key={playlist.id} className="item">{playlist.title}</div>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <button onClick={onEdit} className="ui icon button"><i className="edit icon"></i></button>
        <button onClick={onDelete} className="ui icon button red"><i className="trash icon"></i></button>
      </td>
    </tr>
  )
}