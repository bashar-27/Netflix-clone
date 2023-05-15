
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect,useState } from "react";

import MovieList from "./MovieList";

function Home(){
    const [moviesdata,setmoviesdata]=useState([]);

    const getAllMovies=()=>{
        const serverURL ="http://localhost:3005/trending"

          // using axios
        // axios.get(serverURL)
        // .then(response=>{
        //     console.log(response.data)
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
        fetch(serverURL)
            .then(response => {
                response.json().then(data => {
                    console.log(data)
                    setmoviesdata(data)

                })
            })
    }

    useEffect(()=>{
        getAllMovies();
    },[])
    return(
        <>
    <Navbar/>
    <MovieList MovieList={moviesdata}/>

        </>
    )
}
export default Home;