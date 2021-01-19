const fetch = require("node-fetch");
// require('dotenv').config()
const getPalette = require('./actions/color');
const getFontStyles = require('./actions/typo');
const _system = require('./actions/write-in-file');

async function getFigmaObjTree(figmaApiKey, figmaId) {
  let figmaTreeStructure;
  try {
    let result = await fetch("https://api.figma.com/v1/files/" + figmaId, {
      method: "GET",
      headers: {
        "X-Figma-Token": figmaApiKey
      }
    });

    figmaTreeStructure = await result.json();
    _system._writeInFile(figmaTreeStructure);
  } catch (err) {
    console.error(err);
  }

  const componentsArtboard = figmaTreeStructure.document.children.filter(item => {
    return item.name === "😎 Global Components ";
  })[0].children;

  baseTokeensJSON = {
    token: {
      grids: {},
      spacers: {},
      colors: {},
      fonts: {}
    }
  };

  Object.assign(baseTokeensJSON.token.colors, getPalette(componentsArtboard));
  Object.assign(baseTokeensJSON.token.fonts, getFontStyles(componentsArtboard));

  // _system._writeInFile(figmaTreeStructure);
}

const FIGMAAPIKEY = "118011-464b927b-84b5-4320-92e8-7bd007f4406b"
const FIGFILEID = "2rJNrrU6fP1rKoC8flfm9B"
getFigmaObjTree(FIGMAAPIKEY, FIGFILEID);
