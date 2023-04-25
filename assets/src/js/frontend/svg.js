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
  argsParser: ( args, of ) => {
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
  },
  preloader: () => {
    return '\
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\
      <circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" stroke-width="1">\
        <animate attributeName="r" repeatCount="indefinite" dur="5s" values="0;15" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>\
        <animate attributeName="opacity" repeatCount="indefinite" dur="5s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>\
      </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" stroke-width="1">\
        <animate attributeName="r" repeatCount="indefinite" dur="5s" values="0;15" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-2.5s"></animate>\
        <animate attributeName="opacity" repeatCount="indefinite" dur="5s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-2.5s"></animate>\
      </circle>\
    </svg>';
  },
  urlToDataImage: (imageUrl) => {
    if (imageUrl.startsWith('data:image')) {
      return imageUrl;
    }
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL();
        resolve(dataUrl);
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
  },
  imager: ( url ) => {
    SVGJS.urlToDataImage( url ).then(dataUrl => {
      return dataUrl
    }).catch(error => {
      console.log( 'SVG imager', error );
      return url;
    });
  }
}
export default SVGJS;


