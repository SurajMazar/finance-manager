import React, { useEffect, useState } from 'react';
import {Modal,Backdrop,Fade,Grid,TextField,FormControl,InputLabel,Select } from '@material-ui/core';
import { filterCatByType, setFormdata } from '../../utils/common.utils';
import { updateCategory } from '../../services/category.service';
import { useDispatch } from 'react-redux';
import Category from '../../models/category.model';
import LoadingButton from '../../components/buttons/loading';
import Income from '../../models/income.model';
import { createIncome } from '../../services/income.service';

interface CECprops{
  visible:boolean,
  closeModel:()=>void,
  edit:Income|undefined,
  categories:Array<Category>,
  loading:boolean
}



interface fields{
  title:string,
  amount:number|null,
  cat_id:number | null,
}

const CreateEditIncome:React.FC<CECprops> =props=>{

  const dispatch = useDispatch();

  const {closeModel,visible,edit,loading,categories} = props;

  // form related
  const [fields,setFields] = useState<fields>({
    title:'',
    amount:null,
    cat_id:null,
  })

  // data binding with form
  const onFieldChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>|React.ChangeEvent<{ name?: string; value: unknown }>,field:'title'|'amount'|'cat_id') =>{
    let value = e.target.value;
    setFields({
      ...fields,
      [field]:value
    });
  }

  const cateSelectorOptions = (categories:Array<Category>)=>{
    if(categories){
      const categoryList =  filterCatByType(categories,'income',undefined);
      return(
        categoryList.map(cat=>{
          if(cat && cat.Category && cat.Category.length){
            return(
            <optgroup label={cat.name} key={cat.id}>
              {cat.Category.map((c)=>(
                <option value={c.id} key={c.id}>{c.name}</option>
              ))}
            </optgroup>)
          }else{
            return(
              <option value={cat.id} key={cat.id}>{cat.name}</option>
            )
          }
        })
      )
    }
  }
  // end form related



  // model close
  const modelClose = ()=>{
    setFields({
      title:'',
      amount:null,
      cat_id:null,
    })
    closeModel();
  }


  // create
  const create = async (e:React.FormEvent)=>{
    e.preventDefault();
    const form = setFormdata(fields);
    await dispatch(createIncome(form,modelClose));
  }

  

  
  // editing
  useEffect(()=>{
    if(edit) {
      setFields({
        title:edit.title,
        amount:edit.amount,
        cat_id:edit.cat_id,
      });
    }
  },[edit]);

  const update =  async (e:React.FormEvent)=>{
    e.preventDefault();
    if(edit){
      const form = setFormdata(fields);
      await dispatch(updateCategory(form,edit?.id,modelClose));
    }
  }
  // end editing

  

  

  return(
    <>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
      onClose={modelClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
        <div className="fm-model">
          <div className="fm-model-content sm">
            <h3 className="text-16 text-center mb-2">{edit?"Update":"Create"} income</h3>
            <form className="fm-form" onSubmit={edit?update:create}>
              <Grid container  spacing={3}>
                <Grid item xs={12}>
                  {/* name field */}
                    <TextField  label="Title"  value={fields.title} required onChange={(e)=>onFieldChange(e,'title')}/>
                </Grid>
                <Grid item xs={12}>
                   {/* type */}
                  <FormControl style={{width:'100%'}}>
                    <InputLabel id="cat-type">Category</InputLabel>
                      <Select id="cat-type" native  value={fields.cat_id || ""} required onChange={(e)=>onFieldChange(e,'cat_id')}>
                        <option aria-label="None" value="" />
                       {cateSelectorOptions(categories)}
                      </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  {/* name field */}
                    <TextField  label="Amount" type="number" value={fields.amount || undefined} required onChange={(e)=>onFieldChange(e,'amount')} />
                </Grid>



                <Grid item xs={12} className="text-center">
                  {/* description field */}
                  <LoadingButton  loading={loading} text={edit?"Update":"Create"}/>
                </Grid>

              </Grid>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
    </>
  );
}

export default CreateEditIncome;