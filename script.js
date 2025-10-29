const main = document.getElementById('main');
const baseURL = 'https://api.github.com';

async function fetchUser(username){
    try {
        const userURL = `${baseURL}/users/${username}`;
        const reposURL = `${baseURL}/users/${username}/repos`;

        const userResponse = await fetch(userURL);
        const repoResponse = await fetch(reposURL);

        const userData = await userResponse.json();
        const repoData = await repoResponse.json();

        console.log('user data:', userData);
        console.log('repo data:', repoData);

        createUserPage(userData, repoData);
    } catch (error){
        console.log(error)
    };
}

function openPage(url){
    window.open(url);
}

//User search results
function createUserPage(userData, repoData){
    main.innerHTML = '';
    //user
    const userPage = document.createElement('div');
    userPage.classList.add('user-page');
    const pageUrl = userData.html_url;

    const cardHolder = document.createElement('div');
    cardHolder.classList.add('card-holder');
    cardHolder.classList.add('user-page-section');

    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-picture');
    profilePic.style.backgroundImage = `url(${userData.avatar_url})`;
    profilePic.addEventListener('click', () => {openPage(pageUrl)});

    const username = document.createElement('div');
    username.classList.add('username');
    username.innerText = userData.login;
    username.addEventListener('click', () => {openPage(pageUrl)});

    const name = document.createElement('div')
    name.classList.add('name');
    name.innerText = userData.name;

    const namesHolder = document.createElement('div');
    namesHolder.classList.add('names-holder');
    namesHolder.appendChild(name);
    namesHolder.appendChild(username);

    const followDisplay = document.createElement('div');
    followDisplay.classList.add('follow-display');

    const followersHolder = document.createElement('div');
    followersHolder.classList.add('followers-holder');

    const followers = userData.followers;
    const followersDiv = document.createElement('div');
    followersDiv.classList.add('followers');
    followersDiv.innerText = followers;

    const followersTitle = document.createElement('div');
    followersTitle.classList.add('followers-title');
    followersTitle.innerText = 'Followers';

    followersHolder.appendChild(followersTitle);
    followersHolder.appendChild(followersDiv);

    const followingHolder = document.createElement('div');
    followingHolder.classList.add('following-holder');

    const followingTitle = document.createElement('div');
    followingTitle.classList.add('following-title');
    followingTitle.innerText = 'Following';

    const following = userData.following;
    const followingDiv = document.createElement('div');
    followingDiv.classList.add('followers');
    followingDiv.innerText = following;

    followingHolder.appendChild(followingTitle);
    followingHolder.appendChild(followingDiv);

    followDisplay.appendChild(followersHolder);
    followDisplay.appendChild(followingHolder);

    const namesAndFollowHolder = document.createElement('div');
    namesAndFollowHolder.classList.add('names-and-follow-holder');
    namesAndFollowHolder.appendChild(namesHolder);
    namesAndFollowHolder.appendChild(followDisplay);

    const bioHolder = document.createElement('div');
    bioHolder.classList.add('user-bio');
    bioHolder.innerText = userData.bio;

    const backBtn = document.createElement('button');
    backBtn.classList.add('back-btn');
    backBtn.addEventListener('click', loadSearchScreen);
    backBtn.innerText = 'Back'

    cardHolder.appendChild(profilePic);
    cardHolder.appendChild(namesAndFollowHolder);
    cardHolder.appendChild(backBtn);

    //Other User Info
    const XUsername = userData.twitter_username;
    const accountCreationDate = userData.created_at;
    const hireable = userData.hireable;
    const blog = userData.blog;
    const isSiteAdmin = userData.site_admin;
    const company = userData.company;

    main.appendChild(cardHolder);

    //repos
    const repoCardHolder = document.createElement('div');
    repoCardHolder.classList.add('repo-card-holder');
    repoCardHolder.classList.add('user-page-seciton');

    repoData.forEach(repo => {
        const link = repo.html_url;

        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        const repoTitle = document.createElement('div');
        repoTitle.classList.add('repo-title');
        repoTitle.innerText = repo.name;
        repoTitle.addEventListener('click', () => {openPage(link)})

        const repoCreation = document.createElement('div');
        repoCreation.classList.add('repo-creation-date');
        repoCreation.innerText = repoData.created_at;

        const repoLanguage = document.createElement('div');
        repoLanguage.classList.add('repo-language');
        repoLanguage.innerText = repo.language;

        repoCard.appendChild(repoTitle);
        repoCard.appendChild(repoCreation);
        repoCard.appendChild(repoLanguage);

        repoCardHolder.appendChild(repoCard);
    });

    userPage.appendChild(cardHolder);
    userPage.appendChild(repoCardHolder);

    main.appendChild(userPage);
}

//Search screen
function loadSearchScreen(){
    main.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('search-page');

    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = 'Search any git user:'

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.classList.add('search-bar');
    searchBar.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            fetchUser(searchBar.value);
        }
    })

    const searchBtn = document.createElement('button');
    searchBtn.classList.add('search-btn');
    searchBtn.innerText = 'Search';
    searchBtn.addEventListener('click', () => {
        fetchUser(searchBar.value);
    })

    const searchContainer = document.createElement('div');
    searchContainer.classList.add('home-search-container');

    searchContainer.appendChild(searchBar);
    searchContainer.appendChild(searchBtn);

    container.appendChild(title);
    container.appendChild(searchContainer);

    main.appendChild(container);
}

loadSearchScreen();

// Base URL for all GitHub API requests

// 1. Get all repositories for a user
`${BASE_URL}/users/${username}/repos`

// 2. Get language breakdown for a specific repo

// 3. Get weekly commit activity (last year)
`${BASE_URL}/repos/${owner}/${repo}/stats/commit_activity`

// 4. Get contributor statistics
`${BASE_URL}/repos/${owner}/${repo}/stats/contributors`

// 5. Get recent public events for a user
`${BASE_URL}/users/${username}/events/public`