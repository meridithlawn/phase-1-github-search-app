const form = document.getElementById('github-form')
form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("event", event)
    event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
        .then(response => response.json())
        .then(response => {
            console.log("response", response)
            // login, avatar, url
            const userList = document.querySelector("#user-list")
            userList.innerHTML = ""
            const reposList = document.getElementById("repos-list")
            reposList.innerHTML = ""
            response.items.map(item => {
                const h2 = document.createElement("h2")
                h2.textContent = item.login
                h2.addEventListener("click", e => showUserRepos(item.login, e))
                const img = document.createElement("img")
                img.src = item.avatar_url
                
                
                
                const li = document.createElement("li")
                li.append(h2, img)
                userList.append(li)
            })
            // delete the word from the form after submitting:
            event.target[0].value = ""
        })
        // form.reset() is alternative option to previous line of code
        // better because the [0] will only delete that space the reset will delete all
})

function showUserRepos(username, e) {
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
   // console.log("username", username)
   fetch(`https://api.github.com/users/${username}/repos`)
   .then(response => response.json())
   .then(response => response.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        
        li.append(h1)
        reposList.append(li)
    }))
}

// empty string settings are to clear lists and searches before selecting a new one
// so that they dont continuously add on to the list on the page