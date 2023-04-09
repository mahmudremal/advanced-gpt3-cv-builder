<?php
/**
 * WP E-Signature integration plugin.
 *
 * @package AdvancedGPT3CVbuilder
 */

namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;

use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;
use \WP_Query;

class Esign {

	use Singleton;
	private $prefix;

	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	protected function setup_hooks() {
		$this->prefix = 'esig';
		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/contract/pdfcontent', [ $this, 'pdfContent' ], 10, 2 );
		add_filter( 'esignature_content', [ $this, 'esignature_content' ], 10, 2 ); // C:\workspace\New folder\e-signature\e-signature\models\Document.php: 52
		
		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/action/contractforms', [ $this, 'contractForms' ], 10, 2 );
		// add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/action/contractforms', [ $this, 'contractForms' ], 10, 2 );
		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/esign/userdocument', [ $this, 'getLastDocument' ], 10, 2 );
		add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/action/contracts', [ $this, 'contracts' ], 10, 2 ); // C:\workspace\New folder\e-signature\e-signature\models\Document.php: 52
		
		add_action( 'esig_reciepent_edit', [ $this, 'esig_reciepent_edit' ], 10, 1 );
		// add_action( 'init', [ $this, 'wp_init' ], 10, 0 );
	}
	public function get_documentmeta( $doc_id, $meta_key ) {
		global $wpdb;$meta_key = $this->prefix . $meta_key;
		$document = $wpdb->get_row( $wpdb->prepare( "SELECT meta_value FROM {$wpdb->prefix}esign_documents_meta WHERE document_id=%s AND meta_key=%s LIMIT 1", $doc_id, $meta_key ) );
		return $document->meta_value;
	}
	public function add_documentmeta( $doc_id, $meta_key, $meta_value ) {
		global $wpdb;$meta_key = $this->prefix . $meta_key;
		$document = $wpdb->get_row( $wpdb->prepare( "INSERT INTO {$wpdb->prefix}esign_documents_meta set document_id=%s, meta_key=%s, meta_value=%s LIMIT 1", $doc_id, $meta_key, $meta_value ) );
		return $wpdb->insert_id;
	}
	public function update_documentmeta( $doc_id, $meta_key, $meta_value ) {
		global $wpdb;$meta_key = $this->prefix . $meta_key;
		$document = $wpdb->get_row( $wpdb->prepare( "UPDATE {$wpdb->prefix}esign_documents_meta SET meta_value=%s WHERE document_id=%s LIMIT 1", $meta_value, $doc_id ) );
	}
	public function handleNewDocument( $args, $doc = false ) {
		global $wpdb;
		$document = $wpdb->get_row( $wpdb->prepare( "SELECT user_id FROM {$wpdb->prefix}esign_documents WHERE document_id=%s LIMIT 1", $doc ) );
		if( is_wp_error( $document ) ) {return $args;}
		$userInfo = get_user_by( 'id', $document->user_id );
		$userMeta = array_map( function( $a ){ return $a[0]; }, (array) get_user_meta( $userInfo->ID ) );
		$userInfo = (object) wp_parse_args( $userInfo, [
				'id'            => '',
				'meta'          => (object) wp_parse_args( $userMeta, apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/usermeta/defaults', (array) $userMeta ) )
		] );
		$replace = [
			empty( $userInfo->meta->first_name . $userInfo->meta->last_name ) ? $userInfo->data->display_name : $userInfo->meta->first_name . ' ' . $userInfo->meta->last_name,
			! empty( $userInfo->meta->address1 ) ? $userInfo->meta->address1 : ( ! empty( $userInfo->meta->address2 ) ? $userInfo->meta->address2 : apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-addressplaceholder', '' ) ),
			wp_date( apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-dateformat', '' ), strtotime( date( 'Y-M-d' ) ) ),
			! empty( $userInfo->meta->monthly_retainer ) ? $userInfo->meta->monthly_retainer : apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'signature-emptyrrtainer', '' ),
		];
		return $userInfo;
	}
	public function pdfContent( $args, $doc = false ) {
		$userInfo = $this->handleNewDocument( $args, $doc );
		$args = [
			'{{client_name}}',
			'{{client_address}}',
			'{{todays_date}}',
			'{{retainer_amount}}',
			'{{site_name}}',
			// " with a street address of <u>Alabama\nUnited States of America\n</u>"
		];
		$replace = [
			$this->get_documentmeta( $doc, 'client_name' ),
			$this->get_documentmeta( $doc, 'client_address' ),
			$this->get_documentmeta( $doc, 'todays_date' ),
			$this->get_documentmeta( $doc, 'retainer_amount' ),
			get_option( 'blogname', 'We Make Content' ),
			// ''
		];
		// print_r( [ $doc, $document, $userInfo, $args, $replace ] );wp_die();
		return [ $args, $replace ];
	}
	/**
	 * I've to over write esignature plugin's core file.
	 * File path is C:\workspace\New folder\e-signature\e-signature\add-ons\esig-save-as-pdf\admin\esig-pdf-admin.php
	 * Here I've to insert a filter before content on line number: 202
	 * $content = apply_filters('futurewordpress/project/advancedgpt3cvbuilder/hooks/esignpdfcontent', $unfiltered_content, [ $document_id,$document ] ); //  $unfiltered_content //apply_filters('the_content', $unfiltered_content);
	 * 
	 * Everytime Updating this e-signature plugin, we've to manually update this line.
	 */
	public function esignature_content( $unfiltered_content, $args ) {
		$replace = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/contract/pdfcontent', [], $args );
		$unfiltered_content = str_replace( $replace[0], $replace[1], $unfiltered_content );
		// wp_die( $unfiltered_content );
		return $unfiltered_content;
	}

	public function contractForms( $default, $special = false ) {
		$default = [];
		// $docs = get_posts( [
		// 	'post_type'					=> 'wpforms',
		// 	'post_status'				=> 'publish'
		// ] );
		// foreach( $docs as $doc ) {
		// 	$default[ $doc->ID ] = $doc->post_title;
		// }
		for( $i = 1;$i <= apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'regis-rows', 3 ); $i++ ) {
			$default[ $i ] = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'regis-link-title-' . $i, 'Link title #' . $i );
		}
		return $default;
	}
	public function contracts( $default, $special = false ) {
		if( ! class_exists( 'esig_templates' ) ) {return $default;}
		$temp_obj = new \esig_templates();$default = [];
		$documents = $temp_obj->get_template_list('esig_template');
		// print_r( $documents );wp_die();
		foreach ($documents as $template) {
			if (class_exists('ESIG_USR_ADMIN')) {

				$document_allow = apply_filters('esig-sender-roles-permission', $template->document_id, $template->user_id);
				$default[ $template->document_id ] = $template->document_title;

				if ($document_allow) {
					$default[ $template->document_id ] = $template->document_title;
				}
			} else {
				$default[ $template->document_id ] = $template->document_title;
			}
		}
		return $default;
	}

