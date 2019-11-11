import React from'react'
import { Redirect } from 'react-router-dom'
import authService from '../request/authService'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Login extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            redirectToReferrer : this.props.loged,
            email: '',
            password:'',
            wrongCredentials:false
        }
        
        this.login = this.login.bind(this)
        this.change = this.change.bind(this)
    }

    change(e){
        this.setState({[e.target.name]:e.target.value})
    }

    
    login(e){
        e.preventDefault()
        let {apiLogin} = this.props.routes,
            self = this
            
        authService.authenticate(apiLogin, {email: this.state.email, password: this.state.password}, (err)=>{
            if(!err){
                self.setState({
                    redirectToReferrer : true
                })
            }
            else{
                console.log(err,err.response)
                if(err=="contraseña incorrecta") this.setState({wrongCredentials:true})
            }
            
        })   
    }

    componentDidMount(){
        $('.toast').toast()
    }

    render(){
       
        if(this.state.redirectToReferrer || localStorage.getItem('tokenAuth')){
            return(
                <Redirect to="/todo"/>
            )
        }

        return(
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-sm-12 col-md-4">
                        <form onSubmit={this.login}>
                            <div className="form-group">
                                <label forhtml="inputEmail">Email</label>
                                <input type="email" name="email" className="form-control" id="inputEmail" onChange={this.change} value={this.state.email} aria-describedby="emailHelp" placeholder="email" required/>
                                <small id="emailHelp" className="form-text text-muted">Dirección de correo con la que te registraste.</small>
                            </div>
                            <div className="form-group">
                                <label forhtml="inputPassword">Contraseña</label>
                                <input type="password" name="password" className="form-control" id="inputpassword" onChange={this.change} value={this.state.password} placeholder="Password" required/>
                            </div>
                            <button type="submit"  className="btn btn-block btn-primary">Entrar</button>
                        </form>

                        {(this.state.wrongCredentials)
                        ?<div className="alert alert-danger mt-2" role="alert">
                            Por favor verifica tu email y contraseña.
                        </div>
                        :''}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;