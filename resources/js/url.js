const prodUrl = "https://varfid.herokuapp.com"
const localUrl = "http://localhost:8000"

const ENV = process.env.MIX_ENV || 'production'
const apiUrl = (ENV==='local')?localUrl:prodUrl

console.log(ENV)
console.log(apiUrl)

export { apiUrl }