import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';

const Field = ({ label, placeholder, name }) => {
  const [value, setValue] = useState('')
  const handleChange = e => setValue(e.target.value)
  return (
    <div className="field">
      <label>{label}</label>
      <input name={name} value={value} onChange={handleChange} type="text" placeholder={placeholder} />
    </div>
  )
}

export function TrackForm({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} className="ui modal">
      <i onClick={onClose} className="close icon"></i>
      <div className="header">Add new Track</div>
      <div className="image content">
        <div className="description">
          <form className="ui form">
            <div className="three fields">
              <Field name="artist" label="Author" placeholder="John Williams" />
              <Field name="title" label="Track name" placeholder="Imperial March" />
              <Field name="length" label="Length" placeholder="3:44" />
            </div>
            <div className="three fields">
              <Field name="spotifyURL" label="Spotify URL" placeholder="https://" />
              <Field name="lyricsURL" label="Lyrics URL" placeholder="https://" />
              <Field name="chordsURL" label="Guitar tab URL" placeholder="https://" />
            </div>
          </form>
        </div>
      </div>
      <div className="actions">
        <button onClick={onClose} className="ui black deny button">
          Cancel
        </button>
        <button className="ui positive right labeled icon button">
          Add
          <i className="plus icon"></i>
        </button>
      </div>
    </Modal>
  )
}