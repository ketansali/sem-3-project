import axios from "../helpers/axios";
import { pageConstants } from "./constants";

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
        try {
            const res = await axios.post('/page/create', form);
            if (res.status === 201) {
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
            } else {
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllPage = () => {
    return async dispatch => {

        dispatch({ type: pageConstants.GET_ALL_PAGE_REQUEST });
        const res = await axios.get(`/page/getAllPage`);
        console.log(res);
        if (res.status === 200) {

            const { page } = res.data;

            dispatch({
                type: pageConstants.GET_ALL_PAGE_SUCCESS,
                payload: page
            });
        } else {
            dispatch({
                type: pageConstants.GET_ALL_PAGE_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}