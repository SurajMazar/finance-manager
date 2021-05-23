export const setLocalstorage = (name:string,value:any):void =>{
  value = JSON.stringify(value);
  localStorage.setItem(name,value);
}

export const getLocalStorage = (name:string) =>{
  let value = localStorage.getItem(name);
  if(value){
    value = JSON.parse(value);
    return value;
  }
  return null;
}

