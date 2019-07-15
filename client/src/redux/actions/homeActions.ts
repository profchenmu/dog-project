import axios from 'axios';
import * as Type from "../ActionType";
import { COMMON } from '../api';

interface IBreed {
  breed?: string,
  subbreed?: string[]
}
interface IDog {
  breed:string,
  subbreed:string|undefined
}

export const getItems = () => {
  return (dispatch: any) => {
    dispatch({
      type: `loading`,
    })
    axios.get(COMMON.GET_ITEMS).then((res)=>{
      const { data } = res;
      const dogs:IBreed[] = []
      data.forEach((element:IDog, index:number) => {
        let subbreed:string[] = [];
        if(dogs.length === 0){
          subbreed = element.subbreed && [element.subbreed];
          dogs.push({breed: element.breed, subbreed});
        } else {
          const dogElement = dogs[dogs.length - 1];
          if (dogElement.breed !== element.breed) {
            subbreed = element.subbreed && [element.subbreed];
            dogs.push({breed: element.breed, subbreed});
          } else {
            dogs[dogs.length-1].subbreed.push(element.subbreed);
          }
        }
      })
      dispatch({
        payload: dogs,
        type: Type.GET_ITEMS,
      })
    }).catch(() => {
      // tslint:disable-next-line: no-console
      console.log('breederror')
      // dispatch({
      //   type: `breederror`,
      // })
    })
  }
}

export const getImages = (breed: string, subbreed?: string) => {
  return (dispatch: any) => {
    dispatch({
      type: `imgloading`,
    })
    let url = `${COMMON.GET_IMAGES}/${breed}`;
    if(subbreed){
      url += `/${subbreed}`;
    }
    // subbreed && (url += `/${subbreed}`);
    axios.get(url).then((res)=>{
      dispatch({
        payload: res.data,
        type: Type.GET_IMAGES,
      })
    }).catch(() => {
      // tslint:disable-next-line: no-console
      console.log('imageerror')
      // dispatch({
      //   type: `imageerror`,
      // })
    })
  }
}
