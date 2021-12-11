const https = require('https')
const http = require('http')
const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const fs = require('fs')

const redirectToHttps = (req, res) => {
  const host = req.headers.host.replace(
    process.env.ROOT_PORT,
    process.env.HTTPS_PORT,
  )
  res.redirect(`https://${host}${req.path}`)
}

const httpsOptions = {
  key: fs.readFileSync('./configs/cert/key.pem'),
  cert: fs.readFileSync('./configs/cert/cert.pem'),
}

const __PROD__ = process.env.NODE_ENV !== 'development'

const httpApp = express()
httpApp.set('port', process.env.ROOT_PORT || 80)
if (__PROD__) {
  httpApp.use(redirectToHttps)
}

const httpServer = http.createServer(httpApp)

const httpsApp = express()
httpsApp.set('port', process.env.HTTPS_PORT || 443)

const httpsServer = __PROD__
  ? https.createServer(httpsOptions, httpsApp)
  : http.createServer(httpsApp)

httpsApp.use(express.static(__dirname))
httpsApp.use(express.static(path.join(__dirname, 'dist')))

httpsApp.use(
  process.env.API_URL,
  createProxyMiddleware({
    target: `${process.env.PROXY_URL}${process.env.API_URL}`,
    changeOrigin: true,
  }),
)

httpsApp.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

httpServer.listen(httpApp.get('port'), () => {
  if (!__PROD__) {
    console.log(
      `HTTP server started at http://localhost:${httpApp.get('port')}`,
    )
  }
})

httpsServer.listen(httpsApp.get('port'), () => {
  if (!__PROD__) {
    console.log(
      `HTTPS server started at https://localhost:${httpsApp.get('port')}`,
    )
  }
})
