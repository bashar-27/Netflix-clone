import Movie from "./Movie";


function MovieList(props){

    return(
        <>

        <Movie displayCard={props.MovieList}/>
        </>
    )
}

export default MovieList;