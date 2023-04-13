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
 import Pickr from '@simonwep/pickr';
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
			this.cvCanvas = false;this.cv = {};this.svg = SVGJS;
			this.form = document.querySelector( '#cvbuilder[name="cvbuilder"]' );

			this.init_functions();this.addanother_field();
			this.profileImgUpload();this.profileImgRemove();
			this.generate_submission();this.flat_picker();
			this.generate_cv( this.generate_formdata() );
			this.toolbar_setup();
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
					// console.log( json );
					message = ( typeof json.data.message === 'string' ) ? json.data.message : json.data;
					if( json.success ) {
						thisClass.toast.fire({icon: 'success',title: message})
					} else {
						thisClass.toast.fire({icon: 'error',title: message})
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
			flatpickr( '.the-flat-picker' );
			var link = document.createElement( 'link' );link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/monolith.min.css';
			document.head.appendChild( link );
			const pickr = Pickr.create({
				el: '.the-color-picker',
				theme: 'monolith', // or 'classic', or 'monolith', or 'nano'
				swatches: [],
				showAlways: true,
			
				components: {
					// Main components
					preview: false,
					opacity: true,
					hue: false,
			
					// Input / output Options
					interaction: {
						hex: true,
						rgba: false,
						hsla: false,
						hsva: false,
						cmyk: false,
						input: true,
						clear: false,
						save: false,
					},
				},
			});
			pickr.on( 'changestop', ( color, instance ) => {
				console.log( 'Event: "swatchselect"', color.toHEXA().toString() );
			});
			var picker = document.querySelector( '.pcr-app' );
			if( picker ) {picker.style.display = 'none';}
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
			document.querySelectorAll( '#add-edu, #add-exp, #add-skl, #add-scl, #add-hby, #add-inrts, #add-lngs, #add-scl, #add-hby' ).forEach( ( el, ei ) => {
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
			if( typeof CVTemplate.choosen_template === 'undefined' ) {CVTemplate.choosen_template = CVTemplate.template4;}
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
			cvHtml = '<div class="click-drop"></div>' + cvHtml;
			thisClass.fixed = document.querySelector( '.cvbuilderscreen' );
			var cvCanvas = document.querySelector( '.editescreen__card' );
			// cvCanvas.style.height = '1150px';cvCanvas.style.width = '800px';
			cvCanvas.innerHTML = cvHtml;thisClass.fixed.classList.add( 'is-fixed' );
			// cvCanvas.querySelectorAll( 'p, h1, h2, h3, h4, h5, h6, li, a, img' ).forEach( ( el, ei ) => {
			// 	el.setAttribute( 'contenteditable', true );
			// 	// el.addEventListener( 'click', ( e ) => {} );
			// } );
			// cvCanvas.querySelectorAll( '.click-drop' ).forEach( ( el, ei ) => {
			// 	el.addEventListener( 'click', ( e ) => {
			// 		el.parentElement.innerHTML = '';
			// 		el.parentElement.classList.remove( 'is-fixed', 'is-editable' );
			// 	} );
			// } );
			thisClass.cvCanvas = cvCanvas;
			// create a canvas from the html using html2canvas
			// , { width: 800, height: 1150 }
			// 
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
		update_fields() {
			// FIELDS will be updated according to template field property
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
							formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/update/cv' );
							formdata.append( 'cv_id', thisClass.form.dataset.cv );
							formdata.append( '_data', JSON.stringify( json ) );
							formdata.append( '_nonce', thisClass.ajaxNonce );
							thisClass.sendToServer( formdata );
				} );
			}
		}

		toolbar_setup() {
			const thisClass = this;var templates, button, card, imgwrap, img, subtitle, json, spacer, div;
			templates = document.querySelector( '.choose-templates' );
			json = {
				templates: [
					{
						type: 'chrono',
						img:  'https://www.jobseeker.com/api/documents/template-preview/resume/en/6b4e13bd-4f63-452b-98b9-36f8ab6a0bff',
						title: 'Chrono',
						fields: ['given_name', 'family_name', 'address', 'etc...' ]
					}
				],
				fonts: [
					{
						title: 'Times New Roman',
						font: 'Times New Roman',
						weights: []
					}
				],
				fontsizes: [
					{
						title: 'XL',
						size:  '15px'
					}
				],
				lineheights: [
					{
						title: '-0.5',
						height:  '10px'
					},
					{
						title: '-0.75',
						height:  '15px'
					},
					{
						title: '1',
						height:  '20px'
					},
					{
						title: '0.5',
						height:  '25px'
					},
					{
						title: '0.75',
						height:  '30px'
					},
					{
						title: '2',
						height:  '40px'
					}
				]
			};
			if( templates ) {
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
				subtitle = document.createElement( 'div' );subtitle.classList.add( 'dropupmenu__menutitle' );subtitle.innerHTML = 'Font';templates.innerHTML = '';templates.appendChild( subtitle );
				json.fonts.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'dropupmenu__single' );
					button.dataset.font = e.font;button.dataset.type = 'fontFamily';
					spacer = document.createElement( 'span' );spacer.classList.add( 'dropupmenu__leftspacer' );
					div = document.createElement( 'div' );div.classList.add( 'dropupmenu__font' );div.innerHTML = e.title;
					button.appendChild( spacer );button.appendChild( div );templates.appendChild( button );
				} );
			}
			templates = document.querySelector( '#font-size + .dropupmenu .dropupmenu__menubody' );
			if( templates ) {
				subtitle = document.createElement( 'div' );subtitle.classList.add( 'dropupmenu__menutitle' );subtitle.innerHTML = 'Font';templates.innerHTML = '';templates.appendChild( subtitle );
				json.fontsizes.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'dropupmenu__single' );
					button.dataset.font = e.size;button.dataset.type = 'fontFamily';
					spacer = document.createElement( 'span' );spacer.classList.add( 'dropupmenu__leftspacer' );
					div = document.createElement( 'div' );div.classList.add( 'dropupmenu__font' );div.innerHTML = e.title;
					button.appendChild( spacer );button.appendChild( div );templates.appendChild( button );
				} );
			}
			templates = document.querySelector( '#line-height + .dropupmenu .dropupmenu__menubody' );
			if( templates ) {
				subtitle = document.createElement( 'div' );subtitle.classList.add( 'dropupmenu__menutitle' );subtitle.innerHTML = 'Font';templates.innerHTML = '';templates.appendChild( subtitle );
				json.lineheights.forEach( ( e, i ) => {
					button = document.createElement( 'button' );button.classList.add( 'dropupmenu__single' );
					button.dataset.font = e.height;button.dataset.type = 'fontFamily';
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
					thisClass.update_fields();thisClass.update_cv();
				} );
			} );
			document.querySelector( '#color-select' ).addEventListener( 'click', ( event ) => {
					var picker = document.querySelector( '.pcr-app' );
					if( picker ) {
						picker.style.display = ( picker.style.display == 'none' ) ? 'block' : 'none';
					}
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
	}
	new FutureWordPress_Frontend();
} )( jQuery );


