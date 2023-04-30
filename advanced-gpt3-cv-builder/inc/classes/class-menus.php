<?php
/**
 * Register Menus
 *
 * @package AdvancedGPT3CVbuilder
 */
namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;
use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;
class Menus {
	use Singleton;
	protected function __construct() {
		// load class.
		$this->setup_hooks();
	}
	protected function setup_hooks() {
		/**
		 * Actions.
		 */
		// add_action( 'init', [ $this, 'register_menus' ] );
		
    add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/settings/general', [ $this, 'general' ], 10, 1 );
    add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/settings/fields', [ $this, 'menus' ], 10, 1 );
		add_action( 'in_admin_header', [ $this, 'in_admin_header' ], 100, 0 );
	}
	public function register_menus() {
		register_nav_menus([
			'aquila-header-menu' => esc_html__( 'Header Menu', 'advanced-gpt3-cv-builder' ),
			'aquila-footer-menu' => esc_html__( 'Footer Menu', 'advanced-gpt3-cv-builder' ),
		]);
	}
	/**
	 * Get the menu id by menu location.
	 *
	 * @param string $location
	 *
	 * @return integer
	 */
	public function get_menu_id( $location ) {
		// Get all locations
		$locations = get_nav_menu_locations();
		// Get object id by location.
		$menu_id = ! empty($locations[$location]) ? $locations[$location] : '';
		return ! empty( $menu_id ) ? $menu_id : '';
	}
	/**
	 * Get all child menus that has given parent menu id.
	 *
	 * @param array   $menu_array Menu array.
	 * @param integer $parent_id Parent menu id.
	 *
	 * @return array Child menu array.
	 */
	public function get_child_menu_items( $menu_array, $parent_id ) {
		$child_menus = [];
		if ( ! empty( $menu_array ) && is_array( $menu_array ) ) {
			foreach ( $menu_array as $menu ) {
				if ( intval( $menu->menu_item_parent ) === $parent_id ) {
					array_push( $child_menus, $menu );
				}
			}
		}
		return $child_menus;
	}
	public function in_admin_header() {
		if( ! isset( $_GET[ 'page' ] ) || $_GET[ 'page' ] != 'crm_dashboard' ) {return;}
		
		remove_all_actions('admin_notices');
		remove_all_actions('all_admin_notices');
		// add_action('admin_notices', function () {echo 'My notice';});
	}
	/**
	 * Supply necessry tags that could be replace on frontend.
	 * 
	 * @return string
	 * @return array
	 */
	public function commontags( $html = false ) {
		$arg = [];$tags = [
			'username', 'sitename', 
		];
		if( $html === false ) {return $tags;}
		foreach( $tags as $tag ) {
			$arg[] = sprintf( "%s{$tag}%s", '<code>{', '}</code>' );
		}
		return implode( ', ', $arg );
	}
	public function contractTags( $tags ) {
		$arg = [];
		foreach( $tags as $tag ) {
			$arg[] = sprintf( "%s{$tag}%s", '<code>{', '}</code>' );
		}
		return implode( ', ', $arg );
	}

  /**
   * WordPress Option page.
   * 
   * @return array
   */
	public function general( $args ) {
		return $args;
	}
	public function menus( $args ) {
    // get_FwpOption( 'key', 'default' ) | apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'key', 'default' )
		// is_FwpActive( 'key' ) | apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/isactive', 'key' )
		$args = [];
		$args['standard'] 		= [
			'title'							=> __( 'General', 'advanced-gpt3-cv-builder' ),
			'description'				=> __( 'Generel fields commonly used to changed.', 'advanced-gpt3-cv-builder' ),
			'fields'						=> [
				[
					'id' 						=> 'general-enable',
					'label'					=> __( 'Enable', 'advanced-gpt3-cv-builder' ),
					'description'		=> __( 'Mark to enable function of this Plugin.', 'advanced-gpt3-cv-builder' ),
					'type'					=> 'checkbox',
					'default'				=> true
				],
			]
		];
		$args['openai'] 		= [
			'title'							=> __( 'General', 'advanced-gpt3-cv-builder' ),
			'description'				=> __( 'Generel fields commonly used to changed.', 'advanced-gpt3-cv-builder' ),
			'fields'						=> [
				[
					'id' 						=> 'openai-key',
					'label'					=> __( 'API key', 'advanced-gpt3-cv-builder' ),
					'description'		=> sprintf( __( 'Give here the api key that you could %sfind here.%s', 'advanced-gpt3-cv-builder' ), '', '' ),
					'type'					=> 'text',
					'default'				=> ''
				],
			]
		];
		return $args;
	}
}

/**
 * {{client_name}}, {{client_address}}, {{todays_date}}, {{retainer_amount}}
 */
