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

window.addEventListener('scroll', animation_navigation);

function animation_navigation () {
	change_color_of_pagination();
	hidden_indicator();
}

function change_color_of_pagination () {
	const array_of_pagination__circle = document.querySelectorAll(".pagination__circle");
	let number_active_circle = (pageYOffset + 0.5 * viewport_height) / viewport_height;
	number_active_circle = Math.trunc(number_active_circle);
	array_of_pagination__circle.forEach((element, index) => {
		if (element.classList.contains("pagination__circle_active") && (index != number_active_circle)) {
			element.classList.remove("pagination__circle_active");
		}
	});
	array_of_pagination__circle[number_active_circle].classList.add("pagination__circle_active");
}

function hidden_indicator () {
	const indicator = document.querySelector(".indicator");
	if ((pageYOffset > 0.1 * viewport_height) && !indicator.classList.contains("indicator_hidden")) {
		indicator.classList.add("indicator_hidden");
	}
	if ((pageYOffset <= 0.1 * viewport_height) && indicator.classList.contains("indicator_hidden")) {
		indicator.classList.remove("indicator_hidden");
	}
}