	public function esig_reciepent_edit( $args ) {
		// $args = 'document_id' => $document_id, 'post' => $_POST 
		$request = $args[ 'post' ];$terms = [ 'client_name', 'client_address', 'todays_date', 'retainer_amount' ];
		foreach( $terms as $term ) {
			if( $this->get_documentmeta( $args[ 'document_id' ], $term ) ) {
				$this->update_documentmeta( $args[ 'document_id' ], $term, $request );
			} else {
				$id = $this->add_documentmeta( $args[ 'document_id' ], $term, $request );
			}
		}
	}
	public function getLastDocument( $default, $userInfo ) {
		global $wpdb;
		// $doc = $wpdb->get_results( $wpdb->prepare( "SELECT doc.document_id, user.ID FROM {$wpdb->prefix}esign_documents doc LEFT JOIN {$wpdb->prefix}users user ON doc.user_id=user.ID WHERE doc.user_id=%d AND doc.document_status=%s ORDER BY doc.document_id DESC LIMIT 0, 1;", $userInfo->ID, 'signed' ) );
		// $doc = $wpdb->get_results( $wpdb->prepare( "SELECT document_id FROM {$wpdb->prefix}esign_documents WHERE user_id=%d AND document_status=%s ORDER BY document_id DESC LIMIT 0, 1;", $userInfo->ID, 'signed' ) );

		/**
		 * document status should be "signed" on first argument if we want to get only last signed document.
		 * But if we want to know if last document is signed or not.
		 * So I make is like, document status is not equal empty or random (eg. trash).
		 * du.user_id=%d OR  $userInfo->ID,
		 */
		$prepared = $wpdb->prepare( "SELECT du.user_id AS esign_user_id, du.signer_name, du.signer_email, ed.document_id, ed.document_type, ed.document_status, ed.document_uri, ed.last_modified, wu.ID AS user_id, eu.wp_user_id, eu.user_email, ed.document_checksum, ei.invite_hash FROM {$wpdb->prefix}esign_document_users du LEFT JOIN {$wpdb->prefix}esign_documents ed ON ed.document_id=du.document_id LEFT JOIN {$wpdb->prefix}esign_users eu ON eu.user_id=du.user_id LEFT JOIN {$wpdb->prefix}users wu ON wu.user_email=eu.user_email LEFT JOIN {$wpdb->prefix}esign_invitations ei ON ei.document_id=ed.document_id WHERE ed.document_status!=%s AND du.signer_email=%s ORDER BY ed.document_id DESC LIMIT 0, 1;", 'trash', ( ! empty( $userInfo->data->user_email ) ? $userInfo->data->user_email : $userInfo->meta->email ) );
		$doc = $wpdb->get_results( $prepared );
		// print_r( $prepared );print_r( $doc );
		$doc = isset( $doc[0] ) ? $doc[0] : $doc;
		if( $doc->document_id ) {
			if( false && $doc->user_id !== $doc->wp_user_id ) {
				$wpdb->update( $wpdb->prefix . 'esign_users', [
					'wp_user_id'				=> $doc->user_id,
					'is_signer'					=> 1
				], [
					'wp_user_id'				=> $doc->wp_user_id,
					'user_email'				=> $doc->user_email
				] );
			}
			$hash = base64_encode( json_encode( [
				'invite'				=> $doc->invite_hash,
				'csum'					=> $doc->document_checksum
			] ) );
			$doc->permalink = site_url( '/e-signature-document/?wpesig=' . $hash );
			return $doc;
		} else {
			return $default;
		}
	}

}
