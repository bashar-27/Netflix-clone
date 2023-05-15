import {useEffect, useState } from "react";
import {Card} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ModalMovie from "./ModalMovie";
function FavList(){
    const fullpath="http://image.tmdb.org/t/p/w500/";

    const [favArr,setFavArr] = useState([]);
    const [showFlag, setShowFlag] = useState(false);

    const [clickedMovie, setclickedMovie] = useState({});

    const handleShow = (item) => {
        setShowFlag(true)
        // console.log(item)
        setclickedMovie(item)
    }

    const handleClose = () => {
        setShowFlag(false)
    }
    const getFavMovie = () =>{
        const serverURL = "http://localhost:3005/getMovies";
        fetch(serverURL)
        .then((response)=>{
            response.json()
            .then(data=>{
                setFavArr(data)
                console.log(data)
            })
        })
    }
    useEffect(()=>{
        getFavMovie()
    },[])

return (
    <>
     {favArr.map(item => {
                return (
                    <Card style={{ width: '18rem' }} key={item.id}>
                         <Card.Img variant="top" src={fullpath+item.poster_path} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                <p>{item.overview}</p>
                            </Card.Text>
                            <Button variant="primary" onClick={()=>{handleShow(item)}}>See more</Button>
                        </Card.Body>
                    </Card>
                )
            })}

                        <ModalMovie showFlag={showFlag} handleClose={handleClose} clickedMovie={clickedMovie}/>

    </>
)

}
export default FavList;