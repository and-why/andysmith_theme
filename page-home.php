<?php
/**
 * Template Name: Homepage
 *
 * This is the template that displays casestudies to be used on the homepage.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package paths_of_glory
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<div class="lead-summary">
				<?php the_field('branding_summary') ?>
			</div>	
			<div class="casestudies__grid-wrapper">
				<div class="casestudies__grid-left">
					<h2 class="heading_small-caps">Client</h2>
				</div>
			<div class="casestudies__grid-right">
					<h2 class="heading_small-caps">Details</h2>
			</div>
		</div>
		<!-- START CASE STUDY LOOP -->
		<?php query_posts('post_type=case_studies'); ?>
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			

			<a href="<?php echo get_post_permalink() ?>" class="casestudies__grid-wrapper no-decoration">
				<div class="casestudies__grid-left">
					<h2 class="case"><?php the_title(); ?></h2>
				</div>
				<div class="casestudies__grid-right">
					<p><?php the_content(); ?></p>
				</div>
			</a>


		<?php endwhile; endif; ?>
		<!-- END CASE STUDY LOOP -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
