import React, {useEffect, useState} from "react";
import SummaryContext from "./SummaryContext";
const SummaryProvider = ({backend,children}) => {
    const [numberOfProfiles,setNumberOfProfiles] = useState(0);
    const [numberOfTask,setNumberOfTask] = useState(0);
    const [numberOfCompletedTask,setNumberOfCompletedTask] = useState(0)

    const updateSummary = async() => {
        const {numberOfProfiles,numberOfTasksAcrossAllProfiles,numberOfCompletedTask} = await backend.fetchSummary();
        setNumberOfProfiles(numberOfProfiles);
        setNumberOfTask(numberOfTasksAcrossAllProfiles);
        setNumberOfCompletedTask(numberOfCompletedTask);
    }

    useEffect(() => {
        updateSummary();
    },[]);

    return <SummaryContext.Provider value={{updateSummary,numberOfProfiles,numberOfTask,numberOfCompletedTask}} >{children}</SummaryContext.Provider>;
}

export default SummaryProvider;