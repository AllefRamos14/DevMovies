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
    getPopularSeries,
    getTopSeries,
    getTvByGenre,
    getTvVideos,
    getTvGenres
} from "../../services/getData"
import Slider from "../../components/Slider"
import { getImages } from "../../utils/getImages"
import { useNavigate } from "react-router-dom"

function Series() {
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [topSeries, setTopSeries] = useState()
    const [showsByGenre, setShowsByGenre] = useState([])
    const [trailerKey, setTrailerKey] = useState(null)
    const [backgroundTrailer, setBackgroundTrailer] = useState(null)

    const genreMap = { "Action & Adventure": "Ação e Aventura", "Comedy": "Comédia", "Drama": "Drama", }


    async function pickFeaturedTvWithTrailer(list) {
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * list.length)
            const candidate = list[randomIndex]

            try {
                const videos = await getTvVideos(candidate.id)

                if (videos && videos.length > 0) {
                    return candidate
                }
            } catch (e) {

            }
        }


        return list[0]
    }

    useEffect(() => {
        async function getData() {
            try {
                const [topSeriesData, popularSeries, tvGenres] = await Promise.all([
                    getTopSeries(),
                    getPopularSeries(),
                    getTvGenres()
                ])

                let savedMovie = sessionStorage.getItem("featuredTv")

                if (!savedMovie) {
                    const featured = await pickFeaturedTvWithTrailer(topSeriesData)
                    savedMovie = featured
                    sessionStorage.setItem("featuredTv", JSON.stringify(featured))
                } else {
                    savedMovie = JSON.parse(savedMovie)
                }


                if (!savedMovie || !savedMovie.id || !savedMovie.name) {
                    const randomIndex = Math.floor(Math.random() * topSeriesData.length)
                    savedMovie = topSeriesData[randomIndex]
                    sessionStorage.setItem("featuredTv", JSON.stringify(savedMovie))
                }

                setMovie(savedMovie)
                setTopSeries(popularSeries)


                const seriesPromises = tvGenres.slice(0, 5).map(async (genre) => {
                    const series = await getTvByGenre(genre.id)

                    return {
                        genreName: genre.name,
                        series
                    }
                })

                const seriesResult = await Promise.all(seriesPromises)
                setShowsByGenre(seriesResult)

            } catch (error) {
                console.error("Erro ao carregar dados", error)
            }
        }

        getData()
    }, [])

    useEffect(() => {
        async function loadTrailer() {
            if (!movie?.id) return

            try {
                const videos = await getTvVideos(movie.id)


                const trailer = videos.find(
                    v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
                )


                setTrailerKey(trailer?.key || null)
            } catch (error) {
                console.warn("Série sem trailer ou ID inválido:", movie?.id)
                setTrailerKey(null)
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
        navigate(`/detalhe/tv/${movie.id}`)
    }

    return (
        <>
            {movie && (
                <Background>
                    <img
                        src={getImages(movie.backdrop_path)}
                        className={backgroundTrailer ? "hidden" : "visible"}
                        alt={movie.name}
                    />

                    {backgroundTrailer && (
                        <iframe
                            className="visible"
                            src={`https://www.youtube.com/embed/${backgroundTrailer}?autoplay=1&mute=1&controls=0`}
                            allow="autoplay"
                            frameBorder="0"
                            title="Trailer"
                        />
                    )}

                    <Container>
                        <Info>
                            <h1>{movie.name}</h1>

                            <div className="meta">
                                <span>{movie.first_air_date?.slice(0, 4)}</span>
                                <span>•</span>
                                <span>{movie.original_language?.toUpperCase()}</span>
                                <span>•</span>
                                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                            </div>

                            <p className="overview">
                                {movie.overview || "Descrição não disponível."}
                            </p>
                        </Info>

                        <ContainerButton>

                            {trailerKey && (
                                <ButtonPlay
                                    onMouseEnter={handlePlayHover}
                                    onMouseLeave={handlePlayLeave}
                                >
                                    ▶ Assistir
                                </ButtonPlay>
                            )}

                            <ButtonInfor onClick={handleNavigate}>
                                Mais informações
                            </ButtonInfor>
                        </ContainerButton>
                    </Container>
                </Background>
            )}

            {topSeries && (
                <Slider
                    info={topSeries}
                    title="Top Series"
                />
            )}

            {showsByGenre.map(item => (
                <Slider
                    key={item.genreName}
                    info={item.series}
                    title={genreMap[item.genreName] || item.genreName}
                />
            ))}
        </>
    )
}

export default Series
