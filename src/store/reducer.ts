import history from '../utils/history.util';
import { connectRouter } from 'connected-react-router';
import authReducer from './action-reducer/auth.actionreducer';



const reducers = {
  router:connectRouter(history),
  auth:authReducer
}


export default reducers;