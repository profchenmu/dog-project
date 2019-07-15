import axios from 'axios';
import fs from 'fs';
import path from 'path';
export const getInfos = () => {
  return axios.get('https://dog.ceo/api/breeds/list/all').then((e) => {
      const {data} = e;
      const message = data.message;
      const temp = [];
      // tslint:disable-next-line: forin
      for (const key in message) {
          if (message[key].length > 0) {
              const tempArr = message[key];
              for (const ele of tempArr) {
                  const obj: any = {breed: `${key}`, subbreed: ele};
                  temp.push(obj);
              }
          } else {
              const obj: any = {breed: `${key}`};
              temp.push(obj);
          }
      }
      const pathToFile: string = path.join(__dirname, `./breeds.json`);
      const infos = JSON.stringify({data: temp, time: new Date().valueOf()});
      fs.writeFile(pathToFile, infos, (err: any) => {
          // tslint:disable-next-line:no-console
          console.log(err);
      });
      return temp;
      // res.json(temp);
  }).catch((err: any) => {
      throw err;
  });
};

export const getDogImages = (url: string, fileName: string) => {
  // tslint:disable-next-line: no-console
  return axios.get(url).then((e) => {
      const {data} = e;
      const message = data.message;
      // res.json(message);
      const pathToFile: string = path.join(__dirname, `./${fileName}`);
      const infos = JSON.stringify({data: message, time: new Date().valueOf()});
      fs.writeFile(pathToFile, infos, (err: any) => {
          // tslint:disable-next-line:no-console
          console.log(err);
      });
      return message;
  }).catch((err) => {
      throw err;
      // res.status(500);
  });
};
