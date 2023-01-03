# happireshipi_front

Front-end for Spring API, developed with NPM and Parcel.
Instruction to run locally:

- Clone repo from github
- With terminal in project folder run "npm install" (you can use one from VSC)
- After installation run "npm start"
- You will see an message with link do localhost at 1234.
- Open new browser cart with http://localhost:1234
- Don't forget to launch Spring API with 'sudo docker-compose up -d', otherwise front will not fetch JSON from Spring API.
- When you save any file in a project, changes will be uploaded automatically, as long as Parcel server is running (remember? 'npm start' in here).

### Stage

1. Aplication is fetching all meals from Spring API and render divs, but without images. For now I fetched image from random url.

### Issues

1. Images must be stored on remote server to be fetched with JSON. The quickest solution is to put images in some 3rd party cloud and put links into database.
2. After development of front, it will be build using Parcel and npm. Distribution version of front part will be in ./dist/ folder. Patryk should change Dokerfile, so only this folder will be contenerized and put at 8081 port.
