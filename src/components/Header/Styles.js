import styled from "styled-components";


export const Container = styled.div`
min-height: 100px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 50px;
z-index: 99;
position: fixed;
top: 0;

background-color: ${({ $changeBackgroud }) =>
        $changeBackgroud ? '#000' : 'transparent'};
transition: background-color 0.6s ease-in-out;


img{
    width: 28%;
}

`
export const Menu = styled.ul`
display: flex;
gap: 50px;
list-style: none;


`


export const Li = styled.li`
font-weight: 600;
cursor: pointer;
font-size: 23px;
position: relative;

a{
    text-decoration: none;
    color: #ffff;
}
&::after {
    content: '';
    height: 3px;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    background-color: #189b20;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.5s ease-in-out;
}

&:hover::after {
    width: 100%;
}

`