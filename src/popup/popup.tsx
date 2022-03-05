import React from "react"
import ReactDOM from "react-dom"

const test = <p>hello test</p>

const root = document.createElement("div")
document.body.appendChild(root)

React.DOM.render(test, root)
