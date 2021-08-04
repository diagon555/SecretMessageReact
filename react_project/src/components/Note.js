import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './note.css'

import Fetch from '../common/Fetch'
import AlertError from '../common/AlertError'

export default function Note() {
  const { noteURL } = useParams()
  const [ noteText, setNoteText ] = useState('')
  const [ errorText, setErrorText ] = useState('')

  const getNote = uid => {
    Fetch(`note/${uid}`)
      .then(data => {
        if (!data.result) {
          setErrorText('Сообщение не существует.')
          return
        }

        let message = data.note
        message = message.replaceAll('\n', '<br/>\n')

        setNoteText(message)
        console.log(data)
      })
  }

  useEffect(() => {
    if (noteURL === undefined) {
      return
    }
    getNote(noteURL)
  }, [noteURL])

  const submitHandler = (event) => {
    event.preventDefault()
    const noteId = event.target.hash.value
    if (noteId === '') {
      setErrorText('Введите код сообщения.')
      return
    }
    window.location.href = `/note/${noteId}`
  }

  return (
    <div className="main">
      <div className="container">
        <h1>Чтение сообщения</h1>
        {noteText &&
        <div className="row">
          <h3>Сообщение: </h3>
          <div className="message">
            <div className="alert card green lighten-4 green-text text-darken-4">
              <div className="card-content">
                <i className="material-icons">message</i>
                <p dangerouslySetInnerHTML={{__html: noteText}} />
              </div>
            </div>
            <div className="alert card amber lighten-4 brown-text">
              <div className="card-content">
                <p>
                  <i className="material-icons">report_problem</i>
                  <span>Внимание:</span> Сообщение было удалено с сервера при запросе.
                </p>
              </div>
            </div>
          </div>
        </div>
        }
        {errorText && (
          <AlertError text={errorText} />
        )}
        <form onSubmit={submitHandler}>
          <label htmlFor="hash">Введите код:</label>
          <input className="input-field col s3" id="hash" type="text" autoFocus />
          <button
            className="waves-effect waves-light btn right"
            type="submit"
          >Прочитать{ noteText && ' следующее' }</button>
        </form>
      </div>
    </div>
  )
}
