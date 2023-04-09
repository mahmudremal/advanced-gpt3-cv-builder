/**
 * Frontend Script.
 * 
 * @package AdvancedGPT3CVbuilder
 */
 import Backbone from 'backbone';
 import _ from 'underscore';
 import jsPDF from 'jspdf';
 import html2canvas from 'html2canvas';
 import flatpickr from "flatpickr";
 import Swal from "sweetalert2"; // "success", "error", "warning", "info" or "question"

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
			window.CVTemplate = CVTemplate;
			this.cvCanvas = false;

			this.init_functions();this.addanother_field();
			this.profileImgUpload();this.profileImgRemove();
			this.event_hooks();this.generate_submission();
			this.flat_picker();
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
		}
		update_templates() {
			this.templateView.template = _.template(`
				<div id="template">
					<h1><%= title %></h1>
					<p><%= description %></p>
					<img src="<%= imageUrl %>" />
				</div>
			`);
			this.templateView.render();
			// generate a PDF from the updated template
			this.templateView.generatePDF();
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
			document.querySelectorAll( '#add-edu, #add-exp, #add-skl, #add-scl, #add-hby, #add-inrts' ).forEach( ( el, ei ) => {
					el.dataset.template = ei;
					temp = tempEl = el.previousElementSibling.querySelector( '.the_template' );
					if( temp ) {
						temp = temp.cloneNode(true);tempEl.remove();
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
		
		
		generate_template( cvData ) {
			const thisClass = this;thisClass.imgData = false;
			// create a template using underscore
			var template = _.template( CVTemplate.template2 );
			// render the template with the data
			var cvHtml = template( cvData );
			// var cvHtml = CVTemplate_1;
			var cvCanvas = document.createElement( 'div' );
			var fixed = document.querySelector( '.cv-prev' );
			cvCanvas = document.querySelector( '.cv-prev .blog_thumbnail' );
			// cvCanvas.style.height = '1150px';cvCanvas.style.width = '800px';
			cvCanvas.innerHTML = cvHtml;fixed.classList.add( 'is-fixed' );
			cvCanvas.querySelectorAll( 'p, h1, h2, h3, h4, h5, h6, li, a' ).forEach( ( el, ei ) => {
				el.setAttribute( 'contenteditable', true );
				// el.addEventListener( 'click', ( e ) => {} );
			} );
			thisClass.cvCanvas = cvCanvas;
			// create a canvas from the html using html2canvas
			// , { width: 800, height: 1150 }
			// 
		}
		event_hooks() {
			const thisClass = this;
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
					if( thisClass.imgData === false ) {return;}
					// download the image as PNG
					var a = document.createElement( 'a' );
					a.href = thisClass.imgData;a.download = 'cv.png';a.click();
				} );
			} );
		}
		generate_cv( json = false ) {
			const thisClass = this;
			var cvData = {
				"cv": {
						"info": {
								"given_name": "Remal",
								"family_name": "Mahmud",
								"address": "High School Road, Rokenpur, Sadar, Lakshmipur",
								"phone": "+8801814118328",
								"email": "mahmudremal@yahoo.com",
								"post_code": "3706",
								"city_name": "Dhaka",
								"bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolores sequi totam consectetur reiciendis ullam praesentium quaerat sapiente commodi sunt ex quam recusandae facilis ipsum tenetur culpa, eum distinctio impedit maxime repellat itaque fuga consequatur?"
						},
						"edu": {
								"0": {
										"field": "Computer Science",
										"degree": "Degree",
										"school": "Al Bayat University",
										"starts": "2023-12",
										"ends": "2024-11"
								},
								"1": {
										"field": "Software University",
										"degree": "Masters",
										"school": "Al Bayat University",
										"starts": "2025-11",
										"ends": "2027-12"
								}
						},
						"exp": {
								"0": {
										"title": "UI/UX developer",
										"company": "ITech",
										"starts": "2022-02",
										"ends": "2025-06",
										"desc": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem aut sapiente quae beatae iusto explicabo, rem sequi officia cumque animi reprehenderit delectus, quaerat alias numquam ab saepe cupiditate natus ipsam dicta ullam optio omnis corporis aliquid eum? Ipsa eius vero maiores non nulla ducimus, debitis esse assumenda sequi illum enim!\n"
								},
								"1": {
										"title": "WordPress Developer",
										"company": "FutureWordpress",
										"starts": "2023-02",
										"ends": "2027-01",
										"desc": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic quo nisi provident laboriosam atque optio ea! Minus velit enim nesciunt?\n"
								}
						},
						"skl": {
								"0": {
										"title": "Plugin Developer",
										"level": "Expert"
								},
								"1": {
										"title": "Extension Developer",
										"level": "Expert"
								},
								"2": {
										"title": "WordPress Developer",
										"level": "Good"
								}
						}
				}
			};
			json = ( ! json ) ? cvData : json;
			this.generate_template( json );
		}
		generate_canvas() {
			const thisClass = this;
			html2canvas( thisClass.cvCanvas, { width: cvCanvas.offsetWidth, height: cvCanvas.offsetHeight } ).then(function(canvas) {
				// console.log( canvas );
				// cvCanvas.innerHTML = '';
				thisClass.cvCanvas.appendChild( canvas );
				// fixed.classList.remove( 'is-fixed' );
				// convert the canvas to an image data URL
				thisClass.imgData = canvas.toDataURL( 'image/png' );
				// console.log( thisClass.imgData );
				// display the image in the preview element
				var img = document.querySelector('.cv-prev .blog_thumbnail img');
				if( img ) {img.remove();}
			});
		}
		generate_submission() {
			const thisClass = this;var formData, json, form = document.querySelector( '#cvbuilder[name="cvbuilder"]' );
			if( form && typeof form !== 'undefined' ) {
				form.addEventListener( 'submit', ( event ) => {
					event.preventDefault();
					formData = new FormData(form);
					// json = JSON.stringify(Object.fromEntries(formData));
					json = Object.fromEntries(formData)
					json = this.transformObjectKeys( json );
					var preview = document.querySelector( '.profile-image-upload-preview' );
					if( preview ) {json.cv.info.avater = preview.src;}
					console.log( json );

					thisClass.generate_cv( json );
				} );
			}
		}
	}
	new FutureWordPress_Frontend();
} )( jQuery );


