import {fetchTrending} from "./api.js";
import {fetchDiscover} from "./api.js";


function trendingSection(){

function makeTrendingCards(data){
    let trndSecn=document.querySelector(".main");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


  data.forEach(function (x){

    let img = `https://image.tmdb.org/t/p/original` + x.poster_path
    let card = document.createElement("div")
    card.classList.add("t-movie","cards")
    let title = x.title 
    if(title===undefined) title = x.name
    let year = new Date(x.release_date).getFullYear()
    let date = new Date(x.release_date).getDate()
    let month = months[new Date(x.release_date).getMonth()]
    let time = month+' '+date+','+year

    if(x.release_date===undefined) time = ""

    // console.log(new Date"2026-06-24")
    trndSecn.appendChild(card)
    card.innerHTML=`
        <button>
          <img src=${img}
">
        </button>
        <p class="rate">rating:</p>

        <div class="info">
          <div class="name,year">
            <p>${title}</p>
            <p>${time}</p>
          </div>

          <div class="btns">
            <button class="fav"></button>
            <button class="bookmark"></button>
          </div>

        </div>`

    
  })
}

fetchTrending().then(function(res){
makeTrendingCards(res)})

}












function mediaSection(){

function makeDiscoverCards(data){

let discoverSecn=document.querySelector(".Discover .moviesCards");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

  data.forEach(function (x){
    let time 
    let img = `https://image.tmdb.org/t/p/original` + x.poster_path
    let title = x.title 
    if(title===undefined) title = x.name

    if(x.release_date!==undefined ){
    let year = new Date(x.release_date).getFullYear()
    let date = new Date(x.release_date).getDate()
    let month = months[new Date(x.release_date).getMonth()]
    time = month+' '+date+','+year}
    
    else{let year = new Date(x.first_air_date).getFullYear()
    let date = new Date(x.first_air_date).getDate()
    let month = months[new Date(x.first_air_date).getMonth()]
    time = month+' '+date+','+year}

    if(x.release_date===undefined && x.first_air_date===undefined) time = ""
    
    let card = document.createElement("div")
    card.classList.add("card")

    card.innerHTML=`
        <button>
          <img src=${img}>
        </button>
        <p class="rate">rating:</p>

        <div class="info">
          <div class="name,year">
            <p>${title}</p>
            <p>${time}</p>
          </div>

          <div class="btns">
            <button class="fav"></button>
            <button class="bookmark"></button>
          </div>

        </div>`

        discoverSecn.appendChild(card)

    })
}
  
  
  let genreEl = document.querySelector("#genre")
  let yearEl = document.querySelector("#year")
  let mediaEl = document.querySelector("#media")
  let searchEl = document.querySelector(".snd button")
  let loadMoreEl = document.querySelector(".loadMore button")
  let pg
  let media="All";
  let year="";
  let genre="";
  let section1Printed = false;
  let currentData;


  loadMoreEl.addEventListener("click",function(){

    if(media === "All" && section1Printed===true){
      makeDiscoverCards(currentData.slice(20,40))
      section1Printed=false;
    }

    else if(media ==="All" && section1Printed===false){
      pg++;
  fetchDiscover(pg,genre,year,media).then(async function(data){
    currentData=data
      makeDiscoverCards(currentData.slice(0,20))
      section1Printed=true;
  })
    }

    else {
      pg++;
      fetchDiscover(pg,genre,year,media).then(async function(data){
        currentData=data ;
        makeDiscoverCards(currentData)
      })
    }
    
  })

  searchEl.addEventListener("click",async function (){
    document.querySelector(".Discover .moviesCards").innerHTML=""

    pg = 1
  await fetchDiscover(pg,genre,year,media).then(function(data){
    currentData=data
    console.log(data)
    // makeDiscoverCards(currentData)

  })

    if(media === "All"){
      section1Printed=false;
      makeDiscoverCards(currentData.slice(0,20))
      section1Printed=true;
    }

    else {
      makeDiscoverCards(currentData)
    }

  })



  genreEl.addEventListener("change",function (event){
    genre=genreEl.value
    console.log(genre)
  })

  yearEl.addEventListener("change",function (event){
    year=yearEl.value
    console.log(year)
  })

  mediaEl.addEventListener("change",function (event){
    media=mediaEl.value
    console.log(media)
  })

}


function loadingPage(){
  let click = new Event("click")
  trendingSection()
  mediaSection()
  document.querySelector(".searchBtn").dispatchEvent(click)



}

loadingPage()


