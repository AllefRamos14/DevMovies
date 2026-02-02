import styled from "styled-components"


export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.85),
    rgba(0,0,0,0.2)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
`


export const CardContainer = styled.div`
  position: relative;
  width: 180px;
  height: 270px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 180px; 

  &:hover {
    transform: scale(1.08);
    z-index: 20;
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }

  img,
  iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  iframe {
    pointer-events: none;
  }
`

export const Info = styled.div`
  padding: 12px;

  h3 {
    font-size: 14px;
    margin-bottom: 6px;
    line-height: 1.2;
    color: #ffffff;
  }

  span {
    font-size: 13px;
    color: #46d369;
    font-weight: bold;
  }
`
