import { IoHome } from "react-icons/io5";
import {FiUserPlus,FiUserMinus} from 'react-icons/fi';
interface menu{
  path:string,
  name:string,
  icon:any
}


const menus:Array<menu> = [
  {
    path:'/',
    icon:IoHome,
    name:'Dashboard'
  },

  {
    path:'/income',
    icon:FiUserPlus,
    name:'Income'
  },

  {
    path:'/expenses',
    icon:FiUserMinus,
    name:'Expenses'
  }
]
export default menus;