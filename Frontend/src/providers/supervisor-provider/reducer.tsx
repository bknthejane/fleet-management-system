import { handleActions } from "redux-actions";
import { INITIAL_STATE, ISupervisorStateContext } from "./context";
import { SupervisorActionEnums } from "./actions";

export const SupervisorReducer = handleActions<ISupervisorStateContext, ISupervisorStateContext>(
    {
        [SupervisorActionEnums.getSupervisorListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.getSupervisorListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.getSupervisorListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.getSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.getSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.getSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.createSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.createSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.createSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.updateSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.updateSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.updateSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.deleteSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.deleteSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionEnums.deleteSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);