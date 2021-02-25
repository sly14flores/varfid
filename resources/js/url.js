const prodUrl = "https://varfid.herokuapp.com"
const localUrl = "http://localhost:8000"

const ENV = process.env.MIX_ENV || 'local'
const apiUrl = (ENV==='local')?localUrl:prodUrl

export { apiUrl }