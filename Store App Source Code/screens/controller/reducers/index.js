import {combineReducers} from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import flashMessageReducer from './flashMessageReducer';
import moreReducer from './moreReducer';

import inventoryReducer from './inventoryReducer';
import ordersReducers from './ordersReducers';
import reportReducer from './reportReducer';
export default combineReducers({
    authentication:AuthenticationReducer,
    flashMessage:flashMessageReducer,
    more:moreReducer,
    inventoryData:inventoryReducer,
    order:ordersReducers,
    report:reportReducer
})