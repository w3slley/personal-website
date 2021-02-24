import {inlineCodeHighlighter} from "./lib/inlineCodeHighlighter.js";
import {Post} from "./classes/Post.js";
//Add tag functionality
const tag = document.querySelector(".tag");
const tagInput = document.querySelector(".tag-input");
//Global object which stores post data (title, content and tags)
let post = new Post();

//Adding tags to Post tag's internal array. If there is none, the array will be emtpy
post.getTags(document);

//When author types to add a new tag
tagInput.addEventListener("keyup",()=>{
  fetch('/tags/list',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({tagName: tagInput.value})
  })
  .then(res=>res.json())
  .then(data => {
    let results = document.querySelector('.results');
    results.innerHTML = '';
    let ul = document.createElement('ul');

    if(tagInput.value == ''){
      removeBorderTag(tag);//removing top border radius into tag div
    }
    else if(data.length==0){//empty array means no tag with that name
      let li = document.createElement('li');
      let small = document.createElement('small');
      small.innerHTML = 'Create tag "'+tagInput.value.toLowerCase()+'"';
      li.appendChild(small);
      li.addEventListener('click',function(){addNewTag(tagInput.value.toLowerCase())});
      ul.appendChild(li);
      addBorderTag(tag);
    }
    else if(data.length!=0){
      for(let i=0;i<data.length;i++){
        let li = document.createElement('li');
        let small = document.createElement('small');
        small.innerHTML = data[i].label;
        li.appendChild(small);
        li.addEventListener('click',function(){addTagToPost(small.innerHTML.toLowerCase())});
        ul.appendChild(li);
        addBorderTag(tag);//adding top border radius into tag div
      }
    }
    results.appendChild(ul);
  });
});

//handling form submit for new blog post
const create = document.querySelector('.create');
create.addEventListener('submit',(e)=>{
  e.preventDefault();
  const postId = document.querySelector('.postId');//valid only when editing post, null while creating
  const title = document.querySelector('.title').value;
  const content = document.querySelector('.post-content').value;
  if(postId == null){//if no postId object, then you are creating a blogpost
    fetch('/posts/store',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, content, tags: post.tags})
    })
    .then(()=>{
      window.location='/dashboard';
    });
  }
  else{//otherwise, you are editing it
    fetch('/posts/update',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, content, tags: post.tags, postId: postId.value})
    })
    .then(res=>res.json())
    .then((data)=>{
      window.location='/posts/'+data.slug;
    });
  }
});

//METHODS
function addNewTag(tagName){
  fetch('/tags/store',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({tagName})
  })
  .then(res=>res.json())
  .then(data => {
    //clearing tag input
    tagInput.value = '';
    //clearing results div after adding new tag
    let results = document.querySelector('.results');
    results.innerHTML = '';
    //add new tag to post's array
    addTagToPost(tagName);
  });
}

function addTagToPost(tagName){
  post.addTag(tagName);
  //clearing tag input and results
  removeBorderTag(tag);
  tagInput.value = '';
  document.querySelector('.results').innerHTML = '';
  //adding tags label to show-tags div
  const showTags = document.querySelector('.show-tags');
  showTags.innerHTML = '';
  for(let i=0;i<post.tags.length;i++){
    let small = document.createElement('small');
    small.innerHTML = post.tags[i];
    small.classList.add('tags');
    showTags.appendChild(small);
  }
}

function addBorderTag(tag){
  tag.style.borderTopLeftRadius = '5px';
  tag.style.borderTopRightRadius = '5px';
}

function removeBorderTag(tag){
  tag.style.borderTopLeftRadius = '0px';
  tag.style.borderTopRightRadius = '0px';
}
