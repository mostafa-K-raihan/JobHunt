import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobsPagination from './JobsPagination';
import JobSearchForm from './JobSearchForm';

function App() {

  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const handleParamChange = e => {
    const { name, value } = e.target;
    setPage(1);
    setParams(prevParams => {
      return {...prevParams, [name]: value,}
    });
  }

  const { jobs, loading, errors, hasNextPage } = useFetchJobs(params, page);
  return (
    <div className="my-5 p-20">
      <h1 className="mb-4">Github Jobs</h1>
      <JobSearchForm params={params} onChangeParams={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}></JobsPagination>
      { loading && <h1>Loading...</h1> } 
      { errors && <h1>Try Again...</h1> }
      { jobs.map(job => <Job key={job.id} job={job} />) } 
      {/* <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}></JobsPagination> */}
    </div>
  );
}

export default App;
