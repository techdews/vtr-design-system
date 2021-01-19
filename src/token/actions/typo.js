module.exports = function (stylesArtboard) {
  // empty "spacers obj" wheree we will store all colors
  const fontStyles = {};

  // get "spacers" artboard
  const fontStylesAtrboard = stylesArtboard.filter(item => {
    return item.name === "typography";
  })[0].children;

  fontStylesAtrboard.map((fontItem, i) => {
    if (fontItem.children) {
      let subFonts = {};

      // get all sub fonts
      fontItem.children.map(subFontItem => {
        let subFontObj = {
          [subFontItem.name]: {
            family: {
              value: `${subFontItem.style.fontFamily}`,
              type: "typography"
            },
            size: {
              value: `${subFontItem.style.fontSize}px`,
              type: "typography"
            },
            weight: {
              value: subFontItem.style.fontWeight,
              type: "typography"
            },
            lineheight: {
              value: `${subFontItem.style.lineHeightPercent}%`,
              type: "typography"
            },
            spacing: {
              value:
                subFontItem.style.letterSpacing !== 0
                  ? `${subFontItem.style.letterSpacing}px`
                  : "normal",
              type: "typography"
            }
          }
        };
        // merge multiple subfonts objects into one
        Object.assign(subFonts, subFontObj);
      });

      //
      let fontObj = {
        [fontItem.name]: subFonts
      };

      Object.assign(fontStyles, fontObj);
    } else {
      let fontObj = {
        [fontItem.name]: {
          family: {
            value: `${fontItem.style.fontFamily}, ${fontItem.style.fontPostScriptName
              }`,
            type: "typography"
          },
          size: {
            value: fontItem.style.fontSize,
            type: "typography"
          },
          weight: {
            value: fontItem.style.fontWeight,
            type: "typography"
          },
          lineheight: {
            value: `${fontItem.style.lineHeightPercent}%`,
            type: "typography"
          },
          spacing: {
            value:
              fontItem.style.letterSpacing !== 0
                ? `${fontItem.style.letterSpacing}px`
                : "normal",
            type: "typography"
          }
        }
      };

      Object.assign(fontStyles, fontObj);
    }
  });

  return fontStyles;
}