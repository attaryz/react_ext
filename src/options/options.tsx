import React from "react"
import ReactDOM from "react-dom"

const test = <img src="atom.png" alt="" />

const root = document.createElement("div")
document.body.appendChild(root)

ReactDOM.render(test, root)
