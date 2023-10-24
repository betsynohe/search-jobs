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
        image1: $("#url-image1").value,
        image2: $("#url-image2").value,
        description: $("#job-description").value,
        category: $("#job-category").value,
        ubication: $("#job-location").value,
        benefits: {
            vacation: $("#job-vacation").value,
            healt_insurance: $("#job-health-insuranse").value,
            food_coupons: $("#job-lunch").checked,
        },
        salary: $("#job-salary").value,
        experience: $("#job-experience").value,
    }
}
// set form values
const setFormValues = (job) => {
    $("#job-title").value = job.name
    $("#job-description").value = job.description
    $("#job-location").value = job.ubication
    $("#job-experience").value = job.experience
    $("#job-category").value = job.category
    $("#job-vacation").value = job.benefits.vacation
    $("#job-health-insuranse").value = job.benefits.healt_insurance
    $("#job-lunch").checked = job.benefits.food_coupons
    $("#job-salary").value = job.salary
    $("#url-image1").value = job.image1
    $("#url-image2").value = job.image2
}

/* renderiza las tarjetas */
const renderJobs = (jobs) => {
    showElement("#spinner")
    cleanContainer("#cards-container")
    if (jobs) {
        setTimeout(() => {
            hideElement("#spinner")
            /* $("#main-background").style.backgroundColor="#8eb545" */
            for (const { name, image1, image2, description, ubication, category, experience, id } of jobs) {
                $("#cards-container").innerHTML +=
                    ` <section class="column is-4">
                    <div class="card card-media-margin">
                        <div class="card-image">
                            <figure class="card-img-card image is-3by2">
                                <img src="${image1}" alt="${name}"/>
                                <img src="${image2}" alt="${name}" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-2">${name}</p>
                                </div>
                            </div>
                            <div class="is-size-5-desktop p-3">
                                <p class:"p-2"><spam class="has-text-weight-bold">Categoría:</spam> ${category}</p>
                                <p class:"p-2"><spam class="has-text-weight-bold">Experiencia:</spam> ${renderBoolean(experience)}</p>
                                <p class:"p-2"><spam class="has-text-weight-bold">Ubicación:</spam> ${ubication}</p>
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
                        showElement("#banner-description")
                    })
                }
            }
        }, 2000)
    }
}

// tarjetas de detalles
const renderJobDetails = ({ image1, name, description, salary, ubication, experience, benefits: { food_coupons, healt_insurance, vacation }, id }) => {
    hideElement("#cards-container")
    showElement("#container-description")
    cleanContainer("#card-description")
    showElement("#spinner")
    setTimeout(() => {
        hideElement("#spinner")
        $("#card-description").innerHTML += `
            <div class="card-content is-flex is-flex-direction-column">
                <div class="is-flex column is-multiline is-12 container-card-description">
                    <div class="column is-4">
                        <figure class="image is-5by4">
                            <img src="${image1}" alt="${name}">
                        </figure>
                    </div>
                    <section class="column is-8 is-flex is-flex-direction-column">
                        <div class="mt-3 mb-3">
                            <p class="title is-size-2 is-size-3-mobile">${name}</p>
                        </div>
                        <div>
                            <p class="is-size-3 is-size-6-mobile">
                            ${description}
                            </p>
                        </div>
                    </section>
                </div>
                <section class="column is is-flex is-multiline is-12">
                    <section class="column is-6">
                        <div class="is-flex info-description">
                            <img class="mr-3 is-64x64 icon-description" src="./assets/icons8-scrolls-64.png"
                                alt="pergamino icon">
                            <p class="title is-size-2-tablet is-size-5-mobile">Beneficios</p>
                        </div>
                        <p class="is-size-3 is-size-5-mobile">Vacaciones</p>
                        <p class="title is-size-4 is-size-6-mobile has-text-white has-background-black has-text-centered"> ${vacation}</p>
                        <p class="is-size-3 is-size-5-mobile">Seguro Médico</p>
                        <p class="title is-size-4 is-size-6-mobile has-text-white has-background-black has-text-centered"> ${healt_insurance}</p>
                        <p class="is-size-3 is-size-5-mobile">Cupones para Dumplings</p>
                        <p class="title is-size-4 is-size-6-mobile has-text-white has-background-black has-text-centered">${renderBoolean(food_coupons)}</p>
                    </section>
                    <section class="column is-6 is-right">
                        <div class="is-flex info-description">
                            <img class=" mr-3 is-64x64 icon-description" src="./assets/icons8-requisito-64.png"
                                alt="pergamino icon">
                            <p class="title is-size-2-tablet is-size-5-mobile">Requisitos</p>
                        </div>
                        <p class="is-size-3 is-size-5-mobile">Experiencia</p>
                        <p class="title is-size-4 is-size-6-mobile has-text-white has-background-black has-text-centered">${renderBoolean(experience)}</p>
                    </section>
                </section>
                <section class="column is is-flex is-multiline is-12 mt-6">
                    <section class="column is-6">
                        <div class="is-flex info-description">
                            <img class="mr-3 is-64x64 icon-description" src="./assets/icons8-definir-ubicación-68.png"
                                alt="${ubication}">
                            <p class="title is-size-2-tablet is-size-5-mobile">Ubicación</p>
                        </div>
                        <p class="title is-size-4 is-size-6-mobile has-text-white has-background-black has-text-centered">${ubication}</p>
                    </section>
                    <section class="column is-6 is-right">
                        <div class="is-flex info-description">
                            <img class=" mr-3 is-64x64 icon-description" src="./assets/icons8-yuan-64.png"
                                alt="${salary}">
                            <p class="title is-size-2-tablet is-size-5-mobile">Salario</p>
                        </div>
                        <p class="title is-size-4 is-size-6-mobile has-text-white has-background-black has-text-centered">${salary}</p>
                    </section>
                </section>
                <div class="column is-flex is-justify-content-center mt-3">
                    <button class="btn-edit button is-responsive has-text-black is-medium is-success mr-3" data-id="${id}">Editar Trabajo</button>
                    <button class="btn-delete button is-responsive has-text-black is-medium is-danger" data-id="${id}">
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
    $("#form-add").classList.remove("is-active")
    showElement("#cards-container")
})

$("#form").addEventListener("submit", (e) => {
    e.preventDefault()
    if(isSubmit){
        addJob()
        $("#form").reset()
        $("#form-add").classList.remove("is-active")
    } else {
        const jobId = $("#edit-form-btn").getAttribute("data-id")
        editJob(jobId)
    }
})
// search
$("#search-btn").addEventListener("click", () =>{
    const ubication = $("#locationes").value
    const experience = $("#experience").value
    const category = $("#category").value
    getJobs(ubication, experience, category)
    console.log(category);
})

$("#category").addEventListener("change", () => {
    $("#locationes").value = ""
    $("#experience").value = ""
})

$("#locationes").addEventListener("change", () => {
    $("#category").value = ""
    $("#experience").value = ""
})

$("#experience").addEventListener("change", () => {
    $("#locationes").value = ""
    $("#category").value = ""
})
//resetea el filtro
$("#reset-btn").addEventListener("click", () => {
    $("#locationes").value = ""
    $("#category").value = ""
    $("#experience").value = ""
    getJobs()
})
}

window.addEventListener("load", () => {
    initializeApp()
    getJobs()
})
