<?php
/**
 * LoadmorePosts
 *
 * @package AdvancedGPT3CVbuilder
 */

namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;
use \WP_Query;

class Cv {

	use Singleton;

	protected function __construct() {
		// load class.
		$this->setup_hooks();
	}
	protected function setup_hooks() {
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/cv/create', [ $this, 'cvCreate' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_futurewordpress/project/advancedgpt3cvbuilder/cv/create', [ $this, 'cvCreate' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/filesystem/uploadavater', [ $this, 'uploadAvater' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_futurewordpress/project/advancedgpt3cvbuilder/filesystem/uploadavater', [ $this, 'uploadAvater' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/filesystem/removeavater', [ $this, 'removeavater' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_futurewordpress/project/advancedgpt3cvbuilder/filesystem/removeavater', [ $this, 'removeavater' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/cv/update', [ $this, 'updateCV' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_futurewordpress/project/advancedgpt3cvbuilder/cv/update', [ $this, 'updateCV' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/cv/templates', [ $this, 'cvTemplates' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_futurewordpress/project/advancedgpt3cvbuilder/cv/templates', [ $this, 'cvTemplates' ], 10, 0 );
	}
	public function uploadAvater() {
		check_ajax_referer( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce', '_nonce' );
		$cv_id = $_POST[ 'cv_id' ];
		$upload_dir = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/filesystem/uploaddir', false );
		$_avatar = get_post_meta( $cv_id, '_avatar', true );
		$oldFilePATH = str_replace( [site_url('/')], [ABSPATH], $_avatar );
		if( $oldFilePATH && ! empty( $oldFilePATH ) && file_exists( $oldFilePATH ) && ! is_dir( $oldFilePATH ) ) {
			unlink( $oldFilePATH );
		}
		$randomstring = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/filter/string/random', '', 10 );
		$newFileName = time() . '-' . $randomstring . '-' . $_FILES[ 'avater' ][ 'name' ];
		// wp_send_json_success( $newFileName );
		if( $upload_dir && move_uploaded_file( $_FILES[ 'avater' ][ 'tmp_name' ], $upload_dir . '/' . $newFileName ) ) {
			$newFileURL = str_replace( [ABSPATH], [site_url('/')], $upload_dir . '/' . $newFileName );
			update_post_meta( $cv_id, '_avatar', $newFileURL );
			// '<img src="' . $newFileURL . '" alt="" class="mr-2" height="30px" width="auto" />' . 
			wp_send_json_success( __( 'Profile Image Updated Successfully.', 'advanced-gpt3-cv-builder' ), 200 );
		} else {
			wp_send_json_error( __( 'Profile Image upload failed.', 'advanced-gpt3-cv-builder' ) );
		}
	}
	public function removeavater() {
		check_ajax_referer( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce', '_nonce' );
		$cv_id = $_POST[ 'cv_id' ];
		$upload_dir = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/filesystem/uploaddir', false );
		$_avatar = get_post_meta( $cv_id, '_avatar', true );
		$oldFilePATH = str_replace( [site_url('/')], [ABSPATH], $_avatar );
		if( $oldFilePATH && ! empty( $oldFilePATH ) && file_exists( $oldFilePATH ) && ! is_dir( $oldFilePATH ) ) {unlink( $oldFilePATH );}
		delete_post_meta( $cv_id, '_avatar', $_avatar );
		wp_send_json_success( __( 'Image removed successfully', 'advanced-gpt3-cv-builder' ) );
	}
	public function updateCV() {
		check_ajax_referer( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce', '_nonce' );
		if( ! isset( $_POST[ 'cv_id' ] ) || empty( $_POST[ 'cv_id' ] ) ) {wp_send_json_error( __( 'CV not identified', 'advanced-gpt3-cv-builder' ), 200 );}
		$post_id = $_POST[ 'cv_id' ];
		$is_done = update_post_meta( $post_id, '_data', $_POST[ '_data' ] );
		if( ! is_wp_error( $is_done ) ) {
			wp_send_json_success( isset( $_POST[ '_nomsg' ] ) ? [] : __( 'CV Updated Successfully', 'advanced-gpt3-cv-builder' ), 200 );
		} else {
			wp_send_json_error( $is_done->get_error_message() );
		}
	}
	public function cvTemplates() {
		check_ajax_referer( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce', '_nonce' );
		if( ! isset( $_POST[ 'cv_id' ] ) || empty( $_POST[ 'cv_id' ] ) ) {wp_send_json_error( __( 'CV not identified.', 'advanced-gpt3-cv-builder' ), 200 );}
		$post_id = $_POST[ 'cv_id' ];$cvTemplates = [];
		$has_meta = get_post_meta( $post_id, '_data', true );
		if( ! is_wp_error( $has_meta ) ) {
			include_once ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH . '/templates/cv/index.php';
			$args = (array) json_decode( $has_meta, true );
			$args[ 'cv' ] = isset( $args[ 'cv' ] ) ? $args[ 'cv' ] : [];
			$args[ 'tools' ] = [
				'templates' => $cvTemplates,
				'fonts' => [
					['title' => 'Montserrat','font' => "'Montserrat', sans-serif",'weights' => [],'url' => 'https://fonts.googleapis.com/css?family=Montserrat'],
					['title' => 'Lora','font' => "'Lora', serif",'weights' => [],'url' => 'https://fonts.googleapis.com/css?family=Lora'],
					['title' => 'Open Sans','font' => "'Open Sans', sans-serif",'weights' => [],'url' => 'https://fonts.googleapis.com/css?family=Open+Sans'],
					['title' => 'Roboto Slab','font' => "'Roboto Slab', serif",'weights' => [],'url' => 'https://fonts.googleapis.com/css?family=Roboto+Slab'],
					['title' => 'EB Garamond','font' => "'EB Garamond', serif",'weights' => [],'url' => 'https://fonts.googleapis.com/css?family=EB+Garamond'],
					['title' => 'Great Vibes','font' => "'Great Vibes', cursive",'weights' => [],'url' => 'https://fonts.googleapis.com/css?family=Great+Vibes'],
					['title' => 'Raleway','font' => "'Raleway', sans-serif",'weights' => ['bold'],'url' => 'https://fonts.googleapis.com/css?family=Raleway'],
				],
				'fontsizes' => [
					['title' => 'XXL','size' => 1.75],
					['title' => 'XL','size' => 1.5],
					['title' => 'X','size' => 1.25],
					['title' => 'M','size' => 1],
					['title' => 'S','size' => 0.75],
					['title' => 'XS','size' => 0.5],
					['title' => 'XXS','size' => 0.25],
				],
				'lineheights' => [
					['title' => 1.8,'height' => 1.8],
					['title' => 1.6,'height' => 1.6],
					['title' => 1.4,'height' => 1.4],
					['title' => 1.2,'height' => 1.2],
					['title' => 1.0,'height' => 1.0],
					['title' => 0.8,'height' => 0.8],
					['title' => 0.6,'height' => 0.6],
					['title' => 0.4,'height' => 0.4],
					['title' => 0.2,'height' => 0.2],
				]
			];
			$args[ 'hooks' ] = [ 'cvTemplateUpdated' ];
			wp_send_json_success( $args, 200 );
		} else {
			wp_send_json_error( $has_meta->get_error_message() );
		}
	}
	public function cvCreate() {
		check_ajax_referer( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce', '_nonce' );
		$return = wp_insert_post( [
			'post_title'    => __( 'My Resume', 'advanced-gpt3-cv-builder' ),
			'post_content'  => '',
			'post_status'   => 'publish',
			'post_type'   	=> 'resume',
			'post_author'   => 1,
			'post_category' => array( 8,39 )
		], true );
		if( ! is_wp_error( $return ) ) {
			$json = file_get_contents( ADVANCEDGPT3CVBUILDER_PROJECT_DIR_PATH . '/templates/cv/first-meta.json' );
			$is_done = update_post_meta( $return, '_data', $json );
			wp_send_json_success( [
				'message' => __( 'Great job! Your resume has been created successfully. We are now redirecting you to the CV builder screen. Please wait for a moment while we take you there.', 'advanced-gpt3-cv-builder' ),
				'hooks'   => [ 'cv-crearted-success-do-redirect' ],
				'cv'			=> $return,
				'edit'		=> site_url( '/app/resumes/' . $return . '/edit/' )
			] );
		} else {
			wp_send_json_error( __( 'Failed to create resume. ' . $return->get_error_message(), 'advanced-gpt3-cv-builder' ) );
		}
	}
}
