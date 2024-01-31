import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import JobsCardList from './JobsCardList';
import JoblyApi from './api';
import "./CompanyDetails.css";

/** Shows the details of a single Company and their listed jobs
 *
 * Props:
 *  - None
 *
 * State
 * - companyDetails: object
 * {data: Object of a company's data retrieved from back-end
 *  isLoading: Boolean value determining if company data has been retrieved
 *  errors: Errors from attempting to retrieve back-end data}
 *
 * { RoutesList } --> CompanyDetails --> JobCardList
*/

function CompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState({
    data: null,
    isLoading: true,
    errors: null
  });

  const { handle } = useParams(); //Note: Must be identical to RouteList

  console.log("CompanyDetails is called with company:", handle);
  console.log("companyDetails STATE: ", companyDetails);

  /** Calls getCompanyDetails to retrieve back-end data on a company upon
   * initial mounting */
  useEffect(function fetchCompanyWhenMounted() {
    console.log("* USE EFFECT COMPANYDETAILS RAN")
    async function getCompanyDetails() {
      try {
        const response = await JoblyApi.getCompany(handle); //Bug: awaited twice
        setCompanyDetails({ data: response, isLoading: false, errors: null });
      } catch (err) {
        setCompanyDetails({ data: null, isLoading: false, errors: err, });
      }
    };
    getCompanyDetails();
  }, [handle]);


  // Different return statements when awaiting data or for errors
  if (companyDetails.isLoading) return <i>Loading...</i>;
  else if (companyDetails.errors) return <b>Oh no! {companyDetails.errors} </b>;


  return (
    <div className='CompanyDetails'>
      <div className="CompanyDetailsName">
        <h1> {companyDetails.data.name}</h1>
      </div>
      <p><i> {companyDetails.data.description} </i></p>
      <p> <b>Employees Count:</b> {companyDetails.data.numEmployees}</p>
      {companyDetails.data.logoUrl
        ?
        <img src={companyDetails.data.logoUrl} alt={companyDetails.data.name} />
        :
        ""
      }
      <div className='JobCardList'>
        <JobsCardList jobs={companyDetails.data.jobs} />
      </div>
    </div>
  );
}

export default CompanyDetails;