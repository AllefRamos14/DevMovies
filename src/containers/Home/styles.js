import styled, { keyframes } from "styled-components";

const scale = keyframes`

from {
    transform: scale(0);
}
to {
    transform: scale(1);
}
`
export const Background = styled.div`

background-image: url(  ${(props) => props.img}  ) ;
height: 100vh;
background-size: cover;
background-position: center;
display: flex;
align-items: center;
justify-content: center;
position: relative;



&::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
}

&::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-image: linear-gradient(to top, #0f0f0f, rgba(0,0,0,0));
}

`
export const Container = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
height: 100%;
max-width: 1500px;

`

export const Info = styled.div`

z-index: 2;
padding: 20px;
width: 50%;
 h1 {
font-size: 60px;
font-weight: 700;
color: #ffffff;
 
}

p {
font-size: 20px;
font-weight: 500;
color: #ffffff;
margin-top: 30px;
margin-bottom: 20px;
}

`
export const Poster = styled.div`
z-index: 2;

img {
    width: 300px;
    border-radius: 30px;
    animation: ${scale} 0.5s linear;
    
} 
`

export const ContainerButton = styled.div`
    
    display: flex;
    gap: 20px;
    margin-top: 30px;
    `