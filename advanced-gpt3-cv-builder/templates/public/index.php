<?php
/**
 * Checkout video clip shortner template.
 * 
 * @package AdvancedGPT3CVbuilder
 */

global $the_cv_id;global $app_resumes;global $userInfo;global $errorHappens;
$app_resumes = get_query_var( 'app_resumes' );$the_cv_id = $app_resumes;
$meta = get_post_meta( $the_cv_id, '_data', true );$meta = json_decode( $meta, true );$meta = isset( $meta[ 'cv' ] ) ? $meta[ 'cv' ] : $meta;
// $cv = array_map( function( $a ){ return $a[0]; }, (array) get_post_meta( $the_cv_id, '_data', true ) );
$cv = (object) wp_parse_args( (array) $meta, [ 'info' => [], 'edu' => [], 'exp' => [], 'skl' => [], 'inrts' => [], 'lng' => [], 'scl' => [], 'hby' => [], 'ref' => [], 'sact' => [] ] );

$all_edus = $cv->edu;$all_exps = $cv->exp;$all_skills = $cv->skl;$all_interests = $cv->inrts;$all_languages = $cv->lng;$all_socials = $cv->scl;$all_hobbies = $cv->hby;$all_references = $cv->ref;$all_sacts = $cv->sact;

$avater = get_post_meta( $the_cv_id, '_avatar', true );
$avater = ( $avater && ! empty( $avater ) ) ? $avater : 'https://geeko.netlify.app/img/test-img/1.jpg';
$trashIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636" stroke="#464455" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// var_dump( $cv );
add_filter( 'futurewordpress/project/advancedgpt3cvbuilder/javascript/siteconfig', function( $args ) {
  $args = wp_parse_args( [
    'i18n'					=> [],
  ], (array) $args );
  $args[ 'i18n' ] = wp_parse_args( [
    'hi'      => __( 'Hi', 'advanced-gpt3-cv-builder' ),
    'removeimg'  => __( 'Remove Image', 'advanced-gpt3-cv-builder' ),
    'rusure'  => __( 'Are you sure?', 'advanced-gpt3-cv-builder' ),
    'plsconfirm'  => __( 'Please confirm if you want to remove your profile image by selecting "Remove Image" or dismiss this message by selecting "Cancel".', 'advanced-gpt3-cv-builder' ),

    
    // 'school_education'  => __( 'School education', 'advanced-gpt3-cv-builder' ),
    // 'birthday__'  => __( 'Birthday:', 'advanced-gpt3-cv-builder' ),
    // 'address__'  => __( 'Address:', 'advanced-gpt3-cv-builder' ),
    // 'email__'  => __( 'Email:', 'advanced-gpt3-cv-builder' ),
    // 'tel__'  => __( 'Tel:', 'advanced-gpt3-cv-builder' ),
    // 'professional_experience'  => __( 'Professional experience', 'advanced-gpt3-cv-builder' ),
    // 'abilities'  => __( 'Abilities', 'advanced-gpt3-cv-builder' ),
    // 'languages'  => __( 'Languages', 'advanced-gpt3-cv-builder' ),

    // 'personal_details'  => __( 'Personal details', 'advanced-gpt3-cv-builder' ),
    // 'email__'  => __( 'Email:', 'advanced-gpt3-cv-builder' ),
    // 'arbeitsreferenzen'  => __( 'Arbeitsreferenzen', 'advanced-gpt3-cv-builder' ),
    // 'contact_details'  => __( 'Contact details', 'advanced-gpt3-cv-builder' ),
    // 'competencies'  => __( 'Competencies', 'advanced-gpt3-cv-builder' ),
    // 'professional_career'  => __( 'Professional career', 'advanced-gpt3-cv-builder' ),
    // 'academic_career'  => __( 'Academic career', 'advanced-gpt3-cv-builder' ),

    // 'work_experience'  => __( 'Work experience', 'advanced-gpt3-cv-builder' ),
    // 'skills_and_knowledge'  => __( 'Skills and knowledge', 'advanced-gpt3-cv-builder' ),
    // 'my_education'  => __( 'My education', 'advanced-gpt3-cv-builder' ),
    // 'volunteering'  => __( 'Volunteering', 'advanced-gpt3-cv-builder' ),
    
  ], (array) $args[ 'i18n' ] );
  return $args;
}, 10, 1 );
wp_enqueue_style( 'bootstrap' );wp_enqueue_style( 'AdvancedGPT3CVbuilder-forms' );wp_enqueue_style( 'AdvancedGPT3CVbuilder-builder' );
wp_enqueue_script( 'AdvancedGPT3CVbuilder-builder' );

