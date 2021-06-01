import Category from "../models/category.model";
import Income from "../models/income.model";

export const setFormdata = (data:any) =>{
  const formData = new FormData();
  Object.keys(data).forEach(key=>{
    formData.append(key,data[key]);
  })
  return formData;
                     
}



export const filterCatByType = (categories:Array<Category>,type:string,edit:Category|undefined)=>{
  let array = categories;
  if(edit) {
   array = array.filter(cat=>cat.type === type && cat.id !== edit.id );
  }else{
   array = array.filter(cat=>cat.type === type);
  }
  return array;
}


export const NepaliNS = (number:string|number,symbol:string = 'Rs.') => {
  const string = number?.toString()
  if (string?.length > 3) {
    let hundredPlace = string.substring(string.length - 3)
    let remaining = string.slice(0, -3)
    remaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
    return symbol +' '+ remaining + ',' + hundredPlace
  }
  return symbol +' '+number
}


export const getTotal = (array:Array<Income>) =>{
  let total = 0;
  array.forEach(item=>{
    total = total + item.amount;
  })
  return total;
}


export const getMonthYear= (date:Date|null=null) =>{
  if(date){
    return new Date(date).toLocaleString('default', { month: 'long' ,year:'numeric'});
  }
  return new Date().toLocaleString('default', { month: 'long' ,year:'numeric'});
}


export const udateIncomeExpenseArray = (array:Array<Income>|undefined,object:any) =>{
  if(array && array.length){
    let oldObject = array.find(item=>item.id === object.id);
    if(oldObject){
      const oldIndex = array.indexOf(oldObject);
      if(oldIndex !== -1) array[oldIndex] = object;
    }
  }
  return array;
}