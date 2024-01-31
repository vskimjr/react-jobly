import React from 'react';
import CompanyCard from './CompanyCard';

/** Renders CompanyCards for companies
 *
 * Props:
 * - companies: Array of objects of company data
 * [{handle: string
 * name: string,
 * description: string,
 * numEmployees: integer,
 * logoUrl: string}, ...]
 *
 * State:
 * - None
 *
 * Callgraph TBD
 */

function CompanyCardList({companies}){
  console.log("CompanyCardsList is reached with: ", companies);

  return(
    <div className='CompanyCardList'>
      <ul className="CompanyCardListMap">
        {
          companies.map(company => (
            <li key={company.handle}><CompanyCard company={company} /></li>
          ))
        }
      </ul>
    </div>
  )
}

export default CompanyCardList;