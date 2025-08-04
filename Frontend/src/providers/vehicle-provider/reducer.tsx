import { handleActions } from "redux-actions";
import { INITIAL_STATE, IVehicleStateContext } from "./context";
import { VehicleActionEnums } from "./actions";

export const VehicleReducer = handleActions<IVehicleStateContext, IVehicleStateContext>(
    {
        [VehicleActionEnums.getVehicleListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.getVehicleListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.getVehicleListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.getVehiclePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.getVehicleSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.getVehicleError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.createVehiclePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.createVehicleSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.createVehicleError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.updateVehiclePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.updateVehicleSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.updateVehicleError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.deleteVehiclePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.deleteVehicleSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [VehicleActionEnums.deleteVehicleError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);