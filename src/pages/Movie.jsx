import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import{
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileFill,
} from 'react-icons/bs'

import MovieCard from "../components/MovieCard";

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () =>{
    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async(url) => {
        const res = await fetch(url);
        const data = await res.json();


        setMovie(data);
    }

    const formatCurrency = (number) =>{
        return number.toLocaleString("en-US", {
            style: "currency",
            currency:"USD",
        })
    }

    useEffect(() =>{
        const movieUrl = `${moviesURL}${id}?${apiKey}`
        getMovie(movieUrl)
    }, [])


    return(
        <div className="movie-page">
           {movie && (
            <>
                <MovieCard movie={movie} showLink={false} />
                <p className="tagline">{movie.tagline}</p>
                <div className="info">
                    <h3>
                        <BsWallet2> Orçamento: </BsWallet2>
                        <p>{formatCurrency(movie.budget)}</p>
                    </h3>
                </div>

                <div className="info">
                    <h3>
                        <BsGraphUp> Receita: </BsGraphUp>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </h3>
                </div>

                <div className="info">
                    <h3>
                        <BsHourglassSplit> Duração: </BsHourglassSplit>
                        <p>{movie.runtime} minutos</p>
                    </h3>
                </div>

                <div className="info">
                    <h3>
                    <BsFillFileFill> Descrição: </BsFillFileFill>
                    <p>{movie.overview}</p>
                    </h3>
                </div>
            </>
           )}
        </div>
    )
};

export default Movie