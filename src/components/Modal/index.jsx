import { useEffect, useState } from "react"
import { Background, ButtonDeFechamento, Container } from "./styles"
import { getMovieVideos } from "../../services/getData"


function Modal({ movieId, onClose }) {
    const [movie, setMovie] = useState()

    useEffect(() => {
        async function getMovies() {
            const videos = await getMovieVideos(movieId)
            setMovie(videos.find(v => v.type === "Trailer") || videos[0])
        }

        getMovies()
    }, [movieId])

    return (
        <Background onClick={onClose}>
            {movie && (
                <Container onClick={(e) => e.stopPropagation()}>
                    <ButtonDeFechamento onClick={onClose}>✖</ButtonDeFechamento>
                    <iframe
                        src={`https://www.youtube.com/embed/${movie.key}`}
                        title="Youtube Video Player"
                        width="100%"
                        height="400"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-presentation"

                    >

                    </iframe>
                </Container>
            )}
        </Background>
    )
}
export default Modal