import domain from './domain';
const api = {
    authentication:{
        login:{
            name:"login user",
            path:domain.url + "login"
        },
        save_push_token:{
            name:"dave push token",
            path:domain.url + "store/update/firebase/token"
        }

    },

    orders:{
        viewOrder:{
            name:"view Orders",
            path:domain.url + "store/orders/view",
        },
        viewOrderDetails:{
            name:"view Order Details",
            path : domain.url + "store/order/view/details"
        },
        updateOrderStatus:{
            name:"update order Status",
            path : domain.url + "store/order/update/status"
        }
    },
    reports:{
        latest:{
            name:"fetch latest status",
            path : domain.url + "reports/status"

        }

    },
    inventory:{
        viewCategories:{
            name:"view categories",
            path:domain.url + "store/category/view",
        },
        updateCategory:{
            name:"update categories",
            path:domain.url + "store/category/update",
        },

        addCategory:{
            name:"add categories",
            path:domain.url + "store/category/add",
        },

        viewItems:{
            name:"view items",
            path:domain.url + "store/product/view",
        },
        updateItem:{
            name:"update items",
            path:domain.url + "store/product/update",
        },
       createItem:{
            name:"create item",
            path:domain.url + "store/product/create",
        }
    },

    more:{

        // view store details
        viewStore:{
            name:"view store info",
            path:domain.url + "store/view"
        },


        updateStore:{
            name:"update store info",
            path:domain.url + "store/update"
        },
         account_settings:{
             name:"account settings",
             path :domain.url  + ""
         }
    },

}
export default api;