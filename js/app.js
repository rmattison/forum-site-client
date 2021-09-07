const form = document.querySelector("#post-form");
const content = document.querySelector("#content-container");
const titleInput = document.getElementById('title-input')
const descInput = document.getElementById('desc-input')
const submitButton = document.getElementById('submit-btn')
const postsCotainer = document.querySelector('.posts-container')





//Load all event listeners
function loadEventListeners() {
  form.addEventListener('submit', addNewPost);
}

//Load all event listeners
loadEventListeners()


function addNewPost(e) {
  e.preventDefault();

  const newPostData = {
    title: titleInput.value,
    description: descInput.value
  }

  post("https://localhost:44366/api/posts", newPostData)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  titleInput.value = ""
  descInput.value = ""

  alert("Submitted successfully!");
}



get("https://localhost:44366/api/posts")
  .then((data) => loadInitialPosts(data))
  .catch((err) => console.log(err));




async function get(url) {
  const response = await fetch(url);
  const resData = await response.json();
  return resData;
}

  // Make an HTTP POST Request
async function post(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",


    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
}


function loadInitialPosts(data) {
  for (i = data.length-1; i >= 0; i--) {
    let text = `<div class="post">
    <div class="vote">
    <div class="upvote">
      <i class="fas fa-arrow-up fa-lg"></i>
    </div>
    <div class="number"><p>${data[i].upvotes}</p></div>
    <div class="downvote">
      <i class="fas fa-arrow-down fa-lg"></i>
    </div>
    </div>
    <div class="thumb"><img class="thumb" src="./img/txt-file.png"></div>
    <div class="flex-container">
    <a href="#"><h2 class="title">${data[i].title}</h2></a>
    <p class="description">${data[i].description}</p>
    <p class="time">
      posted ${data[i].time_posted.split(' ')[0]} by <a href="" class="username">${data[i].posted_by}</a>
    </p>
    <div class="links">
      <a href=""> comments</a><a href="">save</a><a href="">hide</a><a href="">report</a><a href="">block</a>
    </div>
    </div>
    </div>`;

    content.innerHTML += text;
  }
}


