import NavLink from '../common/NavLink'

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <NavLink exact to="/">Главная</NavLink>
          <NavLink to="/create">Создать сообщение</NavLink>
          <NavLink to="/note">Прочитать сообщение</NavLink>
          <NavLink to="/about">О проекте</NavLink>
        </ul>
      </nav>
    </header>
  )
}
