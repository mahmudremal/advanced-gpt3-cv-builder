<?php
/**
 * Block Patterns
 *
 * @package AdvancedGPT3CVbuilder
 */

namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;

class Core {
	use Singleton;
	protected function __construct() {
		// load class.
		$this->setup_hooks();
	}
	protected function setup_hooks() {
		add_action( 'admin_post_futurewordpress/project/advancedgpt3cvbuilder/action/dashboard', [ $this, 'requestDashboard' ], 10, 0 );

		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/cancelsubscription', [ $this, 'cancelSubscription' ], 10, 0 );
		add_action( 'admin_post_futurewordpress/project/advancedgpt3cvbuilder/action/editsubscriber', [ $this, 'editSubscriber' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/database/contents', [ $this, 'contentLibraries' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/singlefield', [ $this, 'singleField' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_futurewordpress/project/advancedgpt3cvbuilder/action/selecttoregister', [ $this, 'selectToRegister' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/switchleadstatus', [ $this, 'switchLeadStatus' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/deleteleadaccount', [ $this, 'deleteLeadAccount' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/deletepayment', [ $this, 'deletePayment' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/deletenotices', [ $this, 'deleteNotices' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/sendregistration', [ $this, 'sendRegistration' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/sendpasswordreset', [ $this, 'sendPasswordReset' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/registerexisting', [ $this, 'registerExisting' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/switchpayementcard', [ $this, 'switchPayementCard' ], 10, 0 );

		add_action( 'admin_post_futurewordpress/project/advancedgpt3cvbuilder/action/changepassword', [ $this, 'changePassword' ], 10, 0 );

		// add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/action/test', [ $this, 'testAjax' ], 10, 0 );

		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/action/statuses', [ $this, 'actionStatuses' ], 10, 2 );

		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/rewrite/rules', [ $this, 'rewriteRules' ], 10, 1 );
		add_filter( 'template_include', [ $this, 'template_include' ], 10, 1 );

	}
	public function requestDashboard() {
		// print_r( $_POST );
		if( ! wp_verify_nonce( $_POST['_nonce'], 'futurewordpress/project/advancedgpt3cvbuilder/nonce/dashboard' ) ) {
			wp_die( __( 'Nonce doesn\'t matched from your request. if you requested from an expired form, please do a re-submit', 'advanced-gpt3-cv-builder' ), __( 'Security verification mismatched.', 'advanced-gpt3-cv-builder' ) );
		}

		set_transient( 'futurewordpress/project/advancedgpt3cvbuilder/transiant/admin/' . get_current_user_id(), [
			'type'					=> 'warning', // primary | danger | success | warning | info
			'message'				=> __( 'Request detected but is staging mode.', 'advanced-gpt3-cv-builder' )
		], 200 );
		wp_redirect( wp_get_referer() );
	}
	public function contentLibraries() {
		$json = ['recordsFiltered' => 114, 'recordsTotal' => 114];
		wp_send_json_success( [], 200, $json );
	}
	public function singleField() {
		if( ! isset( $_POST[ 'field' ] ) || ! isset( $_POST[ 'value' ] ) || ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		$field = $_POST[ 'field' ];$value = $_POST[ 'value' ];$type = ( substr( $field, 0, 5 ) == 'meta-' ) ? 'meta' : 'data';
		$userMeta = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/usermeta/defaults', [] );
		if( ! empty( $field ) && isset( $_POST[ 'userid' ] ) ) {
			$field = substr( $field, 5 );
			$user_id = ( ! is_admin() ) ? get_current_user_id() : $_POST[ 'userid' ];
			if( $type = 'meta' && array_key_exists( $field, $userMeta ) ) {
				if( $field == 'enable_subscription' ) {
					$this->toggleSubscption( $user_id, $field, $value );
				} else {
					update_user_meta( $user_id, $field, $value );
					wp_send_json_success( __( 'Profile Information Update successful', 'advanced-gpt3-cv-builder' ), 200 );
				}
			} else if( $type = 'data' && in_array( $field, [ 'display_name', 'user_email' ] ) ) {
				if( in_array( $field, [ 'display_name', 'user_email' ] ) ) {
					wp_update_user( [
						'ID'			=> $user_id,
						$field		=> $value
					] );
					if( $field == 'user_email' ) {update_user_meta( $user_id, 'email', $value );}
					wp_send_json_success( __( 'Profile Update successful', 'advanced-gpt3-cv-builder' ), 200 );
				} else {
					wp_send_json_error( __( 'Illigal request sent. Nothing happen. Request rejected.', 'advanced-gpt3-cv-builder' ), 200 );
				}
			} else {
				wp_send_json_error( __( 'Request properly not identified or not allowed to madify.', 'advanced-gpt3-cv-builder' ) . $field, 200 );
			}
		} else {
			wp_send_json_error( __( 'Failed operation', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function selectToRegister() {
		if( ! isset( $_POST[ 'field' ] ) || ! isset( $_POST[ 'value' ] ) || ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		$user_id		= isset( $_POST[ 'userid' ] ) ? $_POST[ 'userid' ] : false;
		$reg_key		= isset( $_POST[ 'field' ] ) ? $_POST[ 'field' ] : false;
		$reg_type		= isset( $_POST[ 'value' ] ) ? $_POST[ 'value' ] : false;
		if( $user_id && $reg_key && $reg_type ) {
			update_user_meta( $user_id, 'contract_type', $reg_type );
			wp_send_json_success( [
				'message'			=> __( 'Successfully Saved your choice. Current page should reload not. If you don\'t see, page not reloading, please reload this page.', 'advanced-gpt3-cv-builder' ),
				'hooks'				=> [ 'reload-page' ]
			], 200 );
		} else {
			wp_send_json_error( __( 'Technical Error. If you saw this message, please contact with site administrative.', 'advanced-gpt3-cv-builder' ) );
		}
	}
	public function actionStatuses( $args, $specific = false ) {
		$actions = [
			'call_scheduled'            => __( 'Step 1.Call Scheduled', 'advanced-gpt3-cv-builder' ),
			'no_show'                   => __( 'Step 2a. No Show', 'advanced-gpt3-cv-builder' ),
			'call_rescheduled'          => __( 'Step 2b. Call Rescheduled', 'advanced-gpt3-cv-builder' ),
			'setfollowup'            		=> __( 'Step 3a. Set Follow Up', 'advanced-gpt3-cv-builder' ),
			'send_contract'            	=> __( 'Step 3b. Send Contract', 'advanced-gpt3-cv-builder' ),
			'contract_pending'					=> __( 'Step 4. Contract Pending', 'advanced-gpt3-cv-builder' ),
			'payment_pending'           => __( 'Step 5. Payment Pending', 'advanced-gpt3-cv-builder' ),
			'payment_confirmed'					=> __( 'Step 6. Payment Confirmed', 'advanced-gpt3-cv-builder' ),
			'retainer_scheduled'        => __( 'Step 7. Retainer Scheduled', 'advanced-gpt3-cv-builder' ),
			'payment_issues'            => __( 'Step 8. Payment Issues', 'advanced-gpt3-cv-builder' ),
			'refund_scheduled'          => __( 'Step 9. Refund Scheduled', 'advanced-gpt3-cv-builder' ),
			'retainer_cancelled'        => __( 'Step 10. Retainer Cancelled', 'advanced-gpt3-cv-builder' ),
			'other'           					=> __( 'Other', 'advanced-gpt3-cv-builder' ),
		];
		return ( $specific ) ? ( isset( $actions[ $specific ] ) ? $actions[ $specific ] : '' ) : $actions;
	}
	public function editSubscriber() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/nonce/editsubscriber' ) ) {
			wp_die( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), __( 'Security mismatched', 'advanced-gpt3-cv-builder' ) );
		}
		$user_id = $_POST[ 'userid' ];$is_edit_profile = ( $user_id != 'new' );
		if( isset( $_POST[ 'userdata' ] ) ) {
			$userdata = $_POST[ 'userdata' ];$userinfo = $_POST[ 'userinfo' ];
			$userinfo[ 'enable_subscription' ] = isset( $userinfo[ 'enable_subscription' ] ) ? $userinfo[ 'enable_subscription' ] : false;
			// $userinfo[ 'services' ] = isset( $userinfo[ 'services' ] ) ? nl2br( $userinfo[ 'services' ] ) : '';
			$args = [
				'display_name'	=> $userdata[ 'display_name' ],
				'first_name'		=> ( isset( $userdata[ 'first_name' ] ) && ! empty( $userdata[ 'first_name' ] ) ) ? $userdata[ 'first_name' ] : $userinfo[ 'first_name' ],
				'last_name'			=> ( isset( $userdata[ 'last_name' ] ) && ! empty( $userdata[ 'last_name' ] ) ) ? $userdata[ 'last_name' ] : $userinfo[ 'last_name' ],
				'user_email'		=> ( isset( $userdata[ 'email' ] ) && ! empty( $userdata[ 'email' ] ) ) ? $userdata[ 'email' ] : $userinfo[ 'email' ],
				'meta_input'		=> (array) $userinfo
			];
			if( isset( $userdata[ 'newpassword' ] ) && ! empty( $userdata[ 'newpassword' ] ) ) {
				if( $is_edit_profile ) {
					wp_set_password( $userdata[ 'newpassword' ], $user_id );
				} else {
					$args[ 'user_pass' ] = $userdata[ 'newpassword' ]; // wp_hash_password
				}
			}
			
			if( $is_edit_profile ) {
				$args[ 'ID' ] = $user_id;
			}
			// print_r( $args );wp_die();
			$is_created = (  $is_edit_profile ) ? wp_update_user( $args ) : wp_insert_user( $args );
			if ( ! is_wp_error( $is_created ) ) {
				$msg = [
					'type'					=> 'success', // primary | danger | success | warning | info
					'message'				=> __( 'User Information has been successfully updated.', 'advanced-gpt3-cv-builder' )
				];
			} else {
				$errormessage = $is_created->get_error_message();
				$msg = [
					'type'					=> 'warning', // primary | danger | success | warning | info
					'message'				=> ( empty( $errormessage ) ) ? __( 'Failed to update user information.', 'advanced-gpt3-cv-builder' ) : $errormessage
				];
			}
			set_transient( 'futurewordpress/project/advancedgpt3cvbuilder/transiant/admin/' . get_current_user_id(), $msg, 200 );
		}
		// print_r( [ $args, $is_created, $msg ] );wp_die();
		wp_redirect( wp_get_referer() );
	}
	public function switchLeadStatus() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( empty( $this->actionStatuses( [], $_POST[ 'value' ] ) ) ) {
			wp_send_json_error( __( 'Unexpected status requested.', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( isset( $_POST[ 'lead' ] ) && ! empty( $_POST[ 'value' ] ) ) {
			update_user_meta( $_POST[ 'lead' ], 'status', $_POST[ 'value' ] );
			wp_send_json_success( [ 'message' => __( 'Updated Successfully.', 'advanced-gpt3-cv-builder' ), 'hooks' => ['lead-status-' . $_POST[ 'lead' ] . '-' . $_POST[ 'value' ] ] ], 200 );
		} else {
			wp_send_json_error( __( 'Status request contains empty arguments.', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function deleteLeadAccount() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( isset( $_POST[ 'lead' ] ) && ! empty( $_POST[ 'lead' ] ) ) {
			wp_delete_user( $_POST[ 'lead' ] );
			wp_send_json_error( [ 'message' => __( 'Deleted User Successfully.', 'advanced-gpt3-cv-builder' ), 'hooks' => ['delete-lead-' . $_POST[ 'lead' ] ] ], 200 );
		} else {
			wp_send_json_error( __( 'Unexpected status requested.', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function deletePayment() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( isset( $_POST[ 'id' ] ) && ! empty( $_POST[ 'id' ] ) ) {global $wpdb;
			$is_done = $wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->prefix}fwp_stripe_payments WHERE id=%d;", $_POST[ 'id' ] ) );
			if( $is_done && ! is_wp_error( $is_done ) ) {
				wp_send_json_success( [ 'message' => __( 'Deleted Payment Log Successfully.', 'advanced-gpt3-cv-builder' ), 'hooks' => ['delete-stripe-log-' . $_POST[ 'id' ] ] ], 200 );
			} else {
				wp_send_json_error( [ 'message' => is_wp_error( $is_done )? $is_done->get_error_message() : __( 'Failed to delete payment log.', 'advanced-gpt3-cv-builder' ), 'hooks' => [] ], 200 );
			}
		} else {
			wp_send_json_error( __( 'Unexpected status requested.', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function deleteNotices() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( isset( $_POST[ 'delete' ] ) && ! empty( $_POST[ 'delete' ] ) ) {
			update_option( 'fwp_we_make_content_admin_notice', [] );
			wp_send_json_success( __( 'All notices deleted successfully.', 'advanced-gpt3-cv-builder' ), 200 );
		} else {
			wp_send_json_error( __( 'Unexpected status requested.', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function rewriteRules( $rules ) {
		$rules[] = [ 'lead-registration/source-email/([^/]*)/?', 'index.php?lead_registration=$matches[1]', 'top' ];
		return $rules;
	}
	public function template_include( $template ) {
    $lead_registration = get_query_var( 'lead_registration' );// $order_id = get_query_var( 'order_id' );
		if ( $lead_registration == false || $lead_registration == '' ) {
      return $template;
    } else {
			$file = ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH . '/templates/dashboard/cards/lead_registration.php';
			if( file_exists( $file ) && ! is_dir( $file ) ) {
          return $file;
        } else {
          return $template;
        }
		}
	}
	public function sendRegistration() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( isset( $_POST[ 'lead' ] ) && ! empty( $_POST[ 'lead' ] ) ) {
			$userInfo = get_user_by( 'id', $_POST[ 'lead' ] );
			$userMeta = array_map( function( $a ){ return $a[0]; }, (array) get_user_meta( $userInfo->ID ) );
			$userInfo = (object) wp_parse_args( $userInfo, [ 'id' => '', 'meta' => (object) wp_parse_args( $userMeta, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/usermeta/defaults', (array) $userMeta ) ) ] );
			$args = ['id' => 0, 'to' => empty( $userInfo->data->user_email ) ? $userInfo->meta->email : $userInfo->data->user_email, 'name' => get_option( 'blogname' ), 'email' => get_option( 'admin_email' ), 'subject' => '', 'message' => ''];
			
			if( $userInfo->meta->monthly_retainer <= 0 ) {
				wp_send_json_error( __( 'User\'s retainer amount is zero, you\'ve change retainer amount to send registration link.', 'advanced-gpt3-cv-builder' ) );
			}

			$instead = [
				'{{client_name}}',
				'{{client_address}}',
				'{{todays_date}}',
				'{{retainer_amount}}',
				'{{registration_link}}',
			];
			 $replace = [
				empty( $userInfo->meta->first_name . $userInfo->meta->last_name ) ? $userInfo->data->display_name : $userInfo->meta->first_name . ' ' . $userInfo->meta->last_name,
			! empty( $userInfo->meta->address1 ) ? $userInfo->meta->address1 : ( ! empty( $userInfo->meta->address2 ) ? $userInfo->meta->address2 : apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-addressplaceholder', '' ) ),
			wp_date( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-dateformat', '' ), strtotime( date( 'Y-M-d' ) ) ),
			! empty( $userInfo->meta->monthly_retainer ) ? $userInfo->meta->monthly_retainer : apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-emptyrrtainer', '' ),
			site_url( 'lead-registration/source-email/' . bin2hex( $userInfo->ID ) . '/' )
			];
			
			$args[ 'subject' ] = str_replace( $instead, $replace, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'email-registationsubject', 'Invitation to Register for ' . get_option( 'blogname', site_url() ) ) );
			$args[ 'message' ] = str_replace( $instead, $replace, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'email-registationbody', 'Email not set. Sorry for inturrupt.' ) );
			$args[ 'type' ] = 'text/html';
			
			if( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/mailsystem/sendmail', $args ) ) {
				wp_send_json_success( [ 'message' => __( 'Registration Link sent successfully!', 'advanced-gpt3-cv-builder' ), 'hooks' => [ 'sent-registration-' . $_POST[ 'lead' ] ] ], 200 );
			} else {
				wp_send_json_error( __( 'Mail not sent.', 'advanced-gpt3-cv-builder' ), 200 );
			}
		}
		wp_send_json_error( __( 'Unexpected status requested.', 'advanced-gpt3-cv-builder' ), 200 );
	}
	public function sendPasswordReset() {
		$user = $userInfo = get_user_by( 'id', $_POST[ 'lead' ] );
		$userMeta = array_map( function( $a ){ return $a[0]; }, (array) get_user_meta( $userInfo->ID ) );
		$userInfo = (object) wp_parse_args( $userInfo, [ 'id' => '', 'meta' => (object) wp_parse_args( $userMeta, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/usermeta/defaults', (array) $userMeta ) ) ] );
		if ( ! $userInfo ) {wp_send_json_error( __( 'User doesn\'t identified.', 'advanced-gpt3-cv-builder' ), 200 );}
		$key = get_password_reset_key( $user );
		$reset_password_link = network_site_url( "wp-login.php?action=rp&key={$key}&login=" . rawurlencode($user->user_login), 'login' );
		$message = 'You recently requested a password reset link. Here is your reset link: ' . $reset_password_link;
		$instead = [
			'{{client_name}}',
			'{{client_address}}',
			'{{todays_date}}',
			'{{retainer_amount}}',
			'{{registration_link}}',
			'{{site_name}}',
			'{{passwordreset_link}}',
		];
		 $replace = [
			empty( $userInfo->meta->first_name . $userInfo->meta->last_name ) ? $userInfo->data->display_name : $userInfo->meta->first_name . ' ' . $userInfo->meta->last_name,
			! empty( $userInfo->meta->address1 ) ? $userInfo->meta->address1 : ( ! empty( $userInfo->meta->address2 ) ? $userInfo->meta->address2 : apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-addressplaceholder', '' ) ),
			wp_date( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-dateformat', '' ), strtotime( date( 'Y-M-d' ) ) ),
			! empty( $userInfo->meta->monthly_retainer ) ? $userInfo->meta->monthly_retainer : apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-emptyrrtainer', '' ),
			site_url( 'lead-registration/source-email/' . base64_encode( $userInfo->ID ) . '/' ),
			get_option( 'blogname', 'We Make Content' ),
			$reset_password_link
		];
		
		$args = [ 'id' => 0, 'to' => empty( $userInfo->data->user_email ) ? $userInfo->meta->email : $userInfo->data->user_email, 'name' => get_option( 'blogname' ), 'email' => get_option( 'admin_email' ), 'subject' => '', 'message' => $message ];
		$args[ 'subject' ] = str_replace( $instead, $replace, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'email-passresetsubject', 'Passwird Reset link for ' . get_option( 'blogname', site_url() ) ) );
		$args[ 'message' ] = str_replace( $instead, $replace, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'email-passresetbody', 'Email not set. Sorry for inturrupt.' ) );
		// print_r( [ $args, $userInfo ] );
		if ( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/mailsystem/sendmail', $args ) ) {
			wp_send_json_success( [ 'message' => __( 'Reset Link sent successfully!', 'advanced-gpt3-cv-builder' ), 'hooks' => [ 'sent-passreset-' . $_POST[ 'lead' ] ] ], 200 );
		} else {
			wp_send_json_error( __( 'Unexpected respond from backend.', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function toggleSubscption( $user_id, $meta_key, $meta_value ) {
		$userInfo = get_user_by( 'id', $user_id );

		if( $meta_value == 'off' && ! apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/payment/stripe/allowswitchpause', true, 'pause', $userInfo->ID ) ) {
			wp_send_json_success( [ 'message' => __( 'You can\'t change now. You can only pause you retainer once every 60 days. Please wait until it release.', 'advanced-gpt3-cv-builder' ), 'hooks' => [] ], 200 );
		} else {
			$status = ( $meta_value == 'off' ) ? 'pause' : 'unpause';
			if( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/payment/stripe/subscriptionToggle', $status, ( ! empty( $userInfo->data->user_email ) ? $userInfo->data->user_email : get_user_meta( $user_id, 'email', true ) ), $user_id ) ) {
				update_user_meta( $user_id, 'subscription_last_changed', time() );
				update_user_meta( $user_id, $meta_key, $meta_value );
				$notice = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/notices/manager', 'add', 'cancelSubscription', [
					'type'						=> 'warn',
					'message'					=> sprintf( __( '%s %s his Subscription', 'advanced-gpt3-cv-builder' ), '<a href="' . admin_url( 'admin.php?page=crm_dashboard&path=leads/edit/' . $userInfo->ID . '/' ) . '" target="_blank">' . get_user_meta( $userInfo->ID, 'first_name', true ) . ' ' . get_user_meta( $userInfo->ID, 'last_name', true ) . '</a>', strtoupper( $status ) ),
					'data'						=> [
						'time'					=> time(),
						'wp_date'				=> wp_date( 'Y-M-d H:i:s' ),
						'user'					=> $user_id
					]
				] );
				// 'message' => __( 'User subscription Changed Successfully', 'advanced-gpt3-cv-builder' ), 
				wp_send_json_success( [ 'hooks' => ['subscription-status-' . $status ] ], 200 );
			} else {
				wp_send_json_error( __( 'Failed to Switch subscription! Please contact with administrative for assistance.', 'advanced-gpt3-cv-builder' ), 200 );
			}
		}
		// wp_send_json_error( 'failed', 200 );
	}
	public function cancelSubscription() {
		if( ! apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/isactive', 'stripe-cancelsubscription' ) ) {
			wp_send_json_error( __( 'Subscription calcelletion is not allowed from administrative. Please contract with them manually.', 'advanced-gpt3-cv-builder' ), 200 );
		}
		$userInfo = get_user_by( 'id', ( isset( $_GET[ 'userid' ] ) ? $_GET[ 'userid' ] : 0 ) );
		if( $userInfo && apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/payment/stripe/subscriptionCancel', 'cancel', ( ! empty( $userInfo->data->user_email ) ? $userInfo->data->user_email : get_user_meta( $userInfo->ID, 'email', true ) ), $userInfo->ID ) ) {
			update_user_meta( $userInfo->ID, 'subscribe', false );
			$notice = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/notices/manager', 'add', 'cancelSubscription', [
				'type'						=> 'alert',
				'message'					=> sprintf( __( 'An User (%s) cancelled Subscription on %s', 'advanced-gpt3-cv-builder' ), '<a href="' . admin_url( 'admin.php?page=crm_dashboard&path=leads/edit/' . $userInfo->ID . '/' ) . '" target="_blank">' . get_user_meta( $userInfo->ID, 'first_name', true ) . ' ' . get_user_meta( $userInfo->ID, 'last_name', true ) . '</a>', wp_date( 'M, d H;i' ) ),
				'data'						=> [
					'time'					=> wp_date( 'Y-M-d H:i:s' ),
					'user'					=> $_GET[ 'userid' ]
				]
			] );
			wp_send_json_success( __( 'You successfully Cancelled your subscriptions. A notification to was sent to the Administrative.', 'advanced-gpt3-cv-builder' ), 200 );
		} else {
			wp_send_json_error( __( 'Subscription calcelletion failed. Please contact with site administrative for further assistance.', 'advanced-gpt3-cv-builder' ), 200 );
		}
	}
	public function switchPayementCard() {
		if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token.', 'advanced-gpt3-cv-builder' ), 200 );
		}
		if( ! isset( $_POST[ 'card' ] ) || ! isset( $_POST[ 'card' ][ 'number' ] ) || ! isset( $_POST[ 'card' ][ 'exp_month' ] ) || ! isset( $_POST[ 'card' ][ 'exp_year' ] ) || ! isset( $_POST[ 'card' ][ 'cvc' ] ) ) {wp_send_json_error( __( 'Some required fields are missing. If you belive it should not to be, please contact to the administrative.',   'advanced-gpt3-cv-builder' ), 200 );}
		$userInfo = get_user_by( 'id', is_admin() ? $_POST[ 'userid' ] : get_current_user_id() );
		$userMeta = array_map( function( $a ){ return $a[0]; }, (array) get_user_meta( $userInfo->ID ) );
		$userInfo = (object) wp_parse_args( $userInfo, [ 'id' => '', 'meta' => (object) wp_parse_args( $userMeta, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/usermeta/defaults', (array) $userMeta ) ) ] );
			
		$card = $_POST[ 'card' ];
		$args = [
			'card_email'			=> empty( $userInfo->data->user_email ) ? $userInfo->meta->email : $userInfo->data->user_email,
			'card_number'			=> $card[ 'number' ],
			'card_month'			=> $card[ 'exp_month' ],
			'card_year'			=> $card[ 'exp_year' ],
			'card_cvc'			=> $card[ 'cvc' ]
		];
		if( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/payment/stripe/switchpaymentcard', false, $args ) ) {
			wp_send_json_success( __( 'Added Payment Card and is now activated for subscription.', 'advanced-gpt3-cv-builder' ), 200 );
		} else {
			wp_send_json_error( __( 'Something went wrong while trying to update stripe.', 'advanced-gpt3-cv-builder' ) );
		}
	}
	public function registerExisting() {
		// if( ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/verify/registerexisting' ) ) {
		// 	wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		// }
		if( ! isset( $_POST[ 'userid' ] ) || ! isset( $_POST[ 'password' ] ) || ! isset( $_POST[ 'metadata' ] ) ) {wp_send_json_error( __( 'Something went wrong.',   'advanced-gpt3-cv-builder' ), 200 );}
		if( is_array( $_POST[ 'password' ] ) && isset( $_POST[ 'password' ][ 'confirm' ] ) && isset( $_POST[ 'password' ][ 'given' ] ) && $_POST[ 'password' ][ 'given' ] != $_POST[ 'password' ][ 'confirm' ] ) {wp_send_json_error( __( 'Password not matched',   'advanced-gpt3-cv-builder' ), 200 );}
		if( ! empty( $_POST[ 'password' ][ 'given' ] ) ) {
			$password = $_POST[ 'password' ][ 'given' ];
			$userid = hex2bin( $_POST[ 'userid' ] );
			$userInfo = get_user_by( 'id', $userid );
			if( is_wp_error( $userInfo ) ) {wp_send_json_error( $userInfo->get_error_message(), 200 );}
			$metadata = (array) $_POST[ 'metadata' ];
			foreach( $metadata as $meta_key => $meta_value ) {
				update_user_meta( $_POST[ 'userid' ], $meta_key, $meta_value );
			}
			$userargs = [
				'ID'							=> $userid,
			];
			wp_set_password( $password, $userid );
			$userdata = isset( $_POST[ 'userdata' ] ) ? (array) $_POST[ 'userdata' ] : [];
			if( isset( $userdata[ 'display_name' ] ) ) {
				$userargs[ 'display_name' ] = $userdata[ 'display_name' ];
			}
			$response = ( count( $userargs ) > 1 ) ? wp_update_user( $userargs ) : false;
			if( is_wp_error( $response ) ) {
				wp_send_json_error( $response->get_error_message(), 200 );
			}
			if( isset( $_FILES[ 'profile-image' ] ) && $avater = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/filesystem/set_avater', false, $_FILES[ 'profile-image' ] ) && ! isset( $avater[ 'error' ] ) ) {}
			// $redirect = esc_url( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/user/dashboardpermalink', $userid, $userInfo->data->user_nicename ) );
			$redirect = site_url( 'pay_retainer/' . bin2hex( $userInfo->ID ) . '/' );
			wp_send_json_success( [ 'message' => __( 'Data updated successfully. Please wait a while, we\'re redirecting.', 'advanced-gpt3-cv-builder' ), 'redirect' => $redirect, 'hooks' => [ 'register-existing-account-wizard-success' ] ], 200 );
		}
	}
	public function changePassword() {
		if( ! isset( $_POST[ 'password' ] ) || ! isset( $_POST[ '_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_nonce' ], 'futurewordpress/project/advancedgpt3cvbuilder/nonce/dashboard' ) ) {
			wp_send_json_error( __( 'We\'ve detected you\'re requesting with an invalid security token or something went wrong with you', 'advanced-gpt3-cv-builder' ), 200 );
		}
		$password = (array) $_POST[ 'password' ];
		if( isset( $password[ 'new' ] ) && ! empty( $password[ 'new' ] ) && isset( $password[ 'old' ] ) && isset( $password[ 'confirm' ] ) && $password[ 'old' ] == $password[ 'confirm' ] ) {
			wp_set_password( $password[ 'old' ], get_current_user_id() );
			// wp_send_json_error( __( 'Password Updated Successfully!', 'advanced-gpt3-cv-builder' ) );
			set_transient( 'futurewordpress/project/advancedgpt3cvbuilder/transiant/admin/' . get_current_user_id(), [
				'type'					=> 'success', // primary | danger | success | warning | info
				'message'				=> __( 'Password Updated Successfully!', 'advanced-gpt3-cv-builder' )
			], 200 );
		} else {
			// wp_send_json_error( __( 'Password Mismatch. Please try again.', 'advanced-gpt3-cv-builder' ) );
			set_transient( 'futurewordpress/project/advancedgpt3cvbuilder/transiant/admin/' . get_current_user_id(), [
				'type'					=> 'danger', // primary | danger | success | warning | info
				'message'				=> __( 'Password Mismatch. Please try again.', 'advanced-gpt3-cv-builder' )
			], 200 );
		}
		wp_redirect( wp_get_referer() );
	}
	public function testAjax() {
		wp_send_json_success( [ 'message' => 'some text', 'hooks' => ['fuck'] ], 200 );
	}
}
