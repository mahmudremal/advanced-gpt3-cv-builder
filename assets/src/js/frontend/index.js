/**
 * Frontend Script.
 * 
 * @package AdvancedGPT3CVbuilder
 */
 import Backbone from 'backbone';
 import _, { template } from 'underscore';
 import jsPDF from 'jspdf';
 import html2canvas from 'html2canvas';
 import flatpickr from "flatpickr";
 import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
 import Swal from "sweetalert2"; // "success", "error", "warning", "info" or "question"
 import ColorPicker from 'simple-color-picker';
 import SVGJS from './svg';
 import CVTemplate from './templates';
 import { SVG } from '@svgdotjs/svg.js'
//  import { Canvg } from 'canvg';
 
( function ( $ ) {
	class FutureWordPress_Frontend {
		/**
		 * Constructor
		 */
		constructor() {
			this.ajaxUrl = fwpSiteConfig?.ajaxUrl ?? '';
			this.ajaxNonce = fwpSiteConfig?.ajax_nonce ?? '';
			this.lastAjax	 = false;this.profile	 = fwpSiteConfig?.profile ?? false;
			var i18n = fwpSiteConfig?.i18n ?? {};this.noToast	 = true;
			this.i18n = {
				hi					: 'Hi!',
				rusure			: 'Are you sure?',
				...i18n
			}
			this.setup_hooks();
		}
		setup_hooks() {
			window.FutureWordPress_Frontend = this;window._ = _;
			window.Backbone = Backbone;window.jsPDF = jsPDF;
			window.html2canvas = html2canvas;window.Swal = Swal;
			window.flatpickr = flatpickr;window.monthSelectPlugin = monthSelectPlugin;
			window.CVTemplate = CVTemplate;window.SVGJS = SVGJS;
			window.ColorPicker = ColorPicker;window.SVG = SVG;
			this.cvCanvas = false;this.svg = SVGJS;
			this.form = document.querySelector( '#cvbuilder[name="cvbuilder"]' );
			this.cv = {basiColor: "#f1ecda",fontSize: "1",fontFamily: "'Roboto Slab', serif",lineHeight: "1",cvTemplate: "chrono"};

			this.init_functions();this.addanother_field();
			this.profileImgUpload();this.profileImgRemove();
			this.flat_picker();this.bulk_remover();
			this.generate_submission();this.toolbar_init();
			// this.generate_cv( this.generate_formdata() );
		}
		init_functions() {
			const thisClass = this;
			this.toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3500,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener( 'mouseenter', Swal.stopTimer )
					toast.addEventListener( 'mouseleave', Swal.resumeTimer )
				}
			});
			document.addEventListener('keydown', function(event) {
				if (event.ctrlKey && (event.key === '/' || event.key === '?') ) {
					event.preventDefault();
					navigator.clipboard.readText()
						.then(text => {
							CVTemplate.choosen_template = text.replace( '`', '' );
							console.log( 'Clipboard template updated' );
							thisClass.update_cv();
						})
						.catch(err => {
							console.error('Failed to read clipboard contents: ', err);
						});
				}
			});
		}
		sendToServer( data ) {
			const thisClass = this;var message;
			$.ajax({
				url: thisClass.ajaxUrl,
				type: "POST",
				data: data,    
				cache: false,
				contentType: false,
				processData: false,
				success: function( json ) {
					thisClass.lastJson = json.data;
					message = ( typeof json.data.message === 'string' ) ? json.data.message : (
						( typeof json.data === 'string' ) ? json.data : false
					);
					if( message ) {
						thisClass.toast.fire({icon: ( json.success ) ? 'success' : 'error', title: message})
					}
					if( json.data.hooks ) {
						json.data.hooks.forEach( ( hook ) => {
							document.body.dispatchEvent( new Event( hook ) );
						} );
					}
				},
				error: function( err ) {
					thisClass.toast.fire({icon: 'warning',title: err.responseText})
					console.log( err.responseText );
				}
			});
		}
		flat_picker() {
			const thisClass = this;var link, inputs, config, theInterval;
			link = document.createElement( 'link' );link.rel = 'stylesheet';link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';document.body.appendChild( link );
			link = document.createElement( 'link' );link.rel = 'stylesheet';link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/plugins/monthSelect/style.css';document.body.appendChild( link );
			setTimeout(() => {
				theInterval = setInterval(() => {
					inputs = document.querySelectorAll( '.the-flat-picker:not([data-handled])' );
					inputs.forEach( ( el, ei ) => {
						el.dataset.handled = true;
						config = JSON.parse( el.dataset?.config??'{}' );
						if( typeof el.dataset.onlyfor !== 'undefined' ) {
							config.plugins = [new window.monthSelectPlugin()];
						}
						// flatpickr( el, {
						// 	plugins: [new monthSelectPlugin()],
						// 	dateFormat: "F Y",
						// });
						flatpickr( el, config );
					} );
				}, 100 );
			}, 1000 );
		}
		color_picker() {
			const thisClass = this;
			thisClass.colorPicker = new ColorPicker({
				color: thisClass.cv?.basiColor??'#FF0000',
				// background: '#454545',
				el: document.querySelector( '.the-color-picker' ),
				// width: 200,
				// height: 200,
				// window: document.getElementsByTagName('iframe')[0].contentWindow
			});
			// thisClass.colorPicker.on( 'update', ( color ) => {} );
			thisClass.colorPicker.onChange( ( color ) => {
        // document.body.style.background = t, document.querySelector("h1 a").style.color = c.isDark() ? "#FFFFFF" : "#000000"
				thisClass.cv.basiColor = color;
				document.querySelectorAll( '.cvbuilderscreen .editescreen__card svg [data-basic-color]' ).forEach( ( el ) => {
					el.style.fill = color;
				} );
    	} );
			// 
		}
		profileImgUpload() {
			const thisClass = this;var theInterval, reader, file, preview;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.profile-image-upload:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					el.addEventListener( 'change', ( event ) => {
						if( el.dataset.preview ) {
							preview = document.querySelector( el.dataset.preview );
							file = el.files[0];
							reader = new FileReader();
							reader.onloadend = function () {
								preview.src = reader.result;
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/filesystem/uploadavater' );
								formdata.append( 'cv_id', el.dataset.cv );
								formdata.append( 'avater', el.files[0] );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
								thisClass.update_cv();
							}
							if (file) {
								reader.readAsDataURL(file);
							} else {
								if( preview.dataset.default ) {
									preview.src = preview.dataset.default;
								} else {
									preview.src = "";
								}
							}
						}
					} );
				} );
			// }, 3000 );
			theInterval = setInterval( () => {
				document.querySelectorAll( '.profile-image-upload-preview:not([data-handled])' ).forEach( async ( el, ei ) => {
					el.dataset.handled = true;
					if( ! el.src.startsWith( 'data:image' ) ) {
						thisClass.svg.urlToDataImage( el.src ).then(dataUrl => {
							if( typeof dataUrl !== 'undefined' ) {
								el.src = dataUrl;
								thisClass.update_cv();
							}
						}).catch(error => {
							console.log( 'SVG imager', error );
						});
					}
				} );
			}, 3000 );
		}
		profileImgRemove() {
			const thisClass = this;
			document.querySelectorAll( '.removeuploadedimage' ).forEach( ( el, eli ) => {
				el.addEventListener( 'click', ( e ) => {var is_done = false;
					Swal.fire({
						title: thisClass.i18n.rusure,
						showCancelButton: true
					}).then( ( result ) => {
						if( result.isConfirmed ) {
							document.querySelectorAll( el.dataset.preview ).forEach( ( prev, previ ) => {prev.src = prev.dataset.default;is_done = true;} );
							if( is_done ) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/filesystem/removeavater' );
								formdata.append( 'cv_id', el.dataset.cv );
								formdata.append( 'avater', '' );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
								thisClass.update_cv();
							}
						}
					} );
				} );
			} );
		}
		addanother_field() {
			const thisClass = this;thisClass.templates = {};var temp, template, tempEl;
			// '#add-edu, #add-exp, #add-skl, #add-scl, #add-hby, #add-inrts, #add-lngs, #add-scl, #add-hby, #add-ref'
			document.querySelectorAll( '#cvbuilder .form-group[data-field] .add-blk' ).forEach( ( el, ei ) => {
					el.dataset.template = ei;
					tempEl = el.previousElementSibling.querySelector( '.the_template' );
					if( tempEl ) {
						temp = tempEl.cloneNode(true);tempEl.remove();
						temp.classList.remove( 'd-none', 'the_template' );
						thisClass.templates[el.dataset.type] = template = temp;
						el.addEventListener( 'click', ( e ) => {
							template = thisClass.templates[el.dataset.type].cloneNode(true);
							template.querySelectorAll( '[name]' ).forEach( ( ie, ii ) => {
								var num = document.querySelectorAll( el.dataset.target + ' > div' ).length;
								ie.name = ie.name.replace( 'spclOrdrSrt', num );
							} );
							document.querySelector( el.dataset.target ).appendChild( template );
						} );
					}
			} );
		}
		bulk_remover() {
			const thisClass = this;var buttons, theInterval;
			theInterval = setInterval(() => {
				buttons = document.querySelectorAll( '.bulk-remover:not([data-handled])' );
				buttons.forEach( ( el, ei ) => {
					el.dataset.handled = true;
					el.addEventListener( 'click', ( e ) => {
						el.parentElement.remove();thisClass.update_cv();
					} );
				} );
			}, 100 );
		}
		transformObjectKeys(obj) {
			const transformedObj = {};
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					const newKey = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
					const value = obj[key];
					if (typeof value === 'object') {
						transformedObj[newKey] = this.transformObjectKeys(value);
					} else {
						const keys = newKey.split('.');
						let currentObj = transformedObj;
						for (let i = 0; i < keys.length - 1; i++) {
							const currentKey = keys[i];
							if (!currentObj[currentKey]) {
								currentObj[currentKey] = {};
							}
							currentObj = currentObj[currentKey];
						}
						currentObj[keys[keys.length - 1]] = value;
					}
				}
			}
			return transformedObj;
		}
		
		
		get_template() {
			if( typeof CVTemplate.choosen_template === 'undefined' ) {
				CVTemplate.choosen_template = CVTemplate.template3;
			}
			return CVTemplate.choosen_template;
		}
		generate_template( cvData ) {
			const thisClass = this;thisClass.imgData = false;
			// create a template using underscore
			var template = _.template( thisClass.get_template() );
			cvData.i18n = thisClass.i18n;
			cvData.svg = thisClass.svg;
			// render the template with the data
			var cvHtml = template( cvData );
			// var cvHtml = CVTemplate_1;
			thisClass.fixed = document.querySelector( '.cvbuilderscreen' );
			var cvCanvas = document.querySelector( '.editescreen__card' );
			// cvCanvas.style.height = '1150px';cvCanvas.style.width = '800px';
			cvCanvas.innerHTML = cvHtml;thisClass.fixed.classList.add( 'is-fixed' );
			thisClass.cvCanvas = cvCanvas;
			thisClass.update_fonts();
		}
		generate_cv( json = false ) {
			const thisClass = this;
			var cvData = {};
			json = ( ! json ) ? cvData : json;
			this.generate_template( json );
		}
		generate_canvas( args = {} ) {
			const thisClass = this;
			thisClass.fixed.classList.remove( 'is-editable' );
			// thisClass.cvCanvas.innerHTML = SVGJS.preloader();
			args = {
				width: thisClass.cvCanvas.offsetWidth,
				height: thisClass.cvCanvas.offsetHeight,
				// allowTaint: true, // Allow cross-origin images to be captured
				// useCORS: true, // Use CORS to handle cross-origin images
				oninit: function() {
					// console.log("Screenshot capture initialized");
					// thisClass.preloader_init();
				},
				onrendered: (canvas) => {
					// console.log("Screenshot rendered", canvas);
					// currentStep++;
					// updateProgress(currentStep, totalSteps);
					// var dataUrl = canvas.toDataURL();
					// resolve(dataUrl);
				},
				onsuccess: function(canvas) {
					// console.log("Screenshot capture successful");
				},
				onerror: function(error) {
					// console.error("Screenshot capture failed:", error);
					// reject(error);
				},
				onprogress: (progress) => {
					// console.log( "Progress:", progress );
					// thisClass.preloader_uninit();
				},
				...args
			};
			// console.log( args );
			return new Promise(function(resolve, reject) {
				html2canvas( thisClass.cvCanvas, args ).then(function(canvas) {
					// console.log( canvas );
					// convert the canvas to an image data URL
					thisClass.imgData = canvas.toDataURL( 'image/png' );
					// thisClass.cvCanvas.innerHTML = '';
					// thisClass.cvCanvas.appendChild( canvas );
					// fixed.classList.remove( 'is-fixed' );
					// var image = new Image();
					// image.onload = function() {
					// 	// Draw the image onto the canvas
					// 	var ctx = thisClass.cvCanvas.querySelector( 'canvas' ).getContext('2d');
					// 	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
					// };
					// image.src = thisClass.imgData;
					thisClass.fixed.classList.add( 'is-editable' );
					resolve( thisClass.imgData );
				}).catch(function(error) {
					console.error( "Error:", error );
					reject( error );
				});
			});
		}
		update_cv() {
			this.generate_cv( this.generate_formdata() );
		}
		update_fonts() {
			const thisClass = this;
			if( typeof thisClass.cv.fontFamily !== 'undefined' ) {
				document.querySelectorAll( '.cvbuilderscreen .editescreen__card svg [style*=font-family]' ).forEach( ( el ) => {
					el.style.fontFamily = thisClass.cv.fontFamily;
				} );
				// thisClass.cv.fontFamily
				var fontFamily = thisClass.cvJson.fonts.find( fontFamily => fontFamily.font === thisClass.cv.fontFamily );
				if( fontFamily ) {
					var link = document.createElement( 'link' );link.id = 'cv-builder-fonts';link.rel = 'stylesheet';
						link.href = fontFamily?.url??'';
						var existing = document.querySelector( 'link#cv-builder-fonts' );
						if( existing ) {existing.href = link.href;}
						else {document.head.appendChild( link );}
				}
			}
			if( typeof thisClass.cv.fontSize !== 'undefined' ) {
				document.querySelectorAll( '.cvbuilderscreen .editescreen__card svg [style*=font-size]' ).forEach( ( el ) => {
					var currentFontSize = window.getComputedStyle( el ).getPropertyValue( 'font-size' );
					if( typeof el.dataset.fontSize === 'undefined' ) {el.dataset.fontSize = currentFontSize;}
					else {currentFontSize = el.dataset.fontSize;}
					var currentFontSizeNumeric = parseFloat( currentFontSize );
					var currentFontSizeUnit = currentFontSize.replace( currentFontSizeNumeric, '' );
					var newFontSize = ( currentFontSizeNumeric * thisClass.cv.fontSize ) + currentFontSizeUnit;
					if( newFontSize !== 'NaN' + currentFontSizeUnit ) {
						el.style.fontSize = newFontSize;
					}
				} );
			}
			if( typeof thisClass.cv.lineHeight !== 'undefined' ) {
				document.querySelectorAll( '.cvbuilderscreen .editescreen__card svg [dy]:not([dy="0"])' ).forEach( ( el ) => {
					var currentDY = el.getAttribute( 'dy' );
					if( typeof el.dataset.dy === 'undefined' ) {el.dataset.dy = currentDY;}
					else {currentDY = el.dataset.dy;}
					var currentDYNumeric = parseFloat( currentDY );
					var currentDYUnit = currentDY.replace( currentDYNumeric, '' );
					var newDY = ( currentDYNumeric * thisClass.cv.lineHeight ) + currentDYUnit;
					if( newDY !== NaN + currentDYUnit ) {
						el.setAttribute( 'dy', newDY );
					}
				} );
			}
		}
		generate_formdata() {
			const thisClass = this;var formdata, json;
			if( thisClass.form && typeof thisClass.form !== 'undefined' ) {
				formdata = new FormData( thisClass.form );
				// json = JSON.stringify( Object.fromEntries( formdata ) );
				json = Object.fromEntries( formdata );
				json = thisClass.transformObjectKeys( json );
				var preview = document.querySelector( '.profile-image-upload-preview' );
				if( preview ) {json.cv.info.avater = preview.src;}
				if( thisClass.cv ) {
					if( thisClass.cv.tools ) {delete thisClass.cv.tools;}
					json.cv.tools = thisClass.cv;
				}
				return json;
			} else {
				return {};
			}
		}
		generate_submission() {
			const thisClass = this;
			if( thisClass.form && typeof thisClass.form !== 'undefined' ) {
				thisClass.form.addEventListener( 'submit', ( event ) => {
					event.preventDefault();
					var json = thisClass.generate_formdata();
					thisClass.generate_cv( json );
					json.cv.info.avater = '';json.i18n = {};json.svg = {};
					var formdata = new FormData();
							formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/cv/update' );
							formdata.append( 'cv_id', thisClass.form.dataset.cv );
							formdata.append( '_data', JSON.stringify( json ) );
							formdata.append( '_nonce', thisClass.ajaxNonce );
							thisClass.sendToServer( formdata );
				} );
			}
		}

		toolbar_init() {
			const thisClass = this;var form = document.querySelector( 'form#cvbuilder[name="cvbuilder"]' );
			if( ! form ) {return;}
			document.body.addEventListener( 'cvTemplateUpdated', ( e ) => {thisClass.toolbar_setup();} );
			var formdata = new FormData();
				formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/cv/templates' );
				formdata.append( 'cv_id', form.dataset.cv );
				formdata.append( '_nonce', thisClass.ajaxNonce );
				thisClass.sendToServer( formdata );
		}
		toolbar_setup() {
			const thisClass = this;var templates, template, button, card, imgwrap, img, subtitle, json, spacer, div, tickSvg, lastJson;
			lastJson = thisClass.lastJson;
			thisClass.cvJson = json = SVGJS.parseArgs( lastJson.tools, {
				templates: [], fonts: [], fontsizes: [], lineheights: []
			} );
			thisClass.cv = lastJson.cv?.tools??{};
			if( typeof thisClass.cv === 'object' ) {
				thisClass.cv = {
					basiColor: thisClass.cv?.basiColor??'',
					cvTemplate: thisClass.cv?.cvTemplate??'',
					fontFamily: thisClass.cv?.fontFamily??'',
					fontSize: thisClass.cv?.fontSize??''
				};
				// delete thisClass.cv.tools;
			}
			template = thisClass.cvJson.templates.find( template => template.type === thisClass.cv.cvTemplate );
			if( typeof template === 'object' ) {
				CVTemplate.choosen_template = template.template;
			}
			// else {console.log( template );}
			
			tickSvg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 md:w-4 me-2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path></svg>';
			templates = document.querySelector( '.choose-templates' );
			if( templates ) {
				templates.innerHTML = '';
				json.templates.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'templates__single' );
					button.dataset.font = e.type;button.dataset.type = 'cvTemplate';
					if( e.type == thisClass.cv.cvTemplate ) {button.classList.add( 'is-active' );}
					card = document.createElement( 'div' );card.classList.add( 'templates__card' );
					imgwrap = document.createElement( 'div' );imgwrap.classList.add( 'templates__imgwrap' );
					img = document.createElement( 'img' );img.src = e.img;img.alt = '';
					subtitle = document.createElement( 'div' );subtitle.classList.add( 'templates__subtitle' );
					subtitle.innerHTML = e.title;subtitle.title = e.title;
					imgwrap.appendChild( img );card.appendChild( imgwrap );button.appendChild( card );
					button.appendChild( subtitle );templates.appendChild( button );
				} );
			}
			templates = document.querySelector( '#font-select + .dropupmenu .dropupmenu__menubody' );
			if( templates ) {
				subtitle = document.createElement( 'div' );subtitle.classList.add( 'dropupmenu__menutitle' );subtitle.innerHTML = 'Font Family';templates.innerHTML = '';templates.appendChild( subtitle );
				json.fonts.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'dropupmenu__single' );
					button.dataset.font = e.font;button.dataset.order = i;button.dataset.type = 'fontFamily';
					spacer = document.createElement( 'span' );spacer.classList.add( 'dropupmenu__leftspacer' );
					if( e.font == thisClass.cv.fontFamily ) {spacer.innerHTML = tickSvg;}
					div = document.createElement( 'div' );div.classList.add( 'dropupmenu__font' );div.innerHTML = e.title;
					button.appendChild( spacer );button.appendChild( div );templates.appendChild( button );
				} );
			}
			templates = document.querySelector( '#font-size + .dropupmenu .dropupmenu__menubody' );
			if( templates ) {
				subtitle = document.createElement( 'div' );subtitle.classList.add( 'dropupmenu__menutitle' );subtitle.innerHTML = 'Font Size';templates.innerHTML = '';templates.appendChild( subtitle );
				json.fontsizes.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'dropupmenu__single' );
					button.dataset.font = e.size;button.dataset.order = i;button.dataset.type = 'fontSize';
					spacer = document.createElement( 'span' );spacer.classList.add( 'dropupmenu__leftspacer' );
					if( e.size == thisClass.cv.fontSize ) {spacer.innerHTML = tickSvg;}
					div = document.createElement( 'div' );div.classList.add( 'dropupmenu__font' );div.innerHTML = e.title;
					button.appendChild( spacer );button.appendChild( div );templates.appendChild( button );
				} );
			}
			templates = document.querySelector( '#line-height + .dropupmenu .dropupmenu__menubody' );
			if( templates ) {
				subtitle = document.createElement( 'div' );subtitle.classList.add( 'dropupmenu__menutitle' );subtitle.innerHTML = 'Line height';templates.innerHTML = '';templates.appendChild( subtitle );
				json.lineheights.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'dropupmenu__single' );
					button.dataset.font = e.height;button.dataset.order = i;button.dataset.type = 'lineHeight';
					spacer = document.createElement( 'span' );spacer.classList.add( 'dropupmenu__leftspacer' );
					if( e.height == thisClass.cv.lineHeight ) {spacer.innerHTML = tickSvg;}
					div = document.createElement( 'div' );div.classList.add( 'dropupmenu__font' );div.innerHTML = e.title;
					button.appendChild( spacer );button.appendChild( div );templates.appendChild( button );
				} );
			}
			setTimeout(() => {
				thisClass.toolbar_events();thisClass.color_picker();
				thisClass.generate_cv( thisClass.generate_formdata() );
			}, 100 );
		}
		toolbar_events() {
			const thisClass = this;
			var fullscreen = document.querySelector( '#full-screen-previewer' );
			if( fullscreen ) {
				fullscreen.addEventListener( 'click', ( e ) => {
					if( ! document.fullscreenElement ) {
						document.documentElement.requestFullscreen();
					} else {
						if (document.exitFullscreen) {
							document.exitFullscreen(); 
						}
					}
				} );
			}
			document.addEventListener('fullscreenchange', (event) => {
				var fullscreen  = document.querySelector( '#full-screen-previewer' ),
				cvbuilderscreen = document.querySelector( '.cvbuilderscreen' );
				if( ! cvbuilderscreen || ! fullscreen ) {return;}
				var path = fullscreen.querySelector( 'button svg path' );
				if( document.fullscreenElement ) {
					// console.log('Entered fullscreen mode');
					fullscreen.classList.add( 'is-fullscreen' );
					cvbuilderscreen.classList.add( 'preview-only' );
					path.setAttribute( 'd', 'M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25' );
				} else {
					// console.log('Exited fullscreen mode');
					fullscreen.classList.remove( 'is-fullscreen' );
					cvbuilderscreen.classList.remove( 'preview-only' );
					path.setAttribute( 'd', 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15' );
				}
			});
			var dropups = document.querySelectorAll( '.toolbar__firstpicker .toolbar__selectemplate, .toolbar__middlesingle > button' ), target, svg;
			dropups.forEach( ( el, ei ) => {
				el.addEventListener( 'click', ( e ) => {
					if( typeof el.dataset.target === 'undefined' ) {
						target = el.parentElement;target.classList.add( 'except_it' );
						document.querySelectorAll( '.toolbar__middlesingle.is-visible:not(.except_it)' ).forEach( ( al, ai ) => {al.classList.remove( 'is-visible' );} );target.classList.remove( 'except_it' );
					} else {
						target = document.querySelector( el.dataset.target );
						el.classList.toggle( 'is-visible' );
					}
					if( target ) {
						target.classList.toggle( 'is-visible' );
						svg = el.querySelector( '.toolbar__dropicon path' );
						if( svg ) {
							svg.setAttribute( 'd', ( svg.getAttribute( 'd' ) == 'm4.5 15.75 7.5-7.5 7.5 7.5' ) ? 'm19.5 8.25-7.5 7.5-7.5-7.5' : 'm4.5 15.75 7.5-7.5 7.5 7.5'  );
						}
					}
				} );
			} );
			var dropmenus = document.querySelectorAll( '.dropupmenu__menubody > button' ), target, tick;
			tick = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 md:w-4 me-2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path></svg>';
			dropmenus.forEach( ( el, ei ) => {
				el.addEventListener( 'click', ( e ) => {
					var left = ( el.parentElement ) ? el.parentElement.querySelectorAll( '.dropupmenu__leftspacer svg' ) : [];left.forEach( ( lf, li ) => {lf.innerHTML = '';} );
					var left = el.querySelector( '.dropupmenu__leftspacer' );if( left ) {left.innerHTML = tick;}
					thisClass.cv[ el.dataset.type ] = el.dataset.font;
					if( el.dataset.type == 'fontFamily' ) {
						var link = document.createElement( 'link' );link.id = 'cv-builder-fonts';link.rel = 'stylesheet';
						link.href = thisClass.cvJson.fonts[ el.dataset.order ]?.url??'';
						var existing = document.querySelector( 'link#cv-builder-fonts' );
						if( existing ) {existing.href = link.href;}
						else {document.head.appendChild( link );}
					}
					thisClass.update_cv();
				} );
			} );
			var templates = document.querySelectorAll( '.choose-templates .templates__single' );
			templates.forEach( ( el, ei ) => {
				el.addEventListener( 'click', ( e ) => {
					var past = ( el.parentElement ) ? el.parentElement.querySelectorAll( '.is-active' ) : [];
					past.forEach( ( pl, pi ) => {pl.classList.remove( 'is-active' );} );el.classList.add( 'is-active' );
					thisClass.cv[ el.dataset.type ] = el.dataset.font;
					if( el.dataset.type == 'cvTemplate' ) {
						document.querySelectorAll( '#cvbuilder [data-field]' ).forEach( ( df, dfi ) => {
							df.style.display = 'none';
							var template = thisClass.cvJson.templates.find( template => template.type === el.dataset.font );
							if( typeof template !== 'undefined' ) {
								CVTemplate.choosen_template = template.template;
								template.fields.forEach( ( fld, fli ) => {
									var fields = document.querySelectorAll( '#cvbuilder [data-field="' + fld + '"]' );
									// console.log( 'field', fields );
									fields.forEach( ( fld, fldi ) => {fld.style.display = 'block';} );
								} );
							}
							// 
						} );
					}
					thisClass.update_cv();
					thisClass.toolbar_update();
				} );
			} );
			thisClass.loaderSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><defs><clipPath id="ldio-z7je3l964b-cp"><rect x="0" y="0" width="100" height="50"><animate attributeName="y" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" values="0;50;0;0;0" keyTimes="0;0.4;0.5;0.9;1" keySplines="0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"></animate><animate attributeName="height" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" values="50;0;0;50;50" keyTimes="0;0.4;0.5;0.9;1" keySplines="0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"></animate></rect><rect x="0" y="50" width="100" height="50"><animate attributeName="y" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" values="100;50;50;50;50" keyTimes="0;0.4;0.5;0.9;1" keySplines="0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"></animate><animate attributeName="height" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" values="0;50;50;0;0" keyTimes="0;0.4;0.5;0.9;1" keySplines="0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"></animate></rect></clipPath></defs><g transform="translate(50 50)"><g transform="scale(0.9)"><g transform="translate(-50 -50)"><g><animateTransform attributeName="transform" type="rotate" dur="2.2222222222222223s" repeatCount="indefinite" values="0 50 50;0 50 50;180 50 50;180 50 50;360 50 50" keyTimes="0;0.4;0.5;0.9;1"></animateTransform><path clip-path="url(#ldio-z7je3l964b-cp)" fill="#666666" d="M54.864 50L54.864 50c0-1.291 0.689-2.412 1.671-2.729c9.624-3.107 17.154-12.911 19.347-25.296 c0.681-3.844-1.698-7.475-4.791-7.475H28.908c-3.093 0-5.472 3.631-4.791 7.475c2.194 12.385 9.723 22.189 19.347 25.296 c0.982 0.317 1.671 1.438 1.671 2.729v0c0 1.291-0.689 2.412-1.671 2.729C33.84 55.836 26.311 65.64 24.117 78.025 c-0.681 3.844 1.698 7.475 4.791 7.475h42.184c3.093 0 5.472-3.631 4.791-7.475C73.689 65.64 66.16 55.836 56.536 52.729 C55.553 52.412 54.864 51.291 54.864 50z"></path><path fill="#353535" d="M81 81.5h-2.724l0.091-0.578c0.178-1.122 0.17-2.243-0.022-3.333C76.013 64.42 68.103 54.033 57.703 50.483l-0.339-0.116 v-0.715l0.339-0.135c10.399-3.552 18.31-13.938 20.642-27.107c0.192-1.089 0.2-2.211 0.022-3.333L78.276 18.5H81 c2.481 0 4.5-2.019 4.5-4.5S83.481 9.5 81 9.5H19c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5h2.724l-0.092 0.578 c-0.178 1.122-0.17 2.243 0.023 3.333c2.333 13.168 10.242 23.555 20.642 27.107l0.338 0.116v0.715l-0.338 0.135 c-10.4 3.551-18.31 13.938-20.642 27.106c-0.193 1.09-0.201 2.211-0.023 3.333l0.092 0.578H19c-2.481 0-4.5 2.019-4.5 4.5 s2.019 4.5 4.5 4.5h62c2.481 0 4.5-2.019 4.5-4.5S83.481 81.5 81 81.5z M73.14 81.191L73.012 81.5H26.988l-0.128-0.309 c-0.244-0.588-0.491-1.538-0.28-2.729c2.014-11.375 8.944-20.542 17.654-23.354c2.035-0.658 3.402-2.711 3.402-5.108 c0-2.398-1.368-4.451-3.403-5.108c-8.71-2.812-15.639-11.979-17.653-23.353c-0.211-1.191 0.036-2.143 0.281-2.731l0.128-0.308 h46.024l0.128 0.308c0.244 0.589 0.492 1.541 0.281 2.731c-2.015 11.375-8.944 20.541-17.654 23.353 c-2.035 0.658-3.402 2.71-3.402 5.108c0 2.397 1.368 4.45 3.403 5.108c8.71 2.812 15.64 11.979 17.653 23.354 C73.632 79.651 73.384 80.604 73.14 81.191z"></path></g></g></g></g></svg>';
			document.querySelectorAll( '.download-as-pdf' ).forEach( ( el, i ) => {
				el.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					if( thisClass.cvCanvas === false ) {return;}
					var left = el.querySelector( '.dropupmenu__leftspacer' );if( ! left ) {left = document.createElement( 'div' );}
					left.innerHTML = thisClass.loaderSvg;
					// console.log( 'triggering loader', left );
					setTimeout(() => {
						thisClass.generate_canvas( {
							scale: 2,
							allowTaint: true
						} ).then(function(dataUrl) {
							// console.log('Screenshot captured:', dataUrl);
							// create a pdf using jsPDF
							var doc = new jsPDF( {
								// orientation: 'portrait',
								// unit: 'pt',
								// format: [595, 842] // set A4 size
							} );
							var aspectRatio = ( thisClass.cvCanvas.offsetWidth / thisClass.cvCanvas.offsetHeight );
							var imgWidth		= doc.internal.pageSize.getWidth();
							var imgHeight		= ( imgWidth / aspectRatio );
							doc.addImage( thisClass.imgData, 'PNG', 0, 0, imgWidth, imgHeight );
							doc.save( 'cv.pdf' );left.innerHTML = '';
						}).catch(function(error) {
							console.error('Error capturing screenshot:', error);left.innerHTML = '';
							thisClass.toast.fire({icon: 'error', title: 'Error converting template' });
						});
					}, 100 );
				} );
			} );
			document.querySelectorAll( '.download-as-png' ).forEach( ( el, i ) => {
				el.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					if( thisClass.cvCanvas === false ) {return;}
					var left = el.querySelector( '.dropupmenu__leftspacer' );if( ! left ) {left = document.createElement( 'div' );}
					left.innerHTML = thisClass.loaderSvg;
					// console.log( 'triggering loader', left );
					setTimeout(() => {
						thisClass.generate_canvas( {
							scale: 2,
							allowTaint: true
						} ).then(function(dataUrl) {
							// console.log('Screenshot captured:', dataUrl);
							var a = document.createElement( 'a' );a.download = 'cv.png';
							a.href = thisClass.imgData;a.click();left.innerHTML = '';
						}).catch(function(error) {
							console.error('Error capturing screenshot:', error);left.innerHTML = '';
							thisClass.toast.fire({icon: 'error', title: 'Error converting template' });
						});
					}, 100 );
				} );
			} );
		}
		toolbar_update() {
			const thisClass = this;
			var json = thisClass.generate_formdata();
			json.cv.info.avater = '';json.i18n = {};json.svg = {};
			var formdata = new FormData();
					formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/cv/update' );
					formdata.append( 'cv_id', thisClass.form.dataset.cv );
					formdata.append( '_data', JSON.stringify( json ) );
					formdata.append( '_nonce', thisClass.ajaxNonce );
					formdata.append( '_nomsg', 'true' );
					thisClass.sendToServer( formdata );
		}

		preloader_init() {
			const thisClass = this;var div = document.createElement( 'div' );div.innerHTML = thisClass.svg.preloader();
			div.classList.add( 'editescreen__preload' );
			var svg = div.querySelector( 'svg' );
			if( svg ) {
				svg.style.background = 'none';svg.style.scale = 3;
			}
			thisClass.cvCanvas.parentElement.appendChild( div )
		}
		preloader_uninit() {
			document.querySelectorAll( '.editescreen__preload' ).forEach( (el, elI) => {el.remove();} );
		}
	}
	new FutureWordPress_Frontend();
} )( jQuery );


