import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding-left: 60px;

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }
`;

export const Info = styled.div`
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    color: #fff;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: #fff;
    opacity: 0.85;
  }

  .overview {
    color: #fff;
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
  align-items: center;

  h1 {
    font-size: 2rem;
  }

  .overview {
    -webkit-line-clamp: 3;
  }
}
`;



export const Background = styled.div`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  

  img,
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center;  
    transition: opacity 0.6s ease;
    
  }


    .visible {
  opacity: 1;
}

.hidden {
  opacity: 0;
}




  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.85) 30%,
      rgba(0, 0, 0, 0.3) 60%,
      transparent 100%
    );
    z-index: 1;
  }

  
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      #0f0f0f 8%,
      transparent 45%
    );
    z-index: 1;
  }

   @media (max-width: 768px) {
    img,
    iframe {
      object-fit: cover;     
    }
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 26px;

  @media (max-width: 768px) {
  flex-direction: column;
  width: 100%;

  button {
    width: 100%;
  }
}
`;

export const ButtonPlay = styled.button`
  background: #fff;
  color: #000;
  font-weight: 600;
  padding: 12px 28px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  &:active {
    opacity: 0.7;
  }
`;

export const ButtonInfor = styled.button`
  background: rgba(109, 109, 110, 0.7);
  color: #fff;
  padding: 12px 28px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: rgba(109, 109, 110, 0.9);
    transform: scale(1.05);
  }

  &:active {
    opacity: 0.7;
  }
`;