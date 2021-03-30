import React from "react";
import createBackend from "./components/Backend/Backend";
import Profile from "./components/Profile/Profile";
import Task from "./components/task/Task"
import Routes from "./components/Route/Routes";
import SummaryProvider from "./Summary/SummaryProvider";
import TopLevel from "./TopLevel/TopLevel";
import Summary from "./Summary/Summary"
const fetchCollaborator = fetch;
const backend = createBackend(fetchCollaborator);
const DefaultProfile = () => <Profile backend={backend}/>;
const DefaultTask = () => <Task backend={backend}/>;
const DefaultRoute = () => <Routes Task={DefaultTask} Profile={DefaultProfile}/>;
const DefaultSummaryProvider = ({children}) => <SummaryProvider backend={backend} >{children}</SummaryProvider>
const DefaultSummary = () => <Summary/>
const DefaultTopLevel = () => <TopLevel SummaryProvider={DefaultSummaryProvider} Summary={DefaultSummary} Routes={DefaultRoute}/>
export default DefaultTopLevel;

