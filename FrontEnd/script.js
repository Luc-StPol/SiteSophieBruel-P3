
async function fetchWorks() {

    const response = await fetch("http://localhost:5678/api/works")
    const dataResponse = await response.json()

    let category = 0
    
    const filtreForm = document.getElementById("filtreForm")

    filtreForm.addEventListener("change", (e) => {
        category = e.target.value
        filtre(category, dataResponse)
    
    })

filtre(category, dataResponse)

}

function filtre(category, dataResponse ) {

    const galleryDiv = document.getElementById("gallery")
    
    let worksData = dataResponse

    galleryDiv.innerHTML=""

        if (category == 0) {
            worksData = dataResponse
        } else {
            worksData = dataResponse.filter((data) => data.categoryId == category)
        }

        for(let i=0; i < worksData.length; i++) {
            const figureElement = document.createElement("figure")
            figureElement.innerHTML = `
            <img src="${worksData[i].imageUrl}" alt="${worksData[i].title}">
            <figcaption> ${worksData[i].title} </figcaption>`
            galleryDiv.appendChild(figureElement)
            
        }
}

function modal() {

    const token = sessionStorage.getItem("token")
    
    let modal = null

    if(token) {
        
        const portfolioTitle = document.querySelector(".portfolio-title")
        const openModal = document.createElement("a")
        openModal.href="#modal1"
        openModal.innerHTML=`<i
        class="fa-regular fa-pen-to-square"></i> modifier`
        portfolioTitle.appendChild(openModal)

        openModal.addEventListener( "click", (e) => {
            e.preventDefault()
            const target = document.querySelector(e.target.getAttribute('href'))
            target.style.display = null
            target.removeAttribute('aria-hidden')
            target.setAttribute('aria-modal', true)
            modal = target
            target.addEventListener('click', closeModal)
            modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
            modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)            
        }
        ) 
    }

    function closeModal(e){
        if(modal === null) return
        e.preventDefault()
        modal.style.display = "none"
        modal.setAttribute('aria-hidden', true)
        modal.removeAttribute('aria-modal')   
        modal.removeEventListener('click', closeModal)
        modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
        modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)     
        modal = null    
    }

    function stopPropagation(e) {
        e.stopPropagation()
    }

    window.addEventListener('keydown',(e) => {
        if(e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
        }
    })
}

function modalContent(){

const modal = document.querySelector(".modal-content")

const token = sessionStorage.getItem("token")

    
pictureGallery()
   
async function pictureGallery() {

    const modalGallery = document.createElement("div")
    modal.innerHTML=`
        <h3 style="margin-top: 36px;"> Galerie photo </h3>
        ` 
    modal.appendChild(modalGallery)

    const response = await fetch("http://localhost:5678/api/works")
    const dataResponse = await response.json()
    
        for(let i = 0; i < dataResponse.length; i++) {
            
            const figureElement = document.createElement("figure")
            figureElement.innerHTML = `
            <img src="${dataResponse[i].imageUrl}" alt="${dataResponse[i].title}">
            `

            const btnDeleteWork = document.createElement("button")
            btnDeleteWork.innerHTML = `<i class="fa-solid fa-trash-can addPicture"></i>`
            figureElement.appendChild(btnDeleteWork)

            const workId = dataResponse[i].id
            btnDeleteWork.addEventListener("click", () => deleteWork(workId, token))

            modalGallery.appendChild(figureElement)
            
        }
    
    async function deleteWork(workId, token){

        const url = `http://localhost:5678/api/works/${workId}`
        const method = {
            method: 'DELETE',
            headers: {'authorization': `Bearer ${token}`}
        }
        await fetch(url, method)
        fetchWorks()
        pictureGallery()
    }
            
    // Switch to addPicture
    const btnAddPicture = document.createElement("button")
    btnAddPicture.className = "btnAddPicture"
    btnAddPicture.innerText = "Ajouter une photo"
    modal.appendChild(btnAddPicture)
    
    btnAddPicture.addEventListener("click", () => {
        btnAddPicture.removeEventListener("click", addPicture())
    })
}

function addPicture() {

    // Formulaire d'envoi
    modal.innerHTML=`
        <button class="modal-return"><i class="fas fa-arrow-left fa-2x"></i></button>
        <h3 style="margin-top: 13px;" >Ajout photo</h3>
        <form class="modal-form" id="formAddWork">
        <label for="inputPicture" class="labelPicture">
            <i class="fa-regular fa-image fa-5x"></i> 
            <p class="labelPicture-btn">+ Ajouter photo<p>
            <p class="labelPicture-subtitle">jpg, png: 4mo max</p>
        </label>
        <input type="file" name="image" id="inputPicture">
        <label for="pictureTitle">Titre</label>
        <input type="text" name="title" id="pictureTitle">
        <label for="pictureCategory">Catégorie</label>
        <select name="category" id="pictureCategory">
            <option></option>
            <option value="1">Objet</option>
            <option value="2">Appartements</option>
            <option value="3">Hotels et restaurants</option>
        </form>
        `

    btnModalReturn = document.querySelector(".modal-return")
    btnModalReturn.addEventListener("click", () => {
    btnModalReturn.removeEventListener("click", pictureGallery())
    })

    //Create Btn to send picture
    const btnSendWork = document.createElement("button")
    btnSendWork.disabled = true
    btnSendWork.className="btnAddPicture"
    btnSendWork.innerText = "valider"
    modal.appendChild(btnSendWork)

    //Enable Btn to send picture
    const inputPicture = document.getElementById("inputPicture")
    const inputTitle = document.getElementById("pictureTitle")
    const inputCategorie = document.getElementById("pictureCategory")

    inputPicture.addEventListener("change", () => {
        previewPicture(),
        checkValues()
    })
    inputTitle.addEventListener("change", checkValues)
    inputCategorie.addEventListener("change", checkValues)

    //Send data to back-end
    btnSendWork.addEventListener("click", () => {
        if(btnSendWork.disabled === false) {
            sendData()
        }
    })

    function previewPicture(){      
        const labelPicture = document.querySelector(".labelPicture")
        const [file] = inputPicture.files
        const urlFile = URL.createObjectURL(file)
        labelPicture.innerHTML=`<img class="form-preview" src="${urlFile}">`
    }

    function checkValues(){
        if(inputTitle.value && inputCategorie.value && inputPicture.value){            
            btnSendWork.disabled = false
        } else {btnSendWork.disabled = true}
    }

    async function sendData(){
        
        const formAddWork = document.getElementById("formAddWork")
        const url = 'http://localhost:5678/api/works'
        method = {
            method : 'POST',
            headers: {'authorization': `Bearer ${token}`},
            body: new FormData(formAddWork)
        }
        const response = await fetch (url, method)
        const dataResponse = await response.json()

        if(dataResponse) {
            fetchWorks(),
            pictureGallery()
        }

    }
}
       
}


function script() {

    fetchWorks()
    modalContent()
    modal()
    

}

script()