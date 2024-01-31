import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from './api';
import "./CompanyList.css";
import SearchForm from "./SearchForm";


/** Basic List component to list all the companies with links to details of a
 *  company
 *
 * Props: None
 *
 * State:
 *  - searchedCompany: Searched for company after receiving value from child
 *    SearchForm
 *  - CompaniesData:
 *     {data: Object of all companies data retrieved from back-end
 *      isLoading: Boolean value determining if companiesData has been retrieved
 *      errors: Errors from attempting to retrieve back-end data}
 *
 * { RoutesList, NavBar } --> CompanyList --> SearchForm
*/

function CompanyList() {
  const [searchedCompany, setSearchedCompany] = useState("");
  const [companiesData, setCompaniesData] = useState({
    data: null,
    isLoading: true,
    errors: null
  });

  console.log("CompanyList is called");
  console.log("searchedCompany state:", searchedCompany);
  console.log("CompaniesData state:", companiesData);


  /** Fetches companies data with optional searchTerm filter using JoblyApi
   *  Runs whenever searchedCompany state changes */
  useEffect(function fetchCompaniesOnSearchedCompanyChange() {
    async function fetchCompanies() {
      try {
        const response = await JoblyApi.getCompanies(searchedCompany);
        setCompaniesData({ data: response, isLoading: false, errors: null });
      } catch (err) {
        setCompaniesData({ data: null, isLoading: false, errors: err });
      }
    };
    fetchCompanies();
  }, [searchedCompany]);


  /** Sets SearchedCompany state using input from searchForm */
  function search(searchTerm) {
    setCompaniesData({ data: null, isLoading: true });
    setSearchedCompany(searchTerm);
  }

  // Different return statements when awaiting data or for errors
  if (companiesData.isLoading) return <i>Loading...</i>;
  else if (companiesData.errors) return <b>Oh no! {companiesData.errors} </b>;

  return (
    <div>
      <SearchForm search={search} />
      <div className='CompanyList'>
        {
          companiesData.data.length === 0
            ?
            <b>Sorry, no results were found!</b>
            :
            <ul>
              {companiesData.data.map(company => (
                <li key={company.handle} className="companyLink">
                  <Link to={`${company.handle}`} >
                    <h3>{company.name} </h3><br />
                    <div className="CompanyListDescription">
                      <p>{company.description}</p>
                    </div>
                  </Link>
                  {company.logoUrl
                    ?
                    <img src={`${company.logoUrl}`} alt={company.name} />
                    :
                    ""
                  }
                </li>))
              }
            </ul>
        }
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <SearchForm search={search} />
  //     {companiesData.isLoading
  //     ?
  //     <i>Loading...</i>
  //     :
  //     <div className='CompanyList'>
  //       {
  //         companiesData.data.length === 0
  //           ?
  //           <b>Sorry, no results were found!</b>
  //           :
  //           <ul>
  //             {companiesData.data.map(company => (
  //               <li key={company.handle} className="companyLink">
  //                 <Link to={`${company.handle}`} >
  //                   <h3>{company.name} </h3><br />
  //                   <div className="CompanyListDescription">
  //                     <p>{company.description}</p>
  //                   </div>
  //                 </Link>
  //                 {company.logoUrl
  //                   ?
  //                   <img src={`${company.logoUrl}`} alt={company.name} />
  //                   :
  //                   ""
  //                 }
  //               </li>))
  //             }
  //           </ul>
  //       }
  //     </div>
  //     }
  //   </div>
  // );
}

export default CompanyList;