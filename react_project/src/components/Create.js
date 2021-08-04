import { useState } from 'react'

import { urlNote } from '../constants/API'
import Fetch from '../common/Fetch'
import AlertError from '../common/AlertError'

export default function Create () {
  const [url, setUrl] = useState()
  const [errorText, setErrorText] = useState('')

  const SendData = (obj) => {
    setErrorText('')
    Fetch('create', obj)
      .then(data => {
        console.log(data)
        if (!data.result) {
          return
        }
        setUrl(`${urlNote}/${data.url}`)
      })
  }

  const formKeyDownHandler = event => {
    if (event.ctrlKey && event.keyCode === 13) {
      const note = event.target.value
      if (note === '') {
        return
      }

      SendData({ note })
    }
  }


  const loadDataFromForm = (event) => {
    event.preventDefault()
    const note = event.target.note.value.trim()
    if (note === '') {
      setErrorText('Введите текст сообщения.')
      return false
    }

    SendData({ note })
  }

  const copyHandler = (event) => {
    event.preventDefault()

    navigator.clipboard.writeText(url)

    console.log(url)
  }

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <h1>Новое сообщение</h1>
          {errorText && (
            <AlertError text={errorText} />
          )}
          { !url && (
            <form onSubmit={loadDataFromForm}>
              <label htmlFor="note">Текст:</label>
              <textarea
                onKeyDown={formKeyDownHandler}
                id="note"
                className="materialize-textarea"
                name="note" />
              <button
                className="waves-effect waves-light btn right"
                type="submit"
              >Зашифровать</button>
            </form>
          )}
          { url && (
            <div>
              <div className="card green lighten-4 green-text text-darken-4">
                <div className="card-content">
                  <div className="valign-wrapper">
                    <a href={ url } target="_blank" rel="noreferrer">{ url }</a>
                    <button
                      className="waves-effect waves-light btn clipboard-btn"
                      onClick={copyHandler}
                      title="Копировать в буфер обмена"
                    >
                      <i className="material-icons">content_copy</i>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="waves-effect waves-light btn"
                  onClick={() => {window.location.reload()}}
                >Новое сообщение</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
