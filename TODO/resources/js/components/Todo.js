import React from 'react'
import axios from 'axios'
import Nav from './Nav'
import Task from './task'
import request from '../request/request'
import Createmodal from './Modal'
import Editmodal from './ModalEdit'
import DeleteModal from './ModalDelete'


class Todo extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            porHacer: [],
            enProceso : [],
            realizado : [],
            taskToUpdate : {titulo:'',descripcion:'',estado_id:''},
            tasktoDelete : {}
        }

        this.renderTask = this.renderTask.bind(this)
        this.submitNewTask = this.submitNewTask.bind(this)
        this.change = this.change.bind(this)
        this.updateTask = this.updateTask.bind(this)
        this.submitUpdateTask = this.submitUpdateTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    submitNewTask(newTask){
        
        request.saveTask(this.props.routes.apiPost, newTask, (data)=>{
            let copyTask = []
            if(data.data.newTask.estado_id == 1){
                copyTask = this.state.porHacer
                copyTask.unshift(data.data.newTask)
                this.setState({porHacer : copyTask}) 
                console.log("entre a por hacer")
            }
            if(data.data.newTask.estado_id == 2){
                copyTask = this.state.enproceso 
                copyTask.unshift(data.data.newTask)
                this.setState({enproceso : copyTask})
                console.log("entre a en proceso")
            }
            if(data.data.newTask.estado_id == 3){
                copyTask = this.state.realizado 
                copyTask.unshift(data.data.newTask)
                this.setState({realizado : copyTask})
                console.log("entre a realizada")
            }
            $('#modelCreate').modal('hide')
        }) 
    }

    change(e){
        this.setState({[e.target.name]:e.target.value})
    }

    getAllTask(){
        self = this
        request.gettask(this.props.routes.apiGet, (task) => {
            let porHacer = [], enProceso = [], realizado = []

            task.data.data.forEach(todo => {
                if(todo.estado_id == 1){
                    porHacer.push(todo)
                }
                if(todo.estado_id == 2){
                    enProceso.push(todo)
                }
                if(todo.estado_id == 3){
                    realizado.push(todo)
                }
            });
            
            self.setState({
                porHacer:porHacer.reverse(),
                enProceso:enProceso.reverse(),
                realizado: realizado.reverse()})
        })
    }

    componentDidMount(){
        this.getAllTask()
    }

    renderTask(task){
        var collectiontask = []
        task.forEach(todo =>{
            collectiontask.push(<Task key={"tarea-"+todo.id} task={todo} updateTask={this.updateTask} deleteTask={this.deleteTask}/>)
        })
        return collectiontask
    }

    selectCollection(estado_id){
        let copytask 
        if(estado_id == 1){
            copytask = this.state.porHacer
        }
        if(estado_id == 2){
            copytask = this.state.enProceso
        }
        if(estado_id == 3){
            copytask = this.state.realizado
        }
        return copytask
    }

    searchTask(task_id, estado_id){
    
       return this.selectCollection(estado_id).find( todo => todo.id == task_id )
    }

    updateTask(task_id, estado_id){
       let copytask = this.searchTask(task_id, estado_id)
       this.setState({taskToUpdate: copytask})
        $('#modelUpdate').modal('show')
    }

    submitUpdateTask(updateTask){
        request.putTask(updateTask.routeUpdate, updateTask, (data)=>{
            this.getAllTask()
            $('#modelUpdate').modal('hide')
        }) 
    }

    deleteTask(task_id, estado_id){
        let copytask = this.searchTask(task_id, estado_id)
        this.setState({tasktoDelete: copytask})
         $('#modalDelete').modal('show')
    }

    confirmDelete(){
        request.deleteTask(this.state.tasktoDelete.routeDelete, (data)=>{ 
            $('#modalDelete').modal('hide')
            this.getAllTask()
        })
    }

    render(){
        return(
            <div>
                <Nav/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 mt-1">
                            <h3 className="text-center">Por hacer</h3>
                            {this.renderTask(this.state.porHacer)}
                        </div>
                        <div className="col-sm-12 col-md-4 mt-1">
                            <h3 className="text-center">En proceso</h3>
                            {this.renderTask(this.state.enProceso)}
                        </div>
                        <div className="col-sm-12 col-md-4 mt-1">
                            <h3 className="text-center">Realizado</h3>
                            {this.renderTask(this.state.realizado)}
                        </div>
                    </div>
                </div>
                <Createmodal submitNewTask={this.submitNewTask}/>
                <Editmodal taskToUpdate={this.state.taskToUpdate} submitUpdateTask={this.submitUpdateTask}/>
                <DeleteModal tasktoDelete={this.state.tasktoDelete} confirmDelete={this.confirmDelete}/>
            </div>
        )
    }
}

export default Todo