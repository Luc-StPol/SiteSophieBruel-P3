


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

fetchWorks()







