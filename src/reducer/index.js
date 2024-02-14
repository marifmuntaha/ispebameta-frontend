import {actionType} from "./actionType";
import {AuthInfo, AuthLogin, getData, storeData, updateData, deleteData} from "./action";

let url = '';

async function Dispatch(method, state, params) {
    switch (method) {
        case actionType.AUTH_REGISTER :
            url = '/auth/register';
            return storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.AUTH_LOGIN :
            url = '/auth/login';
            return AuthLogin(url, state).then(resp => {
                return resp;
            });
        case actionType.AUTH_INFO :
            url = '/auth/info';
            return await AuthInfo(url, state).then(resp => {
                return resp;
            });
        case actionType.ASPECT_GET :
            url = '/aspect';
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.ASPECT_STORE :
            url = '/aspect';
            return await storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.ASPECT_SHOW :
            url = `/aspect/${params.id}`;
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.ASPECT_UPDATE :
            url = `/aspect/${state.formData.id}`;
            return await updateData(url, state).then(resp => {
                return resp;
            });
        case actionType.ASPECT_DELETE :
            url = `/aspect/${state.id}`;
            return await deleteData(url, state).then(resp => {
                return resp;
            });
        case actionType.INSTRUMENT_GET :
            url = '/instrument';
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.INSTRUMENT_STORE :
            url = '/instrument';
            return await storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.INSTRUMENT_UPDATE :
            url = `/instrument/${state.formData.id}`;
            return await updateData(url, state).then(resp => {
                return resp;
            });
        case actionType.INSTRUMENT_DELETE :
            url = `/instrument/${state.id}`;
            return await deleteData(url, state).then(resp => {
                return resp;
            });
        case actionType.INDICATOR_GET :
            url = '/indicator';
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.INDICATOR_STORE :
            url = '/indicator';
            return await storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.INDICATOR_UPDATE :
            url = `/indicator/${state.formData.id}`;
            return await updateData(url, state).then(resp => {
                return resp;
            });
        case actionType.INDICATOR_DELETE :
            url = `/indicator/${state.id}`;
            return await deleteData(url, state).then(resp => {
                return resp;
            });
        case actionType.TEACHER_GET :
            url = '/teacher';
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.TEACHER_STORE :
            url = '/teacher';
            return await storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.TEACHER_SHOW :
            url = `/teacher/${params.id}`;
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.TEACHER_UPDATE :
            url = `/teacher/${state.formData.id}`;
            return await updateData(url, state).then(resp => {
                return resp;
            });
        case actionType.TEACHER_DELETE :
            url = `/teacher/${state.id}`;
            return await deleteData(url, state).then(resp => {
                return resp;
            });
        case actionType.EVALUATION_GET :
            url = '/evaluation';
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.EVALUATION_STORE :
            url = '/evaluation';
            return await storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.EVALUATION_SHOW :
            url = `/evaluation/${params.id}`;
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.EVALUATION_UPDATE :
            url = `/evaluation/${state.formData.id}`;
            return await updateData(url, state).then(resp => {
                return resp;
            });
        case actionType.EVALUATION_DELETE :
            url = `/evaluation/${state.id}`;
            return await deleteData(url, state).then(resp => {
                return resp;
            });
        case actionType.EVALUATION_PRINT :
            url = '/evaluation/print';
            return await storeData(url, state).then(resp => {
                return resp;
            });
        case actionType.USER_GET :
            url = '/user';
            return await getData(url, state, params).then(resp => {
                return resp;
            });
        case actionType.USER_UPDATE :
            url = `/user/${state.formData.id}?_method=PUT`;
            return await storeData(url, state).then(resp => {
                return resp;
            });
        default:
    }
}

export {Dispatch, actionType}