Package.describe({
    version: "0.0.0",
    git: "https://github.com/pravdomil/Meteor-React-ssr-and-csr-with-loadable-and-subscriptions.git",
})

Package.onUse(function (api) {
    api.use("ecmascript")
    api.mainModule("client.js", "client")
    api.mainModule("server.js", "server")
})
