import React from 'react';
import "./JobCard.css";

/** Renders information about a single job
 *
 * Props:
 * - job: Object with job data
 *    {id: Integer,
 *    title: String,
 *    salary: Integer,
 *    equity: Numeric,
 *    companyHandle: String}
 *
 * or if from JobCardsList it includes:
 *   {... companyName: String}
 *
 * State:
 * - None
 *
 * {JobsCardList, CompanyList} -> JobCard
 */

function JobCard({ job }) {
  console.log("JobCard is rendered with:", job);

  return (
    <div className='JobCard'>
      <h2>{job.title}</h2>
      {
        job.companyName
          ?
          <i>{job.companyName}</i>
          :
          ""
      }

      <p><b>Salary:</b> {job.salary ? job.salary : "None"}</p>
      <p><b>Equity:</b> {job.equity ? job.equity : "None"}</p>
    </div>
  );

}

export default JobCard;