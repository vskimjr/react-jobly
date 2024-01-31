const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  static token

  // = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    console.log("getCompany called with response:", res);
    return res.company;
  }


  /** Get details on all companies with an optional searchTerm filter
   *  for nameLike of a company that is at least 1 character*/

  static async getCompanies(searchTerm) {
    const res = await this.request(`companies/`, searchTerm
      ? { nameLike: searchTerm }
      : {}
    );
    console.log("getFilteredCompanies called with response:", res);
    return res.companies;
  }

  /** Get details on all jobs with an optional searchTerm filter
   *  for a title of a job that is at least 1 character */

  static async getJobs(searchTerm) {
    let res = await this.request(`jobs/`, searchTerm
      ? { title: searchTerm }
      : {}
    );
    console.log("getJobs called with response:", res);
    return res.jobs;
  }

  /** Receives an input of user that includes {username, password, firstName,
   *  lastName, email } and registers that user in the back-end, and returns
   * a JWT token */

  static async register(user) {
    let res = await this.request(`auth/register`, user, "POST");
    console.log("register called with response:", res);
    JoblyApi.token = res.token;
    return res.token;
  }


  /** Receives an input of a username and password and authenticates that
   *  the user exists in the back-end, and returns a JWT token */

  static async login(loginData) {
    let res = await this.request(`auth/token`, loginData, "POST");
    console.log("login called with response:", res);
    JoblyApi.token = res.token;


  
    return res.token;
  }

  /** Receives an input of a username and returns user information:
   * { username, firstName, lastName, email, isAdmin, jobs }
   *
   * jobs is array of jobs [{ id, title, companyHandle, companyName, state }...]
   *
  */

  static async getUserDetails(username) {
    let res = await this.request(`users/${username}`);
    console.log("getUserDetails called with response:", res);
    return res.user;
  }


  /** Receives an input of a user that can include { firstName, lastName,
   *  password, email } and updates the user's details in thee backend and
   *  returns a user object of {username, firstName, lastName, email, isAdmin }
   * */

  static async editProfile(currUser, user) {
    let res = await this.request(`users/${currUser}`, user, "PATCH");
    console.log("EditProfile called with response:", res);
    return res.user;
  }
}

export default JoblyApi;
