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
 import Swal from "sweetalert2"; // "success", "error", "warning", "info" or "question"
 import ColorPicker from 'simple-color-picker';
 import SVGJS from './svg';
 import CVTemplate from './templates';

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
			window.FutureWordPress_Frontend = this;
			window.Backbone = Backbone;window.jsPDF = jsPDF;
			window.html2canvas = html2canvas;window.Swal = Swal;
			window.flatpickr = flatpickr;window._ = _;
			window.CVTemplate = CVTemplate;window.SVGJS = SVGJS;
			window.ColorPicker = ColorPicker;
			this.cvCanvas = false;this.svg = SVGJS;
			this.form = document.querySelector( '#cvbuilder[name="cvbuilder"]' );
			this.cv = {basiColor: "#a09aff",fontSize: "1",fontFamily: "'Roboto Slab', serif",lineHeight: "1",cvTemplate: "chrono"};

			this.init_functions();this.addanother_field();
			this.profileImgUpload();this.profileImgRemove();
			this.generate_submission();this.flat_picker();
			this.generate_cv( this.generate_formdata() );
			this.toolbar_init();
		}
		init_functions() {
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
			})
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
			const thisClass = this;
			flatpickr( '.the-flat-picker' );
			// var link = document.createElement( 'link' );link.rel = 'stylesheet';
			// link.href = 'https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/monolith.min.css';
			// document.head.appendChild( link );
			thisClass.colorPicker = new ColorPicker({
				color: '#FF0000',
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
			if( typeof CVTemplate.choosen_template === 'undefined' ) {CVTemplate.choosen_template = CVTemplate.template5;}
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
		generate_canvas() {
			const thisClass = this;
			thisClass.fixed.classList.remove( 'is-editable' );
			html2canvas( thisClass.cvCanvas, { width: thisClass.cvCanvas.offsetWidth, height: thisClass.cvCanvas.offsetHeight } ).then(function(canvas) {
				// console.log( canvas );
				// cvCanvas.innerHTML = '';
				thisClass.cvCanvas.appendChild( canvas );
				// fixed.classList.remove( 'is-fixed' );
				// convert the canvas to an image data URL
				thisClass.imgData = canvas.toDataURL( 'image/png' );
				// console.log( thisClass.imgData );
				// display the image in the preview element
				var img = document.querySelector('.editescreen__card svg');
				if( img ) {img.remove();}
				thisClass.fixed.classList.add( 'is-editable' );
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
			}
			if( typeof thisClass.cv.fontSize !== 'undefined' ) {
				document.querySelectorAll( '.cvbuilderscreen .editescreen__card svg [style*=font-size]' ).forEach( ( el ) => {
					var currentFontSize = window.getComputedStyle( el ).getPropertyValue( 'font-size' );
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
				if( thisClass.cv ) {json.cv.tools = thisClass.cv;}
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
			const thisClass = this;var templates, button, card, imgwrap, img, subtitle, json, spacer, div;
			thisClass.cvJson = json = SVGJS.parseArgs( thisClass.lastJson.cv, {
				templates: [
					{
						type: 'chrono',
						img:  'https://www.jobseeker.com/api/documents/template-preview/resume/en/6b4e13bd-4f63-452b-98b9-36f8ab6a0bff',
						title: 'Chrono',
						fields: ['given_name', 'family_name', 'address', 'etc...' ],
						template: ''
					}
				],
				fonts: [
					{title: 'Montserrat',font: "'Montserrat', sans-serif",weights: [],url: 'https://fonts.googleapis.com/css?family=Montserrat'},
					{title: 'Lora',font: "'Lora', serif",weights: [],url: 'https://fonts.googleapis.com/css?family=Lora'},
					{title: 'Open Sans',font: "'Open Sans', sans-serif",weights: [],url: 'https://fonts.googleapis.com/css?family=Open+Sans'},
					{title: 'Roboto Slab',font: "'Roboto Slab', serif",weights: [],url: 'https://fonts.googleapis.com/css?family=Roboto+Slab'},
					{title: 'EB Garamond',font: "'EB Garamond', serif",weights: [],url: 'https://fonts.googleapis.com/css?family=EB+Garamond'},
					{title: 'Great Vibes',font: "'Great Vibes', cursive",weights: [],url: 'https://fonts.googleapis.com/css?family=Great+Vibes'},
					{title: 'Raleway',font: "'Raleway', sans-serif",weights: ['bold'],url: 'https://fonts.googleapis.com/css?family=Raleway'},
				],
				fontsizes: [
					{title: 'XXL',size: 1.75},
					{title: 'XL',size: 1.5},
					{title: 'X',size: 1.25},
					{title: 'M',size: 1},
					{title: 'S',size: 0.75},
					{title: 'XS',size: 0.5},
					{title: 'XXS',size: 0.25},
				],
				lineheights: [
					{title: 1.8,height:  1.8},
					{title: 1.6,height:  1.6},
					{title: 1.4,height:  1.4},
					{title: 1.2,height:  1.2},
					{title: 1.0,height:  1.0},
					{title: 0.8,height:  0.8},
					{title: 0.6,height:  0.6},
					{title: 0.4,height:  0.4},
					{title: 0.2,height:  0.2},
				]
			} );
			templates = document.querySelector( '.choose-templates' );
			if( templates ) {
				templates.innerHTML = '';
				json.templates.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'templates__single' );
					button.dataset.font = e.type;button.dataset.type = 'cvTemplate';
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
					div = document.createElement( 'div' );div.classList.add( 'dropupmenu__font' );div.innerHTML = e.title;
					button.appendChild( spacer );button.appendChild( div );templates.appendChild( button );
				} );
			}
			setTimeout(() => {thisClass.toolbar_events();}, 100 );
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
					thisClass.cv[ el.dataset.type ] = el.dataset.font;thisClass.update_cv();
				} );
			} );
			var templates = document.querySelectorAll( '.choose-templates .templates__single' );
			templates.forEach( ( el, ei ) => {
				el.addEventListener( 'click', ( e ) => {
					var past = ( el.parentElement ) ? el.parentElement.querySelectorAll( '.is-active' ) : [];
					past.forEach( ( pl, pi ) => {pl.classList.remove( 'is-active' );} );el.classList.add( 'is-active' );
					thisClass.cv[ el.dataset.type ] = el.dataset.font;
					if( el.dataset.type == 'fontFamily' ) {
						var link = document.createElement( 'link' );link.id = 'cv-builder-fonts';link.rel = 'stylesheet';
						link.href = thisClass.cvJson.fonts[ el.dataset.order ]?.url??'';document.head.appendChild( link );
					}
					if( el.dataset.type == 'cvTemplate' ) {
						document.querySelectorAll( '#cvbuilder .form-group[data-field]' ).forEach( ( el, eli ) => {
							el.style.display = 'none';
							var template = thisClass.cvJson.templates.find( template => template.type === el.dataset.font );
							if( typeof template !== 'undefined' ) {
								CVTemplate.choosen_template = template.template;
								template.fields.forEach( ( fld, fli ) => {
									var field = document.querySelectorAll( '#cvbuilder .form-group[data-field="' + fld + '"]' );
									if( field ) {field.style.display = 'block';}
								} );
								console.log( template );
							}
						} );
					}
					thisClass.update_cv();
					thisClass.toolbar_update();
				} );
			} );
			document.querySelectorAll( '.download-as-pdf' ).forEach( ( e, i ) => {
				e.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					if( thisClass.cvCanvas === false ) {return;}
					thisClass.generate_canvas();
					// create a pdf using jsPDF
					var doc = new jsPDF();
					doc.addImage( thisClass.imgData, 'PNG', 10, 10, 180, 0 );
					doc.save( 'cv.pdf' );
				} );
			} );
			document.querySelectorAll( '.download-as-png' ).forEach( ( e, i ) => {
				e.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					if( thisClass.cvCanvas === false ) {return;}
					thisClass.generate_canvas();
					// download the image as PNG
					var a = document.createElement( 'a' );
					a.href = thisClass.imgData;a.download = 'cv.png';a.click();
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
	}
	new FutureWordPress_Frontend();
} )( jQuery );


