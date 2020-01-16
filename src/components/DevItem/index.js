import React from 'react'

/**
 * Estilo
 */
import './style.css'

function DevItem ({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        <button className="actions">
          <i className="fa fa-trash"></i>
        </button>
      </header>
      <p>{dev.bio}</p>
      <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${dev.github_username}`} >{dev.github_username}</a>
    </li>
  )
}

export default DevItem;