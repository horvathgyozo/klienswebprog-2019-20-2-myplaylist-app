import React, { useState, useContext } from 'react';
import { TrackForm } from './TrackForm';
import { Track } from './Track';
import { PlaylistsContext } from '../../state/PlaylistsProvider';
import { TracksContext } from '../../state/TracksProvider';

export function Tracks() {
  const { tracks, addNewTrack, editTrack, deleteTrack } = useContext(TracksContext)
  const [open, setOpen] = useState(false)
  const [editedTrack, setEditedTrack] = useState({})
  const { deleteTrackFromMultiplePlaylists } = useContext(PlaylistsContext)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = track => {
    if (!track.id) {
      addNewTrack(track)
    } else {
      editTrack(track)
    }
  }
  const handleNew = () => {
    setEditedTrack({})
    handleOpen()
  }
  const handleEdit = track => {
    setEditedTrack(track)
    handleOpen()
  }
  const handleDelete = track => {
    deleteTrack(track)
    deleteTrackFromMultiplePlaylists(track.id)
  }

  return (
    <>
      <div className="ui container">
        <button onClick={handleNew} className="ui right floated green button" id="newModal">
          <i className="plus icon"></i>
          New track
        </button>
        <h1>Tracks</h1>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map(track =>
              <Track onDelete={() => handleDelete(track)} onEdit={() => handleEdit(track)} key={track.id} track={track} />
            )}
          </tbody>
        </table>
      </div>

      <TrackForm track={editedTrack} open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  )
}