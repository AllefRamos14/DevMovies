import { useEffect, useState } from "react";
import { Background, Container, ContainerButton, Info, Poster } from "./styles";
import Button from "../../components/Button";
import Slider from "../../components/Slider";
import { getImages } from "../../utils/getImages";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import {
    getMovies,
    getTopMovies,
    getTopSeries,
    getPopularSeries,
    getPersonPopular
} from "../../services/getData";

function Home() {
    const navigate = useNavigate()

    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [personPopular, setPersonPopular] = useState()
    const [showTrailer, setShowTrailer] = useState(false)  // <=

    useEffect(() => {
        async function getAllData() {

            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getPersonPopular()
            ])
                .then(([Movie, TopMovie, TopSeries, PopularSeries, PersonPopular]) => {


                    let savedMovie = sessionStorage.getItem("featuredMovie")

                    if (!savedMovie) {
                        const randomIndex = Math.floor(Math.random() * Movie.length)
                        savedMovie = Movie[randomIndex]
                        sessionStorage.setItem(
                            "featuredMovie",
                            JSON.stringify(savedMovie)
                        )
                    } else {
                        savedMovie = JSON.parse(savedMovie)
                    }

                    setMovie(savedMovie)
                    setTopMovies(TopMovie),
                        setTopSeries(TopSeries),
                        setPopularSeries(PopularSeries),
                        setPersonPopular(PersonPopular)
                })
                .catch((error) => console.error(error))

        }


        getAllData()
    }, [])



    return (
        <>
            {movie && (
                <Background img={getImages(movie.backdrop_path)}>

                    {showTrailer && (
                        <Modal
                            movieId={movie.id}
                            onClose={() => setShowTrailer(false)}
                        />
                    )}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButton>
                                <Button red onClick={() => navigate(`/detalhe/movie/${movie.id}`)} >Assista Agora</Button>
                                <Button onClick={() => setShowTrailer(true)}

                                    red={false
                                    }  >Assista o Trailer</Button>
                            </ContainerButton>
                        </Info>

                        <Poster>
                            <img src={getImages(movie.poster_path)} alt={`Capa-do-filme ${movie.title}`} />
                        </Poster>
                    </Container>
                </Background>
            )}
            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
            {topSeries && <Slider info={topSeries} title={'Top Séries'} />}
            {popularSeries && <Slider info={popularSeries} title={'Séries Populares'} />}
            {personPopular && <Slider info={personPopular} title={'Artistas Populares'} />}
        </>
    )
}
export default Home

