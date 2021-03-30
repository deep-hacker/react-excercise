import React from "react";
import {Route,Router,Redirect,Switch} from "react-router-dom"
import {createBrowserHistory} from "history"
const Routes = ({Task,Profile}) => {
    const history = createBrowserHistory();
   return (<Router history={history}>
        <Switch>
            <Route exact path="/">
                <Redirect to="/profile"/>
            </Route>
            <Route path ="/profile">
                <Profile/>
            </Route>
            <Route path ="/task">
                <Task/>
            </Route>
        </Switch>
    </Router>);
}

export default Routes;