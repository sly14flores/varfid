const prodUrl = "https://varfid.online"
const localUrl = "http://varfid.local"

const ENV = process.env.MIX_ENV || 'local'
const apiUrl = (ENV==='local')?localUrl:prodUrl

export { apiUrl }