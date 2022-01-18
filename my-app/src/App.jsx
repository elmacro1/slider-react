import React from "react";
import { Slideshow, TextoSlide, Slide } from "./Componentes/Slideshow";
import "./estilos.css";
import styled from "styled-components";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
const App = () => {
  return (
    <main>
      <Titulo>Productos Destacados</Titulo>
      <Slideshow autoplay={true} velocidad="1000">
        <Slide>
          <a href="#">
            <img src={img1} alt="" />
          </a>
          <TextoSlide colorFondo="#ff8000" colorTexto="#000">
            <p>Hola soy el texto de la imágen</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img2} alt="" />
          </a>
          <TextoSlide>
            <p>Hola soy el texto de la imágen</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img3} alt="" />
          </a>
          <TextoSlide>
            <p>Hola soy el texto de la imágen</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img4} alt="" />
          </a>
          <TextoSlide>
            <p>Hola soy el texto de la imágen</p>
          </TextoSlide>
        </Slide>
      </Slideshow>

      <Titulo>Productos Destacados</Titulo>
      <Slideshow
        controles={true}
        autoplay={false}
        velocidad="500"
        intervalo="5000"
      >
        <Slide>
          <a href="#">
            <img src={img3} alt="" />
          </a>
          <TextoSlide>
            <p>Hola soy el texto de la imágen</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="#">
            <img src={img4} alt="" />
          </a>
          <TextoSlide>
            <p>Hola soy el texto de la imágen</p>
          </TextoSlide>
        </Slide>
      </Slideshow>
    </main>
  );
};

const Titulo = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export default App;
