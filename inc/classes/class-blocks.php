<?php
/**
 * Blocks
 *
 * @package AdvancedGPT3CVbuilder
 */

namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;

class Blocks {
	use Singleton;

	protected function __construct() {

		$this->setup_hooks();
	}

	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_filter( 'block_categories_all', [ $this, 'add_block_categories' ] );
	}

	/**
	 * Add a block category
	 *
	 * @param array $categories Block categories.
	 *
	 * @return array
	 */
	public function add_block_categories( $categories ) {

		$category_slugs = wp_list_pluck( $categories, 'slug' );

		return in_array( 'aquila', $category_slugs, true ) ? $categories : array_merge(
			$categories,
			[
				[
					'slug'  => 'aquila',
					'title' => __( 'Aquila Blocks', 'advanced-gpt3-cv-builder' ),
					'icon'  => 'table-row-after',
				],
			]
		);

	}

}
