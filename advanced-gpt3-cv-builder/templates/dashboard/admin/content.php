<?php
$dashboard_permalink = apply_filters( 'futurewordpress/project/advancedgpt3cvbuilder/system/getoption', 'permalink-dashboard', 'dashboard' );
$dashboard_permalink = site_url( $dashboard_permalink );
?>
<?php do_action( 'futurewordpress/project/advancedgpt3cvbuilder/parts/call', 'before_homecontent' ); ?>
<div>
    <?php do_action( 'futurewordpress/project/advancedgpt3cvbuilder/parts/call', 'homecontent' ); ?>
</div>
<?php do_action( 'futurewordpress/project/advancedgpt3cvbuilder/parts/call', 'after_homecontent' ); ?>
