import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./card.css";
import React, { useState } from "react";
import axios from "axios";
import CommentModal from "./CommentModal";

function Movie(props) {
  const fullpath = "http://image.tmdb.org/t/p/w500/";
const [showFlag,setShowFlag]=useState(false);
const [clickedMovie, setclickedMovie] = useState({});


  const addToFav = (item) => {
    setShowFlag(true);
    setclickedMovie(item);
    item.comment = "write a comment...";
    const serverURL = `${process.env.REACT_APP_serverURL}/addMovie`;
    console.log(item);

    axios
      .post(serverURL, item)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(item)
  };

   const handleClose = () => {
    setShowFlag(false);
  };

  return (
    <>
  

      {props.displayCard.map((item) => {
        return (
   
        <div style={{display:"inline-grid" , flexWrap:"wrap",gap:"20px" ,justifyContent:"center",height:"30%"}}>
            <Card
              style={{
                display:"grid",
                width: "18rem",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
              }}
              key={item.id}
            >
              <Card.Img variant="top" src={fullpath + item.poster_path} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  <p>{item.overview}</p>
                </Card.Text>
                <Button style={{borderRadius: "50px",}}
                  variant="primary"
                  onClick={() => {
                    addToFav(item);
                  }}
                >
                  Add to Favorite
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      <CommentModal  showFlag={showFlag}
        handleClose={handleClose}
        clickedMovie={clickedMovie}/>
    </>
  );
}

export default Movie;
