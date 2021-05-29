import React, { useEffect, useState } from 'react';
import {Modal,Backdrop,Fade,Grid,TextField,FormControl,InputLabel,Select ,MenuItem,Button} from '@material-ui/core';
import { filterCatByType, setFormdata } from '../../utils/common.utils';
import { createCategory, updateCategory } from '../../services/category.service';
import { useDispatch } from 'react-redux';
import Category from '../../models/category.model';


interface CECprops{
  visible:boolean,
  closeModel:()=>void,
  edit:Category|undefined,
  categories:Array<Category>
}



interface fields{
  name:string,
  description:string,
  type:string,
  parent_id:number|null
}

const CreateEditCategory:React.FC<CECprops> =props=>{

  const dispatch = useDispatch();

  const {closeModel,visible,edit,categories} = props;

  const [fields,setFields] = useState<fields>({
    name:'',
    description:'',
    type:'',
    parent_id:null
  })

  // model close
  const modelClose = ()=>{
    setFields({
      name:'',
      description:'',
      type:'',
      parent_id:null
    })
    closeModel();
  }



  // data binding with form
  const onFieldChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>|React.ChangeEvent<{ name?: string; value: unknown }>,field:'name'|'description'|'type'|'parent_id') =>{
    let value = e.target.value;
    setFields({
      ...fields,
      [field]:value
    });
  }

 


  // create
  const create = (e:React.FormEvent)=>{
    e.preventDefault();
    const form = setFormdata(fields);
    dispatch(createCategory(form,modelClose))
  }


  // editing
  useEffect(()=>{
    if(edit) {
      setFields({
        name:edit.name,
        description:edit.description,
        type:edit.type,
        parent_id:edit.parent_id,
      });
    }
  },[edit]);

  const update =  (e:React.FormEvent)=>{
    e.preventDefault();
    if(edit){
      const form = setFormdata(fields);
      dispatch(updateCategory(form,edit?.id,modelClose))
    }
  }
 

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
            <h3 className="text-16 text-center mb-2">{edit?"Update":"Create"} Category</h3>
            <form className="fm-form" onSubmit={edit?update:create}>
              <Grid container  spacing={3}>
                <Grid item xs={12}>
                  {/* name field */}
                    <TextField  label="Name"  value={fields.name} required onChange={(e)=>onFieldChange(e,'name')}/>
                </Grid>
                <Grid item xs={12}>
                   {/* type */}
                  <FormControl style={{width:'100%'}}>
                    <InputLabel id="cat-type">Type</InputLabel>
                      <Select id="cat-type"  value={fields.type} required onChange={(e)=>onFieldChange(e,'type')}>
                        <MenuItem value={"expense"}>Expense</MenuItem>
                        <MenuItem value={"income"}>Income</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>

                {fields.type?
                  <Grid item xs={12}>
                    {/* type */}
                    <FormControl style={{width:'100%'}}>
                      <InputLabel id="cat-type">Parent (optional)</InputLabel>
                        <Select id="cat-type"  value={fields.parent_id || ""}  onChange={(e)=>onFieldChange(e,'parent_id')}>
                          <MenuItem value="">None</MenuItem>
                          {
                            filterCatByType(categories,fields.type).map(cat=>(
                              <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>
                            ))
                          }
                        </Select>
                    </FormControl>
                  </Grid>
                :''}

                <Grid item xs={12}>
                  {/* description field */}
                    <TextField  label="Description" multiline rowsMax={4} value={fields.description} onChange={(e)=>onFieldChange(e,'description')}/>
                </Grid>


                <Grid item xs={12} className="text-center">
                  {/* description field */}
                    <Button children={edit?"Update":"Create"}  type="submit" className="btn-primary"/>
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

export default CreateEditCategory;