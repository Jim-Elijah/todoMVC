import React from 'react'
// import history from './history'
import PageB from './PageB'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

// import Login from '../login'


function pageA(props) {
  // let {isLogin} = props
  // let history = useHistory()
  function clickHandler() {
    // console.log('history', history)
    // console.log('props', props)
    // history.push('/login')
    console.log('click')
    // isLogin = !isLogin
    // console.log('new isLogin', isLogin)
  }
  // if(isLogin){
  //   return <Router>
  //     <Redirect to='/PageB' />
  //   </Router>
    
  // }
  return <div>
    {/* <Router >
      <Link to="/">Login</Link>
      <Link to="/PageB">PageB</Link>
      <Link to="/Login">Login</Link>
      <hr />
     
      <Route path='/PageB' exact component={PageB}></Route>
      <Route path='/Login' component={Login}></Route>
    </Router> */}
     <p onClick={clickHandler}>page A</p>

  </div>
}
export default pageA