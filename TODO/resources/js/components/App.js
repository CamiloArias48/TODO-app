import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from '../request/authService'
import {BrowserRouter as Router,
Route,
Redirect } from 'react-router-dom'

import Login from './Login'
import Todo from './Todo'


const PrivateRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={ (props) => (
        localStorage.getItem('tokenAuth')
        ? <Component {...props} {...rest}/>
        : <Redirect to='/' />
    ) }/>
)

class App extends React.Component {
    constructor(props){
        super(props)
        authService.verifyToken(this.props.routes.apiUser)
    }

    render(){
            return (
                <Router>
                    <div>
                        <Route path="/" exact render={(props) => <Login {...props}  routes={this.props.routes}/>}   />
                        <PrivateRoute path="/todo" routes={this.props.routes} component={Todo} />
                    </div>
                </Router>
            );
    }
    
}

export default App;

ReactDOM.render(<App routes={routes} />, document.getElementById('root'));
