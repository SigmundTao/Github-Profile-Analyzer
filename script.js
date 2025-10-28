const output = document.getElementById('output');
const userInput = document.getElementById('user-input');
const searchBtn = document.getElementById('search-btn');

async function fetchUser(username){
    try {
        const userURL = `https://api.github.com/users/${username}`;
        const reposURL = `https://api.github.com/users/${username}/repos`;

        const userResponse = await fetch(userURL);
        const repoResponse = await fetch(reposURL);

        const userData = await userResponse.json();
        const repoData = await repoResponse.json();

        console.log('user data:', userData);
        console.log('repo data:', repoData);

        createUserCard(userData, repoData);
    } catch (error){
        console.log(error)
    };
}

searchBtn.addEventListener('click', () => {
    fetchUser(userInput.value);
})

function createUserCard(userData, repoData){
    //user
    const pageUrl = userData.html_url;

    const cardHolder = document.createElement('div');
    cardHolder.classList.add('card-holder');

    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-picture');
    profilePic.style.backgroundImage = `url(${userData.avatar_url})`;

    const username = document.createElement('div');
    username.classList.add('username');
    username.innerText = userData.login;

    const name = document.createElement('div')
    name.classList.add('name');
    name.innerText = userData.name;

    const followDisplay = document.createElement('div');
    followDisplay.classList.add('follow-display');

    const followers = userData.followers;
    const followersDiv = document.createElement('div');
    followersDiv.classList.add('followers');
    followersDiv.innerText = followers;

    const following = userData.following;
    const followingDiv = document.createElement('div');
    followingDiv.classList.add('followers');
    followingDiv.innerText = following;

    followDisplay.appendChild(followersDiv);
    followDisplay.appendChild(followingDiv)

    cardHolder.appendChild(profilePic);
    cardHolder.appendChild(username);
    cardHolder.appendChild(name);
    cardHolder.appendChild(followDisplay)

    output.appendChild(cardHolder);

    //repos
    const repoCardHolder = document.createElement('div');
    repoCardHolder.classList.add('repo-card-holder');

    repoData.forEach(repo => {
        const link = repo.html_url;

        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        repoCard.addEventListener('click', function(){
            window.open(link)
        });

        const repoTitle = document.createElement('div');
        repoTitle.classList.add('repo-title');
        repoTitle.innerText = repo.name;

        const repoLanguage = document.createElement('div');
        repoLanguage.classList.add('repo-language');
        repoLanguage.innerText = repo.language;

        repoCard.appendChild(repoTitle);
        repoCard.appendChild(repoLanguage);

        repoCardHolder.appendChild(repoCard);
    });

    output.appendChild(repoCardHolder);
}