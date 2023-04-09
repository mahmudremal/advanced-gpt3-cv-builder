<?php
/**
 * This plugin ordered by a client and done by Remal Mahmud (fiverr.com/mahmud_remal). Authority dedicated to that cient.
 *
 * @wordpress-plugin
 * Plugin Name:       Advanced GPT3 CV builder
 * Plugin URI:        https://github.com/mahmudremal/advanced-gpt3-cv-builder/
 * Description:       Client relationship management with Facebook lead generation, Calendly APi, Google APi and subscription system.
 * Version:           1.0.2
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Remal Mahmud
 * Author URI:        https://github.com/mahmudremal/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advanced-gpt3-cv-builder
 * Domain Path:       /languages
 * 
 * @package AdvancedGPT3CVbuilder
 * @author  Remal Mahmud (https://github.com/mahmudremal)
 * @version 1.0.2
 * @link https://github.com/mahmudremal/advanced-gpt3-cv-builder/
 * @category	WooComerce Plugin
 * @copyright	Copyright (c) 2023-25
 * 
 */

/**
 * Bootstrap the plugin.
 */



defined( 'ADVANCEDGPT3CVBUILDER_PROJECT__FILE__' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT__FILE__', untrailingslashit( __FILE__ ) );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH', untrailingslashit( plugin_dir_path( ADVANCEDGPT3CVBUILDER_PROJECT__FILE__ ) ) );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI', untrailingslashit( plugin_dir_url( ADVANCEDGPT3CVBUILDER_PROJECT__FILE__ ) ) );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_URI' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_URI', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI ) . '/assets/build' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_PATH' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_PATH', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH ) . '/assets/build' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_URI', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI ) . '/assets/build/js' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_DIR_PATH' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_JS_DIR_PATH', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH ) . '/assets/build/js' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_IMG_URI' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_IMG_URI', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI ) . '/assets/build/src/img' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_URI', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI ) . '/assets/build/css' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_CSS_DIR_PATH', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH ) . '/assets/build/css' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_LIB_URI', untrailingslashit( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_URI ) . '/assets/build/library' );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_ARCHIVE_POST_PER_PAGE' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_ARCHIVE_POST_PER_PAGE', 9 );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_SEARCH_RESULTS_POST_PER_PAGE' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_SEARCH_RESULTS_POST_PER_PAGE', 9 );
defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS' ) || define( 'ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS', get_option( 'advanced-gpt3-cv-builder' ) );

require_once ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH . '/inc/helpers/autoloader.php';
// require_once ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH . '/inc/helpers/template-tags.php';

if( ! function_exists( 'advancedgpt3cvbuilderproject_get_project_instance' ) ) {
	function advancedgpt3cvbuilderproject_get_project_instance() {\ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Project::get_instance();}
}
advancedgpt3cvbuilderproject_get_project_instance();



