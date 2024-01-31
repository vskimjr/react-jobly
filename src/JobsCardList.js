import React from 'react';
import JobCard from './JobCard';
import "./JobsCardList.css"

/** Renders JobCards for jobs
 *
 * Props:
 * - jobs: Array of objects of job data
 *    [{id: Integer,
 *    title: String,
 *    salary: Integer,
 *    equity: Numeric,
 *    companyHandle: String}...]
 *
 * State:
 * - None
 *
 * JobList -> JobCardList -> JobCard
 */


function JobsCardList({ jobs }) {
  console.log("JobsCardsList is reached with:", jobs);

  return (
    <div className='JobsCardList'>
      <ul className="JobsCardListMap">
        {
          jobs.map(job => (
            <li key={job.id}><JobCard job={job} /></li>
          ))
        }
      </ul>
    </div>
  );
}

export default JobsCardList;
