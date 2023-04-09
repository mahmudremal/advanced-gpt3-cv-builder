<?php
/**
 * Enqueue theme assets
 *
 * @package AdvancedGPT3CVbuilder
 */


namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;

class Assets {
	use Singleton;

	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_action( 'wp_enqueue_scripts', [ $this, 'register_styles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'wp_denqueue_scripts' ], 99 );
		/**
		 * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		// add_action( 'enqueue_block_assets', [ $this, 'enqueue_editor_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 10, 1 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_denqueue_scripts' ], 99 );

		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/javascript/siteconfig', [ $this, 'siteConfig' ], 1, 1 );
	}

	public function register_styles() {
		// Register styles.
		wp_register_style( 'cvbuilder', 'https://universal-resume-a4.netlify.app/build.css', [], false, 'all' );
		wp_register_style( 'flatpickr', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI . '/css/flatpickr.min.css', [], false, 'all' );
		wp_register_style( 'bootstrap', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI . '/css/bootstrap.min.css', [], false, 'all' );
		wp_register_style( 'AdvancedGPT3CVbuilder-builder', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI . '/css/resume-builder.css', [], false, 'all' );
		wp_register_style( 'AdvancedGPT3CVbuilder-public', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI . '/public.css', [], $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH . '/public.css' ), 'all' );
		// Enqueue Styles.
		wp_enqueue_style( 'cvbuilder' );
		wp_enqueue_style( 'flatpickr' );wp_enqueue_style( 'bootstrap' );
		wp_enqueue_style( 'AdvancedGPT3CVbuilder-builder' );
		wp_enqueue_style( 'AdvancedGPT3CVbuilder-public' );
		// if( $this->allow_enqueue() ) {}
	}
	public function register_scripts() {
		// Register scripts.
		$filemtime = $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_DIR_PATH . '/public.js' );
		wp_register_script( 'AdvancedGPT3CVbuilder-public', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI . '/public.js?v=' . $filemtime, ['jquery'], $filemtime, true );
		// Enqueue Scripts.
		wp_enqueue_script( 'AdvancedGPT3CVbuilder-public' );
		// if( $this->allow_enqueue() ) {}
		wp_localize_script( 'AdvancedGPT3CVbuilder-public', 'fwpSiteConfig', apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/javascript/siteconfig', [
			'videoClips'		=> [],
		] ) );
	}
	private function allow_enqueue() {
		return ( function_exists( 'is_checkout' ) && ( is_checkout() || is_order_received_page() || is_wc_endpoint_url( 'order-received' ) ) );
	}

	/**
	 * Enqueue editor scripts and styles.
	 */
	public function enqueue_editor_assets() {

		$asset_config_file = sprintf( '%s/assets.php', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_PATH );

		if ( ! file_exists( $asset_config_file ) ) {
			return;
		}

		$asset_config = require_once $asset_config_file;

		if ( empty( $asset_config['js/editor.js'] ) ) {
			return;
		}

		$editor_asset    = $asset_config['js/editor.js'];
		$js_dependencies = ( ! empty( $editor_asset['dependencies'] ) ) ? $editor_asset['dependencies'] : [];
		$version         = ( ! empty( $editor_asset['version'] ) ) ? $editor_asset['version'] : $this->filemtime( $asset_config_file );

		// Theme Gutenberg blocks JS.
		if ( is_admin() ) {
			wp_enqueue_script(
				'aquila-blocks-js',
				ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI . '/blocks.js',
				$js_dependencies,
				$version,
				true
			);
		}

		// Theme Gutenberg blocks CSS.
		$css_dependencies = [
			'wp-block-library-theme',
			'wp-block-library',
		];

		wp_enqueue_style(
			'aquila-blocks-css',
			ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI . '/blocks.css',
			$css_dependencies,
			$this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH . '/blocks.css' ),
			'all'
		);

	}
	public function admin_enqueue_scripts( $curr_page ) {
		global $post;
		// if( ! in_array( $curr_page, [ 'edit.php', 'post.php' ] ) || 'shop_order' !== $post->post_type ) {return;}
		wp_register_style( 'AdvancedGPT3CVbuilder-admin', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI . '/admin.css', [], $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH . '/admin.css' ), 'all' );
		wp_register_script( 'AdvancedGPT3CVbuilder-admin', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI . '/admin.js', [ 'jquery' ], $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_DIR_PATH . '/admin.js' ), true );
		wp_enqueue_style( 'AdvancedGPT3CVbuilder-admin' );
		wp_enqueue_script( 'AdvancedGPT3CVbuilder-admin' );
		if( isset( $_GET[ 'page' ] ) && in_array( $_GET[ 'page' ], apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/admin/allowedpage', [] ) ) ) {
			wp_enqueue_style( 'FutureWordPressScratchProjectBackend' );wp_enqueue_script( 'FutureWordPressScratchProjectBackend' );
		}

		wp_localize_script( 'AdvancedGPT3CVbuilder-admin', 'fwpSiteConfig', apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/javascript/siteconfig', [] ) );
	}
	private function filemtime( $file ) {
		return apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/filesystem/filemtime', false, $file );
	}
	public function siteConfig( $args ) {
		return wp_parse_args( [
			'ajaxUrl'    		=> admin_url( 'admin-ajax.php' ),
			'ajax_nonce' 		=> wp_create_nonce( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce' ),
			'is_admin' 			=> is_admin(),
			'buildPath'  		=> ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_URI,
			'videoClips'  		=> ( function_exists( 'WC' ) && WC()->session !== null ) ? (array) WC()->session->get( 'uploaded_files_to_archive' ) : [],
			'i18n'					=> [
				'sureToSubmit'							=> __( 'Want to submit it? You can retake.', 'advanced-gpt3-cv-builder' ),
				'uploading'									=> __( 'Uploading', 'advanced-gpt3-cv-builder' ),
				'click_here'								=> __( 'Click here', 'advanced-gpt3-cv-builder' ),
				'video_exceed_dur_limit'		=> __( 'Video exceed it\'s duration limit.', 'advanced-gpt3-cv-builder' ),
				'file_exceed_siz_limit'			=> __( 'Filesize exceed it maximum limit 30MB.', 'advanced-gpt3-cv-builder' ),
				'audio_exceed_dur_limit'		=> __( 'Audio exceed it\'s duration limit.', 'advanced-gpt3-cv-builder' ),
				'invalid_file_formate'			=> __( 'Invalid file formate.', 'advanced-gpt3-cv-builder' ),
				'device_error'							=> __( 'Device Error', 'advanced-gpt3-cv-builder' ),
				'confirm_cancel_subscribe'	=> __( 'Do you really want to cancel this Subscription?', 'advanced-gpt3-cv-builder' ),
				'i_confirm_it'							=> __( 'Yes I confirm it', 'advanced-gpt3-cv-builder' ),
				'confirming'								=> __( 'Confirming', 'advanced-gpt3-cv-builder' ),
				'successful'								=> __( 'Successful', 'advanced-gpt3-cv-builder' ),
				'request_failed'						=> __( 'Request failed', 'advanced-gpt3-cv-builder' ),
				'submit'										=> __( 'Submit', 'advanced-gpt3-cv-builder' ),
				'cancel'										=> __( 'Cancel', 'advanced-gpt3-cv-builder' ),
				'registration_link'					=> __( 'Registration link', 'advanced-gpt3-cv-builder' ),
				'password_reset'						=> __( 'Password reset', 'advanced-gpt3-cv-builder' ),
				'give_your_old_password'		=> __( 'Give here your old password', 'advanced-gpt3-cv-builder' ),
				'you_paused'								=> __( 'Subscription Paused', 'advanced-gpt3-cv-builder' ),
				'you_paused_msg'						=> __( 'Your retainer subscription has been successfully paused. We\'ll keep your account on hold until you\'re ready to resume. Thank you!', 'advanced-gpt3-cv-builder' ),
				'you_un_paused'							=> __( 'Subscription Resumed', 'advanced-gpt3-cv-builder' ),
				'you_un_paused_msg'					=> __( 'Welcome back! Your retainer subscription has been successfully resumed. We\'ll continue to provide you with our services as before. Thank you!', 'advanced-gpt3-cv-builder' ),
				'are_u_sure'								=> __( 'Are you sure?', 'advanced-gpt3-cv-builder' ),
				'sure_to_delete'						=> __( 'Are you sure about this deletation. Once you permit to delete, this user data will be removed from database forever. This can\'t be Undone', 'advanced-gpt3-cv-builder' ),
				'sent_reg_link'							=> __( 'Registration Link sent successfully!', 'advanced-gpt3-cv-builder' ),
				'sent_passreset'						=> __( 'Password reset link sent Successfully!', 'advanced-gpt3-cv-builder' ),
				'sometextfieldmissing'			=> __( 'Some required field you missed. Pleae fillup them first, then we can proceed.', 'advanced-gpt3-cv-builder' ),
				'retainer_zero'							=> __( 'Retainer Amount Zero', 'advanced-gpt3-cv-builder' ),
				'retainer_zerowarn'					=> __( 'You must set retainer amount before send a registration email.', 'advanced-gpt3-cv-builder' ),
				'selectcontract'						=> __( 'Select Contract', 'advanced-gpt3-cv-builder' ),
				'sure2logout'								=> __( 'Are you to Logout?', 'advanced-gpt3-cv-builder' ),
				'selectcontractwarn'				=> __( 'Please choose a contract to send the registration link. Once you have selected a contract and updated the form, you will be able to send the registration link.', 'advanced-gpt3-cv-builder' ),
				'subscription_toggled'			=> __( 'Thank you for submitting your request. We have reviewed and accepted it, and it is now pending for today. You will have the option to change your decision tomorrow. Thank you for your patience and cooperation.', 'advanced-gpt3-cv-builder' ),
				'rusure2unsubscribe'				=> __( 'You can only pause you retainer once every 60 days. Are you sure you want to pause your retainer?', 'advanced-gpt3-cv-builder' ),
				'rusure2subscribe'					=> __( 'We are super happy you want to resume your retainer. Are you sure you want to start now?', 'advanced-gpt3-cv-builder' ),
				'say2wait2pause'						=> __( 'You\'ve already paused your subscription this month. Please wait until 60 days over to pause again. If you need further assistance, please contact our administrative team.', 'advanced-gpt3-cv-builder' ),
			],
			'leadStatus'		=> apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/action/statuses', ['no-action' => __( 'No action fetched', 'advanced-gpt3-cv-builder' )], false )
		], (array) $args );
	}
	public function wp_denqueue_scripts() {}
	public function admin_denqueue_scripts() {
		// if( ! isset( $_GET[ 'page' ] ) ||  $_GET[ 'page' ] !='crm_dashboard' ) {return;}
		// wp_dequeue_script( 'qode-tax-js' );
	}

}