const serverURL = 
    process.env.NODE_ENV === 'production' ?
        process.env.REDIRECT_URI_PROD :
        process.env.REDIRECT_URI_DEV


const clientURL = 
    process.env.NODE_ENV === 'production' ?
        process.env.PROD_CLIENT_URI :
        process.env.DEV_CLIENT_URI


module.exports = {
    clientURL, serverURL
}