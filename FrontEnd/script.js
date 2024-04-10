


async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const dataResponse = await response.json()

    const galleryDiv = document.getElementById("gallery")
    
    for(let i=0; i < dataResponse.length; i++) {
        const figureElement = document.createElement("figure")
        figureElement.innerHTML = `
        <img src="${dataResponse[i].imageUrl}" alt="${dataResponse[i].title}">
        <figcaption> ${dataResponse[i].title} </figcaption>`
         galleryDiv.appendChild(figureElement)
        
    }

}


fetchWorks()







