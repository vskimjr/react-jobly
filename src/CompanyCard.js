import React from 'react';

/** Renders information about a single company
 *
 * Props:
 * - company: object with company data
 * {handle: string
 * name: string,
 * description: string,
 * numEmployees: integer,
 * logoUrl: string}
 *
 * State:
 * - None
 *
 * // TODO: Callgraph TBD
 */
function CompanyCard({company}){
  console.log("CompanyCard is rendered with: ", company);

  return (
    <div className='CompanyCard'>
      <Link to={`$company.handle`}><h2>{company.name}</h2></Link>
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyCard;