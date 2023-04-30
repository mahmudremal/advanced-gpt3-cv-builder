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
		// wp_register_style( 'AdvancedGPT3CVbuilder-public', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI . '/public.css', [], $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH . '/public.css' ), 'all' );
		// wp_enqueue_style( 'AdvancedGPT3CVbuilder-public' );

		if( $this->allow_enqueue() ) {
			// wp_register_style( 'cvbuilder', 'https://universal-resume-a4.netlify.app/build.css', [], false, 'all' );
			// wp_register_style( 'flatpickr', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI . '/css/flatpickr.min.css', [], false, 'all' );
			wp_register_style( 'bootstrap', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI . '/css/bootstrap.min.css', [], false, 'all' );
			wp_register_style( 'AdvancedGPT3CVbuilder-forms', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI . '/css/resume-builder.css', [], false, 'all' );
			wp_register_style( 'AdvancedGPT3CVbuilder-builder', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI . '/builder.css', [], $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH . '/builder.css' ), 'all' );
			// Enqueue Styles.
			// wp_enqueue_style( 'cvbuilder' );
			// wp_enqueue_style( 'flatpickr' );


			// This scitprs are enqueued from template index file.
			// wp_enqueue_style( 'bootstrap' );
			// wp_enqueue_style( 'AdvancedGPT3CVbuilder-forms' );
			// wp_enqueue_style( 'AdvancedGPT3CVbuilder-builder' );
		}
	}
	public function register_scripts() {
		// Register scripts.
		$filemtime = $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_DIR_PATH . '/public.js' );
		wp_register_script( 'AdvancedGPT3CVbuilder-public', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI . '/public.js?v=' . $filemtime, ['jquery'], $filemtime, true );
		// Enqueue Scripts.
		wp_enqueue_script( 'AdvancedGPT3CVbuilder-public' );
		if( $this->allow_enqueue() ) {
			$filemtime = $this->filemtime( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_DIR_PATH . '/builder.js' );
			wp_register_script( 'AdvancedGPT3CVbuilder-builder', ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI . '/builder.js?v=' . $filemtime, ['jquery'], $filemtime, true );
			
			// This scitprs are enqueued from template index file.
			// wp_enqueue_script( 'AdvancedGPT3CVbuilder-builder' );
		}
		wp_localize_script( 'AdvancedGPT3CVbuilder-public', 'fwpSiteConfig', apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/javascript/siteconfig', [
			// 'videoClips'		=> [],
		] ) );
	}
	private function allow_enqueue() {
		return true;
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
			// 'videoClips'  		=> ( function_exists( 'WC' ) && WC()->session !== null ) ? (array) WC()->session->get( 'uploaded_files_to_archive' ) : [],
			'i18n'					=> [
				'resume_title'          => __( 'Give here a resume title', 'advanced-gpt3-cv-builder' ),
				'create_cv'             => __( 'Create Resume', 'advanced-gpt3-cv-builder' ),
			],
			// 'leadStatus'		=> apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/action/statuses', ['no-action' => __( 'No action fetched', 'advanced-gpt3-cv-builder' )], false )
		], (array) $args );
	}
	public function wp_denqueue_scripts() {}
	public function admin_denqueue_scripts() {
		// if( ! isset( $_GET[ 'page' ] ) ||  $_GET[ 'page' ] !='crm_dashboard' ) {return;}
		// wp_dequeue_script( 'qode-tax-js' );
	}

}