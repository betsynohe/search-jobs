/* selectores */
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const cleanContainer = (selector) => $(selector).innerHTML = '';
const showElement = (selector) => $(selector).classList.remove("is-hidden")
const hideElement = (selector) => $(selector).classList.add("is-hidden")
let isSubmit = false 

// guarda los trabajos
const saveJob = () => {
    return {
        name: $("#job-title").value,
        image: $("#url-image").value,
        description: $("#job-description").value,
        category: $("#job-category").value,
        ubication: $("#job-location").value,
        benefits: {
            vacation: $("#job-vacation").value,
            healt_insurance: $("#job-health-insuranse").value,
            food_coupons: $("#job-lunch").value,
        },
        salary: $("#job-salary").value,
        experience: $("#job-experience").checked,
    }
}
// set form values
const setFormValues = (job) => {
    $("#job-title").value = job.name
    $("#job-description").value = job.description
    $("#job-location").value = job.ubication
    $("#job-experience").checked = job.experience
    $("#job-category").value = job.category
    $("#job-vacation").value = job.benefits.vacation
    $("#job-health-insuranse").value = job.benefits.healt_insurance
    $("#job-lunch").value = job.benefits.food_coupons
    $("#job-salary").value = job.salary
    $("#url-image").value = job.image
}

/* renderiza las tarjetas */
const renderJobs = (jobs) => {
    showElement("#spinner")
    cleanContainer("#cards-container")
    if (jobs) {
        setTimeout(() => {
            hideElement("#spinner")
            for (const { name, image, description, ubication, category, experience, id } of jobs) {
                $("#cards-container").innerHTML +=
                    ` <section class="column is-4">
                    <div class="card card-media-margin">
                        <div class="card-image">
                            <figure class="image is-3by2">
                            <img src="${image}" alt="${name}">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-2">${name}</p>
                                </div>
                            </div>
                            <div class="is-flex is-justify-content-space-around p-3">
                                <p class="has-text-white has-background-black p-2 p-rounded">${category}</p>
                                <p class="has-text-white has-background-black p-2 p-rounded">${experience}</p>
                                <p class="has-text-white has-background-black p-2 p-rounded">${ubication}</p>
                            </div>
                            <div class="content">
                                <p class="is-size-4 container-description">
                                    ${description}
                                </p>
                            </div>
                        </div>
                        <div class="buttons is-flex is-justify-content-center">
                            <button class="button is-black see-details-btn" onclick="getJob('${id}')">Más Info</button>
                        </div>
                    </div>
                </section>
                `
                for (const btn of $$(".see-details-btn")){
                    btn.addEventListener("click" , () => {
                        hideElement(".banner")
                    })
                }
            }
        }, 2000)
    }
}

