const prodUrl = "https://varfid.herokuapp.com"
const localUrl = "http://varfid.local"

const ENV = process.env.MIX_ENV || 'local'
const apiUrl = (ENV==='local')?localUrl:prodUrl

export { apiUrl }