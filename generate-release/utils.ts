import * as fs from 'fs-extra';

const constants = {
  BUILD_FILE_FILEPATH: '../build/mturk-engine.latest.raw.user.js',
  VERSION_NUMBER: process.argv[2]
};

export const generateRelease = async () => {
  try {
    await generateBuildFile();

    // These things can happen concurrently.
    await Promise.all([deleteStaticDirectory(), deleteExtraneousFiles()]);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
    process.exit(1);
  }
};

const generateBuildFile = async () => {
  const sourceCodeFile = await findSourceCodeFile();
  await fs.createFile(constants.BUILD_FILE_FILEPATH);
  await fs.writeFile(
    constants.BUILD_FILE_FILEPATH,
    generateUserScriptBoilerplate()
  );

  const sourceCode = await fs.readFile(`../build/static/js/${sourceCodeFile}`);

  await fs.appendFile(constants.BUILD_FILE_FILEPATH, sourceCode);
};

const findSourceCodeFile = async () => {
  const files = await fs.readdir('../build/static/js');
  return files.find(filePath => !filePath.includes('.map'));
};

const deleteExtraneousFiles = () =>
  Promise.all([
    fs.unlink('../build/asset-manifest.json'),
    fs.unlink('../build/service-worker.js'),
    fs.unlink('../build/index.html')
  ]);

const deleteStaticDirectory = () => fs.remove('../build/static');

// tslint:disable:max-line-length
const generateUserScriptBoilerplate = () =>
  `// ==UserScript==
// @name         Mturk Engine (Raw)
// @namespace    https://github.com/Anveio/mturk-engine/
// @version      ${constants.VERSION_NUMBER}
// @description  Earn money more efficiently on Amazon's Mechanical Turk work platform.
// @author       Anveio (Shovon Hasan)
// @license      MIT
// @match        https://worker.mturk.com/?mturkengine
// @match        https://www.mturk.com/?mturkengine
// @grant        none
// ==/UserScript==

/**
 * After downloading this script visit https://worker.mturk.com/?mturkengine
 *
 * Mturk Engine is free and open source. Visit this project's github page at: https://github.com/Anveio/mturk-engine
 * There you can view the source code, post issues, submit changes, suggest features, and download the latest version.
 * Changelogs are available at: https://github.com/Anveio/mturk-engine/releases
 */

`;
