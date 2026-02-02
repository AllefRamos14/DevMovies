import { useState } from "react";
import Logo from "../../assets/logo.png"
import { Container, Menu, Li } from "./Styles"
import { Link, useLocation } from "react-router-dom";


function Hearder() {
    const [changeBackgroud, setChangeBackground] = useState(false)

    const { pathname } = useLocation()

    window.onscroll = () => {
        if (!changeBackgroud && window.pageYOffset > 150) {
            setChangeBackground(true)
        }
        if (changeBackgroud && pageYOffset <= 150) {
            setChangeBackground(false)
        }
    }

    return (
        <Container $changeBackgroud={changeBackgroud}>
            <img src={Logo} alt="logo-dev-movies" />
            <Menu>
                <Li $isActive={pathname === '/'}>
                    <Link to='/'>Home</Link>
                </Li>
                <Li $isActive={pathname.includes('filmes')}>
                    <Link to='/filmes'>Filmes</Link>
                </Li>
                <Li $isActive={pathname.includes('series')}>
                    <Link to='/series'>Séries</Link>
                </Li>
            </Menu>

        </Container>
    )
}
export default Hearder