import {createSlice} from '@reduxjs/toolkit';
import Category from '../../models/category.model';

interface stateInterface{
  loading:boolean,
  creating:boolean,
  categories:Array<Category>|undefined,
  error:any
}


const initialState:stateInterface = {
  categories:undefined,
  loading:false,
  creating:false,
  error:undefined
}


// add with out network call
const addCreatedCat = (categories:Array<Category>|undefined,cat:Category) =>{
  if(categories){
    if(cat.parent_id){
      let parent = categories.find(c=> c.id === cat.parent_id);
      if(parent){
        let index = categories.indexOf(parent);
        parent.Category = [cat].concat(parent.Category);
        if(index !== -1)  categories[index] = parent;
        return categories;
      }
      return [cat].concat(categories);
    }
    return [cat].concat(categories);
  }
  return [cat];
}


// update with out network call
const updateCat = (categories:Array<Category>|undefined,cat:Category)=>{
  if(categories){
    let oldCat = categories.find(c=>c.id === cat.id);
    if(oldCat){
      const index = categories.indexOf(oldCat);
      if(index !== -1) categories[index] = cat;
      return categories;
    }
    
    const getParent = (index:number = 0):Category|null =>{
      if(index >= categories.length){
        return null;
      }
      const check = categories[index].Category.find(c=>c.id === cat.id);
      if(check){
        return categories[index];
      }
      return getParent(index+1);
    }


    const parentWithUpdatedCat = getParent();

    if(parentWithUpdatedCat){
      let pIndex = categories.indexOf(parentWithUpdatedCat);
      let oldChild = parentWithUpdatedCat.Category.find(c=>c.id === cat.id);
      if(oldChild){
        let cIndex = parentWithUpdatedCat.Category.indexOf(oldChild);
        if(cIndex !== -1) parentWithUpdatedCat.Category[cIndex] = cat  // at last updated  here
        if(pIndex !== -1) categories[pIndex] = parentWithUpdatedCat;
      }
    }

    return categories;
  }
  return [cat];
}


const categorySlice = createSlice({
  name:'category',
  initialState:initialState,
  reducers:{
    //create
    createCategoryRequest(state){
      state.creating = true;
    },

    createCategorySuccess(state,actions){
      state.creating = false;
      state.categories = addCreatedCat(state.categories,actions.payload);
    },


    createCategoryFail(state,actions){
      state.creating = false;
      state.error = actions.payload;
    },

    //fetch
    fetchCategoryRequest(state){
      state.loading = true;
    },

    fetchCategorySuccess(state,actions){
      state.loading = false;
      state.categories = actions.payload
    },

    fetchCategoryFail(state,actions){
      state.loading = false;
      state.error = actions.payload
    },

    //update
    updateCategoryRequest(state){
      state.creating = true;
    },

    updateCategorySuccess(state,actions){
      state.creating = false;
      state.categories = updateCat(state.categories,actions.payload);
    },
    updateCategoryFail(state,actions){
      state.creating = false;
      state.error = actions.payload;
    },


  }
});


export const {
  
  createCategoryFail,
  createCategoryRequest,
  createCategorySuccess,

  fetchCategoryFail,
  fetchCategoryRequest,
  fetchCategorySuccess,

  updateCategorySuccess,
  updateCategoryRequest,
  updateCategoryFail,

} = categorySlice.actions;

export default categorySlice.reducer;