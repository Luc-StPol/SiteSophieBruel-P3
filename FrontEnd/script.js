
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

async function modalContent(){

const modal = document.querySelector(".modal-content")

    
deletePicture()
   
async function deletePicture() {
    
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
            <button><i class="fa-solid fa-trash-can addPicture"></i></button>
            `
            modalGallery.appendChild(figureElement)
        }
            
            
            const btnAddPicture = document.createElement("button")
            btnAddPicture.className = "btnAddPicture"
            btnAddPicture.innerText = "Ajouter une photo"
            modal.appendChild(btnAddPicture)
    
            btnAddPicture.addEventListener("click", () => {
            btnAddPicture.removeEventListener("click", addPicture())
        })
}

async function addPicture() {

    modal.innerHTML=`
        <button class="modal-return"><i class="fas fa-arrow-left fa-2x"></i></button>
        <h3 style="margin-top: 13px;" >Ajout photo</h3>
        <form class="modal-form">
        <label for="inputPicture" class="labelPicture">
            <i class="fa-regular fa-image fa-5x"></i> 
            <p class="labelPicture-btn">+ Ajouter photo<p>
            <p class="labelPicture-subtitle">jpg, png: 4mo max</p>
        </label>
        <input type="file" name="inputPicture" id="inputPicture">
        <label for="pictureTitle">Titre</label>
        <input type="text" name="pictureTitle" id="pictureTitle">
        <label for="pictureCategory">Catégorie</label>
        <select name="pictureCategory" id="pictureCategory">
            <option value="1">Objet</option>
            <option value="2">Appartements</option>
            <option value="3">Hotels et restaurants</option>
        </form>
        `

    btnModalReturn = document.querySelector(".modal-return")
    btnModalReturn.addEventListener("click", () => {
    btnModalReturn.removeEventListener("click", deletePicture())
    })

    const btnSendWork = document.createElement("button")
    btnSendWork.className="btnAddPicture"
    btnSendWork.innerText = "valider"
    modal.appendChild(btnSendWork)
}
       
}



function script() {

    fetchWorks()
    modalContent()
    modal()
    

}

script()