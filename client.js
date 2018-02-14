export * from "./lib/rootComponent"

import { onPageLoad } from "meteor/server-render"
import { Tracker } from "meteor/tracker"
import React from "react"
import { render } from "react-dom"
import { getRootComponent } from "./lib/rootComponent"

/**
 * Returns a promise that is resolved after all subscriptions are ready
 */
function waitForSubscriptionsToBeReady() {
    return new Promise((resolve, reject) => {
        Tracker.autorun(function (handle) {
            const subscriptions = Meteor.connection._subscriptions
            let allSubscriptionsReady = true
            
            for (subscription of Object.values(subscriptions)) {
                if (subscription.ready) {
                    continue
                }
                
                allSubscriptionsReady = false
                
                subscription.readyDeps.depend()
            }
            
            if (allSubscriptionsReady) {
                resolve()
            }
        })
    })
}

/**
 * Patch original Module.prototype.dynamicImport function to track all imported modules
 * Creates promise for each import call and resolves it when module is ready
 */
const importPromises = []

function patchDynamicImport() {
    const Module = module.constructor
    const originalImport = Module.prototype.dynamicImport
    Module.prototype.dynamicImport = function (...args) {
        const promise = originalImport.call(this, ...args)
        importPromises.push(promise)
        return promise
    }
}

patchDynamicImport()

/**
 * Client side render
 */
onPageLoad(async () => {
    // our root component
    const App = getRootComponent()
    
    // our root dom node
    const element = document.getElementById("app")
    if (!element) {
        throw new Error("There is no #app element")
    }
    
    // if we don't have any server side rendered markup
    // render immediately
    if (!element.innerHTML) {
        render(<App/>, element)
        return
    }
    
    // if we have server side rendered markup
    // display it and render react dom into temporary dom dode
    const temp = document.createElement("div")
    temp.id = "app"
    render(<App/>, temp)
    
    // wait until we loaded all the things
    await resolvePromises(importPromises)
    
    // swap dom node
    element.parentNode.replaceChild(temp, element)
})

async function resolvePromises(promises) {
    let list = [waitForSubscriptionsToBeReady()]
    while (promises.length) {
        list.push(promises.pop())
    }
    
    await Promise.all(list)
    await deferWait()
    await waitForSubscriptionsToBeReady()
    
    if (promises.length) {
        await resolvePromises(promises)
    }
}

function deferWait() {
    return new Promise(((resolve, reject) => {
        Meteor.defer(resolve)
    }))
}
