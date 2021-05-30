import {

  createCategoryRequest,
  createCategoryFail,
  createCategorySuccess,

  fetchCategoryFail,
  fetchCategoryRequest,
  fetchCategorySuccess,

  updateCategoryFail,
  updateCategoryRequest,
  updateCategorySuccess,
} from '../store/action-reducer/category.actionreducer';

import {Dispatch} from 'redux';
import { httpbase } from '../utils/axios.utils';
import { Toast } from '../utils/sweetalert.util';


export const createCategory = (formdata:FormData,callback:any = null) => {
  return async (dispatch:Dispatch) =>{
      dispatch(createCategoryRequest());
      try{
        const response = await  httpbase().post('/category/store',formdata);
        dispatch(createCategorySuccess(response.data.data));
        if(callback)callback();
        Toast('top',"Category created successfully",true);
      }catch(e){
      if(e && e.response && e.response.data){
        dispatch(createCategoryFail(e.response.data));
      }else{
        dispatch(createCategoryFail("Something went wrong"));
      }
    }
  }
}



export const fetchCategory = () =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCategoryRequest());
    try{
      const response = await httpbase().get('/category');
      dispatch(fetchCategorySuccess(response.data.data));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(fetchCategoryFail(e.response.data));
      }else{
        dispatch(fetchCategoryFail("Something went wrong"));
      }
    }
  }
}


export const updateCategory = (formdata:FormData,id:number,callback:any = null) => {
  return async (dispatch:Dispatch) =>{
      dispatch(updateCategoryRequest());
      try{
        const response =  await  httpbase().put('/category/update/'+id,formdata);
        dispatch(updateCategorySuccess(response.data.data));
        fetchCategory();
        if(callback)callback();
        Toast('top',"Category updated successfully",true);
      }catch(e){
      if(e && e.response && e.response.data){
        dispatch(updateCategoryFail(e.response.data));
      }else{
        dispatch(updateCategoryFail("Something went wrong"));
      }
    }
  }
}