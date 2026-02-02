import styled from "styled-components";


export const Container = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;



img{

    border-radius: 30px;
    width: 230px;
    height: 100%;

    &:hover {
    transform: scale(1.06);
    transition: 0.8s;
  }
  &:active {
  opacity: 70%;
  
}
    
}

h3{
color: #ffffff;
margin-top: 15px;
}

`