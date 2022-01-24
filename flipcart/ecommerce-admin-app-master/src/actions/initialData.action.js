import {
    initialDataConstants,
    categoryConstansts,
    productConstants,
    orderConstants,
    pageConstants
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
    return async(dispatch) => {
        
        const res = await axios.post(`/initialData`);
        if (res.status === 200) {
            const { categories, products, orders, page } = res.data;
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products },
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders },
            });
            dispatch({
                type: pageConstants.GET_ALL_PAGE_SUCCESS,
                payload: { page },
            });
        }
        console.log(res);
    };
};