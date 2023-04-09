<?php
/**
 * Custom template tags for the theme.
 *
 * @package AdvancedGPT3CVbuilder
 */
if( ! function_exists( 'is_FwpActive' ) ) {
  function is_FwpActive( $opt ) {
    if( ! defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS' ) ) {return false;}
    return ( isset( ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS[ $opt ] ) && ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS[ $opt ] == 'on' );
  }
}
if( ! function_exists( 'get_FwpOption' ) ) {
  function get_FwpOption( $opt, $def = false ) {
    if( ! defined( 'ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS' ) ) {return false;}
    return isset( ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS[ $opt ] ) ? ADVANCEDGPT3CVBUILDER_PROJECT_OPTIONS[ $opt ] : $def;
  }
}