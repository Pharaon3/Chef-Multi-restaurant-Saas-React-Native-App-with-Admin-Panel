import home from './home'
import root from './root'
import login from './root/extra/login'
import category from './category'
import product from './product'
import more from './more'
import orders from './orders'
import order_details from './orders/extra/view'
import outlet from './more/extra/outlet'
import payment from './more/extra/payment'
import account from './more/extra/account'
import addCategory from './category/extra/addNewCategory'
import addNewItem from './product/extra/addNewItem'
import updateItem from './product/extra/updateItem'
import categoryUpdate from './category/extra/updateCategory'

export default {

    ROOT:root,
    LOGIN:login,
    Home:home,

    ORDERS:orders,
    VIEW_ORDER_DETAILS:order_details,


    CATEGORY:category,
    ADD_CATEGORY:addCategory,
    UPDATE_CATEGORY:categoryUpdate,


    ADD_ITEM:addNewItem,
    UPDATE_ITEM:updateItem,


    PRODUCT:product,


    MORE:more,
    OUTLET_INFO:outlet,
    PAYMENT_DETAILS:payment,
    ACCOUNT_SETTINGS:account




}