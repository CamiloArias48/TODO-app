import axios from 'axios'

const authService = {

    isAuthenticated: localStorage.getItem('tokenAuth') ? true : false,

    authenticate(apiLogin, credentials, cb){
        axios.post(apiLogin, {
            email: credentials.email,
            password: credentials.password
          })
          .then( response => {
            if(response.data.message == 'Loged in!'){
                localStorage.setItem('tokenAuth',response.data.data.token)
                this.isAuthenticated = true
                cb()
            }
            else{
                cb('contraseña incorrecta')
            }
          })
          .catch( (error) => {
            cb(error)
          });
    },

    verifyToken(apiUser){
        if(localStorage.getItem('tokenAuth')){
            axios.get(apiUser,{headers:{"Content-Type" : "application/json","Authorization":"Bearer "+localStorage.getItem('tokenAuth')}})
                .then( response => {
                    console.log(`apiUser`,response)
                    this.isAuthenticated = true
                    return true 
                })
                .catch( error => {
                    if(error.response.data.message == "Unauthenticated."){
                        console.log(`denegado`, error.response)
                        this.isAuthenticated = false
                        return false
                    }
                });
        }
        else{
            console.log(`no existe`)
            this.isAuthenticated = false
            return false
        }
    },


    singout(cb){
        this.isAuthenticated = false
        setTimeout(cb, 100) //fake async
    }
}

export default  authService