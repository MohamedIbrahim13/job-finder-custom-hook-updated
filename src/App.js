import React, { useState} from 'react';
import { Container } from 'react-bootstrap'
import Job from './components/Job';
import SearchForm from './components/SearchForm';
import useFetchJobs from './hooks/useFetchJobs';
import JobPagination from './components/JobPagination';


function App() {
  const [params, setParams] = useState({description: '', location: '', full_time: false});
  const [page,setPage] = useState(1);
  const {jobs,isLoading,error} = useFetchJobs(params,page);
  
  const handleChange =(e)=>{
    const param = e.target.name;
    const value = e.target.value;
    setParams(prevParams => {
      return { ...prevParams,[param]: value }
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs Finder</h1>
      <h4 className="mb-4">Daily Updates</h4>
        <SearchForm params={params} handleChange={handleChange} />
        <JobPagination page={page} setPage={setPage} jobs={jobs}/>
        {isLoading && <h1>Wait , it still loading...</h1>}
        {error && <h1>Error. Try Refreshing.</h1>}
        {jobs.map(job => {
          return <Job key={job.id} job={job} />
        })}
      
    </Container>
  );
}

export default App;
