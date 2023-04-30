<?php
/**
 * Theme Sidebars.
 *
 * @package AdvancedGPT3CVbuilder
 */
namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;
use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;
/**
 * Class Widgets.
 */
class Rewrite {
	use Singleton;
	/**
	 * Construct method.
	 */
	protected function __construct() {
		$this->setup_hooks();
	}
	/**
	 * To register action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		/**
		 * Actions
		 */
		add_action( 'init', [ $this, 'init' ], 10, 1 );
		add_filter( 'query_vars', [ $this, 'query_vars' ], 10, 1 );
		add_filter( 'template_include', [ $this, 'template_include' ], 10, 1 );
	}
  public function init() {
		add_rewrite_rule( 'app/resumes/([^/]*)/edit/?', 'index.php?app_resumes=$matches[1]&redirect=true', 'top' );
  }
	public function query_vars( $query_vars  ) {
		$query_vars[] = 'app_resumes';
    return $query_vars;
	}
	public function template_include( $template ) {
    $app_resumes = get_query_var( 'app_resumes' );// $order_id = get_query_var( 'order_id' );
		if ( $app_resumes == false || $app_resumes == '' ) {
      return $template;
    } else {
			$file = ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH . '/templates/public/index.php';
			if( file_exists( $file ) && ! is_dir( $file ) ) {
          return $file;
        } else {
          return $template;
        }
		}
	}
}
