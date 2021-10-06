const octocat = "octocat"
const body = document.querySelector("body")

const nameGit = document.querySelector(".name")
const date = document.querySelector(".date")
const dateSmall = document.querySelector(".date-small")
const username = document.querySelector(".username")
const biography = document.querySelector(".biography")
const repos = document.querySelector(".repos")
const followers = document.querySelector(".followers")
const following = document.querySelector(".following")
const city = document.querySelector(".city")
const twitter = document.querySelector(".twitter")
const blog = document.querySelector(".blog")
const company = document.querySelector(".company")
const image = document.querySelector(".image-circle")
const imageSmallScreen = document.querySelector(".image-circle-small")

const button = document.querySelector("button")
const input = document.querySelector("input")

const modeContainer = document.querySelector(".mode-container")

const fillUser = (searchName) => {
    document.querySelector(".warning").classList.remove("visible")
    if(searchName!=="")
    {
        fetch(`https://api.github.com/users/${searchName}`).then(function (response) {
            if(response.ok) 
            {
                return response.json()
            }
            else
            {
                document.querySelector(".warning").classList.add("visible")
                document.querySelector(".small-warning").classList.add("visible")
            }
        }).then(function(data){
            if(data!==undefined)
            {
                const dateGit = new Date(data.created_at)
                nameGit.innerHTML = data.name === null || data.name === "" ? data.login : data.name
                date.innerHTML = "Joined " + dateGit.getDate() + " " + dateGit.toLocaleString('default', { month: 'short' }) + " " + dateGit.getFullYear()
                dateSmall.innerHTML = "Joined " + dateGit.getDate() + " " + dateGit.toLocaleString('default', { month: 'short' }) + " " + dateGit.getFullYear()
                username.innerHTML = "@"+data.login
                image.style.backgroundImage = `url(${data.avatar_url})`
                imageSmallScreen.style.backgroundImage = `url(${data.avatar_url})`
                biography.innerHTML = data.bio ? data.bio : "This profile has no bio" 
                repos.innerHTML = data.public_repos
                followers.innerHTML = data.followers
                following.innerHTML = data.following
                city.innerHTML = data.location === null || data.location === "" ? (city.parentElement.classList.add("not-available"),"Not Available") : data.location
                twitter.innerHTML = data.twitter_username === null || data.twitter_username === "" ? (twitter.parentElement.classList.add("not-available"),"Not Available") : data.twitter_username
                blog.innerHTML = data.blog === null || data.blog === "" ? (blog.parentElement.classList.add("not-available"),"Not Available") : data.blog
                company.innerHTML = data.company === null || data.company === "" ? (company.parentElement.classList.add("not-available"),"Not Available") : data.company
            }
        }).catch(function (err) {
            console.log(err) 
        })
    }
    else
    {
        document.querySelector(".warning").classList.add("visible")
        document.querySelector(".small-warning").classList.add("visible")
    }
}

body.addEventListener("load",fillUser("octocat"))
button.addEventListener("click",()=>{fillUser(input.value)})

modeContainer.addEventListener("click",()=>{
    if(document.documentElement.classList.contains("light"))
    {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
    }
    else if(document.documentElement.classList.contains("dark"))
    {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
    }
    else
    {
        if(window.matchMedia('(prefers-color-scheme: dark)'))
        {
            document.documentElement.classList.add("light")
        }
        else
        {
            document.documentElement.classList.add("dark")
        }
    }
})