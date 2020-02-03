// source: https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c

import { writeFile } from 'fs';
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   production: false,
   apiKey: '${process.env.API_KEY}'
  };
`;
writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});