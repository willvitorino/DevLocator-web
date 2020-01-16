import React, { useState, useEffect } from 'react'

import './style.css'

function DevForm ( { onSubmit } ) {

  const [ techs, setTechs ] = useState('')
  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')
  const [ github_username, setGithubUsername ] = useState('')

  const [ autoWriteGeolocation, setAutoWriteGeolocation ] = useState(false)

  /**
   * Pegar Latitude e Lomgetuda do Usuário
   */
  useEffect (
    () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setLatitude(latitude)
          setLongitude(longitude)
          setAutoWriteGeolocation(true)
        }, err => {
          setAutoWriteGeolocation(false)
          console.error(err)
        },
        {
          timeout: 30000,
          enableHighAccuracy: false
        }
      )
    }, []
  )

  async function handleSubmit (e) {
    e.preventDefault()

    const techsArray = techs.split(',').map( item => item.trim() )

    await onSubmit( { github_username, techs: techsArray, latitude, longitude } )

    setTechs('')
    setGithubUsername('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        {/* Nome de Usuário do GitHub */}
        <label htmlFor="github_username_form" >Usuário do GitHub</label>
        <input
          name="github_username"
          id="github_username_form"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>

      <div className="input-block">
        {/* Tecnologias */}
        <label htmlFor="techs_form" >Tecnologias</label>
        <input
          name="techs"
          id="techs_form"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          {/* Latitude */}
          <label htmlFor="latitude_form" >Latitude</label>
          <input
            type="number"
            disabled={autoWriteGeolocation}
            name="latitude"
            id="latitude_form"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          {/* Tecnologias */}
          <label htmlFor="longitude_form" >Longitude</label>
          <input
            type="number"
            disabled={autoWriteGeolocation}
            name="longitude"
            id="longitude_form"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}

export default DevForm;