import React from 'react'

class Task extends React.Component{

    constructor(props){
        super(props)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleUpdateClick(e){
        this.props.updateTask(e.target.getAttribute('dataid') , e.target.getAttribute('dataestado'))
    }

    handleDeleteClick(e){
        this.props.deleteTask(e.target.getAttribute('dataid') , e.target.getAttribute('dataestado'))
    }

    render(){
        return(<div className="card ">
                    <div className="card-body">
                        <div className="d-flex bd-highlight">
                            <div className="p-2 flex-fill bd-highlight"><b>{this.props.task.titulo}</b></div>
                            <div className="p-2 flex-fill bd-highlight">
                                <button type="button" className="btn btn-outline-primary btn-sm float-right" dataid={this.props.task.id} dataestado={this.props.task.estado_id} onClick={this.handleUpdateClick}>Editar</button>
                                <button type="button" className="btn btn-outline-danger btn-sm float-right" dataid={this.props.task.id} dataestado={this.props.task.estado_id} onClick={this.handleDeleteClick}>Eliminar</button>
                            </div>
                        </div>
                        <p className="card-text">{this.props.task.descripcion}</p>
                    </div>
                </div>)
    }
}

export default Task