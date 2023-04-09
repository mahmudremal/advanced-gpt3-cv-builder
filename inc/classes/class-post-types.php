<?php
/**
 * Register Post Types
 *
 * @package AdvancedGPT3CVbuilder
 */

namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;
 
class PostTypes {
	use Singleton;

	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_action( 'init', [ $this, 'create_movie_cpt' ], 0 );

	}

	// Register Custom Post Type Movie
	public function create_movie_cpt() {

		$labels = [
			'name'                  => _x( 'Movies', 'Post Type General Name', 'advanced-gpt3-cv-builder' ),
			'singular_name'         => _x( 'Movie', 'Post Type Singular Name', 'advanced-gpt3-cv-builder' ),
			'menu_name'             => _x( 'Movies', 'Admin Menu text', 'advanced-gpt3-cv-builder' ),
			'name_admin_bar'        => _x( 'Movie', 'Add New on Toolbar', 'advanced-gpt3-cv-builder' ),
			'archives'              => __( 'Movie Archives', 'advanced-gpt3-cv-builder' ),
			'attributes'            => __( 'Movie Attributes', 'advanced-gpt3-cv-builder' ),
			'parent_item_colon'     => __( 'Parent Movie:', 'advanced-gpt3-cv-builder' ),
			'all_items'             => __( 'All Movies', 'advanced-gpt3-cv-builder' ),
			'add_new_item'          => __( 'Add New Movie', 'advanced-gpt3-cv-builder' ),
			'add_new'               => __( 'Add New', 'advanced-gpt3-cv-builder' ),
			'new_item'              => __( 'New Movie', 'advanced-gpt3-cv-builder' ),
			'edit_item'             => __( 'Edit Movie', 'advanced-gpt3-cv-builder' ),
			'update_item'           => __( 'Update Movie', 'advanced-gpt3-cv-builder' ),
			'view_item'             => __( 'View Movie', 'advanced-gpt3-cv-builder' ),
			'view_items'            => __( 'View Movies', 'advanced-gpt3-cv-builder' ),
			'search_items'          => __( 'Search Movie', 'advanced-gpt3-cv-builder' ),
			'not_found'             => __( 'Not found', 'advanced-gpt3-cv-builder' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'advanced-gpt3-cv-builder' ),
			'featured_image'        => __( 'Featured Image', 'advanced-gpt3-cv-builder' ),
			'set_featured_image'    => __( 'Set featured image', 'advanced-gpt3-cv-builder' ),
			'remove_featured_image' => __( 'Remove featured image', 'advanced-gpt3-cv-builder' ),
			'use_featured_image'    => __( 'Use as featured image', 'advanced-gpt3-cv-builder' ),
			'insert_into_item'      => __( 'Insert into Movie', 'advanced-gpt3-cv-builder' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Movie', 'advanced-gpt3-cv-builder' ),
			'items_list'            => __( 'Movies list', 'advanced-gpt3-cv-builder' ),
			'items_list_navigation' => __( 'Movies list navigation', 'advanced-gpt3-cv-builder' ),
			'filter_items_list'     => __( 'Filter Movies list', 'advanced-gpt3-cv-builder' ),
		];
		$args   = [
			'label'               => __( 'Movie', 'advanced-gpt3-cv-builder' ),
			'description'         => __( 'The movies', 'advanced-gpt3-cv-builder' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-video-alt',
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

		register_post_type( 'movies', $args );

	}


}
