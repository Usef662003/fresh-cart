import React, { useContext } from "react";
import style from "./Home.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MainSlider from "../MainSlider/MainSlider";
import CategorieSlider from "../CategorieSlider/CategorieSlider";
import { CardContext } from "../CardContext/CardContext";
import Loading from "../Loading/Loading";
import Prodect from "../Prodect/Prodect";
import NotFound from "../NotFound/NotFound";

export default function Home() {
  const { addProductToCard, card, setCard } = useContext(CardContext);



  return (
    <>
      <CategorieSlider />
      <MainSlider />
      <Prodect />
    </>
  );
}
