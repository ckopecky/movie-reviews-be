export const redirect_server = (res) => {
    return process.env.NODE_ENV === 'production' ?
        res.redirect(process.env.REDIRECT_URI_PROD) :
        res.redirect(process.env.REDIRECT_URI_DEV)
}

export const redirect_client = (res) => {
    return process.env.NODE_ENV === 'production' ?
        res.redirect(process.env.PROD_CLIENT_URI) :
        res.redirect(process.env.DEV_CLIENT_URI)
}