"use strict"

//search for youtube videos related to the search parameter
var search=document.getElementById('search').value

function clickedonyt(){
    "use strict"
    let x=document.getElementById('vidlinks')
    x.innerHTML=''
    let search=document.getElementById('search').value

    //convert string to query string
    let searchstring=convert(search)

    //get data from youtube api
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q='
    	.concat(searchstring).concat('&type=video&key=AIzaSyBo_WaUt2mFH61G2f_nAyP0lQQkS6p3L6Q'))
    .then((res)=>res.json())
    .then((data)=>{
    	//console.log(data)
    	let title1=data.items[0].snippet.title
    	let title2=data.items[1].snippet.title
    	let title3=data.items[2].snippet.title
    	addvidtopage(data.items[0].id.videoId, title1)
    	addvidtopage(data.items[1].id.videoId, title2)
    	addvidtopage(data.items[2].id.videoId, title3)
    })

}

function clickedonwa(){
    "use strict"
    let search=document.getElementById('search').value

    //convert string to query string
    let searchstring=convert(search)

    //get data from youtube api
    fetch('http://www.wolframalpha.com/api/v1/spoken-json.jsp?appid=H2YH7V-9LTQTV2V9E&input='.concat(searchstring))
    .then((res)=>res.json())
    .then((data)=>{
    	console.log(data)
    })

}

function addvidtopage(id, title){
	var link='https://www.youtube.com/watch?v='.concat(id)
	let x=document.getElementById('vidlinks')
	let nlink=document.createElement("a")
	nlink.href=link
	nlink.target='_blank'
	nlink.innerHTML=title
	x.appendChild(nlink)
	let br=document.createElement("br")
	x.appendChild(br)

}

function convert(string){
    "use strict"
    var splitstring=string.split(' ')
    if (splitstring.length>1) {
    	var searchstring=splitstring[0].concat('+')
        for(let i =1; i < splitstring.length; i++) {
            if (i<splitstring.length-1){
        		searchstring=searchstring+splitstring[i].concat('+')
        	} else {searchstring=searchstring+splitstring[i]}
        }
        return searchstring
    }
    else {var searchstring=string}
    return searchstring   
}