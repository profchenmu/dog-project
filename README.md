## For development:

### For back-end
1. `cd ./server`
2. `npm run dev`
3. visit `localhost:8080`

### For Front-end
1. `cd ./client`
2. `npm run dll`
3. `npm start`
4. visit `localhost:8081`(optional)

## For docker deploy;

### Build Front-end static files
1. `cd ./client`
2. `npm run build-all`

### Build Back-end server
1. cd to project Root
2. build and run docker image

### About pm2
1. pm2 can be run on baak-end by `npm run start-pm2`

### About dll-plugin
1. Before building front-end files, it's important to `npm run dll` first

### About UT
1. `cd ./server` and `npm run test`

## Todos list
1. dog image pagination