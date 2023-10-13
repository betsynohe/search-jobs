// get jobs
const getJobs = () =>{
    fetch(`https://6525afdb67cfb1e59ce79be0.mockapi.io/jobs`)
    .then(res => res.json())
    .then(data => {renderJobs(data)})
}

// get job
const getJob = (jobId) =>{
    fetch(`https://6525afdb67cfb1e59ce79be0.mockapi.io/jobs/${jobId}`)
    .then(res => res.json())
    .then(data => {renderJobDetails(data)})
}
getJobs()
getJob