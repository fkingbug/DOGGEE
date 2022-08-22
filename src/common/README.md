## cra typescript alias

npm install @craco/craco --save or npm install --save @craco/craco --legacy-peer-deps
and
npm i -D craco-alias
create tsconfig.paths.json
"extends": "./tsconfig.paths.json" in tsconfig.json
in package.json swap "start": "react-scripts start" with "start": "craco start"
https://stackoverflow.com/questions/57070052/create-react-app-typescript-3-5-path-alias

---
