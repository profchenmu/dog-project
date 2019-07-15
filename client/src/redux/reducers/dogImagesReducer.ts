import * as ActionType from '../ActionType';
const initialState:any = {
  dogImages: [],
  isLoading: false,
};
let data:any
export default (state = initialState, action: any) => {
  switch (action.type){
    case ActionType.GET_IMAGES:
      data = {dogImages: action.payload, isLoading:false}
      return data;
    case `imgloading`:
      data = {...state, isLoading: true}
      return data;
    default:
      return state;
  }
}