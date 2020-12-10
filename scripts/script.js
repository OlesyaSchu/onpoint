const title = document.querySelector(".title_position_two");

let number_of_slide = 2;

let no_animation_up_area = 768 * 0.1;

let point_of_start_animation_up = 768 * (number_of_slide - 1.5);
let point_of_end_animation_up = 768 * (number_of_slide - 1);

let point_of_start_animation_down = 768 * number_of_slide;
let point_of_end_animation_down = 768 * (number_of_slide - 0.5);

window.addEventListener('scroll', animation_on_scroll);
function animation_on_scroll () {
	if (pageYOffset < no_animation_up_area) {
		title.classList.add("title_animate_down");
		if (title.classList.contains("title_animate_up")) title.classList.remove("title_animate_up");
		if (title.classList.contains("title_animate_start-position")) title.classList.remove("title_animate_start-position");
	}
	if ((pageYOffset > point_of_start_animation_up) && (pageYOffset < point_of_end_animation_up) && (!title.classList.contains("title_animate_up"))) {
		title.classList.add("title_animate_start-position");
	}

	if ((pageYOffset < point_of_start_animation_down) && (pageYOffset > point_of_end_animation_down) && (!title.classList.contains("title_animate_down"))) {
		title.classList.add("title_animate_start-position");
	}
	if (pageYOffset >= point_of_start_animation_down) {
		title.classList.add("title_animate_up");
		if (title.classList.contains("title_animate_down")) title.classList.remove("title_animate_down");
		if (title.classList.contains("title_animate_start-position")) title.classList.remove("title_animate_start-position");
	}
}