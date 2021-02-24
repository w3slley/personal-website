//function responsible to give each "code" tag a class so that PrismJS can style it.

export function inlineCodeHighlighter(){
  const code = document.getElementsByTagName('code');
  for(let i=0;i<code.length;i++){
    console.log(code[i].classList)
    if(code[i].classList.length==0){
      code[i].classList.add('language-')
    }
  }
}
