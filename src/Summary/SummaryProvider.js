import React, {useEffect, useState} from "react";
import SummaryContext from "./SummaryContext";
const SummaryProvider = ({backend,children}) => {
    const [numberOfProfiles,setNumberOfProfiles] = useState(0);
    const [numberOfTask,setNumberOfTask] = useState(0);

    const updateSummary = async() => {
        const {numberOfProfiles,numberOfTasksAcrossAllProfiles} = await backend.fetchSummary();
        setNumberOfProfiles(numberOfProfiles);
        setNumberOfTask(numberOfTasksAcrossAllProfiles);
    }

    useEffect(() => {
        updateSummary();
    },[]);

    return <SummaryContext.Provider value={{updateSummary,numberOfProfiles,numberOfTask}} >{children}</SummaryContext.Provider>;
}

export default SummaryProvider;