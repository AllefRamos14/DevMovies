import styled from "styled-components";

export const Container = styled.div`

background: #000;
width: 70%;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
padding: 50px;
max-width: 1200px;
border-radius: 20px;

iframe{
    border: none;
    border-radius: 10px;
}
`

export const Background = styled.div`

height: 100vh;
width: 100vw;
z-index: 999;
background-color: rgba(0,0,0,0.6);
position: absolute;
display: flex;
align-items: center;
justify-content: center;

`
export const ButtonDeFechamento = styled.button`

position: absolute;
right: 24px;
top: 20px;
width: 30px;
border: none;
border-radius: 6px;
background-color: red;
opacity: 90%;
cursor: pointer;
  

  &:hover {
    transform: scale(1.08);
    transition: 0.5s;
  }

  &:active {
  transform: scale(0.96);
  opacity: 80%;
}

`
