

async function fetchLogin(bodyData){


    const url="http://localhost:5678/api/users/login"    
    const method= {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(bodyData)
    }
    const response = await fetch(url, method)
    const dataResponse = await response.json()

    return await dataResponse.token

}

function authentification(){

    const loginForm = document.querySelector(".login-form")
    

    loginForm.addEventListener("submit", ((e) => {
    e.preventDefault()
    let emailInput = document.getElementById("emailInput").value
    let mdpInput = document.getElementById("mdpInput").value
      
   
    const bodyData = {
        "email": emailInput,
        "password": mdpInput
    }

    fetchLogin(bodyData)
    .then((token) => {
        if(token) {
            sessionStorage.setItem("token", token)
            document.location.href="index.html"
        
        } else {

            const checkError = document.querySelector(".errorMessage")
            if (checkError !==null ){checkError.remove()}
        
            let errorMessage = document.createElement("p")
            errorMessage.classList.add('errorMessage')
            errorMessage.innerText="Erreur dans l’identifiant ou le mot de passe"
            loginForm.appendChild(errorMessage)
        }
    })
}
    ))
}

authentification()