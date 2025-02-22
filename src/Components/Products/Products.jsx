import React from 'react'
import style from './Products.module.css'
import Prodect from '../Prodect/Prodect'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import NotFound from '../NotFound/NotFound';
import Loading from '../Loading/Loading';

export default function Products() {
  return <>
    <Prodect/>
  </>
}
