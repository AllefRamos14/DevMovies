import { useState, useRef, useEffect } from "react"
import { getMovieVideos, getTvVideos } from "../../services/getData"
import { getImages } from "../../utils/getImages"
import { CardContainer, Overlay, Info } from "./styles"

function Card({ item, onHoverTrailer, onLeaveTrailer }) {



    const isPerson = !!item?.profile_path
    const isTv = !!item?.first_air_date || item?.media_type === "tv"
    const isMovie = item?.release_date || item?.media_type === "movie"


    if (!item || (!item.poster_path && !item.profile_path)) return null

    const [trailerKey, setTrailerKey] = useState(null)

    const timerRef = useRef(null)
    const fetchedRef = useRef(false)
    const trailerRef = useRef(null)


    async function fetchTrailer() {
        if (isPerson) return null

        try {
            let videos = []

            if (isTv) {

                videos = await getTvVideos(item.id)
            } else if (isMovie) {

                videos = await getMovieVideos(item.id)
            } else {

                return null
            }

            return videos.find(
                video =>
                    video.site === "YouTube" &&
                    (video.type === "Trailer" || video.type === "Teaser")
            )
        } catch (error) {
            console.warn("Sem trailer para:", item.name || item.title, item.id)
            return null
        }
    }

    function handleMouseEnter() {
        if (isPerson) return

        if (trailerRef.current) {
            setTrailerKey(trailerRef.current)
            onHoverTrailer?.(trailerRef.current)
            return
        }

        if (fetchedRef.current) return

        timerRef.current = setTimeout(async () => {
            const trailer = await fetchTrailer()

            fetchedRef.current = true

            if (trailer) {
                trailerRef.current = trailer.key
                setTrailerKey(trailer.key)
                onHoverTrailer?.(trailer.key)
            }
        }, 600)
    }

    function handleMouseLeave() {
        clearTimeout(timerRef.current)

        setTrailerKey(null)
        trailerRef.current = null
        fetchedRef.current = false

        if (!isPerson) {
            onLeaveTrailer?.()
        }
    }

    useEffect(() => {
        return () => clearTimeout(timerRef.current)
    }, [])

    return (
        <CardContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <img
                src={getImages(item.poster_path || item.profile_path)}
                alt={item.title || item.name}
            />

            <Overlay>
                <Info>
                    <h3>{item.title || item.name}</h3>

                    {!isPerson && (
                        <span>⭐ {item.vote_average?.toFixed(1)}</span>
                    )}
                </Info>
            </Overlay>
        </CardContainer>
    )
}

export default Card
