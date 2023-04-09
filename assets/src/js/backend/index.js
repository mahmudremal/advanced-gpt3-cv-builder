// import ApexCharts from 'apexcharts';
// import flatpickr from "flatpickr";
import Swal from "sweetalert2";
import { toast } from 'toast-notification-alert';
import flatpickr from "flatpickr";
// import ClassicEditor from '@ckeditor5/ckeditor5-editor-classic/src/classiceditor';
// import tinymce from 'tinymce';
// import 'tinymce/themes/silver'; // you can use any theme you like
// import 'tinymce/plugins/paste'; // you can use any plugin you need
import Quill from "quill";

( function ( $ ) {
	class FWPListivoBackendJS {
		constructor() {
			this.ajaxUrl = fwpSiteConfig?.ajaxUrl ?? '';
			this.ajaxNonce = fwpSiteConfig?.ajax_nonce ?? '';
			var i18n = fwpSiteConfig?.i18n ?? {};this.cssImported = false;
			this.leadStatus = fwpSiteConfig?.leadStatus ?? [];
			this.i18n = {
				confirm_cancel_subscribe	: 'Do you really want to cancel this Subscription?',
				i_confirm_it							: 'Yes I confirm it',
				confirming								: 'Confirming',
				submit										: 'Submit',
				cancel										: 'Cancel',
				request_failed						: 'Request failed',
				give_your_old_password		: 'Give here your old password',
				you_paused								: 'Pause your Retainer',
				you_un_paused							: 'Your unpaused Retainer',
				are_u_sure								: 'Are you sure?',
				sure_to_delete						: 'Are you sure about this deletation.',
				sent_reg_link							: 'Registration Link sent successfully!',
				registration_link					: 'Registration link',
				password_reset						: 'Password reset',
				sent_passreset						: 'Password reset link sent Successfully!',
				retainer_zero							: 'Retainer Amount Zero',
				retainer_zerowarn					: 'You must set retainer amount before send a registration email.',
				selectcontract						: 'Select Contract',
				selectcontractwarn				: 'Please choose a contract to send the registration link. Once you have selected a contract and updated the form, you will be able to send the registration link.',
				...i18n
			}
			this.setup_hooks();
		}
		setup_hooks() {
			// this.apex();this.flatPicker();
			this.fullScreen();this.deleteLeadUser();
			this.calendarPicker();this.switcherMenu();
			this.sendRegLink();this.profileImgUpload();
			this.printADiv();this.deletePayment();
			this.deleteArchive();this.dropDownToggle();
			this.deleteNotices();
			this.Quill();// this.tinyMCE();
		}
		apex() {
			var options = {
				chart: {
					type: 'line'
				},
				series: [{
					name: 'sales',
					data: [30,40,35,50,49,60,70,91,125]
				}],
				xaxis: {
					categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
				}
			}
			var chart = new ApexCharts(document.querySelector("#chart"), options);
			chart.render();
		}
		fullScreen() {
			document.querySelectorAll( '#btnFullscreen' ).forEach( ( el, ei ) => {
				el.addEventListener( 'click', ( event ) => {
					if( document.body.classList.contains( 'fwp-full-screen' ) ) {
						document.exitFullscreen();
					} else {
						document.body.requestFullscreen();
					}
					document.body.classList.toggle( 'fwp-full-screen' );document.documentElement.classList.toggle( 'wp-toolbar' );
				} );
			} );
		}
		flatPicker() {
			document.querySelectorAll( '.inline_flatpickr' ).forEach( ( el, ei ) => {
				flatpickr( el, {});
			} );
		}
		deleteLeadUser() {
			const thisClass = this;var theInterval, selector, lead;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.delete-lead-user:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					document.body.addEventListener( 'delete-lead-' + el.dataset.id, () => {
						lead = document.querySelector( '#lead-' + el.dataset.id );
						if( lead ) {lead.remove();} else {
							console.log( el.dataset.id, lead );
						}
					} );
					el.addEventListener( 'click', ( event ) => {
						Swal.fire( {
							// title: `${result.value.login}'s avatar`,
							// imageUrl: result.value.avatar_url: 
							title: thisClass.i18n.are_u_sure,
							text: thisClass.i18n.sure_to_delete
						} ).then( (result) => {
							if (result.isConfirmed) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/deleteleadaccount' );
								formdata.append( 'lead', el.dataset.id );
								formdata.append( 'value', el.dataset.userInfo );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			// }, 3000 );
		}
		deletePayment() {
			const thisClass = this;var theInterval, selector, lead;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.delete-stripe-log:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					document.body.addEventListener( 'delete-stripe-log-' + el.dataset.id, () => {
						lead = document.querySelector( '#stripelog-' + el.dataset.id );
						if( lead ) {lead.remove();} else {console.log( el.dataset.id, lead );}
					} );
					el.addEventListener( 'click', ( event ) => {
						Swal.fire( {
							// title: `${result.value.login}'s avatar`,
							// imageUrl: result.value.avatar_url: 
							title: thisClass.i18n.are_u_sure,
							text: thisClass.i18n.sure_to_delete
						} ).then( (result) => {
							if (result.isConfirmed) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/deletepayment' );
								formdata.append( 'id', el.dataset.id );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			// }, 3000 );
		}
		deleteNotices() {
			const thisClass = this;var theInterval, selector, lead;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.delete-events-log:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					el.addEventListener( 'click', ( event ) => {
						Swal.fire( {
							title: thisClass.i18n.are_u_sure,
							text: thisClass.i18n.sure_to_delete
						} ).then( (result) => {
							if (result.isConfirmed) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/deletenotices' );
								formdata.append( 'delete', 'all' );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			// }, 3000 );
		}
		sendRegLink() {
			const thisClass = this;var theInterval, selector, lead, retainer, contract;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.lead-send-registration:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					document.body.addEventListener( 'sent-registration-' + el.dataset.id, () => {
						Swal.fire( { position: 'top-end', icon: 'success', title: thisClass.i18n.sent_reg_link, showConfirmButton: false, timer: 3500 } );
					} );
					document.body.addEventListener( 'sent-passreset-' + el.dataset.id, () => {
						Swal.fire( { position: 'top-end', icon: 'success', title: thisClass.i18n.sent_passreset, showConfirmButton: false, timer: 3500 } );
					} );
					el.addEventListener( 'click', ( event ) => {
						retainer = document.querySelector( 'input#monthly_retainer' );
						contract = document.querySelector( 'select#contract_type' );
						if( retainer && retainer.getAttribute( 'value' ) == '' || retainer.getAttribute( 'value' ) <= 0 ) {
							Swal.fire({
								title: thisClass.i18n.retainer_zero,
								text: thisClass.i18n.retainer_zerowarn,
								type: 'warn'
							})
						} else if( contract && typeof contract.dataset.current === 'undefined' || contract.dataset.current == '' ) {
							Swal.fire({
								title: thisClass.i18n.selectcontract,
								text: thisClass.i18n.selectcontractwarn,
								type: 'warn'
							})
						} else {
							Swal.fire({
								title: 'Do you want to save the changes?',
								showDenyButton: true,
								showCancelButton: true,
								confirmButtonText: thisClass.i18n.registration_link,
								denyButtonText: thisClass.i18n.password_reset,
								cancelButtonText: thisClass.i18n.cancel,
								input: 'text',
								inputValue: ( retainer && retainer.dataset.registration ) ? retainer.dataset.registration : '',
							}).then( ( result ) => {
								if( result.isDismissed ) {} else {
									var formdata = new FormData();
									if( result.isConfirmed ) {
										formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/sendregistration' );
									} else if( result.isDenied ) {
										formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/sendpasswordreset' );
									} else {}
									formdata.append( 'lead', el.dataset.id );
									formdata.append( 'value', el.dataset.userInfo );
									formdata.append( '_nonce', thisClass.ajaxNonce );
									thisClass.sendToServer( formdata );
								}
							} );
						}
					} );
				} );
			// }, 3000 );
		}
		calendarPicker() {
			const thisClass = this;var theInterval, selector;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.calendar-picker:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					var args = {enableTime: true,dateFormat: "d-M-Y"};// noCalendar: true,
					if( el.dataset.config ) {args = JSON.parse( el.dataset.config );}
					flatpickr( el, args );
					if( ! thisClass.cssImported ) {
						var link = document.createElement( 'link' );link.rel = 'stylesheet';link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
						document.head.appendChild( link );thisClass.cssImported = true;
					}
				} );
			// }, 3000 );
		}
		switcherMenu() {
			const thisClass = this;var theInterval, selector;var div, wrap, backdrop, elem, ul, li, a, span, ls, lead;
			theInterval = setInterval( () => {
				document.querySelectorAll( '.leadstatusswitcher:not([data-handled])' ).forEach( ( al, ai ) => {
					al.dataset.handled = true;
					Object.keys( thisClass.leadStatus ).forEach(function( lsi ) {
						document.body.addEventListener( 'lead-status-' + al.dataset.value + '-' + lsi, ( event ) => {
							lead = document.querySelector( '#lead-status-' + al.dataset.value );
							if( lead ) {
								lead.querySelectorAll( 'span.badge' ).forEach( ( span ) => span.remove() );
								span = document.createElement( 'span' );span.innerText = thisClass.leadStatus[ lsi ];
								span.classList.add( 'badge', 'bg-soft-success', 'p-2', 'text-success' );
								lead.insertBefore( span, lead.lastElementChild );
							}
						} );
					} );
					al.addEventListener( 'click', ( event ) => {
							div = document.createElement( 'div' );div.classList.add( 'popup-action-menu' );wrap = document.createElement( 'div' );wrap.classList.add( 'popup-action-wrap', 'card', 'p-2' );
							ul = document.createElement( 'ul' );ul.classList.add( 'list', 'list-none', 'list-unstyle' );
							Object.keys( thisClass.leadStatus ).forEach(function( lsi ) {
								ls = thisClass.leadStatus[ lsi ];
								li = document.createElement( 'li' );li.classList.add( 'list-item', 'p-2' );li.textContent = ls;li.dataset.value = lsi;li.dataset.lead = al.dataset.value;ul.appendChild( li );
							} );
							wrap.appendChild( ul );div.appendChild( wrap );document.body.appendChild( div );
					} );
				} );

				document.querySelectorAll( '.popup-action-menu .popup-action-wrap .list .list-item:not([data-handled])' ).forEach( ( al, ai ) => {
					al.dataset.handled = true;
					al.addEventListener( 'click', ( event ) => {
							var formdata = new FormData();
							formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/switchleadstatus' );
							formdata.append( 'lead', al.dataset.lead );
							formdata.append( 'value', al.dataset.value );
							formdata.append( '_nonce', thisClass.ajaxNonce );
							thisClass.sendToServer( formdata );
							document.querySelector( '.popup-action-menu' ).remove();
					} );
				} );
			}, 1000 );
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
								formdata.append( 'lead', el.dataset.lead );
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
		printADiv() {
			var node = document.querySelector( '.print-this-page' );
			if( ! node ) {return;}
			node.addEventListener( 'click', ( e ) => {
				var page = document.querySelector( e.target.dataset.print );
				var divToPrint = page.parentElement;page.classList.add( 'is-printing' );
				e.target.style.display = 'none';
				var newWin = window.open('', 'Print-Window');
				newWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="https://wemakecontent.net/wp-content/plugins/advanced-gpt3-cv-builder/assets/build/library/css/backend-library.css?ver=6.1.1" /></head><body onload="window.print()">' + divToPrint.innerHTML + '<style>.is-printing {min-height: 28cm;min-width: 20cm;max-height: 29.7cm;max-width: 21cm;}</style></body></html>');
				// newWin.document.close();newWin.close();
				e.target.style.display = 'block';page.classList.remove( 'is-printing' );
			} );
		}
		deleteArchive() {
			const thisClass = this;var el, message;
			document.querySelectorAll( '.archive-delete-btn' ).forEach( ( archive ) => {
				archive.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					Swal.fire({
						icon: 'info',
						title: thisClass.i18n.are_u_sure,
						showCancelButton: true,
						showLoaderOnConfirm: true
					} ).then((result) => {
						if (result.isConfirmed ) {
							var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/advancedgpt3cvbuilder/action/deletearchives' );
								formdata.append( 'archive', archive.dataset.archive );
								formdata.append( 'userid', archive.dataset.userid );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
						}
					} );
				} );
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
					// console.log( json );
					message = ( json.data.message ) ? json.data.message : json.data;
					if( json.success ) {
						toast.show({title: message, position: 'bottomright', type: 'info'});
					} else {
						toast.show({title: message, position: 'bottomright', type: 'warn'});
					}
					if( json.data.hooks ) {
						json.data.hooks.forEach( ( hook ) => {
							document.body.dispatchEvent( new Event( hook ) );
						} );
					}
				},
				error: function( err ) {
					toast.show({title: err.responseText, position: 'bottomright', type: 'warn'});
					console.log( err.responseText );
				}
			});
		}
		dropDownToggle() {
			document.querySelectorAll( '[data-fwp-toggle]' ).forEach( ( el ) => {
				el.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					event.target.classList.toggle( 'show' );
					event.target.setAttribute( 'aria-expanded', ( event.target.getAttribute( 'aria-expanded' ) === true ) );
					var target = document.querySelector( '[aria-labelledby="' + event.target.getAttribute( 'id' ) + '"]' );
					if( target ) {
							target.classList.toggle( 'show' );
							target.dataset.bsPopper = 'static';
					}
				} );
			} );
		}
		ckEditor() {
			document.querySelectorAll( '[data-ckeditor]:not([data-handled])' ).forEach( ( el ) => {
				el.dataset.handled = true;
				ClassicEditor.create( el ).catch( error => {
					console.error( error );
					toast.show({title: 'Inline Editor not properly Loaded.', position: 'bottomright', type: 'warn'});
        } );
			} );
		}
		tinyMCE() {
			document.querySelectorAll( '[data-tinymce]:not([data-handled])' ).forEach( ( el ) => {
				el.dataset.handled = true;el.id = ( el.id ) ? el.id : 'tinymce-instance' + Math.random();
				
				// tinymce.init({
				// 	selector: el.id,
				// 	// plugins: 'paste',
				// 	// toolbar: 'paste',
				// 	// paste_as_text: true, // this option removes any formatting when pasting content into the editor
				// 	// other options
				// });
			} );
		}
		Quill() {
			var nodes, css, js, textarea, options;
			nodes = document.querySelectorAll( '[data-tinymce]:not([data-handled])' );
			nodes.forEach( ( el ) => {
				el.dataset.handled = true;textarea = el.value;
				options = {
					debug: 'info',
					modules: {
						toolbar: true
					},
					placeholder: textarea,
					readOnly: false,
					theme: 'snow'
				};
				var quill = new Quill( el, options );
				quill.root.style.height = '300px';
				quill.setContents( quill.clipboard.convert( textarea ) );
			} );
			if( nodes.length >= 1 ) {
				css = document.createElement( 'link' );css.rel = 'stylesheet';css.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';document.head.appendChild( css );
				// js = document.createElement( 'script' );js.type = 'text/javascript';js.src = 'https://cdn.quilljs.com/1.3.6/quill.core.js';document.body.appendChild( js );
			}
		}
	}

	new FWPListivoBackendJS();
} )( jQuery );
