import { useEffect, useState } from "react"
import {
    Container,
    Info,
    Background,
    ContainerButton,
    ButtonInfor,
    ButtonPlay
} from "./styles"

import {
    getMovies,
    getTopMovies,
    getMovieGenres,
    getMoviesByGenre,
    getMovieVideos
} from "../../services/getData"

import Slider from "../../components/Slider"
import { getImages } from "../../utils/getImages"
import { useNavigate } from "react-router-dom"

function Movies() {
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [topMovies, setTopMovies] = useState(null)
    const [moviesByGenre, setMoviesByGenre] = useState([])
    const [backgroundTrailer, setBackgroundTrailer] = useState(null)
    const [trailerKey, setTrailerKey] = useState(null)

    useEffect(() => {
        async function getAllData() {
            try {
                const [Movie, TopMovie, Genres] = await Promise.all([
                    getMovies(),
                    getTopMovies(),
                    getMovieGenres()
                ])


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
                setTopMovies(TopMovie)


                const moviesPromises = Genres.slice(0, 5).map(async (genre) => {
                    const movies = await getMoviesByGenre(genre.id)

                    return {
                        genreName: genre.name,
                        movies
                    }
                })

                const moviesResult = await Promise.all(moviesPromises)
                setMoviesByGenre(moviesResult)

            } catch (error) {
                console.error("Erro ao carregar dados", error)
            }
        }

        getAllData()
    }, [])


    useEffect(() => {
        async function loadTrailer() {
            if (!movie?.id) return

            try {
                const videos = await getMovieVideos(movie.id)
                const trailer = videos.find(
                    v => v.type === "Trailer" && v.site === "YouTube"
                )

                setTrailerKey(trailer?.key || null)
            } catch (error) {
                console.error("Erro ao carregar trailer", error)
            }
        }

        loadTrailer()
    }, [movie])


    const handlePlayHover = () => {
        if (trailerKey && backgroundTrailer !== trailerKey) {
            setBackgroundTrailer(trailerKey)
        }
    }

    const handlePlayLeave = () => {
        setBackgroundTrailer(null)
    }

    const handleNavigate = () => {
        navigate(`/detalhe/movie/${movie.id}`)
    }

    return (
        <>
            {movie && (

                <Background>
                    <img
                        src={getImages(movie.backdrop_path)}
                        className={backgroundTrailer ? "hidden" : "visible"}
                    />

                    {backgroundTrailer && (
                        <iframe
                            className="visible"
                            src={`https://www.youtube.com/embed/${backgroundTrailer}?autoplay=1&mute=1&controls=0`}
                            allow="autoplay"
                            frameBorder="0"
                        />
                    )}

                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>

                            <div className="meta">
                                <span>{movie.release_date?.slice(0, 4)}</span>
                                <span>•</span>
                                <span>{movie.original_language.toUpperCase()}</span>
                                <span>•</span>
                                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                            </div>

                            <p className="overview">
                                {movie.overview || "Descrição não disponível."}
                            </p>
                        </Info>

                        <ContainerButton>
                            <ButtonPlay
                                onMouseEnter={handlePlayHover}
                                onMouseLeave={handlePlayLeave}
                            >
                                ▶ Assistir
                            </ButtonPlay>

                            <ButtonInfor onClick={handleNavigate}>
                                Mais informações
                            </ButtonInfor>
                        </ContainerButton>
                    </Container>
                </Background>
            )}

            {topMovies && (
                <Slider
                    info={topMovies}
                    title="Top Filmes"
                />
            )}

            {moviesByGenre.map(item => (
                <Slider
                    key={item.genreName}
                    info={item.movies}
                    title={item.genreName}
                />
            ))}
        </>
    )
}

export default Movies
