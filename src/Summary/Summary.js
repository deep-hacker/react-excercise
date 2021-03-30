import useSummary from "./useSummary";
import React from "react";

const Summary = () => {
    const SummaryContext = useSummary();

    return (
        <div className="ui horizontal statistics">
            <div className="statistic">
                <div className="value">
                    {SummaryContext.numberOfProfiles}
                </div>
                <div className="label">
                    Profiles
                </div>
            </div>
            <div className="statistic">
                <div className="value">
                    {SummaryContext.numberOfTask}
                </div>
                <div className="label">
                    Tasks Across All Profiles
                </div>
            </div>
            <div className="statistic">
                <div className="value">
                    {SummaryContext.numberOfCompletedTask}
                </div>
                <div className="label">
                    Completed Tasks Across All Profiles
                </div>
            </div>
        </div>
    );
}

export default Summary;