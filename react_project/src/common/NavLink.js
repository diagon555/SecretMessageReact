import { useRouteMatch } from 'react-router-dom'

export default function NavLink (props) {
  let match = useRouteMatch(props.to)
  const className = match && (match.isExact || props.exact === undefined) ? 'active' : ''

  return (
    <li className={className}>
      <a href={ props.to }>{ props.children }</a>
    </li>
  )
}
