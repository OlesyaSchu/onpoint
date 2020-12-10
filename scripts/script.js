const array_of_animated_elements_slide_one = document.querySelectorAll(".title_position_one, .peak");
const array_of_animated_elements_slide_two = document.querySelectorAll(".title_position_two, .deep_position_two");

window.addEventListener('scroll', animation_on_slide);

function animation_on_slide () {
	animation_on_scroll(array_of_animated_elements_slide_one, 1);
	animation_on_scroll(array_of_animated_elements_slide_two, 2);
}

function animation_on_scroll (array_of_animated_elements, number_of_slide) {
	let no_animation_up_area = 768 * (number_of_slide - 1.9);

	let point_of_start_animation_up = 768 * (number_of_slide - 1.5);
	let point_of_end_animation_up = 768 * (number_of_slide - 1);

	let point_of_start_animation_down = 768 * (number_of_slide - 0.1);
	let point_of_end_animation_down = 768 * (number_of_slide - 0.5);

	array_of_animated_elements.forEach( (animated_element) => {
		if (pageYOffset < no_animation_up_area) {
			animated_element.classList.add("title_animate_down");
			if (animated_element.classList.contains("title_animate_up")) animated_element.classList.remove("title_animate_up");
			if (animated_element.classList.contains("title_animate_start-position")) animated_element.classList.remove("title_animate_start-position");
		}
		if ((pageYOffset > point_of_start_animation_up) && (pageYOffset < point_of_end_animation_up) && (!animated_element.classList.contains("title_animate_up"))) {
			animated_element.classList.add("title_animate_start-position");
		}

		if ((pageYOffset < point_of_start_animation_down) && (pageYOffset > point_of_end_animation_down) && (!animated_element.classList.contains("title_animate_down"))) {
			animated_element.classList.add("title_animate_start-position");
		}
		if (pageYOffset >= point_of_start_animation_down) {
			animated_element.classList.add("title_animate_up");
			if (animated_element.classList.contains("title_animate_down")) animated_element.classList.remove("title_animate_down");
			if (animated_element.classList.contains("title_animate_start-position")) animated_element.classList.remove("title_animate_start-position");
		}
	});
}