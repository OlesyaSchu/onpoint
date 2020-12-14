const array_of_animated_elements_slide_one = document.querySelectorAll(".title_position_one, .peak");
const array_of_animated_elements_slide_two = document.querySelectorAll(".title_position_two, .deep_position_two");

const viewport_height = 768;
const viewport_width = 1024;

window.addEventListener('scroll', animation_on_slide);

function animation_on_slide () {
	animation_on_scroll(array_of_animated_elements_slide_one, 1);
	animation_on_scroll(array_of_animated_elements_slide_two, 2);
}

function animation_on_scroll (array_of_animated_elements, number_of_slide) {
	let no_animation_up_area = viewport_height * (number_of_slide - 1.9);

	let point_of_start_animation_up = viewport_height * (number_of_slide - 1.5);
	let point_of_end_animation_up = viewport_height * (number_of_slide - 1);

	let point_of_start_animation_down = viewport_height * (number_of_slide - 0.1);
	let point_of_end_animation_down = viewport_height * (number_of_slide - 0.5);

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

const values_of_input = 99;

window.addEventListener('input', change_slide);

function change_slide () {
	const input = document.querySelector(".slider");
	const wrapper = document.querySelector(".wrapper_scroll_x");
	let value = Number(input.value);
	wrapper.scrollLeft = (value) * (viewport_width * 2 / values_of_input);
	change_scroll_bar(input, input.value); 
}

window.addEventListener('change', move_input);

function move_input () {
	const input = document.querySelector(".slider");
	let value = input.value * 1;

	const start = 0;
	const finish = values_of_input + 1;
	const middle = (finish - start) / 2 - 1;

	let move_to_value = 0;

	if (value < ((middle - start) / 2)) move_to_value = start;
	if ((value >= ((middle - start) / 2)) && (value < ((finish - middle) / 2 + middle))) move_to_value = middle;
	if (value >= ((finish - middle) / 2 + middle)) move_to_value = finish;
	
	const duration = 200;

	(function animate_input() {
		const time_start = performance.now();

		requestAnimationFrame( function animate_input (time){

			let time_progress = (time - time_start) / duration;
			if (time_progress > 1) time_progress = 1;
			let point_of_animation = Math.pow(time_progress, 2);
			let modification_value = (move_to_value - value) * point_of_animation;
			input.value = value + modification_value;
			change_scroll_bar(input, input.value);
			change_slide();
			if (time_progress < 1) {
				requestAnimationFrame(animate_input);
			}
		});
		
	})();
	
}

function change_scroll_bar (input, value) {
	value *= 1;
	const style_input = getComputedStyle(input);
	const input_width = style_input.width.substring( 0, style_input.width.length - 2) * 1 - 20;
	const scroll_bar = document.querySelector(".scroll-bar_animate");
	if (value <= 30) {
		scroll_bar.style.width = (input_width) * value / values_of_input + 10 + 'px';
	} else if (value > 95) {
        scroll_bar.style.width = (input_width) * value / values_of_input - 10 + 'px';
	} else {
		scroll_bar.style.width = (input_width) * value / values_of_input + 'px';
	}
}
