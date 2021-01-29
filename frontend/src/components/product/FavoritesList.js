import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {makeStyles, Grid} from '@material-ui/core';

import ProductCard from './ProductCard'
import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({
  pList: {
    height: '100%',
    width:'100%',
    display: 'flex',
    flexFlow: 'row wrap',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}));


function FavoritesList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  // const isLoading = props.isLoading

  
  const currentUser = useSelector(state => state.user.currentUser)
  const favorites = currentUser.favorites || null
  const allProducts = useSelector(state => state.product.allProducts)
  
  const favs = allProducts.filter(function(item){
    return item.indexOf(item.id) === -1;
  });
  const favProducts = favs.map(item => <ProductCard product={item} key={item.id} />)
  return (
    <React.Fragment>
      { favProducts && <Grid container className={classes.pList} spacing={2}> {favProducts} </Grid> }
      { !favProducts && <Grid container className={classes.pList} spacing={2}> <p>You have not added any favorites yet</p></Grid> }
    </React.Fragment>
  );
}
export default FavoritesList