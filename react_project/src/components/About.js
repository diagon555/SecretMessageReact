export default function About() {
  return (
    <div className="main">
      <div className="container">
        <h1>О проекте</h1>
        <div>
          <p>Простой сервис по обмену зашифрованными сообщениями</p>
          <hr/>
          <p>
            Меню выполнено с использованием собственного компонента NavLink,
            библиотеке Materialize необходимо, чтобы класс active был у li элементов,
            вместо a, стандартный NavLink не обладает подобным функционалом.
            Использовал хук useRouteMatch() из react-router-dom
          </p>
        </div>
      </div>
    </div>
  )
}
