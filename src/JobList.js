import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from "./SearchForm";
import JobsCardList from './JobsCardList';
import JoblyApi from './api';
import "./JobList.css";

/** Basic List component to list all the jobs
 *
 * Props:
 * - None
 *
 * State:
 *  - searchedJob: Searched for job after receiving value from child SearchForm
 *  - JobsData:
 *     {data: Object of job data retrieved from back-end
 *      isLoading: Boolean value determining if JobsData has been retrieved
 *      errors: Errors from attempting to retrieve back-end data
 *
 * { RoutesList, NavBar} -> JobList -> {SearchForm , JobCardList}
 */

function JobList() {
  const [searchedJob, setSearchedJob] = useState(null);
  const [jobsData, setJobsData] = useState({
    data: null,
    isLoading: true,
    errors: null
  });

  console.log("JobList is called");
  console.log("searchedJob state:", searchedJob);
  console.log("JobsData state:", jobsData);

  //TODO: Look at the solution. Solution does not have dependency for useEffect

  /** Fetches jobs with optional searchTerm filter using JoblyApi
  * Runs whenever searchedJob state changes
  */
  useEffect(function fetchJobsOnSearchedJobChange() {
    async function fetchJobs() {
      try {
        const response = await JoblyApi.getJobs(searchedJob);
        setJobsData({ data: response, isLoading: false, errors: null });
      } catch (err) {
        setJobsData({ data: null, isLoading: false, errors: err });
      }
    }
    fetchJobs();
  }, [searchedJob]);

  /** Sets SearchedCompany state using input from searchForm */
  function search(searchTerm) {
    setJobsData({ data: null, isLoading: true });
    setSearchedJob(searchTerm);
  }


  // Different return statements when awaiting data or for errors
  if (jobsData.isLoading) return <i>Loading...</i>;
  else if (jobsData.errors) return <b>Oh no! {jobsData.errors} </b>;

  return (
    <div>
      <SearchForm search={search} />
      <div className='JobList'>
        {
          jobsData.data.length === 0
          ?
            <b>Sorry, no results were found!</b>
          :
            <JobsCardList jobs={jobsData.data} />
        }
      </div>
    </div>
  );
}

export default JobList;