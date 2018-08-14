function displayRepositories(event, data) {
  let dest = document.getElementById("repositories");
  var repos = JSON.parse(this.responseText)
  console.log(repos.length)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-username="' + r.owner.login + '" data-repository='"+r.name"' onclick="getCommits(this)">"+r.html_url+"</a>- <a href='#' data-username='"+r.owner.login+"'data-repository='"+r.name+"'onclick='getBranches(this)'>Get Branches</li>').join('')}</ul>`;
  dest.innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementsByName("username")[0].value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/"+username+"/repos");
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
