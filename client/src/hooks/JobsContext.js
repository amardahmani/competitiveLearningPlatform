import { createContext, useEffect, useState } from "react";
import {  getJobsRecruiter } from "../services/job.service";

export const JobsContext = createContext({
    jobs: null,
    deleteJob: () => {},
    updateJobs: () => {},
    appendJob: () => {},
})



const JobsProvider = ({ children }) => {

    const [jobs,setJobs] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getJobsRecruiter();
                setJobs(response.data);
            } catch (error) {
            }
        }
        fetchData();
    }, []);

    const updateJobsState = (updatedJob) => {
        setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
    }

    const deleteJobState = (jobID) => {
        setJobs(jobs.filter(job => job._id!== jobID));
    }

    const appendJobState = (job) => {
        setJobs([...jobs, job]);
    }

   

    return (
        <JobsContext.Provider value={{ jobs, deleteJobState, updateJobsState, appendJobState }}>
            {children}
        </JobsContext.Provider>
    )
}

export default JobsProvider;