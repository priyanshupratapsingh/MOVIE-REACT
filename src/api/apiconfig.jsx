import React from "react"

const apikey = `&api_key=${import.meta.env.VITE_APIKEY}`
const baseURL = 'https://api.themoviedb.org/3'
// const celebURL = baseURL + '/person/popular?language=en-US&page=1' +  apikey
// const trendingURL = baseURL + '/trending/movie/week?language=en-US' +  apikey
// const trending_personURL = baseURL + '/trending/person/week?language=en-US' +  apikey



// const apiconfig = () => {
  //   return (
    //     <div>
    
    //     </div>
    //   )
    // }
    
    

export const getData = async (url) =>{
  try {
    const apiURL = baseURL + url +  apikey
    const data = await fetch(apiURL);
    if (!data.ok) {
      // Log error and throw if the API returns a bad status (e.g., 404)
      console.error(`Error: ${response.status} - ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const datajson = await data.json();
    // console.log(datajson);
    return datajson;
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return [];  // Return an empty array if there's an error
  }
}
