import * as R from 'ramda'
const createBackend = fetch => {
    const fetchProfiles = async () => {
        const response = await fetch("/proxy/profile");
        const profiles = await response.json();
        return profiles;
    };

    const addProfile =  async name => {
        await fetch("/proxy/profile",{method:'POST',body:JSON.stringify({name})})
            .then(res => console.log(res))
    };

    const deleteProfile = async id => {
        await fetch(`/proxy/profile/${id}`,{method:'DELETE'})
            .then(`${id} is deleted successfully`)
    };

    const addTask = async taskJson => {
        await fetch('/proxy/task',{method:'POST',body:JSON.stringify(taskJson)})
    }

    const fetchTasks = async () => {
        const response = await fetch("/proxy/task");
        const tasks = await response.json();
        return tasks;
    }

    const updateTask = async taskJson => {
        await fetch(`/proxy/task/${taskJson.id}`,{method:'POST',body:JSON.stringify(taskJson)})
    }

    const deleteTask = async taskId => {
        await fetch(`/proxy/task/${taskId}`,{method:'DELETE'})
    }

    const fetchSummary = async() => {
        const profiles = await fetchProfiles();
        const tasks = await fetchTasks();
        const getCompletedTasks = task => task.complete === true
        const completedTasks = R.filter(getCompletedTasks,tasks)
        const numberOfCompletedTask = completedTasks.length;
        const numberOfProfiles = profiles.length;
        const numberOfTasksAcrossAllProfiles = tasks.length;
        console.log(numberOfProfiles);
        console.log(numberOfTasksAcrossAllProfiles);
        return {numberOfProfiles,numberOfTasksAcrossAllProfiles,numberOfCompletedTask};
        }

    const backend = {
        fetchProfiles,
        addProfile,
        deleteProfile,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        fetchSummary
    }

    return backend;
}

export default createBackend;