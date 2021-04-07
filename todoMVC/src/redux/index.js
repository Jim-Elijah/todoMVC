import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)
/**
 *  没有实现，报错，勿使用
 */

export default function () {
    return <Provider store={store}>
        <App />
    </Provider>
}