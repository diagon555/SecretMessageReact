import { useState } from 'react'

import './create.css'
import { urlAPI, urlNote } from '../constants/API'

export default function Create () {
  const [url, setUrl] = useState()
  const [lineClass, setLineClass] = useState('hide')
  const [formClass, setFormClass] = useState('')

  const SendData = (obj) => {


    fetch(urlAPI, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!data.result) {
          return
        }
        setUrl(`${urlNote}/${data.url}`)
      })
  }

  const loadDataFromForm = (event) => {
    event.preventDefault()
    const note = event.target.note.value.trim()
    if (note === '') {
      return false
    }

    SendData({"note": note})
    setFormClass('hide')
    setLineClass('')
  }

  return (
    <div className="main">
      <div className="container">
        <h1>Новое сообщение</h1>
        <form onSubmit={loadDataFromForm} className={formClass}>
          <label htmlFor="note">Текст:</label>
          <textarea id="note" className="materialize-textarea" name="note" autoFocus />
          <button
            className="waves-effect waves-light btn right"
            type="submit"
          >Зашифровать</button>
        </form>
        <div className={lineClass}>
          <div><a href={ url }>{ url }</a></div>
          <div>
            <button
              className="waves-effect waves-light btn"
              onClick={() => {window.location.reload()}}
            >Новое сообщение</button>
          </div>
        </div>
      </div>
    </div>
  )
}
