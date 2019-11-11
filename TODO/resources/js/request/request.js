import axios from 'axios'

var request = {
    isLoged: (apiUser) => {
        axios.get(apiUser,{param:""},{"Content-Type" : "application/json","Authorization":"Bearer "+localStorage.getItem('tokenAuth')})
            .then( response => {
                console.log(`apiUser`,response)
                return true
            })
            .catch( error => {
                if(error.response.data.message == "Unauthenticated."){
                    return false
                }
            });
    },

    gettask: (apiGet, cb) => {
        axios.get(apiGet,{headers:{"Content-Type" : "application/json","Authorization":"Bearer "+localStorage.getItem('tokenAuth')}})
                .then( response => {
                    console.log(`apiUser`,response)
                    cb(response)
                })
                .catch( error => {
                    console.log(`denegado`, error, error.response)
                    if(error.response.data.message == "Unauthenticated."){
                        console.log(`denegado`, error.response)
                        cb(err)
                    }
                });
    },

    saveTask: (apiPost, newTask, cb) => {
        axios.post(apiPost, {
            titulo: newTask.titulo,
            descripcion: newTask.descripcion,
            estado_id : newTask.estado_id
          },{headers:{"Content-Type" : "application/json","Authorization":"Bearer "+localStorage.getItem('tokenAuth')}})
          .then( response => {
            cb(response)
          })
          .catch( (error) => {
            cb(error)
          });
    },

    putTask: (apiPut, updateTask, cb) => {
        axios.put(apiPut, {
            titulo: updateTask.titulo,
            descripcion: updateTask.descripcion,
            estado_id : updateTask.estado_id
          },{headers:{"Content-Type" : "application/json","Authorization":"Bearer "+localStorage.getItem('tokenAuth')}})
          .then( response => {
            cb(response)
          })
          .catch( (error) => {
              console.log("error put",error,error.response)
            cb(error)
          });
    },

    deleteTask: (apiDelete, cb) => {
        axios.delete(apiDelete,{headers:{"Content-Type" : "application/json","Authorization":"Bearer "+localStorage.getItem('tokenAuth')}})
          .then( response => {
            cb(response)
          })
          .catch( (error) => {
              console.log("error put",error,error.response)
            cb(error)
          });
    },
}

export default request