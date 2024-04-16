

function app() {

    const logoInsta = document.getElementById("logoInsta")
    const loginLink = document.createElement("li")
    
    const checkAuth = sessionStorage.getItem("token")

    if(checkAuth == null) {
        loginLink.innerHTML = `<a class="headerlink" href="login.html">login</a>`
    } else {
        loginLink.innerHTML = `<a class="headerlink" href="#">logout</a>`

        loginLink.addEventListener("click",(e) => {
        sessionStorage.removeItem("token")
        window.location.reload(false)
        } )    
    }

    logoInsta.before(loginLink)
   
}

app()

