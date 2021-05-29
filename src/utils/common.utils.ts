import Category from "../models/category.model";

export const setFormdata = (data:any) =>{
  const formData = new FormData();
  Object.keys(data).forEach(key=>{
    formData.append(key,data[key]);
  })
  return formData;
}



export const filterCatByType = (categories:Array<Category>,type:string)=>{
  const array = categories.filter(cat=>cat.type === type);
  return array;
}