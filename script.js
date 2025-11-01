const main = document.getElementById('main');
const baseURL = 'https://api.github.com';
const colorsURL = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
let repoIndex = 0;

let colors;

async function getGithubColors() {
    const response = await fetch(colorsURL);
    const colorData = await response.json();

    colors = colorData;
    console.log('colors-data:',colorData);
    console.log('colors var:',colors);
}

function formatRepoData(data){
    const newData = {};
    data.forEach(e => {
        if(e.language === null){

        } else {
            if(e.language in newData){
                newData[e.language]++;
            } else {
                newData[e.language] = 1;
            }
        }
        
    });

    console.log(newData);
    return newData;
}

function makePieChart(languageData, chartContainer){
    const labels = Object.keys(languageData);
    const values = Object.values(languageData);

    const backgroundColors = labels.map(lang => colors[lang]?.color || '#808080');

    const canvas = document.createElement('canvas');
    canvas.id = 'doughnut-graph';

    chartContainer.appendChild(canvas)

    const ctx = canvas.getContext('2d');
    const languageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Repositories',
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 0,
                borderColor: '#fff'
            }]
        },
        options: {
            'repsonsive': true,
            'maintainAspectRatio': true,
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a+b, 0);
                            const percentage = ((value/total) * 100).toFixed(1);
                            return `${label}: ${value} repos (${percentage}%)`;
                        }
                    }
                }
            }
        }
    })
}

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
        const language = object.language || null;
        repoLanguage.innerText = language;

        const colorCircle = document.createElement('div');
        colorCircle.classList.add('color-circle');
        colorCircle.id = object.id;
        if(language && colors[language]){
            colorCircle.style.backgroundColor = colors[language].color;
        } else {
            colorCircle.style.display = 'none';
        }

        const languageHolder = document.createElement('div');
        languageHolder.classList.add('language-holder');
        languageHolder.appendChild(colorCircle);
        languageHolder.appendChild(repoLanguage);

        const repoStars = document.createElement('div');
        repoStars.classList.add('repo-stars');
        const starCount = document.createElement('div');
        starCount.innerText = object.stargazers_count;

        const starLogo = document.createElement('div');
        starLogo.style.backgroundImage = `url('./star.svg')`;
        starLogo.classList.add('star-logo');

        repoStars.appendChild(starLogo);
        repoStars.appendChild(starCount);

        const repoForks = document.createElement('div');
        repoForks.classList.add('repo-forks');

        const forkTitle = document.createElement('div');
        forkTitle.classList.add('fork-title');
        forkTitle.innerText = object.forks

        const forkLogo = document.createElement('div');
        forkLogo.classList.add('repo-fork-logo');
        forkLogo.style.backgroundImage = `url('./fork.svg')`;

        repoForks.appendChild(forkLogo);
        repoForks.appendChild(forkTitle);

        repo.appendChild(repoTitle);
        repo.appendChild(repoDate);
        repo.appendChild(languageHolder);
        repo.appendChild(repoStars);
        repo.appendChild(repoForks);

        repoHolder.appendChild(repo);
    }


    container.appendChild(lastPageBtnHolder);
    container.appendChild(repoHolder);
    container.appendChild(nextPageBtnHolder);

    formatRepoData(repoData);
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

        const languageData = formatRepoData(repoData);

        console.log('user data:', userData);
        console.log('repo data:', repoData);

        createUserPage(userData, repoData, languageData);
    } catch (error){
        console.log(error)
    };
}

function openPage(url){
    window.open(url);
}

//User search results
function createUserPage(userData, repoData, languageData){
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

    const totalsHolder = document.createElement('div');
    totalsHolder.classList.add('totals-holder');

    const totals = [];

    const totalRepos = userData.public_repos;
    let totalForks = 0;
    let totalstars = 0;

    repoData.forEach(r => {
        totalstars += r.stargazers_count;
        totalForks += r.forks_count;
    });

    totals.push([totalRepos, `url('./repo.svg')`]);
    totals.push([totalstars, `url('./star.svg')`]);
    totals.push([totalForks, `url('./fork.svg')`]);

    totals.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('total-card');

        const logo = document.createElement('div');
        logo.style.backgroundImage = item[1];
        logo.classList.add('total-logo');

        const title = document.createElement('div');
        title.innerText = item[0];
        title.classList.add('total-title');

        itemCard.appendChild(logo);
        itemCard.appendChild(title);

        totalsHolder.appendChild(itemCard)
    })

    const backBtn = document.createElement('button');
    backBtn.classList.add('back-btn');
    backBtn.addEventListener('click', loadSearchScreen);
    backBtn.innerText = 'Back'

    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');

    makePieChart(languageData, chartContainer);

    cardHolder.appendChild(profilePic);
    cardHolder.appendChild(namesAndFollowHolder);
    cardHolder.appendChild(totalsHolder);
    cardHolder.appendChild(chartContainer);
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
getGithubColors();