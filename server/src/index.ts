import dotenv from "dotenv";
import ejs from "ejs";
import express from "express";
import fs from "fs";
import path from "path";
import { getDogImages, getInfos } from "./handlers/dogs";

interface IDog {
    breed: string;
    subbreed: string|undefined;
}

interface IInfos {
    time: number;
    data: IDog[];
}

interface IImagesDogs {
    time: number;
    data: string[];
}

dotenv.config();
const port = process.env.SERVER_PORT;
export const app = express();
app.set( "views", path.join( __dirname, "../public" ) );
// tslint:disable-next-line: no-var-requires
app.engine("html", (ejs as any).__express);
app.set( "view engine", "html" );
app.use( express.static( path.join( __dirname, "../public" ) ) );
app.get("/", (req, res) => {
    // tslint:disable-next-line: no-console
    // console.log(req);
    res.render("index.html");
});
app.get( "/api/dog/breeds", ( req, res ) => {
    fs.readFile(path.join(__dirname, `./breeds.json`), (err: any, infos: Buffer) => {
        if (!err && infos) {
            try {
                const infoFormTemp: IInfos = JSON.parse(infos.toString());
                // tslint:disable-next-line: no-console
                console.log(infoFormTemp);
                if (new Date().valueOf() - infoFormTemp.time > 180000 ) {
                    getInfos().then((e: IDog[]) => {
                        // tslint:disable-next-line: no-console
                        console.log(e);
                        res.json(e);
                    }).catch(() => {
                        res.status(500);
                    });
                } else {
                    res.json(infoFormTemp.data);
                }
            } catch (err) {
                getInfos().then((e: IDog[]) => {
                    // tslint:disable-next-line: no-console
                    console.log(e);
                    res.json(e);
                }).catch(() => {
                    res.status(500);
                });
            }
        } else {
            getInfos().then((e: IDog[]) => {
                // tslint:disable-next-line: no-console
                console.log(e);
                res.json(e);
            }).catch(() => {
                res.status(500);
            });
        }
    });
});

app.get("/api/dog/images/:breed/:subbreed?", (req, res) => {
    const params = req.params;
    let url: string;
    let fileName: string;
    if (params.subbreed) {
        url = `https://dog.ceo/api/breed/${params.breed}/${params.subbreed}/images`;
        fileName = `${params.breed}_${params.subbreed}.json`;
        // tslint:disable-next-line: no-console
        console.log(url);
    } else {
        url = `https://dog.ceo/api/breed/${params.breed}/images`;
        fileName = `${params.breed}.json`;
    }
    // tslint:disable-next-line: no-console
    console.log(url);

    fs.readFile(path.join(__dirname, fileName), (err: any, infos: any) => {
        // tslint:disable-next-line: no-console
        console.log(err, infos);
        if (!err && infos) {
            try {
                const infoFormTemp: IImagesDogs = JSON.parse(infos.toString());
                // tslint:disable-next-line: no-console
                console.log(infoFormTemp);
                // const infoFormTemp: IImagesDogs = JSON.parse(infos);
                if (new Date().valueOf() - infoFormTemp.time > 180000 ) {
                    getDogImages(url, fileName).then((e: string[]) => {
                        res.json(e);
                    }).catch(() => {
                        res.status(500);
                    });
                } else {
                    res.json(infoFormTemp.data);
                }
            } catch (err) {
                getDogImages(url, fileName).then((e: string[]) => {
                    res.json(e);
                }).catch(() => {
                    res.status(500);
                });
            }
        } else {
            getDogImages(url, fileName).then((e: string[]) => {
                res.json(e);
            }).catch(() => {
                res.status(500);
            });
        }
    });
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
