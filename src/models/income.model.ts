import Category from "./category.model";

interface Income{
  id: number,
  title: string,
  amount: number,
  createdAt:Date,
  updatedAt:Date,
  category:Category,
  cat_id:number
}

export default Income;