import * as ActionType from '../ActionType';
const initialState:any = {
  breeds: [],
  isLoading: false
};
let data: any
export default (state = initialState, action: any) => {
  switch (action.type){
    case ActionType.GET_ITEMS:
      data = {breeds: action.payload, isLoading:false}
      return {...state, ...data};
    case `loading`:
      data = {isLoading: true}
      return {...state, ...data};
    default:
      return state;
  }
}