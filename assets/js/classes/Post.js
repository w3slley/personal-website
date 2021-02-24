
class Post{
  constructor(htmlTag){
    this.title = ''
    this.content = ''
    this.tags = []
  }

  addTag(tagName){
    this.tags.push(tagName)
  }

  getTags(document){
    const tags = document.querySelectorAll('.tags')
    for(let i=0;i<tags.length;i++){
      this.tags.push(tags[i].innerHTML)
    }
  }
}

export {Post}
