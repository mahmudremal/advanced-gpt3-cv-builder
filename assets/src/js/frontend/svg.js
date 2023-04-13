/**
 * SVG Script.
 * 
 * @package AdvancedGPT3CVbuilder
 */
 import moment from 'moment';

const SVGJS = {
  wrapText: ( text, length, before = false, after = false, spacing = false, firstspacing = 0  ) => {
    let words = text.split(' '), lines = [], line = '';
  
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (line.length + word.length >= length ) {
        lines.push(line.trim());line = '';
      }
      line += word + ' ';
    }
    lines.push(line.trim());
  
    let tspanElements = lines.map((line, index) => {
      let dy = ( index > 0 ) ? ( spacing ) ? spacing : '1.2em' : firstspacing;
      var beforeEl  = ( ! before ) ? `<tspan x="0" dy="${dy}">` : before.replace( '{{dy}}', dy ),
          afterEl   = ( ! after ) ? `</tspan>` : after;
      return beforeEl + line + afterEl;
    });
    return tspanElements.join('');
  },
  getDate: ( date, datefrmt, format ) => {
    var current = moment( date );
    return current.format( format );
  }
}
export default SVGJS;


