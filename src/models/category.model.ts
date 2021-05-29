interface Category{
  id:number,
  type:"expense"|"income",
  name:string,
  description:string,
  parent_id:number|null,
  createdAt:Date,
  Category:Array<Category>
}

export default Category;