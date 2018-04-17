"use strict"

function clickedon(){
    "use strict"
    //set search parameter
    let search=document.getElementById('search').value

    //clear current links
    let x=document.getElementById('vidlinks')
    x.innerHTML=''
    let y=document.getElementById('redlinks')
    y.innerHTML=''


    //convert string to query string
    let searchstring=convert(search)

    //get data from reddit api
    fetch('https://www.reddit.com/api/subreddits_by_topic.json?query='.concat(searchstring))
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        for (let i=0;i<data.length;i++){
            addredditlinktopage(data[i].name, data[i].path)
        }
    })
    //get data from youtube api
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q='.concat(searchstring).concat('&type=video&key=AIzaSyBo_WaUt2mFH61G2f_nAyP0lQQkS6p3L6Q'))
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        for (let i=0; i<3; i++){
            addvidtopage(data.items[i].id.videoId, 
                data.items[i].snippet.title, 
                data.items[i].snippet.thumbnails.default.url)
        }
    })

}

//adds video link and thumbnail
function addvidtopage(id, title, img){
	var link='https://www.youtube.com/watch?v='.concat(id)
	let x=document.getElementById('vidlinks')
	let nlink=document.createElement("a")
	let nimg=document.createElement('img')
	nlink.href=link
	nlink.target='_blank'
    nlink.class="col-md-4"
	nlink.innerHTML=title
	nimg.src=img
	x.appendChild(nimg)
	x.appendChild(nlink)
	let br=document.createElement("br")
	x.appendChild(br)
}

//adds reddit link
function addredditlinktopage(name, path){
	var link='https://www.reddit.com'.concat(path)
	let x=document.getElementById('redlinks')
	let nlink=document.createElement("a")
	nlink.href=link
	nlink.target='_blank'
	nlink.innerHTML=name
	x.appendChild(nlink)
	let br=document.createElement("br")
	x.appendChild(br)
}

//converts a search param into a query string
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
    else {return string}   
}