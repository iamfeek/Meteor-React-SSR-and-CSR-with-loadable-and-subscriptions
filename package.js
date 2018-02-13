Package.describe({
    version: "0.0.0",
    name: "pravdomil:react-render",
    summary: "React server side render and client side render for Meteor with react-loadable and Meteor.subscriptions in mind",
    git: "https://github.com/pravdomil/Meteor-React-ssr-and-csr-with-loadable-and-subscriptions.git",
})

Package.onUse(function (api) {
    api.use("ecmascript")
    api.mainModule("client.js", "client")
    api.mainModule("server.js", "server")
})
