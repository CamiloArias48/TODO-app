import React from 'react'

class Createmodal extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            titulo:'',
            descripcion:'',
            estado_id : "1"
        }

        this.change = this.change.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e){
        e.preventDefault()
        this.props.submitNewTask({titulo:this.state.titulo,descripcion: this.state.descripcion, estado_id:this.state.estado_id }) 
    }

    change(e){
        this.setState({[e.target.name]:e.target.value})
    }  

    render(){
        return(
                <div className="modal fade" id="modelCreate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Crear Tarea</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                             <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label forhtml="inputTitulo">Titulo</label>
                                    <input type="text" className="form-control" id="inputTitulo"  name="titulo" onChange={this.change} value={this.state.titulo} placeholder="Titulo" required/>
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

export default Createmodal