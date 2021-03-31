import React, {useEffect, useState} from "react";
import * as R from 'ramda'
import useSummary from "../Summary/useSummary";
const Task = ({backend}) => {
    const SummaryContext = useSummary();
    const updateSummary = async () => await SummaryContext.updateSummary();
    const [tasks,setTasks] = useState([]);
    const [flag,setFlag] = useState(false);
    useEffect(() => {
        loadTasks();
        updateSummary();
    },[flag])
    const loadTasks = async () => {
        try {
            const fetchTask = await backend.fetchTasks();
            setTasks(fetchTask);
        }
        catch (e) {
            console.error(e);
        }
    };
    const updateTask = task => {backend.updateTask(task)};
    const handleOnClick = (event,taskToUpdate) => {
        taskToUpdate.complete = !taskToUpdate.complete;
        updateTask(taskToUpdate)
        setFlag(!flag)
    }
    const pathNameArray = window.location.pathname.split("/");
    const findTaskByProfile = task => task.profile === pathNameArray[2] ;
    const taskList = R.filter(findTaskByProfile,tasks);
    const renderTasks = task => {
        const taskToUpdate = {...task};
        return (<div className="item" key={task.id} style={taskToUpdate.complete?{"textDecoration": "line-through"}:{}} onClick={event => handleOnClick(event,taskToUpdate)}>{task.name}</div>) };
    const taskListRendered = R.map(renderTasks,taskList);
    const deleteCompletedTask = task => backend.deleteTask(task.id);
    const getCompletedTask = task => task.complete === true;
   const clearCompletedTask = () => { R.map(deleteCompletedTask,R.filter(getCompletedTask,taskList)); setFlag(!flag); }

    const AddTask = () => {
        const [taskName,setTaskName] = useState('');
        const newTaskOnChange = event => setTaskName(event.target.value);
        const newTaskOnKeyUp = async event => {
            if (taskName === '') return;
            if (event.key !== 'Enter') return;
            let TaskJson = {}
            TaskJson.profile = pathNameArray[2];
            TaskJson.name = taskName;
            TaskJson.complete = false;
            await backend.addTask(TaskJson);
            setFlag(!flag)
        }
        return (<div className="ui input focus"><input value={taskName}
                                                       placeholder={'Create new Task'}
                                                       onKeyUp={newTaskOnKeyUp}
                                                       onChange={newTaskOnChange}/>
        </div>);
    };

return (<>
        <h2>Tasks</h2>
        <AddTask/>
        <div className="ui divider">
        <div className="ui list">
            {taskListRendered}
        </div>
    <div className="ui buttons">
        <button className="ui labeled icon button" onClick={() => {window.location.href="/profile"}}>
            <i className="left chevron icon"></i>
            Profiles
        </button>
        <button className="ui button" onClick={clearCompletedTask}>
            <i className="check icon"></i>
            Delete Completed Tasks
        </button>
    </div>
        </div>
    </>);
};

export default Task;