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
    .then(data => {
        renderJobDetails(data)
        setFormValues(data)
    })
}

// edita job
const editJob = (jobId) => {
    fetch(`https://6525afdb67cfb1e59ce79be0.mockapi.io/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJob())
    }).finally(() => window.location.reload())
}

//agrega job
const addJob = () => {
    fetch("https://649602f8b08e17c91792f028.mockapi.io/jobs", {
        method: "POST",     
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJob())
    })
}

//elimina job
const deleteJob = (jobId) => {
    fetch(`https://649602f8b08e17c91792f028.mockapi.io/jobs/${jobId}`, {
        method: "DELETE"
    }).finally(() => window.location.reload())
}
