
import { Container } from "./styles"
import { Swiper, SwiperSlide } from "swiper/react"
import MovieCard from "../MovieCard";


function Slider({ info, title, onHoverTrailer, onLeaveTrailer }) {

    return (
        <Container>
            <h2>{title}</h2>
            <Swiper
                grabCursor
                spaceBetween={10}
                slidesPerView={'auto'}
                className='swiper'
            >
                {info.map((item, index) => (
                    <SwiperSlide key={index}>

                        <MovieCard
                            item={item}
                            onHoverTrailer={onHoverTrailer}
                            onLeaveTrailer={onLeaveTrailer}


                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </Container>


    )
}
export default Slider