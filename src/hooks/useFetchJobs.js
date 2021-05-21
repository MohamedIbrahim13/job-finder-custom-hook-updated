import {useState,useEffect} from 'react';
import axios from 'axios';

const useFetchJobs = (params,page)=>{
    const [jobs,setJobs] = useState([]);
    const [error,setError] = useState();
    const [isLoading,setLoading] = useState(true);

    useEffect(()=>{
        const canceltoken1 = axios.CancelToken.source();
        axios.get('https://jobs.github.com/positions.json',{canceltoken1:canceltoken1.token,params:{...params,page: page,markdown:true}}).then(res=>{
            setLoading(false);
            setJobs(res.data);
        }).catch(err=>{
            if(axios.isCancel(err)){
                setError(err);
            }
        });

        const canceltoken2 = axios.CancelToken.source();
        axios.get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json',{canceltoken2:canceltoken2.token,params:{...params,page: page + 1,markdown:true}}).then(res=>{
            setLoading(false);
            setJobs(res.data);
        }).catch(err=>{
            if(axios.isCancel(err)){
                setError(err);
            }
        });
        return ()=>{
            canceltoken1.cancel();
            canceltoken2.cancel();
        }
    },[params,page]);
    return {jobs,error,isLoading};
};

export default useFetchJobs;
