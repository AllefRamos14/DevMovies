import { getImages } from "../../utils/getImages";
import { Container, Actor } from "./styles";

function Cast({ credits }) {
    return (
        <Container>
            {credits?.cast?.slice(0, 5).map((actor) => (
                <Actor key={actor.id}>
                    {actor.profile_path && (
                        <img
                            src={getImages(actor.profile_path)}
                            alt={actor.name}
                        />
                    )}
                    <p>{actor.name}</p>
                    <span>{actor.character}</span>
                </Actor>
            ))}
        </Container>
    );
}

export default Cast;


