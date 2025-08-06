import { handleActions } from "redux-actions";
import { INITIAL_STATE, IIncidentStateContext } from "./context";
import { IncidentActionEnums } from "./actions";

export const IncidentReducer = handleActions<IIncidentStateContext, IIncidentStateContext>(
    {
        [IncidentActionEnums.getIncidentListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.getIncidentListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.getIncidentListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.getIncidentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.getIncidentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.getIncidentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.createIncidentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.createIncidentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.createIncidentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.updateIncidentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.updateIncidentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.updateIncidentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.deleteIncidentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.deleteIncidentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [IncidentActionEnums.deleteIncidentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);