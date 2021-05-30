import history from '../utils/history.util';
import { connectRouter } from 'connected-react-router';
import authReducer from './action-reducer/auth.actionreducer';
import categoryReducer from './action-reducer/category.actionreducer';
import incomeReducer from './action-reducer/income.actionreducer';

const reducers = {
  router:connectRouter(history),
  auth:authReducer,
  category:categoryReducer,
  income:incomeReducer
}


export default reducers;