import React from 'react'

class DeleteModal extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            titulo:'',
            descripcion:'',
            estado_id : "1"
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e){
        e.preventDefault()
        this.props.submitNewTask({titulo:this.state.titulo,descripcion: this.state.descripcion, estado_id:this.state.estado_id }) 
    }

    UNSAFE_componentWillReceiveProps(nextPtops){
        console.log("estos son:",nextPtops)
        this.setState({
            titulo: nextPtops.tasktoDelete.titulo,
            descripcion:nextPtops.tasktoDelete.descripcion,
            estado_id : nextPtops.tasktoDelete.estado_id
        })
    }


    render(){
        return(
                <div className="modal fade" id="modalDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Eliminar Tarea</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Desea Eliminar la tarea <b>{this.state.titulo}</b>?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.confirmDelete}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default DeleteModal