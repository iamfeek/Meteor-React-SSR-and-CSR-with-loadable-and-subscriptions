Package.onUse(function (api) {
    api.use("ecmascript")
    api.mainModule("client.js", "client")
    api.mainModule("server.js", "server")
})
