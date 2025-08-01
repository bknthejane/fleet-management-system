import { handleActions } from "redux-actions";
import { INITIAL_STATE, IMunicipalityStateContext } from "./context";
import { MunicipalityActionEnums } from "./actions";

export const MunicipalityReducer = handleActions<IMunicipalityStateContext, IMunicipalityStateContext>(
    {
        [MunicipalityActionEnums.getMunicipalityListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.getMunicipalityListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.getMunicipalityListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.getMunicipalityPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.getMunicipalitySuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.getMunicipalityError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.createMunicipalityPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.createMunicipalitySuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.createMunicipalityError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.updateMunicipalityPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.updateMunicipalitySuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.updateMunicipalityError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.deleteMunicipalityPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.deleteMunicipalitySuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MunicipalityActionEnums.deleteMunicipalityError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);