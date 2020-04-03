import React, { useState } from 'react';
import cn from 'classnames'

export function PlaylistForm({ onSubmit }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    if (value.trim().length === 0) {
      setError(true)
      return
    }
    setError(false)
    onSubmit(value);
    setValue('')
  }

  return (
    <details open>
      <summary>Add new playlist</summary>
      <form className={cn("ui action input container", { error })} onSubmit={handleSubmit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button className={cn("ui primary button", { negative: error })}>Add</button>
      </form>
    </details>
  )
}