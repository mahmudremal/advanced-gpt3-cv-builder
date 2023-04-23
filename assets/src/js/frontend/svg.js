/**
 * SVG Script.
 * 
 * @package AdvancedGPT3CVbuilder
 */
 import moment from 'moment';


const SVGJS = {
  wrapText: ( text, length, before = false, after = false, spacing = false, firstspacing = 0, args = {}  ) => {
    let words = text.split(' '), lines = [], line = '';
    args.text = text;args.length = length;args.spacing = spacing;
  
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (line.length + word.length >= length ) {
        lines.push(line.trim());line = '';
      }
      line += word + ' ';
    }
    lines.push(line.trim());
  
    let tspanElements = lines.map( (line, index) => {
      let dy = ( index > 0 ) ? (
        ( spacing ) ? spacing : '1.2em'
      ) : (
        ( firstspacing ) ? firstspacing : '0'
      );args.line = line;
      var beforeEl  = ( ! before ) ? `<tspan x="0" dy="${dy}">` : before.replace( '{{dy}}', dy ).replace( '{{x}}', SVGJS.argsParser( args, 'x' ) ),
          afterEl   = ( ! after ) ? `</tspan>` : after;
      return ( line != '' ) ? beforeEl + line + afterEl : '';
    });
    return tspanElements.join('');
  },
  wrapTextLength: ( text ) => {
    return ( text.match(/<\/tspan>/g) || []).length;
  },
  getDate: ( date, format ) => {
    // var dateObj = moment( date );
    // var formattedDate = dateObj.format( format );
    // return formattedDate;
    var dateObj = new Date( date );
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var year = dateObj.getFullYear();
    var formattedDate = `${month}, ${year}`;
    return formattedDate;

  },
  objectLength: ( obj ) =>  {
    return ( ! Array.isArray( obj ) ) ? Object.keys( obj ).length : obj.length;
  },
  parseArgs: (args, defaults) => {
    // Parse the arguments string into an object
    const parsedArgs = typeof args === 'object' ? args : {};
    // Merge the parsed arguments with the default values
    return Object.assign( {}, defaults, parsedArgs );
  },
  argsParser( args, of ) {
    var returned = 0;
    if( args.x && args.xsum && args.xfrom ) {
      switch( args.x ) {
        case 'left':
          returned = ( args.xfrom + ( args.line.length * args.xsum ) );
          break;
        case 'middle':
          returned = args.xfrom;
          break;
        case 'right':
          returned = ( args.xfrom - ( args.line.length * args.xsum ) );
          break;
        default:
          returned = 0;
          break;
      }
    }
    return returned;
  }
}
export default SVGJS;


