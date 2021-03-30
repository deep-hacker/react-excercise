import React, {useEffect, useState} from "react";
import * as R from "ramda";
import '../../App.css'
import useSummary from "../../Summary/useSummary";
const Profile = ({backend}) => {
    const SummaryContext = useSummary();
    const updateSummary = async () => await SummaryContext.updateSummary();
    const [profiles, setProfiles] = useState([]);
    const [flag,setFlag] = useState(false)
    useEffect(() => {
        loadProfiles();
        updateSummary()
    }, [flag]);

    const createProfileList = (profile) => {
        return (<div  key={profile.id}>
            <div className="buttons">
                <a href={`task/${profile.id}`}>
            <button className="ui primary basic button" >
                {`Profile Name: ${profile.name}`}
            </button>
                </a>
            <button  className="ui negative basic button" onClick={() => deleteProfile(profile.id)}>
                delete
            </button>
            </div>
        </div>);
    };

    const loadProfiles = async () => {
        try {
            const fetchProfile = await backend.fetchProfiles();
            setProfiles(fetchProfile);
        }
        catch (e) {
            console.error(e);
        }
    };

    const AddProfile = () => {
        const [newProfileName, setNewProfileName] = useState("")
        const newProfileOnChange = event => setNewProfileName(event.target.value)
        const newProfileOnKeyUp = (async event => {
            if (newProfileName === '') return;
            if (event.key !== 'Enter') return;
            await backend.addProfile(newProfileName);
            setFlag(!flag)
        })
        return (<div className="ui input focus"><input value={newProfileName}
                      placeholder={'Create new profile'}
                      onKeyUp={newProfileOnKeyUp}
                      onChange={newProfileOnChange}/>
        </div>);

    }

    const deleteProfile = async id => {
        const fetchedTask = await backend.fetchTasks();
        const getTaskByProfile = task => task.profile === id ;
        const deleteTasksForProfile = task => backend.deleteTask(task.id);
        R.map(deleteTasksForProfile,R.filter(getTaskByProfile,fetchedTask));
        await backend.deleteProfile(id);
        await updateSummary;
        setFlag(!flag)
    }

    return (<>
            <h2>Profiles</h2>
            <div>
            <AddProfile/>
            <div className="ui divider">
            {R.map(createProfileList,profiles)}
            </div>
            </div>
        </>

    );

}

export default Profile;