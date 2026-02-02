import styled from "styled-components";

export const Container = styled.div`
  background-color: #000;
  padding: 0 20px;
  margin-bottom: 20px;
  overflow-x: clip;

  h2 {
    display: inline-block;
    color: #fff;
    font-size: 22px;
    margin: 40px 0 40px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 100%;
      height: 3px;
      background-color: #189b20;
      border-radius: 2px;
    }
  }

 
  .swiper {
    overflow: visible;
   
  }

  .swiper-wrapper {
    display: flex;
    gap: 10px;
    overflow: visible;
  }

  .swiper-slide {
    width: auto;
    overflow: visible;
    
  }
`;
