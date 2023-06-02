<?php
/**
 * Register Post Types
 *
 * @package AdvancedGPT3CVbuilder
 */
namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;
use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;
 
class Post_Types {
	use Singleton;
	protected function __construct() {
		$this->setup_hooks();
	}
	protected function setup_hooks() {
		add_action( 'init', [ $this, 'create_cv_cpt' ], 0 );
		add_filter( 'get_edit_post_link', [ $this, 'get_edit_post_link' ], 10, 3 );
		add_filter( 'post_link', [ $this, 'post_link' ], 10, 3 );
	}
	// Register Custom Post Type Resume
	public function create_cv_cpt() {
		$labels = [
			'name'                  => _x( 'Resumes', 'Post Type General Name', 'advanced-gpt3-cv-builder' ),
			'singular_name'         => _x( 'Resume', 'Post Type Singular Name', 'advanced-gpt3-cv-builder' ),
			'menu_name'             => _x( 'Resumes', 'Admin Menu text', 'advanced-gpt3-cv-builder' ),
			'name_admin_bar'        => _x( 'Resume', 'Add New on Toolbar', 'advanced-gpt3-cv-builder' ),
			'archives'              => __( 'Resume Archives', 'advanced-gpt3-cv-builder' ),
			'attributes'            => __( 'Resume Attributes', 'advanced-gpt3-cv-builder' ),
			'parent_item_colon'     => __( 'Parent Resume:', 'advanced-gpt3-cv-builder' ),
			'all_items'             => __( 'All Resumes', 'advanced-gpt3-cv-builder' ),
			'add_new_item'          => __( 'Add New Resume', 'advanced-gpt3-cv-builder' ),
			'add_new'               => __( 'Add New', 'advanced-gpt3-cv-builder' ),
			'new_item'              => __( 'New Resume', 'advanced-gpt3-cv-builder' ),
			'edit_item'             => __( 'Edit Resume', 'advanced-gpt3-cv-builder' ),
			'update_item'           => __( 'Update Resume', 'advanced-gpt3-cv-builder' ),
			'view_item'             => __( 'View Resume', 'advanced-gpt3-cv-builder' ),
			'view_items'            => __( 'View Resumes', 'advanced-gpt3-cv-builder' ),
			'search_items'          => __( 'Search Resume', 'advanced-gpt3-cv-builder' ),
			'not_found'             => __( 'Not found', 'advanced-gpt3-cv-builder' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'advanced-gpt3-cv-builder' ),
			'featured_image'        => __( 'Featured Image', 'advanced-gpt3-cv-builder' ),
			'set_featured_image'    => __( 'Set featured image', 'advanced-gpt3-cv-builder' ),
			'remove_featured_image' => __( 'Remove featured image', 'advanced-gpt3-cv-builder' ),
			'use_featured_image'    => __( 'Use as featured image', 'advanced-gpt3-cv-builder' ),
			'insert_into_item'      => __( 'Insert into Resume', 'advanced-gpt3-cv-builder' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Resume', 'advanced-gpt3-cv-builder' ),
			'items_list'            => __( 'Resumes list', 'advanced-gpt3-cv-builder' ),
			'items_list_navigation' => __( 'Resumes list navigation', 'advanced-gpt3-cv-builder' ),
			'filter_items_list'     => __( 'Filter Resumes list', 'advanced-gpt3-cv-builder' ),
		];
		$args   = [
			'label'               => __( 'Resume', 'advanced-gpt3-cv-builder' ),
			'description'         => __( 'The Resumes', 'advanced-gpt3-cv-builder' ),
			'labels'              => $labels,
			'menu_icon'           => esc_url( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_URI . '/icons/resume.svg' ),
			'supports'            => [
				'title',
				'editor',
				'excerpt',
				'thumbnail',
				'revisions',
				'author',
				'comments',
				'trackbacks',
				'page-attributes',
				'custom-fields',
			],
			'taxonomies'          => [],
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'show_in_rest'        => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		];
		register_post_type( 'resume', $args );
	}
	public function get_edit_post_link( $link, $post_id, $context ) {
		if( get_post_type( $post_id ) == 'resume' ) {
			$link = site_url( '/app/resumes/' . $post_id . '/edit/' );
		}
		return $link;
	}
	public function post_link( $permalink, $post, $leavename ) {
		if( get_post_type( $post->ID ) == 'resume' ) {
			$permalink = site_url( '/app/resumes/' . $post->ID . '/edit/' );
		}
		return $permalink;
	}

}
