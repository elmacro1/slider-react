import React, { useEffect, useRef, useCallback } from "react";
import { ReactComponent as FlechaIzquierda } from "../images/iconmonstr-angel-left-thin.svg";
import { ReactComponent as FlechaDerecha } from "../images/iconmonstr-angel-right-thin.svg";
import styled from "styled-components";

const Slideshow = ({
  children,
  controles = false,
  autoplay = false,
  velocidad = "500",
  intervalo = "3000",
}) => {
  const slideshow = useRef(null);
  const intervaloSlideShow = useRef(null);

  const siguiente = useCallback(() => {
    //Comprobamos que el slideshow tenga elementos
    if (slideshow.current.children.length > 0) {
      console.log("siguiente");
      //Obtenemos el primer elemento
      const primerElemento = slideshow.current.children[0];
      //Establecemos la transicion
      slideshow.current.style.transition = `${velocidad}ms ease-out all`;
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      //Movemos el slideshow
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      const transicion = () => {
        //Reiniciamos la posicion del slide
        slideshow.current.style.transition = `none`;
        slideshow.current.style.transform = `translateX(0)`;

        //Tomamos el primer elemento y lo mandamos al final.
        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener("transitionend", transicion);
      };

      //Eventlistener para cuando termine la animacion.
      slideshow.current.addEventListener("transitionend", transicion);
    }
  }, [velocidad]);

  const anterior = () => {
    console.log("anterior");
    if (slideshow.current.children.length > 0) {
      //Obtenemos el ultimo elemento del slideshow
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );
      slideshow.current.style.transition = "none";
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (autoplay) {
      intervaloSlideShow.current = setInterval(() => {
        siguiente();
      }, intervalo);

      //Eliminamos el intervalo
      slideshow.current.addEventListener("mouseenter", () => {
        clearInterval(intervaloSlideShow.current);
      });

      //Volvemos a poner el intervalo cuando saquen el cursor del slideshow
      slideshow.current.addEventListener("mouseleave", () => {
        intervaloSlideShow.current = setInterval(() => {
          siguiente();
        }, intervalo);
      });
    }
  }, [autoplay, intervalo, siguiente]);

  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow ref={slideshow}>{children}</ContenedorSlideshow>
      {controles && (
        <Controles>
          <Boton onClick={anterior}>
            <FlechaIzquierda />
          </Boton>
          <Boton derecho onClick={siguiente}>
            <FlechaDerecha />
          </Boton>
        </Controles>
      )}
    </ContenedorPrincipal>
  );
};

const ContenedorPrincipal = styled.div`
  position: relative;
`;
const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
  z-index: 9;
  max-height: 500px;
  position: relative;
  img {
    width: 100%;
    vertical-align: top;
  }
`;
const TextoSlide = styled.div`
  background: ${(props) =>
    props.colorFondo ? props.colorFondo : "rgba(0, 0, 0, 0.3)"};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff")};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media screen and (max-width: 700px) {
    position: relative;
    background-color: #000;
  }
`;

const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
const Boton = styled.button`
  pointer-events: all;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transform: 0.3s ease all;

  path {
    filter: ${(props) =>
      props.derecho
        ? "drop-shadow(-2px 0px 0px #fff)"
        : "drop-shadow(2px 0px 0px #fff)"};
  }

  ${(props) => (props.derecho ? "right:0" : "left:0")}
`;

export { Slideshow, Slide, TextoSlide };
