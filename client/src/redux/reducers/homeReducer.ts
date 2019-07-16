import * as ActionType from '../ActionType';
const initialState:any = {
  breederror: false,
  breeds: [],
  isLoading: false
};
let data: any
export default (state = initialState, action: any) => {
  switch (action.type){
    case ActionType.GET_ITEMS:
      data = {breeds: action.payload, isLoading:false, breederror: false}
      return {...state, ...data};
    case `loading`:
      data = {isLoading: true, breederror: false}
      return {...state, ...data};
    case `breederror`:
      data = {isLoading: false, breederror: true}
      return {...state, ...data};
    default:
      return state;
  }
}