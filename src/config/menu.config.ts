import {
  FcMoneyTransfer,
  FcCurrencyExchange,
  FcPieChart,
  FcReadingEbook,
  FcInspection,
  FcTodoList
} from 'react-icons/fc';

interface menu{
  path?:string,
  name:string,
  icon?:any
}


const menus:Array<menu> = [
  {
    path:'/',
    icon:FcPieChart,
    name:'Dashboard'
  },

  {
    name:'Activities'
  },

  {
    name:'Categories',
    icon:FcTodoList,
    path:'/category'
  },
  {
    path:'/daybook',
    icon:FcReadingEbook,
    name:'Daybook'
  },
  {
    path:'/income',
    icon:FcCurrencyExchange,
    name:'Income'
  },

  {
    path:'/expenses',
    icon:FcMoneyTransfer,
    name:'Expenses'
  },
  {
    name:'Information'
  },
  {
    path:'/reports',
    icon:FcInspection,
    name:'Reports'
  }
]
export default menus;