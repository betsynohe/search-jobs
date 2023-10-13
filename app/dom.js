/* selectores */
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const cleanContainer = (selector) => $(selector).innerHTML = '';
const showElement = (selector) => $(selector).classList.remove("is-hidden")
const hideElement = (selector) => $(selector).classList.add("is-hidden")

// guarda los trabajos
const saveJob = () => {
    return{
        name: $("#job-title").value,
        image: $("#url-image").value,
        description: $("#job-description").value,
        category: $("#job-category").value,
        ubication: $("#job-location").value,
        benefits: {
            vacation: $("#job-vacation").value,
            health_insurance: $("#job-health-insuranse").value,
            food_coupons: $("#job-lunch").value,
        },
        salary: $("#job-salary").value,
        experience: $("#job-experience").checked,
    }
}

/* renderiza las tarjetas */
const renderJobs = (jobs) => {
    showElement("#spinner")
    cleanContainer("#cards-container")
    if (jobs) {
        setTimeout(() => {
        hideElement("#spinner")
            for (const { name, image, description, ubication, category, experience,id } of jobs){
                $("#cards-container").innerHTML += 
                ` <section class="column is-4">
                    <div class="card card-media-margin">
                        <div class="card-image">
                            <figure class="image is-3by2">
                                ${image}
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
                                <p class="is-size-4">
                                    ${description}
                                </p>
                            </div>
                        </div>
                        <div class="buttons is-flex is-justify-content-center">
                            <button class="button is-black" onclick="getJobs('${id}')">Más Info</button>
                        </div>
                    </div>
                </section>
                `
        }
        }, 2000)
    }
    
}