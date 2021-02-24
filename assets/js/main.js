import {inlineCodeHighlighter} from './lib/inlineCodeHighlighter.js';
import {Sidebar} from './classes/Sidebar.js';

//highlights inline code within `` tags
inlineCodeHighlighter()
let sidebar = new Sidebar();
document.querySelector('.side-bar-icon').addEventListener('click',function(){
  sidebar.active = !sidebar.active;
  let sidebarDiv = document.querySelector('.side-bar');
  if(sidebar.active){
    sidebarDiv.style.top = '0px';
    document.querySelector('body').style.padding = '150px 0 0 0';
  }
  else{
    sidebarDiv.style.top = '-150px';
    document.querySelector('body').style.padding = '0px';
  }
});
