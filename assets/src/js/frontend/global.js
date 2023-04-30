/**
 * Frontend Script.
 * 
 * @package AdvancedGPT3CVbuilder
 */
 import Swal from "sweetalert2";
( function ( $ ) {
	class FutureWordPress_Public {
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
			window.FutureWordPress_Public = this;window.Swal = Swal;
			this.lastJson = {};this.init_functions();this.toolbar_events();this.generate_css();
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
			})
			document.body.addEventListener( 'cv-crearted-success-do-redirect', ( event ) => {
				if( typeof thisClass.lastJson.edit !== 'undefined' ) {
					location.href = thisClass.lastJson.edit;
					if( thisClass.createCVButton ) {
						thisClass.createCVButton.removeAttribute( 'disabled' );
						thisClass.createCVButton.removeAttribute( 'style' );
					}
				}
			} );
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
		toolbar_events() {
			const thisClass = this;var button, buttons, theInterval;
			theInterval = setInterval(() => {
				buttons = document.querySelectorAll( '.create-new-cv:not([data-handled])' );
				buttons.forEach( ( el, ei ) => {
					el.dataset.handled = true;
					button = el.querySelector( '.elementor-button' );
					el = ( button ) ? button : el;
					el.addEventListener( 'click', ( e ) => {
						e.preventDefault();
						if( true ) {
							Swal.fire({
								title: thisClass.i18n?.resume_title??'Give here a resume title',
								input: 'text',
								inputAttributes: {
									autocapitalize: 'off'
								},
								showCancelButton: true,
								confirmButtonText: thisClass.i18n?.create_cv??'Create Resume',
								showLoaderOnConfirm: false,
								preConfirm: ( title ) => {
									thisClass.resumeTitle = title;
								},
								allowOutsideClick: () => !Swal.isLoading()
							}).then((result) => {
								if (result.isConfirmed) {
									thisClass.generate_submission( el );
								}
							})
						} else {
							thisClass.generate_submission( el );
						}
					} );
				} );
			}, 1500 );
		}
		get_loader() {
			return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPg0KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMTViNjQiIHN0cm9rZS13aWR0aD0iMTAiIHI9IjM1IiBzdHJva2UtZGFzaGFycmF5PSIxNjQuOTMzNjE0MzEzNDY0MTUgNTYuOTc3ODcxNDM3ODIxMzgiPg0KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSI+PC9hbmltYXRlVHJhbnNmb3JtPg0KICA8L2NpcmNsZT4NCjwvc3ZnPg==";
		}
		generate_css() {
			var style = document.createElement( 'style' );style.type = 'text/css';
			style.innerHTML = '.swal2-input {margin: auto;margin-top: 30px;width: auto;max-width: 90%;}';
			document.head.appendChild( style );
		}
		generate_submission( el ) {
			const thisClass = this;var button, buttons, theInterval;
			if( ! el.classList.contains( 'no-progress-here' ) ) {
				el.style.paddingLeft = '15%';el.style.backgroundSize = '14%';el.style.backgroundRepeat = 'no-repeat';el.style.backgroundPosition = '5% center';el.style.backgroundImage = 'url("' + thisClass.get_loader() + '")';
			}
			el.setAttribute( 'disabled', true );thisClass.createCVButton = el;
			var formdata = new FormData();
			formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/cv/create' );
			formdata.append( '_nonce', thisClass.ajaxNonce );
			formdata.append( '_nomsg', 'true' );
			formdata.append( 'title', thisClass?.resumeTitle??'My Resume' );

			thisClass.sendToServer( formdata );
		}
	}
	new FutureWordPress_Public();
} )( jQuery );


