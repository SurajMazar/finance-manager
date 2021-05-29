import React from 'react';
import Category from '../../../models/category.model';
import {FiEdit,FiTrash2} from "react-icons/fi";



interface catcardProps{
  categories:Array<Category>,
  type:'income'|'expense',
  editCat:(cate:Category)=>void
}

const CategoryCard:React.FC<catcardProps> = (props) =>{

  const {categories,type,editCat} = props;

  const CategoryList = (categories:Array<Category>,type:'income'|'expense'):any =>{
    return(
      <>
        {
          categories && categories.length?
          categories.map((cate)=>(
            <div key={cate.id}>
            {
              cate.type === type ?
              <>
                <div className="cate-list">
                  <div className="cate-detail">
                    {cate.name}
                  </div>
                  <div className="cate-actions">
                    <div onClick={()=>editCat(cate)} title="Edit"><FiEdit className="btn-pm-round"/></div>
                    <div title="delete"><FiTrash2 className="btn-pm-round"/></div>
                  </div>
                </div>
                  {cate.Category && cate.Category.length?
                    <div className="ml-2">
                      {CategoryList(cate.Category,type)}
                    </div>:''
                  }
              </>:""
            }
            </div>
          )):''
        }
      </>
    );
  }

  return(
    <>
    {CategoryList(categories,type)}
    </>
  );
}


export default CategoryCard;