import React, {useEffect, useState} from "react";
import * as R from "ramda";

const fetchProfiles = async () => {
    const response = await fetch("profile");
    const profiles = await response.json();
    return profiles;
};

const createProfileList = (profile) => {
    return <div key={profile.id}>{profile.name}</div>
};

const ProfileList = () => {
    const [profiles,setProfiles] = useState([]);
    useEffect( () => { const fetchdata = async () =>  await loadProfiles();

    fetchdata();
    },[]);
    const loadProfiles = async () => {
        const fetchProfile = await fetchProfiles();
        setProfiles(fetchProfile)};
    const ProfileElements = R.map(createProfileList,profiles);
    return (
        <div>{ProfileElements}</div>
    );
}

export default ProfileList;