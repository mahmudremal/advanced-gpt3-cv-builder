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
			this.lastJson = {};this.init_functions();this.toolbar_events();
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
			const thisClass = this;var buttons, theInterval;
			theInterval = setInterval(() => {
				buttons = document.querySelectorAll( '.create-new-cv:not([data-handled])' );
				buttons.forEach( ( el, ei ) => {
					el.dataset.handled = true;
					el.addEventListener( 'click', ( e ) => {
						e.preventDefault();
						el.style.paddingLeft = '50px';el.style.backgroundSize = '20%';el.style.backgroundRepeat = 'no-repeat';el.style.backgroundPosition = '10% center';el.style.backgroundImage = 'url("' + thisClass.get_loader() + '")';
						el.setAttribute( 'disabled', true );thisClass.createCVButton = el;
						var formdata = new FormData();
						formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/cv/create' );
						formdata.append( '_nonce', thisClass.ajaxNonce );
						formdata.append( '_nomsg', 'true' );
						thisClass.sendToServer( formdata );
					} );
				} );
			}, 1500 );
		}
		get_loader() {
			return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPg0KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMTViNjQiIHN0cm9rZS13aWR0aD0iMTAiIHI9IjM1IiBzdHJva2UtZGFzaGFycmF5PSIxNjQuOTMzNjE0MzEzNDY0MTUgNTYuOTc3ODcxNDM3ODIxMzgiPg0KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSI+PC9hbmltYXRlVHJhbnNmb3JtPg0KICA8L2NpcmNsZT4NCjwvc3ZnPg=="
			return '\
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\
				<circle cx="50" cy="50" fill="none" stroke="#e15b64" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">\
					<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>\
				</circle>\
			</svg>';
		}
	}
	new FutureWordPress_Public();
} )( jQuery );


