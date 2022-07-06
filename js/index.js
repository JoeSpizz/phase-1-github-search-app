let form = document.querySelector("#github-form")
let userList = document.querySelector("#user-list")
let li = document.createElement("li")
let img = document.createElement(`img`)
let link = document.createElement('a')

form.addEventListener('submit', event => {
    event.preventDefault()
   let userName = event.target.search.value


   fetch(`https://api.github.com/search/users?q=${userName}`,{
   headers: {
    "Accept": "application/vnd.github.v3+json"
   }}
   )
   .then(res => res.json())
   .then(res => {
       addNewUser(res)
   })
  // .catch(alert("User Name not found!"))
  
})

function addNewUser (Obj) {
    let p = document.createElement('p')
    li.innerText = Obj.items[0].login
    img.src = Obj.items[0].avatar_url
    link.setAttribute('href', Obj.items[0].html_url)
    link.innerHTML = "GitHub Home Page"
       userList.appendChild(li)
       userList.appendChild(link)
       userList.appendChild(p)
       userList.appendChild(img)

       document.querySelector('li').addEventListener('click', event => {
        fetch(`https://api.github.com/users/${Obj.items[0].login}/repos`,{
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(res=>res.json())
        .then(res=> {
            addUserRepos(res)
        })
      })

}

function addUserRepos(Obj2) {
    let repoList = document.querySelector('#repos-list')
    let li2 = document.createElement('li')
    let a = document.createElement('a')
    for (let i = 0; i < Obj2.length; i++) {
       li2.innerText = `${Obj2[i].owner.login}\'s Repo's:`
       a.setAttribute('href', Obj2[i].html_url)
       a.innerText = `${Obj2[i].name}`
       repoList.appendChild(li2)
       repoList.appendChild(a)
      }
        
    };
    
