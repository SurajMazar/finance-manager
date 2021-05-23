import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import LoadingButton from "../../components/buttons/loading";
import { useDispatch, useSelector } from "react-redux";
import {Login} from '../../services/auth.service';
import { setFormdata } from "../../utils/common.utils";

interface state{
  auth:{
    loading:boolean
  }
}


const LoginForm:React.FC = ()=>{

  /** Redux state */
  const dispatch = useDispatch()
  const state = useSelector((state:state)=>{
    const {auth} = state; 
    const {loading} = auth;
    return {loading};
  })
  const {loading:AuthLoading} = state;
  /** end Redux state */


  /** Form fields */
  const [fields,setFields] = useState({
    email:'',
    password:''
  });

  const onFieldChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,field:'email'|'password') =>{
    let value = e.currentTarget.value;
    switch(field){
      case 'email':
        setFields({
          ...fields,
          email:value
        });
        break;
      case 'password':
        setFields({
          ...fields,
          password:value
        })
        break;
    }
  }
  /** Form fields */

  // login action
  const AppLogin = (e:React.FormEvent)=>{
    e.preventDefault();
    const form = setFormdata(fields)
    dispatch(Login(form));
  }

  return(
    <div className="auth-section">
      <Grid item sm={10} xs={10} md={6} lg={4} xl={3}>
        <div className="auth-form-wrapper section-padding-2">
          <h1 className="text-18-primary text-center">Welcome back !!</h1>
          <p className="text-14-secondary text-center">(Login to continue your session)</p>

          <div className="section-break-2">
            <form onSubmit={AppLogin} className="fm-form">
              <Grid container className="justify-content-center">
                <Grid item xs={8} className="section-break-1">
                  <TextField required  label="Email" value={fields.email} onChange={(e)=>onFieldChange(e,'email')}/>
                </Grid>
                <Grid item xs={8} className="section-break-1">
                  <TextField required  label="Password" type="password" value={fields.password} onChange={(e)=>onFieldChange(e,'password')}/>
                </Grid>
              </Grid>
              <div className="text-center section-break-2 pb-0">
                <LoadingButton  loading={AuthLoading} text="Login"/>
              </div>
            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default LoginForm;