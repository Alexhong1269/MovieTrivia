# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### Local Setup (Host Machine)
Install Latest Node JS LTS
> Node JS Official Site: https://nodejs.org/en

Install NPM Dependencies
```sh
# run in root folder of cloned project
npm install
```
Build React Application
```sh
npm run build
```
Run Application
```sh
npm run dev
```

### Local Setup (Docker)
Install Docker For Host Operating System
> Docker Official Site : https://www.docker.com/get-started/


Building Docker Image
```sh
# Build docker image in root folder of cloned project
docker build -t movie .
```
Run Docker Container
```sh
docker run -d -p 5173:5173 --name movie movie
```
Check application in web browser
>localhost:5173

Run Cleanup Container When Finished (Shell)
```sh
./deploy/docker-cleanup.sh
```