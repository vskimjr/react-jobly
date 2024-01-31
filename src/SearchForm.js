import { React, useState } from "react";

/** Generic Search Form
 *
 * Props:
 *  - search(): accepts searchTerm data -> function to call in parent
 *
 * State:
 *  - searchTerm: the form data retrieved from a user's search
 *
 * { JobList, CompanyList } -> SearchForm
*/

function SearchForm({ search }) {
  console.log("SearchForm reached");

  const [searchTerm, setSearchTerm] = useState("");

  console.log("SearchForm's searchTerm is currently:", searchTerm);

  /** Updates form input based on searched term*/
  function handleChange(evt) {
    setSearchTerm(() => evt.target.value);
  };

  /** Calls parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm);
    setSearchTerm("");
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input value={searchTerm} onChange={handleChange}
        placeholder="Enter search term..." />
      <button>Search!</button>
    </form>
  );
}

export default SearchForm;