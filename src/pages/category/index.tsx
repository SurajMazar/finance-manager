import React, { useEffect, useState } from 'react';
import {FiPlus} from 'react-icons/fi';
import {Button,Grid} from '@material-ui/core';
import CEModal from './create-update';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../services/category.service';
import CategoryModel from '../../models/category.model';
import CategoryCard from '../../components/cards/category';

interface state{
  category:{
    categories:Array<CategoryModel>,
    loading:boolean
  }
}

const Category:React.FC = () =>{
  // redux
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCategory());
  },[dispatch]);//eslint-disable-line

  const state = useSelector((state:state)=>{
    const {category} = state;
    return category;
  });
  const {categories,loading} = state;

  // end redux

  const [shoModal,setShowModel] = useState(false);

  /** open create model **/
  const openModel =()=>{
    setShowModel(true);
  }

  /** close modal */
  const closeModel =()=>{
    setShowModel(false);
    setEditCat(undefined);
  }

  // used for editing
  const [editCat,setEditCat] = useState<CategoryModel|undefined>(undefined);
  const openeditModel = (cat:CategoryModel) =>{
    setEditCat(cat);
    openModel();
  }
  

  return(
    <section>
      <div className="section-break-1">
        <Button className="btn-primary" onClick={openModel}>
          <FiPlus/>
          Add Category
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <div className="section-break-2 bg-primary mt-2">
            <h3 className="text-center text-18-primary">Income Categories</h3>
            <div className="section-padding-2">
              {
                loading?"":<CategoryCard categories={categories} type="income" editCat={openeditModel}/>
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className="section-break-2 bg-primary mt-2">
            <h3 className="text-center text-18-primary">Expenses Categories</h3>
            <div className="section-padding-2">
              {
                loading?"":<CategoryCard categories={categories} type="expense" editCat={openeditModel}/>
              }
            </div>
          </div>
        </Grid>
      </Grid>

      {/* edit create model  */}
      <CEModal closeModel={closeModel} visible={shoModal} edit={editCat} categories={categories}/>
    </section>
  );
}


export default Category;