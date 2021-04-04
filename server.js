const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'dist')))

app.use(process.env.API_URL,
    createProxyMiddleware({
      target: `${process.env.PROXY_URL_PROD}${process.env.API_URL}`,
      changeOrigin: true
    })
  )
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})
