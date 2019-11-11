import React from 'react'

class Editmodal extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            titulo:'',
            descripcion: '',
            estado_id : '',
            id:'',
            routeUpdate:''
        }

        this.change = this.change.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e){
        e.preventDefault()
        this.props.submitUpdateTask({
            id:this.state.id,
            titulo:this.state.titulo,
            descripcion: this.state.descripcion,
            estado_id:this.state.estado_id ,
            routeUpdate:this.state.routeUpdate
        }) 
    }

    change(e){
        this.setState({[e.target.name]:e.target.value})

    }
    
    
    UNSAFE_componentWillReceiveProps(nextPtops){
        console.log("estos son:",nextPtops)
        this.setState({
            id: nextPtops.taskToUpdate.id,
            titulo: nextPtops.taskToUpdate.titulo,
            descripcion:nextPtops.taskToUpdate.descripcion,
            estado_id : nextPtops.taskToUpdate.estado_id,
            routeUpdate : nextPtops.taskToUpdate.routeEdit
        })
    }

    /* static getDerivedStateFromProps(props, state) {
        if (props.taskToUpdate.titulo != state.titulo) {
            console.log("changed")
            return {
              tituloCopy: props.taskToUpdate.titulo,
              descripcionCopy:props.taskToUpdate.descripcion,
              estado_idCopy : props.taskToUpdate.estado_id
            };
          }
          
          console.log("no changed")
          // Return null to indicate no change to state.
          return null;
    }*/
     

    render(){
        return(
                <div className="modal fade" id="modelUpdate" tabIndex="-1" role="dialog" aria-labelledby="ModalUpdate" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalUpdate">Actualizar Tarea</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                             <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label >Titulo</label>
                                    <input type="text" className="form-control"  value={this.state.titulo} name="titulo" onChange={this.change}  placeholder="Titulo" required/>
                                </div>
                                <div className="form-group">
                                    <label forhtml="descripcion">Descripción</label>
                                    <textarea className="form-control" id="descripcion" name="descripcion" onChange={this.change} rows="3" value={this.state.descripcion} required/>
                                </div>
                                <select className="custom-select" name="estado_id" value={this.state.estado_id} onChange={this.change}>
                                    <option value="1">Por hacer</option>
                                    <option value="2">En proceso</option>
                                    <option value="3">Realizado</option>
                                </select>
                                <button type="submit" className="btn btn-primary mt-1" >Guardar</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Editmodal