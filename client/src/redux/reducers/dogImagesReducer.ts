import * as ActionType from '../ActionType';
const initialState:any = {
  dogImages: [],
  imageerror: false,
  isLoading: false,
};
let data:any
export default (state = initialState, action: any) => {
  switch (action.type){
    case ActionType.GET_IMAGES:
      data = {dogImages: action.payload, isLoading:false, imageerror: false}
      return data;
    case `imgloading`:
      data = {...state, isLoading: true, imageerror: false}
      return data;
    case `imageerror`:
      data = {...state, isLoading: false, imageerror: true}
      return data;
    default:
      return state;
  }
}