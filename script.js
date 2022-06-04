const bodyEl = document.querySelector('body');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const formEl = document.querySelector('form');
const inputEl = document.getElementById('input');

const resultEl = document.querySelector('.result');
const notFoundEl = document.querySelector('.not-found');

const profileImg = document.getElementById('profile-img');
const fullName = document.getElementById('name');
const username = document.getElementById('username');
const joined = document.getElementById('joined');

const bio = document.getElementById('bio');

const reposCount = document.getElementById('repos-count');
const followersCount = document.getElementById('followers-count');
const followingCount = document.getElementById('following-count');

const locationEl = document.getElementById('location');
const twitterEl = document.getElementById('twitter');
const websiteEl = document.getElementById('website');
const companyEl = document.getElementById('company');

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let inDarkMode = true;

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = inputEl.value;
    getUserInfo(input);
    formEl.reset();
})

toggleThemeBtn.onclick = () => {
    if (inDarkMode) {
        bodyEl.classList.replace('dark', 'light');
        inDarkMode = false;
    }
    else {
        bodyEl.classList.replace('light', 'dark');
        inDarkMode = true;
    }
}

async function getUserInfo(input) {
    const res = await fetch(`https://api.github.com/users/${input}`);
    const data = await res.json();
    renderData(data);
}

function renderData(data) {
    if (data.message) {
        resultEl.style.display = 'none';
        notFoundEl.style.display = 'flex';
    }
    else {
        notFoundEl.style.display = 'none';
        resultEl.style.display = 'flex';
        
        const date = new Date(data['created_at']);
        profileImg.src = data['avatar_url'];
        fullName.textContent = data['name'];
        username.href = data['html_url'];
        username.textContent = `@${data['login']}`;
        joined.textContent = `Joined ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

        bio.textContent = data['bio'] === null ? "This dev doesn't have a bio" : data['bio'];

        reposCount.textContent = data['public_repos'];
        followersCount.textContent = data['followers'];
        followingCount.textContent = data['following'];

        renderInfoOf(locationEl, data['location']);
        renderInfoOf(twitterEl, data['twitter_username'], true);
        renderInfoOf(websiteEl, data['blog'], true);
        renderInfoOf(companyEl, data['company']);
    }
}

function renderInfoOf(element, value, hyperlink = false) {
    urls = ["https://twitter.com/", ""]
    if (value === null || value == '') {
        element.classList.add('disabled');
        if (hyperlink) {
            element.href = '';
        }
        element.textContent = 'Not Available';
    }
    else {
        element.classList.remove('disabled');
        if (hyperlink) {
            element.href = urls[element.dataset.urlindex] + value;
        }
        element.textContent = value;
    }
}

getUserInfo('himanshuat');