add_filter( 'pre_get_document_title', function( $title ) {
  $cv_title = get_the_title( get_query_var( 'app_resumes' ) );
  return $cv_title . ' | ' . $title;
}, 99, 1 );
get_header();
  ?>
  <section class="blog-area">
    <div class="container-fluid">

      <div class="cvbuilderscreen">
        <div class="formscreen">
          <div class="formscreen__wrapper">
            <?php $cv->info = (object) wp_parse_args( $cv->info, ['given_name' => '', 'family_name' => '', 'tagline' => '', 'birth' => '', 'address' => '', 'phone' => '', 'email' => '', 'website' => '', 'nationality' => '', 'residence' => '', 'zivilstand' => '', 'children' => '', 'bio' => '' ] );
            $cv->info->birth = ( $cv->info->birth == 'YYYY-MM-DD' ) ? 'today' : $cv->info->birth;
            ?>
            <form method="post" action="#" name="cvbuilder" id="cvbuilder" data-cv="<?php echo esc_attr( $the_cv_id ); ?>">
              <div class="mt-10">
                <h2><?php esc_html_e( 'Personal Info', 'domian' ); ?></h2>
                <div class="block-c--ontainer">
                  <div class="avater-select-wrap" data-field="avater">
                    <div class="row align-items-center">
                      <div class="col-6 col-lg-4 col-md-5 relative">
                        <div class="avater-preview-area">
                          <img src="<?php echo esc_url( $avater ); ?>" class="d-block profile-image-upload-preview" alt="" data-default="<?php echo esc_url( 'https://geeko.netlify.app/img/test-img/1.jpg' ); ?>">
                          <div class="avater-change-buttons">
                            <div class="avater-change-single">
                              <label for="profile-image-upload" class="file relative m-auto" title="<?php esc_attr_e( 'Upload', 'domian' ); ?>">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 24 24"><path d="M3,9A1,1,0,0,0,4,8V5A1,1,0,0,1,5,4H8A1,1,0,0,0,8,2H5A3,3,0,0,0,2,5V8A1,1,0,0,0,3,9ZM8,20H5a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H8a1,1,0,0,0,0-2ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14ZM19,2H16a1,1,0,0,0,0,2h3a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,19,2Zm2,13a1,1,0,0,0-1,1v3a1,1,0,0,1-1,1H16a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V16A1,1,0,0,0,21,15Z"></path></svg>
                              </label>
                              <input class="profile-image-upload" type="file" accept="image/*" id="profile-image-upload" data-preview=".profile-image-upload-preview" data-cv="<?php echo esc_attr( $the_cv_id ); ?>">
                            </div>
                            <div class="avater-change-single avater-delete-single">
                              <a href="javascript:void(0)" class="ms-2 removeuploadedimage" data-preview=".profile-image-upload-preview" data-cv="<?php echo esc_attr( $the_cv_id ); ?>" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 64.00 64.00" fill="none" stroke="#000000" stroke-width="3.5840000000000005"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.512"/><g id="SVGRepo_iconCarrier"><polyline points="52 16 48 56 16 56 12 16"/><path d="M20 16v-3.94A4.06 4.06 0 0 1 24.06 8h15.88A4.06 4.06 0 0 1 44 12.06V16"/><line x1="8" y1="16" x2="56" y2="16"/><line x1="24" y1="28" x2="40" y2="44"/><line x1="40" y1="28" x2="24" y2="44"/></g></svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-lg-8 col-md-7 mt-s">
                        <h6 class=""><?php esc_html_e( 'Application photo', 'domian' ); ?></h6>
                        <p class="text-muted mb-0"><?php esc_html_e( 'For best results, use image 300px by 300px in either .jpg or .png', 'domian' ); ?></p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-30 mb-30">
                    <div class="row">
                      <div class="col-lg-6"  data-field="given_name">
                        <label><?php esc_html_e( 'Given name:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][given_name]" class="form-control" placeholder="<?php esc_attr_e( 'enter your first name', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->given_name ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="family_name">
                        <label><?php esc_html_e( 'Family name:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][family_name]" class="form-control" placeholder="<?php esc_attr_e( 'enter your last name', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->family_name ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="tagline">
                        <label><?php esc_html_e( 'Tag line:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][tagline]" class="form-control" placeholder="<?php esc_attr_e( 'enter the tag line', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->tagline ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 90] ) ); ?>">
                      </div>
                      
                      <div class="col-lg-6"  data-field="birth">
                        <label><?php esc_html_e( 'Date of birth:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][birth]" placeholder="<?php esc_attr_e( 'Date of birth', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->birth ); ?>" class="form-control the-flat-picker" data-config="<?php echo esc_attr( json_encode( [ 'dateFormat' => 'Y-m-d', 'maxDate' => 'today', 'altInput' => true, 'altFormat' => 'Y-m-d', 'defaultDate' => $cv->info->birth ] ) ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="nationality">
                        <label><?php esc_html_e( 'Nationality:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][nationality]" class="form-control" placeholder="<?php esc_attr_e( 'enter your nationality', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->nationality ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="residence">
                        <label><?php esc_html_e( 'Residence permit:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][residence]" class="form-control" placeholder="<?php esc_attr_e( 'enter your residence permit', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->residence ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 70] ) ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="zivilstand">
                        <label><?php esc_html_e( 'Zivilstand:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][zivilstand]" class="form-control" placeholder="<?php esc_attr_e( 'enter your zivilstand', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->zivilstand ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="children">
                        <label><?php esc_html_e( 'Children:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][children]" class="form-control" placeholder="<?php esc_attr_e( 'How many children do you have?', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->children ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="address">
                        <label><?php esc_html_e( 'Address:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][address]" class="form-control" placeholder="<?php esc_attr_e( 'enter your full address', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->address ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 50] ) ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="phone">
                        <label><?php esc_html_e( 'Phone:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][phone]" class="form-control" placeholder="<?php esc_attr_e( 'enter your phone number', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->phone ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="email">
                        <label><?php esc_html_e( 'Email:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][email]" class="form-control" placeholder="<?php esc_attr_e( 'enter your email address', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->email ); ?>">
                      </div>
                      <div class="col-lg-6"  data-field="website">
                        <label><?php esc_html_e( 'Website:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][website]" class="form-control" placeholder="<?php esc_attr_e( 'enter your website url', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->website ); ?>">
                      </div>
                      
                      <div class="col-lg-12" data-field="bio">
                        <label><?php esc_html_e( 'Your Bio Here', 'domian' ); ?></label>
                        <textarea name="cv[info][bio]" rows="4" class="form-control" placeholder="<?php esc_attr_e( 'About Me :', 'domian' ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 350, 'min' => 20] ) ); ?>"><?php echo esc_html( $cv->info->bio ); ?></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <?php $all_edus[] = []; ?>
              <div class="form-group add-edu" data-field="edu">
                <h2><?php esc_html_e( 'Add Educations', 'domian' ); ?></h2>
                <div class="all-bulks__category all-edus">
                  <?php foreach( $all_edus as $eduI => $edu ) :
                    $cv->edu[$eduI] = isset( $cv->edu[$eduI] ) ? $cv->edu[$eduI] : [];
                    $cv->edu[$eduI] = (object) wp_parse_args( $cv->edu[$eduI], ['training' => '', 'institute' => '', 'desc' => '', 'from' => '', 'to' => '' ] );
                    $sortOrder = ( count( $edu ) == 0 ) ? 'spclOrdrSrt' : $eduI;
                    ?>
                    <div class="new-edu <?php echo esc_attr( ( count( $edu ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                      <label><?php esc_html_e( 'Training:', 'domian' ); ?></label>
                      <input type="text" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][training]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Computer Science', 'domian' ); ?>" value="<?php echo esc_attr( $cv->edu[$eduI]->training ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 120, 'min' => 10] ) ); ?>">
                      <label>School / Company / Institution:</label>
                      <input type="text" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][institute]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Bachelor\'s', 'domian' ); ?>" value="<?php echo esc_attr( $cv->edu[$eduI]->institute ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 120, 'min' => 10] ) ); ?>">
                      <div class="form-row">
                        <div class="col">
                          <label><?php esc_html_e( 'From year:', 'domian' ); ?></label>
                          <input type="text" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][from]" value="<?php echo esc_attr( $cv->edu[$eduI]->from ); ?>" class="form-control the-flat-picker" data-config="<?php echo esc_attr( json_encode( [ 'dateFormat' => 'F Y', 'defaultDate' => $cv->edu[$eduI]->from ] ) ); ?>" data-onlyfor="month">
                        </div>
                        <div class="col">
                          <label><?php esc_html_e( 'To year (optional=present):', 'domian' ); ?></label>
                          <input type="text" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][to]" value="<?php echo esc_attr( $cv->edu[$eduI]->to ); ?>" class="form-control the-flat-picker" data-config="<?php echo esc_attr( json_encode( [ 'dateFormat' => 'F Y', 'defaultDate' => $cv->edu[$eduI]->to ] ) ); ?>" data-onlyfor="month">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <label><?php esc_html_e( 'Description', 'domian' ); ?></label>
                        <textarea name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][desc]" rows="4" class="form-control" placeholder="<?php esc_attr_e( 'A short description :', 'domian' ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 350, 'min' => 30] ) ); ?>"><?php echo esc_html( $cv->edu[$eduI]->desc ); ?></textarea>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>
                <div class="add-blk btn btn-info" id="add-edu" data-target=".all-edus" data-type="edu"> 
                  <i class="fa fa-plus"></i>
                  <span><?php esc_html_e( 'Add new education', 'domian' ); ?></span>
                </div>
              </div>

              <div class="clearfix"></div>
              
              <?php $all_exps[] = []; ?>
              <div class="form-group add-exp mt-s" data-field="exp">
                <h2><?php esc_html_e( 'Add Experiences', 'domian' ); ?></h2>
                <div class="all-bulks__category all-exps">
                  <?php foreach( $all_exps as $expI => $exp ) :
                    $cv->exp[$expI] = isset( $cv->exp[$expI] ) ? $cv->exp[$expI] : [];
                    $cv->exp[$expI] = (object) wp_parse_args( $cv->exp[$expI], [ 'occupation' => '', 'enterprise' => '', 'workplace' => '', 'from' => '', 'to' => '', 'workload' => '', 'desc' => '' ] );
                    $sortOrder = ( count( $exp ) == 0 ) ? 'spclOrdrSrt' : $expI;
                    ?>
                    <div class="new-exp <?php echo esc_attr( ( count( $exp ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                      <label><?php esc_html_e( 'Occupation:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][occupation]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Web Developer', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->occupation ); ?>">
                      <label><?php esc_html_e( 'Enterprise:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][enterprise]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: ProgressSoft', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->enterprise ); ?>">
                      <label><?php esc_html_e( 'Workplace:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][workplace]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Tech industry', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->workplace ); ?>">
                      <div class="form-row">
                        <div class="col">
                          <label><?php esc_html_e( 'From year:', 'domian' ); ?></label>
                          <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][from]" value="<?php echo esc_attr( $cv->exp[$expI]->from ); ?>" class="form-control the-flat-picker" data-config="<?php echo esc_attr( json_encode( [ 'dateFormat' => 'F Y', 'defaultDate' => $cv->exp[$expI]->from ] ) ); ?>" data-onlyfor="month">
                        </div>
                        <div class="col">
                          <label><?php esc_html_e( 'To year (optional=present):', 'domian' ); ?></label>
                          <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][to]" value="<?php echo esc_attr( $cv->exp[$expI]->to ); ?>" class="form-control the-flat-picker" data-config="<?php echo esc_attr( json_encode( [ 'dateFormat' => 'F Y', 'defaultDate' => $cv->exp[$expI]->to ] ) ); ?>" data-onlyfor="month">
                        </div>
                      </div>
                      <label><?php esc_html_e( 'Workload:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][workload]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: High', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->workload ); ?>">
                      <label><?php esc_html_e( 'Description (optional):', 'domian' ); ?></label>
                      <textarea name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][desc]" class="form-control" data-limit="<?php echo esc_attr( json_encode( ['max' => 350, 'min' => 20] ) ); ?>"><?php echo esc_html( $cv->exp[$expI]->desc ); ?></textarea>
                    </div>
                  <?php endforeach; ?>
                </div>
                <div class="add-blk btn btn-info" id="add-exp" data-target=".all-exps" data-type="exp">
                  <i class="fa fa-plus"></i>
                  <span><?php esc_html_e( 'Add new experience', 'domian' ); ?></span>
                </div>
              </div>
              
              <div class="clearfix"></div>

              <?php $all_skills[] = []; ?>
              <div class="form-group add-skill mt-s" data-field="skl">
                <h2><?php esc_html_e( 'Add Skills', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-skills">
                    <?php foreach( $all_skills as $sklI => $skl ) :
                    $cv->skl[$sklI] = isset( $cv->skl[$sklI] ) ? $cv->skl[$sklI] : [];
                      $cv->skl[$sklI] = (object) wp_parse_args( $cv->skl[$sklI], ['title' => '', 'points' => '', 'level' => '' ] );
                      $sortOrder = ( count( $skl ) == 0 ) ? 'spclOrdrSrt' : $sklI;
                      ?>
                      <div class="new-skills <?php echo esc_attr( ( count( $skl ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                        <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                        <label><?php esc_html_e( 'Name / Title / Skill', 'domian' ); ?></label>
                        <input type="text" name="cv[skl][<?php echo esc_attr( $sortOrder ); ?>][title]" class="form-control" value="<?php echo esc_attr( $cv->skl[$sklI]->title ); ?>">
                        <label><?php esc_html_e( 'Points’ from 1-6', 'domian' ); ?></label>
                        <input type="text" name="cv[skl][<?php echo esc_attr( $sortOrder ); ?>][points]" class="form-control" value="<?php echo esc_attr( $cv->skl[$sklI]->points ); ?>">
                        <!-- <label><?php esc_html_e( 'Level in words', 'domian' ); ?></label>
                        <input type="text" name="cv[skl][<?php echo esc_attr( $sortOrder ); ?>][level]" class="form-control" value="<?php echo esc_attr( $cv->skl[$sklI]->level ); ?>"> -->
                      </div>
                    <?php endforeach; ?>
                  </div>
                

                  <div class="add-blk add-skills btn btn-info mt-20" id="add-skl" data-target=".all-skills" data-type="skl">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new Skill', 'domian' ); ?></span>
                  </div>
                </div>
              </div>
              
              <div class="clearfix"></div>

              <?php $all_interests[] = []; ?>
              <div class="form-group add-skill mt-s" data-field="inrts">
                <h2><?php esc_html_e( 'Add Interest', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-interests">
                    <?php foreach( $all_interests as $inrtsI => $inrts ) :
                    $cv->inrts[$inrtsI] = isset( $cv->inrts[$inrtsI] ) ? $cv->inrts[$inrtsI] : [];
                      $cv->inrts[$inrtsI] = (object) wp_parse_args( $cv->inrts[$inrtsI], ['interest' => '', 'desc' => '' ] );
                      $sortOrder = ( count( $inrts ) == 0 ) ? 'spclOrdrSrt' : $inrtsI;
                      ?>
                      <div class="new-interest <?php echo esc_attr( ( count( $inrts ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                        <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                        <label><?php esc_html_e( 'Name of the interest', 'domian' ); ?></label>
                        <input type="text" name="cv[inrts][<?php echo esc_attr( $sortOrder ); ?>][interest]" class="form-control" value="<?php echo esc_attr( $cv->inrts[$inrtsI]->interest ); ?>">
                        <label><?php esc_html_e( 'Description', 'domian' ); ?></label>
                        <input type="text" name="cv[inrts][<?php echo esc_attr( $sortOrder ); ?>][desc]" class="form-control" value="<?php echo esc_attr( $cv->inrts[$inrtsI]->desc ); ?>" data-limit="<?php echo esc_attr( json_encode( ['max' => 200] ) ); ?>">
                      </div>
                    <?php endforeach; ?>
                  </div>
                

                  <div class="add-blk add-interests btn btn-info mt-20" id="add-inrts" data-target=".all-interests" data-type="inrts">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new Interest', 'domian' ); ?></span>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>

              <?php $all_languages[] = []; ?>
              <div class="form-group add-skill mt-s" data-field="lng">
                <h2><?php esc_html_e( 'Add Language', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-languages">
                    <?php foreach( $all_languages as $lngI => $lng ) :
                    $cv->lng[$lngI] = isset( $cv->lng[$lngI] ) ? $cv->lng[$lngI] : [];
                      $cv->lng[$lngI] = (object) wp_parse_args( $cv->lng[$lngI], [ 'title' => '', 'level' => '' ] );
                      $sortOrder = ( count( $lng ) == 0 ) ? 'spclOrdrSrt' : $lngI;
                      ?>
                      <div class="new-language <?php echo esc_attr( ( count( $lng ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                        <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                        <label><?php esc_html_e( 'Language', 'domian' ); ?></label>
                        <input type="text" name="cv[lng][<?php echo esc_attr( $sortOrder ); ?>][title]" class="form-control" value="<?php echo esc_attr( $cv->lng[$lngI]->title ); ?>">
                        <label><?php esc_html_e( 'Level', 'domian' ); ?></label>
                        <input type="text" name="cv[lng][<?php echo esc_attr( $sortOrder ); ?>][level]" class="form-control" value="<?php echo esc_attr( $cv->lng[$lngI]->level ); ?>">
                      </div>
                    <?php endforeach; ?>
                  </div>
                

                  <div class="add-blk add-languages btn btn-info mt-20" id="add-lngs" data-target=".all-languages" data-type="lngs">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new language', 'domian' ); ?></span>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>
              
              <?php $all_socials[] = []; ?>
              <div class="form-group add-social mt-s" data-field="scl">
                <h2><?php esc_html_e( 'Add social Links', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-socials">
                    <?php foreach( $all_socials as $sclI => $scl ) :
                    $cv->scl[$sclI] = isset( $cv->scl[$sclI] ) ? $cv->scl[$sclI] : [];
                      $cv->scl[$sclI] = (object) wp_parse_args( $cv->scl[$sclI], [ 'title' => '', 'user' => '', 'icon'=> '' ] );
                      $sortOrder = ( count( $scl ) == 0 ) ? 'spclOrdrSrt' : $sclI;
                      ?>
                    <div class="new-social <?php echo esc_attr( ( count( $scl ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                      <label><?php esc_html_e( 'Social Name', 'domian' ); ?></label>
                      <input type="text" name="cv[scl][<?php echo esc_attr( $sortOrder ); ?>][title]" class="form-control" value="<?php echo esc_attr( $cv->scl[$sclI]->title ); ?>">
                      <label><?php esc_html_e( 'Social Profile', 'domian' ); ?></label>
                      <input type="text" name="cv[scl][<?php echo esc_attr( $sortOrder ); ?>][user]" class="form-control" value="<?php echo esc_attr( $cv->scl[$sclI]->user ); ?>">
                      <!-- <label><?php esc_html_e( 'Social icon image (16px*16px)', 'domian' ); ?></label>
                      <input type="file" name="cv[scl][<?php echo esc_attr( $sortOrder ); ?>][icon]" class="form-control" value="<?php echo esc_attr( $cv->scl[$sclI]->icon ); ?>" /> -->
                    </div>
                    <?php endforeach; ?>
                  </div>
                  
                  <div class="add-blk add-socials btn btn-info mt-20" id="add-scl" data-target=".all-socials" data-type="scl">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new social', 'domian' ); ?></span>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>

              <?php $all_hobbies[] = []; ?>
              <div class="form-group add-social mt-s" data-field="hby">
                <h2><?php esc_html_e( 'Add Hobbies', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-hobbies">
                    <?php foreach( $all_hobbies as $hbyI => $hby ) :
                    $cv->hby[$hbyI] = isset( $cv->hby[$hbyI] ) ? $cv->hby[$hbyI] : [];
                    $cv->hby[$hbyI] = (object) wp_parse_args( $cv->hby[$hbyI], [ 'title' => '' ] );
                    $sortOrder = ( count( $hby ) == 0 ) ? 'spclOrdrSrt' : $hbyI;
                    ?>
                    <div class="new-hobby <?php echo esc_attr( ( count( $hby ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                      <label><?php esc_html_e( 'Hobby Name', 'domian' ); ?></label>
                      <input type="text" name="cv[hby][<?php echo esc_attr( $sortOrder ); ?>][title]" class="form-control" value="<?php echo esc_attr( $cv->hby[$hbyI]->title ); ?>">
                    </div>
                    <?php endforeach; ?>
                  </div>
                  
                  <div class="add-blk add-hobbies btn btn-info mt-20" id="add-hby" data-target=".all-hobbies" data-type="hby">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new Hobby', 'domian' ); ?></span>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>

              <?php $all_sacts[] = []; ?>
              <div class="form-group add-social mt-s" data-field="sact">
                <h2><?php esc_html_e( 'Add Social Activities', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-sacts">
                    <?php foreach( $all_sacts as $sactI => $sact ) :
                    $cv->sact[$sactI] = isset( $cv->sact[$sactI] ) ? $cv->sact[$sactI] : [];
                    $cv->sact[$sactI] = (object) wp_parse_args( $cv->sact[$sactI], [ 'title' => '' ] );
                    $sortOrder = ( count( $sact ) == 0 ) ? 'spclOrdrSrt' : $sactI;
                    ?>
                    <div class="new-hobby <?php echo esc_attr( ( count( $sact ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                      <label><?php esc_html_e( 'Short Description', 'domian' ); ?></label>
                      <input type="text" name="cv[sact][<?php echo esc_attr( $sortOrder ); ?>][title]" class="form-control" value="<?php echo esc_attr( $cv->sact[$sactI]->title ); ?>">
                    </div>
                    <?php endforeach; ?>
                  </div>
                  
                  <div class="add-blk add-sacts btn btn-info mt-20" id="add-sact" data-target=".all-sacts" data-type="sact">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add Social Activity', 'domian' ); ?></span>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>

              <?php $all_references[] = []; ?>
              <div class="form-group add-reference mt-s" data-field="ref">
                <h2><?php esc_html_e( 'Add References', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-bulks__category all-references">
                    <?php foreach( $all_references as $refI => $ref ) :
                    $cv->ref[$refI] = isset( $cv->ref[$refI] ) ? $cv->ref[$refI] : [];
                    $cv->ref[$refI] = (object) wp_parse_args( $cv->ref[$refI], [ 'name' => '', 'position' => '', 'email' => '' ] );
                    $sortOrder = ( count( $ref ) == 0 ) ? 'spclOrdrSrt' : $refI;
                    ?>
                    <div class="new-reference <?php echo esc_attr( ( count( $ref ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <div class="bulk-remover"><div class="remover-text"><?php esc_html_e( 'Remove', 'domian' ); ?></div><div class="remover-icon" title="<?php esc_attr_e( 'Remove', 'domian' ); ?>"><?php echo $trashIcon; ?></div></div>
                      <label><?php esc_html_e( 'Referrer Name', 'domian' ); ?></label>
                      <input type="text" name="cv[ref][<?php echo esc_attr( $sortOrder ); ?>][name]" class="form-control" value="<?php echo esc_attr( $cv->ref[$refI]->name ); ?>">
                      <label><?php esc_html_e( 'Position', 'domian' ); ?></label>
                      <input type="text" name="cv[ref][<?php echo esc_attr( $sortOrder ); ?>][position]" class="form-control" value="<?php echo esc_attr( $cv->ref[$refI]->position ); ?>">
                      <label><?php esc_html_e( 'Email', 'domian' ); ?></label>
                      <input type="text" name="cv[ref][<?php echo esc_attr( $sortOrder ); ?>][email]" class="form-control" value="<?php echo esc_attr( $cv->ref[$refI]->email ); ?>">
                    </div>
                    <?php endforeach; ?>
                  </div>
                  
                  <div class="add-blk add-references btn btn-info mt-20" id="add-ref" data-target=".all-references" data-type="ref">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new Reference', 'domian' ); ?></span>
                  </div>
                </div>
              </div>
              
              <hr class="mt-100">

              <input type="submit" name="submit" value="<?php esc_attr_e( 'Create Resume', 'domian' ); ?>" class="btn-sub">
              
            </form>
          </div>
        </div>
        <div class="editescreen">
          <div class="editescreen__wrapper">
            <div class="editescreen__card">
              <!-- <canvas></canvas> -->
              <!-- svg -->
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" stroke-width="1">
                  <animate attributeName="r" repeatCount="indefinite" dur="5s" values="0;15" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
                  <animate attributeName="opacity" repeatCount="indefinite" dur="5s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
                </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" stroke-width="1">
                  <animate attributeName="r" repeatCount="indefinite" dur="5s" values="0;15" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-2.5s"></animate>
                  <animate attributeName="opacity" repeatCount="indefinite" dur="5s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-2.5s"></animate>
                </circle>
              </svg>
            </div>
          </div>
        </div>
        <div class="tool-bar">
          <div class="choose-templates">
            <button class="templates__single" data-font="" data-type="cvTemplate">
              <div class="skeleton-8istxox1jc5"></div>
            </button>
            <button class="templates__single" data-font="" data-type="cvTemplate">
              <div class="skeleton-8istxox1jc5"></div>
            </button>
            <button class="templates__single" data-font="" data-type="cvTemplate">
              <div class="skeleton-8istxox1jc5"></div>
            </button>
            <button class="templates__single" data-font="" data-type="cvTemplate">
              <div class="skeleton-8istxox1jc5"></div>
            </button>
            <button class="templates__single" data-font="" data-type="cvTemplate">
              <div class="skeleton-8istxox1jc5"></div>
            </button>
          </div>
          <div class="p-3">
            <div class="toolbar__body">
              <div class="toolbar__firstpicker">
                <button class="toolbar__selectemplate" data-target=".choose-templates">
                  <span>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="0.2" stroke="currentColor" class="toolbar__svg"><path d="m19.98 2.459 1.54 1.544a1.57 1.57 0 0 1 0 2.215L6.23 21.542c-.609.61-1.6.61-2.21 0l-1.54-1.543a1.57 1.57 0 0 1 0-2.216L17.77 2.46a1.562 1.562 0 0 1 2.21 0zm-1.328.886L13.95 8.058l1.985 1.989 4.703-4.715a.316.316 0 0 0 0-.444l-1.54-1.543a.316.316 0 0 0-.445 0zM3.364 19.115l1.538 1.542c.125.121.32.121.446 0l9.703-9.725-1.985-1.99-9.702 9.726a.318.318 0 0 0 0 .447zM5.75 6.954h1.875c.344 0 .625.317.625.626 0 .38-.281.627-.625.627H5.75v1.88c0 .379-.281.626-.625.626a.606.606 0 0 1-.625-.627v-1.88H2.625A.605.605 0 0 1 2 7.58c0-.309.28-.626.625-.626H4.5v-1.88c0-.31.281-.626.625-.626s.625.316.625.627zm13.125 7.517c.344 0 .625.317.625.662v1.88h1.875a.628.628 0 0 1 0 1.252H19.5v1.88a.628.628 0 0 1-.625.626.628.628 0 0 1-.625-.627v-1.88h-1.875a.628.628 0 0 1 0-1.252h1.875v-1.88c0-.344.281-.66.625-.66zm-8.273-11.09h.773c.262 0 .477.213.477.44 0 .3-.215.512-.477.512h-.773v.742c0 .298-.215.511-.477.511s-.477-.213-.477-.511v-.742h-.773c-.262 0-.477-.213-.477-.511 0-.228.215-.441.477-.441h.773v-.812c0-.228.215-.44.477-.44s.477.212.477.44z"></path></svg>
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__dropicon"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>
                  </span>
                </button>
              </div>
              <div class="toolbar__middlelems">
                <div class="toolbar__middlesingle">
                  <button id="font-select">
                    <span>
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke-width="0.5" stroke="currentColor" class="toolbar__svg"><g clip-path="url(#fontCase_svg__a)" transform="matrix(.95652 0 0 .9937 .748 .572)"><path d="M7.124 3.784c-.17-.446-.903-.446-1.073 0L.302 18.765a.577.577 0 0 0 1.074.414l1.627-4.24h7.172l1.627 4.24a.574.574 0 1 0 1.073-.414zM3.446 13.789l3.143-8.19 3.143 8.19Zm19.243-5.765c-.318 0-.543.258-.543.576v1.017c-.844-.968-2.07-1.593-3.418-1.593-2.536 0-4.567 2.067-4.567 4.61v2.313c0 2.543 2.063 4.604 4.567 4.604 1.38 0 2.606-.626 3.45-1.593v1.016c-.064.316.194.575.51.575.317 0 .576-.259.576-.607V8.599a.577.577 0 0 0-.575-.575zm-.575 6.915c0 1.906-1.548 3.457-3.418 3.457-1.903 0-3.418-1.551-3.418-3.458v-2.303c0-1.907 1.548-3.458 3.418-3.458 1.903 0 3.418 1.551 3.418 3.458z"></path></g><defs><clipPath id="fontCase_svg__a"><path fill="#fff" transform="translate(.264)" d="M0 0h23v23H0z"></path></clipPath></defs></svg>
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__dropicon"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>
                    </span>
                  </button>
                  <div class="dropupmenu">
                    <div class="dropupmenu__menubody">
                      <div class="dropupmenu__menutitle"><?php esc_html_e( 'Font', 'advanced-gpt3-cv-builder' ); ?></div>
                      <div class="skeleton-8istxox1jc5"></div>
                    </div>
                  </div>
                </div>
                <div class="toolbar__middlesingle" style="display: none !important;">
                  <button id="font-size">
                    <span>
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke-width="0.5" stroke="currentColor" class="toolbar__svg"><g clip-path="url(#textSize_svg__a)" transform="matrix(.95652 0 0 .99379 .946 .571)"><path d="M.057 4.025v3.45a.576.576 0 0 0 1.15 0V4.6h5.175v13.8h-2.3a.577.577 0 0 0-.575.575c0 .316.259.575.575.575h5.75a.577.577 0 0 0 .575-.575.577.577 0 0 0-.575-.575h-2.3V4.6h5.175v2.875c0 .316.259.575.575.575a.577.577 0 0 0 .575-.575v-3.45a.576.576 0 0 0-.575-.575H.632a.575.575 0 0 0-.575.575zm11.5 6.9v2.3a.575.575 0 1 0 1.15 0V11.5h4.025v6.9h-1.725a.575.575 0 1 0 0 1.15h4.6a.575.575 0 1 0 0-1.15h-1.725v-6.9h4.025v1.725a.575.575 0 1 0 1.15 0v-2.3a.577.577 0 0 0-.575-.575h-10.35a.577.577 0 0 0-.575.575z"></path></g><defs><clipPath id="textSize_svg__a"><path fill="#fff" transform="translate(.057)" d="M0 0h23v23H0z"></path></clipPath></defs></svg>
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__dropicon"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>
                    </span>
                  </button>
                  <div class="dropupmenu">
                    <div class="dropupmenu__menubody">
                      <div class="dropupmenu__menutitle"><?php esc_html_e( 'Font size', 'advanced-gpt3-cv-builder' ); ?></div>
                      <div class="skeleton-8istxox1jc5"></div>
                    </div>
                  </div>
                </div>
                <div class="toolbar__middlesingle" style="display: none !important;">
                  <button id="line-height">
                    <span>
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke-width="0.2" stroke="currentColor" class="toolbar__svg"><path d="M8.154 6.403c.24.249.24.659 0 .908a.586.586 0 0 1-.863 0L5.243 5.195v13.61l2.048-2.117a.586.586 0 0 1 .863 0c.24.25.24.659 0 .908L5.098 20.81a.586.586 0 0 1-.863 0l-3.056-3.214a.665.665 0 0 1 0-.908.587.587 0 0 1 .864 0l2.013 2.117V5.195L2.043 7.31a.587.587 0 0 1-.864 0 .665.665 0 0 1 0-.908l3.056-3.215a.59.59 0 0 1 .863 0zm14.235-1.51c.336 0 .611.323.611.642 0 .39-.275.643-.611.643h-11c-.336 0-.611-.253-.611-.643 0-.319.275-.643.61-.643zm0 6.427c.336 0 .611.326.611.643 0 .39-.275.643-.611.643h-11c-.336 0-.611-.253-.611-.643 0-.317.275-.643.61-.643zm-11.611 7.108c0-.354.275-.643.61-.643h11c.337 0 .612.29.612.643 0 .353-.275.642-.611.642h-11c-.336 0-.611-.289-.611-.642z"></path></svg>
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__dropicon"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>
                    </span>
                  </button>
                  <div class="dropupmenu">
                    <div class="dropupmenu__menubody">
                      <div class="dropupmenu__menutitle"><?php esc_html_e( 'Line height', 'advanced-gpt3-cv-builder' ); ?></div>
                      <div class="skeleton-8istxox1jc5"></div>
                    </div>
                  </div>
                </div>
                <div class="toolbar__middlesingle">
                  <button id="color-select">
                    <span>
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke-width="0.5" stroke="currentColor" class="toolbar__svg"><path d="M2.311 2.183a.606.606 0 0 1 .868 0l3.736 3.805 2.47-2.517a2.726 2.726 0 0 1 3.906 0l5.808 5.916a2.842 2.842 0 0 1 0 3.976l-7.304 7.442a3.637 3.637 0 0 1-5.21 0l-4.506-4.59a3.8 3.8 0 0 1 0-5.305l3.969-4.039-3.737-3.804a.633.633 0 0 1 0-.884zm7.98 9.008L6.915 7.754l-3.969 4.039c-.4.41-.634.926-.7 1.457h15.23l.756-.77a1.586 1.586 0 0 0 0-2.21l-5.808-5.915a1.517 1.517 0 0 0-2.172 0L7.782 6.87l3.376 3.438a.628.628 0 0 1 0 .882.601.601 0 0 1-.867 0zM2.406 14.5c.12.3.3.55.54.832l4.506 4.586a2.428 2.428 0 0 0 3.476 0l5.32-5.418zM23 19.5c0 1.379-1.101 2.5-2.455 2.5s-2.455-1.121-2.455-2.5c0-.984 1.25-3.11 1.964-4.246a.575.575 0 0 1 .982 0C21.749 16.39 23 18.516 23 19.5Zm-1.228 0c-.034-.004-.003-.047-.023-.133a3.105 3.105 0 0 0-.107-.355 9.566 9.566 0 0 0-.449-1.008c-.2-.399-.426-.805-.648-1.18-.223.375-.449.781-.648 1.18a9.586 9.586 0 0 0-.45 1.008c-.05.144-.088.261-.107.355a.963.963 0 0 0-.023.133c0 .691.549 1.25 1.228 1.25.679 0 1.227-.559 1.227-1.25z"></path></svg>
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__dropicon"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>
                    </span>
                  </button>
                  <div class="dropupmenu">
                    <div class="dropupmenu__menubody">
                      <div class="dropupmenu__menutitle"><?php esc_html_e( 'Pick a color', 'advanced-gpt3-cv-builder' ); ?></div>
                      <div class="dropupmenu__picker" data-font="" data-type="basicColor">
                        <span class="dropupmenu__leftspacer d-none"></span>
                        <div class="dropupmenu__font">
                          <div class="dropupmenu__colorpicker">
                            <div class="the-color-picker" acp-color="#EFE9E7" acp-show-rgb="yes" acp-show-hsl="no" acp-show-hex="yes" acp-palette="PALETTE_MATERIAL_CHROME" acp-palette-editable acp-show-alpha></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="toolbar__middlesingle">
                  <button id="file-download">
                    <span>
                      <svg width="150px" height="150px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.4800000000000001"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5H7C5.89543 5 5 5.89543 5 7V16H19V12.5" stroke="#000000" stroke-width="1.104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V16Z" stroke="#000000" stroke-width="1.104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.5 3V9M18.5 9L16 6.5M18.5 9L21 6.5" stroke="#000000" stroke-width="1.104" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__dropicon"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>
                    </span>
                  </button>
                  <div class="dropupmenu">
                    <div class="dropupmenu__menubody">
                      <div class="dropupmenu__menutitle"><?php esc_html_e( 'Download', 'advanced-gpt3-cv-builder' ); ?></div>
                      <button class="dropupmenu__single download-as-png" data-font="png" data-type="download">
                        <span class="dropupmenu__leftspacer"></span>
                        <div class="dropupmenu__font"><?php esc_html_e( 'Download as PNG', 'advanced-gpt3-cv-builder' ); ?></div>
                      </button>
                      <button class="dropupmenu__single download-as-pdf" data-font="pdf" data-type="download">
                        <span class="dropupmenu__leftspacer"></span>
                        <div class="dropupmenu__font"><?php esc_html_e( 'Download as PDF', 'advanced-gpt3-cv-builder' ); ?></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="toolbar__lastelems" id="full-screen-previewer">
                <button>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toolbar__svg"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path></svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
  <?php
get_footer();
?>