// 使用createBrowserHistory的代码
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { createBrowserHistory} from 'history';

const First = () => {
  return <div>
    <h3>first</h3>
  </div>
}
const Second = () => {
  return <div>
    <h3>second</h3>
  </div>
}
const Third = () => {
  return <div>
    <h3>third</h3>
  </div>
}

const router = (props) => {
    return (
        <Router history={createBrowserHistory()}>
            <Link to='first'>first</Link>
            <Link to='second'>second</Link>
            <Link to='third'>third</Link>
            <Switch>
                <Route exact path={"/"} component={First} />
                <Route exact path={"/first"} component={First} />
                <Route exact path={"/second"} component={Second} />
                <Route exact path={"/third"} component={Third} />
            </Switch>
        </Router>
    )
}
export default router;