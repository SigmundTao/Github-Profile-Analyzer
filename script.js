const main = document.getElementById('main');
const baseURL = 'https://api.github.com';
let repoIndex = 0;

function createRepoPages(repoData, index, container){
    container.innerHTML = '';

    const lastPageBtnHolder = document.createElement('div');
    lastPageBtnHolder.classList.add('last-page-btn-holder');

    const lastPageBtn = document.createElement('button');
    lastPageBtn.classList.add('page-btn');
    lastPageBtn.classList.add('last-page-btn');
    lastPageBtn.innerText = '<';

    if(index === 0){
        lastPageBtn.style.display = 'none';
    }

    lastPageBtn.addEventListener('click', () => {
        index -= 6;
        createRepoPages(repoData, index, container);
    })

    lastPageBtnHolder.appendChild(lastPageBtn);

    const nextPageBtnHolder = document.createElement('div');
    nextPageBtnHolder.classList.add('next-page-btn-holder');

    const nextPageBtn = document.createElement('button');
    nextPageBtn.classList.add('page-btn');
    nextPageBtn.classList.add('next-page-btn');
    nextPageBtn.innerText = '>';

    if(index >= repoData.length - 6){
        nextPageBtn.style.display = 'none';
    }

    nextPageBtn.addEventListener('click', () => {
        index += 6;
        createRepoPages(repoData, index, container);
    })

    nextPageBtnHolder.appendChild(nextPageBtn);


    const repoHolder = document.createElement('div');
    repoHolder.classList.add('repo-holder');

    const endIndex = Math.min(index + 6, repoData.length);
    for(let i = index; i < endIndex; i++){
        const object = repoData[i];

        const repo = document.createElement('div');
        repo.classList.add('repo');

        repo.addEventListener('click', () => {
            openPage(object.html_url);
        })

        const repoTitle = document.createElement('div');
        repoTitle.classList.add('repo-title');
        repoTitle.innerText = object.name;

        const repoDate = document.createElement('div');
        repoDate.classList.add('repo-date');
        repoDate.innerText = changeDateFormat(object.created_at);

        const repoLanguage = document.createElement('div');
        repoLanguage.classList.add('repo-language');
        repoLanguage.innerText = object.language;

        const repoStars = document.createElement('div');
        repoStars.classList.add('repo-stars');
        repoStars.innerText = object.stargazers_count;

        repo.appendChild(repoTitle);
        repo.appendChild(repoDate);
        repo.appendChild(repoLanguage);
        repo.appendChild(repoStars);

        repoHolder.appendChild(repo);
    }


    container.appendChild(lastPageBtnHolder);
    container.appendChild(repoHolder);
    container.appendChild(nextPageBtnHolder);
}

function changeDateFormat(date){
    const splitDate = date.split('T')[0].split('-');

    const finalDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`

    return finalDate;
}

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

    userPage.appendChild(cardHolder);

    //repos
    userPage.appendChild(cardHolder);

    const repoPages = document.createElement('div');
    repoPages.classList.add('repo-pages');
    createRepoPages(repoData, repoIndex, repoPages);

    userPage.appendChild(repoPages);

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