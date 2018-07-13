















<!-- START CASE STUDY LOOP -->
<?php query_posts('post_type=case_studies'); ?>
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			
		
		
		<h2>
				<?php the_title(); ?>
			</h2>	
			<?php the_content(); ?>
		<?php endwhile; endif; ?>
		<!-- END CASE STUDY LOOP -->
