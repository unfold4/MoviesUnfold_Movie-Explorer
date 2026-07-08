import { AUTH_TOKEN } from "./config.js"

let options = {
      headers:{
        authorization : `Bearer ${AUTH_TOKEN}`
      }
    }


async function fetchTrending(){
  let rn = new Date()
  
  try{
    let response = await fetch(`https://api.themoviedb.org/3/trending/all/week`,options);

    let data = await response.json();
    data = data.results;

    return data;
  }
  catch(error){
    console.log("error occured:"+error)
  }

} 


async function fetchDiscover(pg,genre,decade,media){
  try {
  
  let yearGTE= decade+"-01-01"
  let yearLTE=(decade+9)+"-12-31"
  let movieData
  let tvData
  let urlMovie
  let urlTv

    if(media==="Movies" || media==="All"){

      if(genre === "" && decade=== ""){
        urlMovie = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${pg}`

      }
      else if(genre === "") {urlMovie = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${yearGTE}&primary_release_date.lte=${yearLTE}&page=${pg}`}

      else if(decade=== ""){
      urlMovie = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genre}&page=${pg}`
      }

      else {urlMovie = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genre}&primary_release_date.gte=${yearGTE}&primary_release_date.lte=${yearLTE}&page=${pg}`}


    const movie = await fetch(urlMovie,options)

    movieData = await movie.json()
    movieData=movieData.results}




    if(media==="TV Shows" || media==="All"){

      if(genre === "" && decade=== ""){
        urlTv = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&page=${pg}`

      }
      else if(genre === "") {urlTv = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=${yearGTE}&first_air_date.lte=${yearLTE}&page=${pg}`}

      else if(decade=== ""){
      urlTv = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&with_genres=${genre}&page=${pg}`
      }

      else {urlTv =`https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&with_genres=${genre}&first_air_date.gte=${yearGTE}&first_air_date.lte=${yearLTE}&page=${pg}`}


    const tv = await fetch(urlTv,options)
    tvData = await tv.json()
    tvData=tvData.results}


    if(media === "All"){
      let combined = []
      let movieDataIdx=0;
      let tvDataIdx=0;

      for (let i = 1 ;i<=40 ;i++){
        if(i%2===0){
          combined.push(tvData[tvDataIdx])
          tvDataIdx++
        }
        else {
          combined.push(movieData[movieDataIdx])
          movieDataIdx++
        }

      }
      return combined
    }

    else if (media === "TV Shows"){
      return tvData
    }
    else if (media === "Movies"){
      return movieData
    }
    
  }

  catch(error){
    console.log("following error occured:"+error)
  }
}


export {fetchDiscover}

export {fetchTrending}



