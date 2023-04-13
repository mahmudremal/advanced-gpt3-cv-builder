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
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/filesystem/uploadavater', [ $this, 'uploadAvater' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/filesystem/removeavater', [ $this, 'removeavater' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/advancedgpt3cvbuilder/update/cv', [ $this, 'updateCV' ], 10, 0 );
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
		wp_send_json_success( __( 'Image removed successfully', 'domain' ) );
	}
	public function updateCV() {
		check_ajax_referer( 'futurewordpress/project/advancedgpt3cvbuilder/verify/nonce', '_nonce' );
		if( ! isset( $_POST[ 'cv_id' ] ) || empty( $_POST[ 'cv_id' ] ) ) {wp_send_json_error( __( 'CV not identified', 'domain' ), 200 );}
		$post_id = $_POST[ 'cv_id' ];
		$is_done = update_post_meta( $post_id, '_data', $_POST[ '_data' ] );
		if( ! is_wp_error( $is_done ) ) {
			wp_send_json_success( __( 'CV Updated Successfully', 'domain' ), 200 );
		} else {
			wp_send_json_error( $is_done->get_error_message() );
		}
	}
}
