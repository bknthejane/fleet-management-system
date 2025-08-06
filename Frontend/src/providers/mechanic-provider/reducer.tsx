import { handleActions } from "redux-actions";
import { INITIAL_STATE, IMechanicStateContext } from "./context";
import { MechanicActionEnums } from "./actions";

export const MechanicReducer = handleActions<IMechanicStateContext, IMechanicStateContext>(
    {
        [MechanicActionEnums.getMechanicListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.getMechanicListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.getMechanicListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.getMechanicPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.getMechanicSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.getMechanicError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.createMechanicPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.createMechanicSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.createMechanicError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.updateMechanicPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.updateMechanicSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.updateMechanicError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.deleteMechanicPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.deleteMechanicSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [MechanicActionEnums.deleteMechanicError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);