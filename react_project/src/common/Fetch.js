import { urlAPI } from '../constants/API'

export default function Fetch(path, data) {
  let fetchParams = {
    method: 'GET'
  }

  if (data !== undefined) {
    fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }

  return fetch(`${urlAPI}/${path}`, fetchParams)
    .then(response => response.json())
}
