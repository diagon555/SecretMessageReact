import { urlAPI } from '../constants/API'

export default function Fetch(data) {
  return fetch(urlAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
}
