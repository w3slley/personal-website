exports.slugify = function(title){
  let res = ""
  for(i=0;i<title.length;i++){
    let char = title[i].toLowerCase()
    if(char>="a" && char<="z")
      res += char
    else if(char == " ")
      res += "-"
  }
  return res;
}


exports.dateToString = function(dateCreated){
	let date = new Date(dateCreated)
    let year = date.getFullYear()
    let day = date.getDate()
    let month = getMonthString(date.getMonth())
    return month+" "+day+", "+year
}
//function which takes care of returning a string given the number of the month (starts at 0)
getMonthString = function(m){
	if(m == 0){return "January"}
	else if(m == 1){ return "February"}
	else if(m == 2){return "March"}
	else if(m == 3){ return "April"}
	else if(m == 4){return "May"}
	else if(m == 5){ return "June"}
	else if(m == 6){return "July"}
	else if(m == 7){ return "August"}
	else if(m == 8){return "September"}
	else if(m == 9){ return "October"}
	else if(m == 10){return "November"}
	else if(m == 11){ return "December"}

}