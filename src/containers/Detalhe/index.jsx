import { useEffect, useState } from "react";
import { Background, Container, ContainerMovies, Cover, Info } from "./styles";
import { useParams } from "react-router-dom";
import { getImages } from '../../utils/getImages';
import {
    getMovieById,
    getMovieCredits,
    getMovieSimilar,
    getMovieVideos,
    getTvById,
    getTvCredits,
    getTvSimilar,
    getTvVideos
} from "../../services/getData";
import SpanGenres from "../../components/SpanGenres";
import Cast from "../../components/Cast";
import Slider from "../../components/Slider";

function Detalhe() {
    const { id, type } = useParams();

    const [item, setItem] = useState();
    const [videos, setVideos] = useState();
    const [credits, setCredits] = useState();
    const [similar, setSimilar] = useState();

    useEffect(() => {
        async function getAllData() {
            try {
                if (type === "tv") {
                    const [data, vids, creds, sim] = await Promise.all([
                        getTvById(id),
                        getTvVideos(id),
                        getTvCredits(id),
                        getTvSimilar(id),
                    ]);

                    setItem(data);
                    setVideos(vids);
                    setCredits(creds);
                    setSimilar(sim);
                } else {

                    const [data, vids, creds, sim] = await Promise.all([
                        getMovieById(id),
                        getMovieVideos(id),
                        getMovieCredits(id),
                        getMovieSimilar(id),
                    ]);

                    setItem(data);
                    setVideos(vids);
                    setCredits(creds);
                    setSimilar(sim);
                }
            } catch (error) {
                console.error("Erro ao carregar detalhes:", error);
            }
        }

        getAllData();
    }, [id, type]);

    if (!item) return null;

    return (
        <>
            <Background $image={getImages(item.backdrop_path)} />

            <Container>
                <Cover>
                    <img src={getImages(item.poster_path)} alt={item.title || item.name} />
                </Cover>

                <Info>
                    <h2>{item.title || item.name}</h2>

                    <SpanGenres genres={item.genres} />

                    <p>{item.overview}</p>

                    <h3>Artistas</h3>
                    <Cast credits={credits} />
                </Info>
            </Container>

            <ContainerMovies>
                {videos && videos.map((video) => (
                    <div key={video.id}>
                        <h4>{video.name}</h4>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={video.name}
                            width="100%"
                            height="400"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ))}
            </ContainerMovies>

            {similar && (
                <Slider
                    info={similar}
                    title={type === "tv" ? "Séries Similares" : "Filmes Similares"}
                />
            )}
        </>
    );
}

export default Detalhe;
