<?php
$notices = (array) apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/notices/manager', 'get', true, true );
?>
<div>
  <div class="row">
    <div class="col-12">
      <div class="card card-full-width">
        <div class="card-body">
          <div class="row mx-1" style="justify-content: end;">
            <div class="col-sm-6" style="text-align: right;">
              <button type="button" class="btn btn-outline-link my-2 delete-events-log"><?php esc_html_e( 'Remove All', 'advanced-gpt3-cv-builder' ); ?></button>
            </div>
          </div>
          <div class="fancy-table table-responsive border rounded">
            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col"><?php esc_html_e( 'Date', 'advanced-gpt3-cv-builder' ); ?></th>
                  <th scope="col"><?php esc_html_e( 'Message', 'advanced-gpt3-cv-builder' ); ?></th>
                  <th scope="col"><?php esc_html_e( 'Type', 'advanced-gpt3-cv-builder' ); ?></th>
                </tr>
              </thead>
              <tbody>
                <?php if( count( $notices ) <= 0 ) : ?>
                  <tr>
                    <td colspan="2"><img src="<?php echo esc_url( ADVANCEDGPT3CVBUILDER_PROJECT_BUILD_URI . '/icons/not-found.svg' ); ?>" alt="<?php esc_attr_e( 'Noting found', 'advanced-gpt3-cv-builder' ); ?>" style="width: 100%;height: auto;max-height: 400px;"></td>
                  </tr>
                <?php endif; ?>
                <?php foreach( $notices as $i => $notice ) :
                  $notice = (object) $notice;
                  ?>
                  <tr id="notice-<?php echo esc_html( $i ); ?>" class="border-<?php echo esc_attr( $notice->type ); ?>">
                    <td class="text-dark"><?php echo esc_html( wp_date( 'd, M', $notice->data->time ) ); ?></td>
                    <td class="text-dark"><?php echo wp_kses_post( $notice->message ); ?></td>
                    <td class="text-dark"><?php echo esc_html( $notice->type ); ?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
  
</div>
