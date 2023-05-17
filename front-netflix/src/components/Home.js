import { useEffect,useState } from "react";

import MovieList from "./MovieList";
import NavBar from "./NavBar";

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
        <div style={{backgroundColor:"#5a0404"}}>

   <NavBar/>
    <MovieList MovieList={moviesdata}/>
    </div>
        </>
    )
}
export default Home;