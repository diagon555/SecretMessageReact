export default function AlertError (props) {

  return (
    <div className="alert card red lighten-4 red-text text-darken-4">
      <div className="card-content">
        <p><i className="material-icons">report</i><span>Ошибка:</span> { props.text }</p>
      </div>
    </div>
  )
}