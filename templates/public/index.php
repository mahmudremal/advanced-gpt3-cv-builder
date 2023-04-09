<?php
/**
 * Checkout video clip shortner template.
 * 
 * @package AdvancedGPT3CVbuilder
 */

global $currenttab;global $app_resumes;global $userInfo;global $errorHappens;
$app_resumes = get_query_var( 'app_resumes' );$the_cv_id = $app_resumes;
// $cv = array_map( function( $a ){ return $a[0]; }, (array) get_post_meta( $the_cv_id, '_data', true ) );
$cv = (object) wp_parse_args( (array) get_post_meta( $the_cv_id, '_data', true ), [ 'edu' => [], 'exp' => [], 'skl' => [], 'info' => [] ] );
// print_r( $cv );
$all_edus = $cv->edu;$all_exps = [];$all_skills = [];$all_interests = [];
$avater = get_post_meta( $the_cv_id, '_avatar', true );
$avater = ( $avater && ! empty( $avater ) ) ? $avater : 'https://geeko.netlify.app/img/test-img/1.jpg';

get_header();
  ?>
  <section class="blog-area">
    <div class="container-fluid">

      <div class="row">

        <div class="col-12 col-md-7">
          <div class="container">

            <?php $cv->info = (object) wp_parse_args( $cv->info, ['given_name' => '', 'family_name' => '', 'birth' => '', 'address' => '', 'nationality' => '', 'residence' => '', 'zivilstand' => '', 'children' => '', 'bio' => '' ] ); ?>
            <form method="post" action="#" name="cvbuilder" id="cvbuilder">
              <div class="mt-10">
                <h2><?php esc_html_e( 'Personal Info', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="row align-items-center">
                    <div class="col-lg-2 col-md-4">
                      <img src="<?php echo esc_url( $avater ); ?>" class="d-block profile-image-upload-preview" alt="" data-default="<?php echo esc_url( 'https://geeko.netlify.app/img/test-img/1.jpg' ); ?>">
                    </div>
                    <div class="col-lg-5 col-md-8 mt-s">
                      <h6 class=""><?php esc_html_e( 'Application photo', 'domian' ); ?></h6>
                      <p class="text-muted mb-0"><?php esc_html_e( 'For best results, use image 300px by 300px in either .jpg or .png', 'domian' ); ?></p>
                    </div>
                    <div class="col-lg-5 col-md-12 mt-s">

                      <div class="row">
                        <div class="relative overflow-hidden">
                          <label for="profile-image-upload" class="file btn btn-lg btn-primary relative m-auto"><?php esc_html_e( 'Upload', 'domian' ); ?></label>
                          <input class="profile-image-upload" type="file" accept="image/*" id="profile-image-upload" data-preview=".profile-image-upload-preview" data-cv="<?php echo esc_attr( $the_cv_id ); ?>">
                        </div>
                        <div class="ml-2">
                          <a href="javascript:void(0)" class="btn btn-soft-primary ms-2 removeuploadedimage" data-preview=".profile-image-upload-preview" data-cv="<?php echo esc_attr( $the_cv_id ); ?>"><?php esc_html_e( 'Remove', 'domian' ); ?></a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="mt-30">
                    <div class="row">
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Given name:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][given_name]" class="form-control" placeholder="<?php esc_attr_e( 'enter your first name', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->given_name ); ?>">
                      </div>
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Family name:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][family_name]" class="form-control" placeholder="<?php esc_attr_e( 'enter your last name', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->family_name ); ?>">
                      </div>
                      
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Date of birth:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][birth]" class="form-control the-flat-picker" placeholder="<?php esc_attr_e( 'Date of birth', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->birth ); ?>">
                      </div>
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Nationality:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][nationality]" class="form-control" placeholder="<?php esc_attr_e( 'enter your nationality', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->nationality ); ?>">
                      </div>
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Residence permit:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][residence]" class="form-control" placeholder="<?php esc_attr_e( 'enter your residence permit', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->residence ); ?>">
                      </div>
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Zivilstand:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][zivilstand]" class="form-control" placeholder="<?php esc_attr_e( 'enter your zivilstand', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->zivilstand ); ?>">
                      </div>
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Children:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][children]" class="form-control" placeholder="<?php esc_attr_e( 'How many children do you have?', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->children ); ?>">
                      </div>
                      <div class="col-lg-6">
                        <label><?php esc_html_e( 'Address:', 'domian' ); ?></label>
                        <input type="text" name="cv[info][address]" class="form-control" placeholder="<?php esc_attr_e( 'enter your full address', 'domian' ); ?>" value="<?php echo esc_attr( $cv->info->address ); ?>">
                      </div>
                      
                      <!-- <div class="col-lg-12">
                        <label><?php esc_html_e( 'Your Bio Here', 'domian' ); ?></label>
                        <textarea name="cv[info][bio]" id="comments" rows="4" class="form-control" placeholder="<?php esc_attr_e( 'About Me :', 'domian' ); ?>"><?php // echo esc_html( $cv->info->bio ); ?></textarea>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>

              <?php $all_edus[] = []; ?>
              <div class="form-group add-edu">
                <h2><?php esc_attr_e( 'Add Educations', 'domian' ); ?></h2>
                <div class="all-edus">
                  <?php foreach( $all_edus as $eduI => $edu ) :
                    $cv->edu[$eduI] = isset( $cv->edu[$eduI] ) ? $cv->edu[$eduI] : [];
                    $cv->edu[$eduI] = (object) wp_parse_args( $cv->edu[$eduI], ['training' => '', 'institute' => '', 'desc' => '', 'from' => '', 'to' => '' ] );
                    $sortOrder = ( count( $edu ) == 0 ) ? 'spclOrdrSrt' : $eduI;
                    ?>
                    <div class="new-edu <?php echo esc_attr( ( count( $edu ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <label><?php esc_attr_e( 'Training:', 'domian' ); ?></label>
                      <input type="text" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][training]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Computer Science', 'domian' ); ?>" value="<?php echo esc_attr( $cv->edu[$eduI]->training ); ?>">
                      <label>School / Company / Institution:</label>
                      <input type="text" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][institute]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Bachelor\'s', 'domian' ); ?>" value="<?php echo esc_attr( $cv->edu[$eduI]->institute ); ?>">
                      <div class="form-row">
                        <div class="col">
                          <label>From year:</label>
                          <input type="month" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][from]" class="form-control" value="<?php echo esc_attr( $cv->edu[$eduI]->from ); ?>">
                        </div>
                        <div class="col">
                          <label>To year (optional=present):</label>
                          <input type="month" name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][to]" class="form-control" value="<?php echo esc_attr( $cv->edu[$eduI]->to ); ?>">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <label><?php esc_html_e( 'Description', 'domian' ); ?></label>
                        <textarea name="cv[edu][<?php echo esc_attr( $sortOrder ); ?>][desc]" id="comments" rows="4" class="form-control" placeholder="<?php esc_attr_e( 'A short description :', 'domian' ); ?>"><?php echo esc_html( $cv->edu[$eduI]->desc ); ?></textarea>
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
              <div class="form-group add-exp mt-s">
                <h2><?php esc_html_e( 'Add Experiences', 'domian' ); ?></h2>
                <div class="all-exps">
                  <?php foreach( $all_exps as $expI => $exp ) :
                    $cv->exp[$expI] = isset( $cv->exp[$expI] ) ? $cv->exp[$expI] : [];
                    $cv->exp[$expI] = (object) wp_parse_args( $cv->exp[$expI], [ 'occupation' => '', 'enterprise' => '', 'workplace' => '', 'from' => '', 'to' => '', 'workload' => '', 'desc' => '' ] );
                    $sortOrder = ( count( $exp ) == 0 ) ? 'spclOrdrSrt' : $expI;
                    ?>
                    <div class="new-exp <?php echo esc_attr( ( count( $exp ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                      <label><?php esc_html_e( 'Occupation:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][occupation]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Web Developer', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->occupation ); ?>">
                      <label><?php esc_html_e( 'Enterprise:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][enterprise]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: ProgressSoft', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->enterprise ); ?>">
                      <label><?php esc_html_e( 'Workplace:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][workplace]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: Tech industry', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->workplace ); ?>">
                      <div class="form-row">
                        <div class="col">
                          <label><?php esc_html_e( 'From year:', 'domian' ); ?></label>
                          <input type="month" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][from]" class="form-control" value="<?php echo esc_attr( $cv->exp[$expI]->from ); ?>">
                        </div>
                        <div class="col">
                          <label><?php esc_html_e( 'To year (optional=present):', 'domian' ); ?></label>
                          <input type="month" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][to]" class="form-control" value="<?php echo esc_attr( $cv->exp[$expI]->to ); ?>">
                        </div>
                      </div>
                      <label><?php esc_html_e( 'Workload:', 'domian' ); ?></label>
                      <input type="text" name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][workload]" class="form-control" placeholder="<?php esc_attr_e( 'Ex: High', 'domian' ); ?>" value="<?php echo esc_attr( $cv->exp[$expI]->workload ); ?>">
                      <label><?php esc_html_e( 'Description (optional):', 'domian' ); ?></label>
                      <textarea name="cv[exp][<?php echo esc_attr( $sortOrder ); ?>][desc]" class="form-control"><?php echo esc_html( $cv->exp[$expI]->desc ); ?></textarea>
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
              <div class="form-group add-skill mt-s">
                <h2><?php esc_html_e( 'Add Skills', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-skills">
                    <?php foreach( $all_skills as $sklI => $skl ) :
                    $cv->skl[$sklI] = isset( $cv->skl[$sklI] ) ? $cv->skl[$sklI] : [];
                      $cv->skl[$sklI] = (object) wp_parse_args( $cv->skl[$sklI], ['title' => '', 'points' => '', 'level' => '' ] );
                      $sortOrder = ( count( $skl ) == 0 ) ? 'spclOrdrSrt' : $sklI;
                      ?>
                      <div class="new-skills <?php echo esc_attr( ( count( $skl ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                        <label><?php esc_html_e( 'Name / Title / Skill', 'domian' ); ?></label>
                        <input type="text" name="cv[skl][<?php echo esc_attr( $sortOrder ); ?>][title]" class="form-control" value="<?php echo esc_attr( $cv->skl[$sklI]->title ); ?>">
                        <label><?php esc_html_e( 'Points’ from 1-6', 'domian' ); ?></label>
                        <input type="text" name="cv[skl][<?php echo esc_attr( $sortOrder ); ?>][points]" class="form-control" value="<?php echo esc_attr( $cv->skl[$sklI]->points ); ?>">
                        <label><?php esc_html_e( 'Level in words', 'domian' ); ?></label>
                        <input type="text" name="cv[skl][<?php echo esc_attr( $sortOrder ); ?>][level]" class="form-control" value="<?php echo esc_attr( $cv->skl[$sklI]->level ); ?>">
                      </div>
                    <?php endforeach; ?>
                  </div>
                

                  <div class="add-blk add-skills btn btn-info mt-50" id="add-skl" data-target=".all-skills" data-type="skl">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new Skill', 'domian' ); ?></span>
                  </div>
                </div>
              </div>
              
              <div class="clearfix"></div>

              <?php $all_interests[] = []; ?>
              <div class="form-group add-skill mt-s">
                <h2><?php esc_html_e( 'Add Interest', 'domian' ); ?></h2>
                <div class="block-container">
                  <div class="all-interests">
                    <?php foreach( $all_interests as $inrtsI => $inrts ) :
                    $cv->inrts[$inrtsI] = isset( $cv->inrts[$inrtsI] ) ? $cv->inrts[$inrtsI] : [];
                      $cv->inrts[$inrtsI] = (object) wp_parse_args( $cv->inrts[$inrtsI], ['interest' => '', 'desc' => '' ] );
                      $sortOrder = ( count( $inrts ) == 0 ) ? 'spclOrdrSrt' : $inrtsI;
                      ?>
                      <div class="new-interest <?php echo esc_attr( ( count( $inrts ) == 0 ) ? 'd-none the_template' : '' ); ?>">
                        <label><?php esc_html_e( 'Name of the interest', 'domian' ); ?></label>
                        <input type="text" name="cv[inrts][<?php echo esc_attr( $sortOrder ); ?>][interest]" class="form-control" value="<?php echo esc_attr( $cv->inrts[$inrtsI]->interest ); ?>">
                        <label><?php esc_html_e( 'Description', 'domian' ); ?></label>
                        <input type="text" name="cv[inrts][<?php echo esc_attr( $sortOrder ); ?>][desc]" class="form-control" value="<?php echo esc_attr( $cv->inrts[$inrtsI]->desc ); ?>">
                      </div>
                    <?php endforeach; ?>
                  </div>
                

                  <div class="add-blk add-interests btn btn-info mt-50" id="add-inrts" data-target=".all-interests" data-type="inrts">
                    <i class="fa fa-plus"></i>
                    <span><?php esc_html_e( 'Add new Interest', 'domian' ); ?></span>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>
              
              <!--               
              <div class="form-group add-social mt-s d-none" style="display: none;">
                <h2>Add social Links</h2>
                <div class="block-container">
                  <div class="all-socials">
                    <div class="new-skills">
                      <label>Social Name</label>
                      <input type="text" name="socials[]" class="form-control">
                      <label>Social Link</label>
                      <input type="text" name="socials[]" class="form-control">
                      <label>Social icon image (16px*16px)</label>
                      <input type="file" name="socials[]" class="form-control" />
                    </div>
                  </div>
                  
                  
                  <div class="add-blk add-socials btn btn-info mt-50" id="add-scl">
                    <i class="fa fa-plus"></i>
                    <span>Add new social</span>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="form-group add-social mt-s d-none" style="display: none;">
                <h2>Add Hoppies</h2>
                <div class="block-container">
                  <div class="all-hoppies">
                    <div class="new-skills">
                      <label>Hoppy icon image (32px*32px)</label>
                      <input type="file" name="hoppies[]" class="form-control" />
                    </div>
                  </div>
                  
                  
                  <div class="add-blk add-hoppies btn btn-info mt-50" id="add-hby">
                    <i class="fa fa-plus"></i>
                    <span>Add new Hoppy</span>
                  </div>
                </div>
              </div> -->
              
              <hr class="mt-100">

              <input type="submit" name="submit" value="<?php esc_attr_e( 'Create Resume', 'domian' ); ?>" class="btn-sub">
              
            </form>
          </div>
        </div>

        <div class="col-12 col-md-5">
          <div class="cv-prev">
            <!-- Post Thumbnail -->
            <div class="blog_thumbnail">
              <img src="https://geeko.netlify.app/img/demos/demo-1.png" class="temp-img" alt="">
            </div>
          </div>
          <div class="cv-download">
            <div class="row align-items-center">
              
              <div class="col-lg-6 col-md-12">
                <p class="topnote"><?php esc_html_e( 'Fill all required fields and click create cv to download CV in both PDF and PNG formats', 'domian' ); ?></p>
                
              </div>
              <div class="col-lg-6 col-md-12 mt-s">
                <a href="#" class="btn btn-primary download-as-pdf"><?php esc_html_e( 'Download as PDF', 'domian' ); ?></a>
                <a href="#" class="btn btn-soft-primary ms-2 download-as-png"><?php esc_html_e( 'Download as PNG', 'domian' ); ?></a>
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
