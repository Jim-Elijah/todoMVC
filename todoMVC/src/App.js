import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useHistory } from "react-router-dom"
import { createStore } from 'redux'
import Layout from './common/Layout'
import reducer from './redux/reducers'
import bus from "./utils/bus";


let store = createStore(reducer)
let history

export default function App() {
  history = useHistory()
  useEffect(() => {
    bus.emit('interceptorFn', history)
  })
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  )
}
// export default class App extends Component {
//   constructor(props) {
//     super(props)
//     store = createStore(reducer)
//     history = useHistory()
//   }

//   componentDidMount() {
//     console.log('app m')
//     bus.emit('interceptorFn', history)
//   }
//   render() {
//     return (
//       <Provider store={store}>
//         <Layout></Layout>
//       </Provider>
//     )
//   }
// }
