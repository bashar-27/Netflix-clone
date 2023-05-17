'use strict';

require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const pg = require('pg');
server.use(cors());
server.use(express.json());
const axios =require('axios');
//'postgresql://localhost:5432/lab135'
const client = new pg.Client(process.env.DATABASE_URL);

// const allData = require('./data_movies/data.json')
const PORT =process.env.PORT;
const apiKey=process.env.apiKey;
console.log(apiKey)

client.connect().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Listening on ${PORT}: I'm ready to routing!`)
    })

})
server.get('/trending',getTrending);

server.post('/addMovie',addMovieHandler);

server.get('/getMovies',getMovieHandler);

server.put('/udateMoveiFavorite/:id',udateMoveiFavorite);

server.delete('/deleteFromFav/:id',deleteMovie);

function getTrending(req,res){
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    try{
        axios.get(url)
        .then(response  =>{
            let getResult = response.data.results.map(item=>{
                let newMovie = new movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
                return newMovie;
            })
            
            res.send(getResult)
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}



function addMovieHandler(req,res){
    const movie = req.body;
    console.log(movie);
    const sql =`INSERT INTO newMovie (title ,poster_path ,overview ,comment)
                VALUES ($1,$2,$3,$4);`
    const values =[movie.title ,movie.poster_path,movie.overview,movie.comment];
    client.query(sql,values)
    .then(data =>{
        res.send("The Movie Has Been Added Successfully");

    })
    .catch((error)=>{
        errorHandler(error,req,res)
    })
}

function getMovieHandler(req,res){
    const sql='SELECT * FROM newMovie';
    client.query(sql).then(data=>{
       
        res.send(data.rows);
    })
    .catch((error)=>{
        errorHandler(error,req,res);
    });

}

function udateMoveiFavorite(req,res){
    const id=req.params.id;
    console.log(req.params);
    const updateMovie = req.body;
    const sql=`UPDATE newMovie set title=$1 ,poster_path= $2 ,overview=$3 ,comment=$4 WHERE id=${id} RETURNING *;`;
    const value = [updateMovie.title,updateMovie.poster_path ,updateMovie.overview,updateMovie.comment];
    client.query(sql,value)
    .then(data=>{
            const sql = `SELECT * FROM newMovie;`;
            client.query(sql)
                .then(allData => {
                    res.send(allData.rows)
                })
        }).catch((error)=>{
            errorHandler(error,req,res);
        })
    }
    
    function deleteMovie(req,res){
        try {
            const {id} = req.params;
    const sql =`delete from newMovie where id=${id}`;
    client.query(sql)
    .then(data=>{
        res.status(200).send("DELETED MOVIE IS SUCCESSFYLLY")
    })
    .catch((error)=>{
        errorHandler(error,req,res);
    })
    
        } catch (error) {
            errorHandler(error,req,res);
    
        }
    
    }
function movies(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;
    this.comment=this.comment;
}
function errorHandler(error,req,res){
    const errorObj = {
        status:500,
        alert:error
    }
    res.status(500).send(errorObj);
}