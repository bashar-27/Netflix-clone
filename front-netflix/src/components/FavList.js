import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import UpdateModal from "./UpdateModal";
import ModalMovie from "./ModalMovie";
import axios from "axios";
import NavBar from "./NavBar";
import "./card.css";

function FavList(props) {
  // console.log(props.favArr);
  const fullpath = "http://image.tmdb.org/t/p/w500/";

  const [favArr, setFavArr] = useState([]);
  const [showFlag, setShowFlag] = useState(false);
  const [show, setUpdModal] = useState(false);
  const [clickedMovie, setclickedMovie] = useState({});
  const [newArrData, setNewArrData] = useState([]);

  const handleShow = (item) => {
    setShowFlag(true);
    // console.log(item)
    setclickedMovie(item);
  };

  const handleClose = () => {
    setShowFlag(false);
  };
  const getFavMovie = () => {
    const serverURL = `${process.env.REACT_APP_serverURL}/getMovies`;
    fetch(serverURL).then((response) => {
      response.json().then((data) => {
        setFavArr(data);
        // console.log(data);
      });
    });
  };
  const displayUpdModal = (item) => {
    setUpdModal(true);
    setclickedMovie(item);
    // console.log(item);
  };
  const closeUpdModal = () => {
    setUpdModal(false);
  };
  const getNewDataUpdated = (arr) => {
    setNewArrData(arr);
    // console.log(newArrData);
  };

  const deleteFavMovie = (item) => {
    console.log("delete obj", item);
    const serverURL = `${process.env.REACT_APP_serverURL}/deleteFromFav/${item.id}`;
    axios
      .delete(serverURL)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFavMovie();
    setNewArrData(favArr);
  }, [favArr]);
  return (
    <>
      <NavBar />
      <updateMosal />

      {newArrData.map((item) => {
        return (
          <div
            style={{
              display: "inline-grid",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              height: "30%",
            }}
          >
            <Card
              style={{
                display: "grid",
                width: "20rem",
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
                <Card.Text>
                  <h5>USER COMMENT:</h5>
                  <h5>{item.comment}</h5>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShow(item);
                  }}
                >
                  See more
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    displayUpdModal(item);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteFavMovie(item);
                  }}
                >
                  Delete!
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}

      <ModalMovie
        showFlag={showFlag}
        handleClose={handleClose}
        clickedMovie={clickedMovie}
      />
      <UpdateModal
        updateModalll={show}
        closeUpdModal={closeUpdModal}
        clickedMovie={clickedMovie}
        getNewDataUpdated={getNewDataUpdated}
      />
    </>
  );
}
export default FavList;