// tarjetas de detalles
const renderJobDetails = ({ image, name, description, salary, ubication, experience, benefits: { food_coupons, healt_insurance, vacation }, id }) => {
    hideElement("#cards-container")
    showElement("#container-description")
    cleanContainer("#card-description")
    showElement("#spinner")
    console.log(healt_insurance);
    setTimeout(() => {
        hideElement("#spinner")
        $("#card-description").innerHTML += `
            <div class="card-content is-flex is-flex-direction-column">
                            <div class="is-flex column is-multiline is-12">
                                <div class="column is-4">
                                    <figure class="image is-5by4">
                                        <img src="${image}" alt="${name}">
                                    </figure>
                                </div>
                                <section class="column is-8 is-flex is-flex-direction-column">
                                    <div class="mt-3 mb-3">
                                        <p class="title is-size-2">${name}</p>
                                    </div>
                                    <div>
                                        <p class="is-size-3">
                                        ${description}
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <section class="column is is-flex is-multiline is-12">
                                <section class="column is-6">
                                    <div class="is-flex">
                                        <img class="mr-3 image is-64x64" src="./assets/icons8-scrolls-64.png"
                                            alt="pergamino icon">
                                        <p class="title is-size-2-tablet">Beneficios</p>
                                    </div>
                                    <p class="is-size-3">Vacaciones</p>
                                    <p class="title is-size-4 has-text-white has-background-black has-text-centered"> ${vacation}</p>
                                    <p class="is-size-3">Seguro Médico</p>
                                    <p class="title is-size-4 has-text-white has-background-black has-text-centered"> ${healt_insurance}</p>
                                    <p class="is-size-3">Cupones para canjear por Dumplings o Fideos</p>
                                    <p class="title is-size-4 has-text-white has-background-black has-text-centered">${renderBoolean(food_coupons)}</p>
                                </section>
                                <section class="column is-6 is-right">
                                    <div class="is-flex">
                                        <img class=" mr-3 image is-64x64" src="./assets/icons8-to-do-list-68.png"
                                            alt="pergamino icon">
                                        <p class="title is-size-2-tablet">Requisitos</p>
                                    </div>
                                    <p class="is-size-3">Experiencia</p>
                                    <p class="title is-size-4 has-text-white has-background-black has-text-centered">${renderBoolean(experience)}</p>
                                </section>
                            </section>
                            <section class="column is is-flex is-multiline is-12 mt-6">
                                <section class="column is-6">
                                    <div class="is-flex">
                                        <img class="mr-3 image is-64x64" src="./assets/icons8-definir-ubicación-68.png"
                                            alt="${ubication}">
                                        <p class="title is-size-2-tablet">Ubicación</p>
                                    </div>
                                    <p class="title is-size-4 has-text-white has-background-black has-text-centered">${ubication}</p>
                                </section>
                                <section class="column is-6 is-right">
                                    <div class="is-flex">
                                        <img class=" mr-3 image is-64x64" src="./assets/icons8-yuan-64.png"
                                            alt="${salary}">
                                        <p class="title is-size-2-tablet">Salario</p>
                                    </div>
                                    <p class="title is-size-4 has-text-white has-background-black has-text-centered">${salary}</p>
                                </section>
                            </section>
                            <div class="column is-flex is-justify-content-center mt-3">
                                <button class="btn-edit button has-text-black is-medium is-success mr-6" data-id="${id}">Editar Trabajo</button>
                                <button class="btn-delete button has-text-black is-medium is-danger" data-id="${id}">
                                    Eliminar Trabajo
                                </button>
                            </div>
                        </div>
            `
            for (const btn of $$(".btn-edit")) {
                btn.addEventListener("click", () => {
                    $("#form-add").classList.add("is-active")
                    hideElement("#add-job-btn")
                    showElement("#edit-form-btn")
                    const jobId = btn.getAttribute("data-id")
                    $("#edit-form-btn").setAttribute("data-id", jobId)
                    isSubmit = false
                })
            } 
            
            for (const btn of $$(".btn-delete")){
                btn.addEventListener("click", () => {
                    $("#modal-alert").classList.add("is-active")
                    const jobId = btn.getAttribute("data-id")
                    $("#delete-job-btn").setAttribute("data-id", jobId)
                })
            }
    }, 2000)
}

// render boolean
const renderBoolean = (value) => {
    if (value) {
        return "Sí"
    } else {
        return "No"
    }
}

// FUNCION PARA INICIALIZAR LA APP 
const initializeApp = () => {
    // crear job
$("#btn-create-job").addEventListener("click", () => {
    $("#form-add").classList.add("is-active")
    $("#form").reset()
    isSubmit = true
})
    // borrar job
$("#delete-job-btn").addEventListener("click", () => {
    const jobId = $("#delete-job-btn").getAttribute("data-id")
    deleteJob(jobId)
})

$("#cancel-form").addEventListener("click", () =>{
    $("#form").classList.remove("is-active")
})


$("#form").addEventListener("submit", (e) => {
    e.preventDefault()
    if(isSubmit){
        addJob()
        $("#form").reset()
    } else {
        const jobId = $("#edit-form-btn").getAttribute("data-id")
        editJob(jobId)
    }
    
})
}

window.addEventListener("load", () => {
    initializeApp()
    getJobs()
})