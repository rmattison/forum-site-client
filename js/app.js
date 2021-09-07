const form = document.querySelector("#post-form");
const content = document.querySelector("#content-container");
const titleInput = document.getElementById('title-input')
const descInput = document.getElementById('desc-input')
const authorInput = document.getElementById('author-input')
const submitButton = document.getElementById('submit-btn')
const postsCotainer = document.querySelector('.posts-container')

// Submit event for New Post Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPostData = {
    title: titleInput.value,
    description: descInput.value,
    posted_by: authorInput.value
  }

  post("https://localhost:44366/api/posts", newPostData)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  titleInput.value = ""
  descInput.value = ""
  authorInput.value = ""

  alert("Submitted successfully!");
  window.location.reload();
});

//Load all event listeners
function loadEventListeners() {
  // Click event for upvote buttons
  document.querySelectorAll('.upvote-btn').forEach(item => {
    item.addEventListener('click', (e) => {
      let postId = e.target.parentElement.parentElement.parentElement.parentElement.id

      const newVote = {
        up: true
      }

      put(`https://localhost:44366/api/posts/${postId}/vote`, newVote)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
  })


  // Click event for downvote buttons
  document.querySelectorAll('.downvote-btn').forEach(item => {
    item.addEventListener('click', (e) => {
      let postId = e.target.parentElement.parentElement.parentElement.parentElement.id

      const newVote = {
        up: false
      }

      put(`https://localhost:44366/api/posts/${postId}/vote`, newVote)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
  })
}

// Load posts onto the screen
get("https://localhost:44366/api/posts")
  .then((data) => loadPosts(data))
  .catch((err) => console.log(err));

//Load all event listeners
loadEventListeners()


// Make an HTTP GET Request
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

// Make an HTTP PUT Request
async function put(url, data) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  return resData;
}


// Loads all posts onto the screen
function loadPosts(data) {
  for (i = data.length-1; i >= 0; i--) {

    let postDate = new Date(data[i].time_posted)
    let todaysDate = new Date()

    let outputTime = ""

    if(postDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
      outputTime = new Date(data[i].time_posted).toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric"});
    } else {
      outputTime = data[i].time_posted.split(' ')[0]
    }

    let text = `<div class="post" id="${data[i].id}">
    <div class="vote">
    <a class="upvote-btn" href="#">
    <div class="upvote">
      <i class="fas fa-arrow-up fa-lg"></i>
    </div>
    </a>
    
    <div class="number"><p>${data[i].upvotes - data[i].downvotes}</p></div>
      <a class="downvote-btn" href="#">
        <div class="downvote">
          <i class="fas fa-arrow-down fa-lg"></i>
        </div>
      </a>
    </div>
    <div class="thumb"><img class="thumb" src="./img/txt-file.png"></div>
    <div class="flex-container">
    <a href="#"><h2 class="title">${data[i].title}</h2></a>
    <p class="description">${data[i].description}</p>
    <p class="time">
      posted ${outputTime} by <a href="" class="username">${data[i].posted_by}</a>
    </p>
    <div class="links">
      <a href=""> comments</a><a href="">save</a><a href="">hide</a><a href="">report</a><a href="">block</a>
    </div>
    </div>
    </div>`;

    content.innerHTML += text;
  }
  loadEventListeners()
}


