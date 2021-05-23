import React from "react";
import WL from '../../../assets/images/loader-white.png';

interface lp{
  text:string,
  loading:boolean
}
const LoadingButton:React.FC<lp> = props=>{

  const {loading,text} = props;

  return(
    <button className="btn-primary" type="submit" disabled={loading} >
      <div style={{display:'flex',alignItems:'center'}}>
        {loading? <img src={WL} alt="" className="mr-1" style={{width:'18px'}}/>:''}
        {text}
      </div>
    </button>
  );
}

export default LoadingButton;
