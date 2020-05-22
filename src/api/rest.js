// const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE1ODk0ODcwNjEsImV4cCI6MTU5MjA3OTA2MSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiMSIsImp0aSI6ImRiYjI5OWNkLWZiN2ItNDVjZS1hZTQxLTZiZDczODU5MjBhNSJ9.AfQFeJiwqGbrn8w_NuLnDg_3Pg_eEBtIpK21KfUU938'
const BASE_URL = 'http://localhost:3030'

// let token = null

const request = async (path = '', options = {}, token, userId) => {
  let url = `${BASE_URL}${path}`
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Authorization: `Bearer ${ACCESS_TOKEN}`,
    ...options.headers
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  if (userId) {
    url += `?userId=${userId}`
  }
  const response = await fetch(url, {
    ...options,
    headers
  })
  return response.json()
}

class RestApi {
  constructor(resourcePath, convertFn) {
    this.resourcePath = resourcePath
    this.convertFn = convertFn
  }
  async create(obj, token) {
    const playlist = await request(this.resourcePath, {
      method: 'POST',
      body: JSON.stringify(obj),
    }, token)
    return this.convertFn(playlist)
  }
  async fill(objects) {
    // await this.db.remove({}, { multi: true })
    // const newObjects = await Promise.all(objects.map(playlist => this.create(playlist)))
    const newObjects = objects
    return newObjects
  }
  async getAll(token, userId) {
    const json = await request(this.resourcePath, {}, token, userId)
    const playlists = json.data
    return playlists.map(this.convertFn)
  }
  async update(obj, token) {
    if (!obj.id) return
    const playlist = await request(`${this.resourcePath}/${obj.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
    }, token)
    return this.convertFn(playlist)
  }
  async delete(id, token) {
    await request(`${this.resourcePath}/${id}`, {
      method: 'DELETE',
    }, token)
  }
}

const convertPlaylistIds = playlist => ({
  ...playlist,
  id: playlist.id.toString(),
  tracks: playlist.tracks.map(id => id.toString())
})
export const playlistsApi = new RestApi('/playlists', convertPlaylistIds)

const convertTrackIds = track => ({
  ...track,
  id: track.id.toString(),
})
export const tracksApi = new RestApi('/tracks', convertTrackIds)

class AuthApi {
  async login(username, password) {
    const authData = {
      email: username,
      password,
      strategy: 'local'
    }
    const response = await request('/authentication', {
      method: 'POST',
      body: JSON.stringify(authData)
    })
    window.sessionStorage.setItem('api-token', response.accessToken)
    return response
  }
  async getUserById(userId, token) {
    return await request(`/users/${userId}`, {}, token)
  }
  logout() {
    window.sessionStorage.removeItem('api-token')
  }
  getToken() {
    return window.sessionStorage.getItem('api-token')
  }
}
export const authApi = new AuthApi()