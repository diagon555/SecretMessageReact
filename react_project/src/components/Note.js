import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './note.css'

import Fetch from '../common/Fetch'

export default function Note() {
  const { noteURL } = useParams()
  const [ noteText, setNoteText ] = useState('')

  const getNote = uid => {
    Fetch({url: uid})
      .then(data => {
        if (!data.result) {
          return
        }

        let message = data.note
        message = message.replaceAll('\n', '<br/>\n')

        setNoteText(message)
        console.log(data)
      })
  }

  const getNoteHandler = (event) => {
    event.preventDefault()
    const noteId = event.target.hash.value
    if (noteId === '') {
      return
    }
    window.location.href = `/note/${noteId}`
  }

  useEffect(() => {
    if (noteURL === undefined) {
      return
    }
    getNote(noteURL)
  }, [noteURL])

  return (
    <div className="main">
      <div className="container">
        <h1>Чтение сообщения</h1>
        {noteText &&
        <>
          <h3>Сообщение: </h3>
          <div className="message">
            <div><i className="material-icons">message</i></div>
            <div><p dangerouslySetInnerHTML={{__html: noteText}} /></div>
          </div>
        </>
        }
        <form onSubmit={getNoteHandler}>
          <label htmlFor="hash">Введите код:</label>
          <input className="input-field col s3" id="hash" type="text" autoFocus />
          <button
            className="waves-effect waves-light btn right"
            type="submit"
          >Прочитать{ noteText && ' ещё' }</button>
        </form>
      </div>
    </div>
  )
}
