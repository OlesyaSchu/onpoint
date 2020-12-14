// ==================================================
// Animation: moving title and ices in slides one and two
// ==================================================

window.addEventListener('scroll', animation_on_slide);

const array_of_animated_elements_slide_one = document.querySelectorAll(".title_position_one, .peak");
const array_of_animated_elements_slide_two = document.querySelectorAll(".title_position_two, .deep_position_two");

// определяем константы для высоты и ширины экрана
const viewport_height = 768;
const viewport_width = 1024;

// передаем массивы элементов и номера слайдов для определения точек старта и конца действия анимации
function animation_on_slide () {
	animation_on_scroll(array_of_animated_elements_slide_one, 1);
	animation_on_scroll(array_of_animated_elements_slide_two, 2);
}

// эта функция анимирует каждый элемент из передаваемого массива с помощью присвоения элементу классов 
// title_animate_start-position, title_animate_up и title_animate_down в определенные моменты времени
function animation_on_scroll (array_of_animated_elements, number_of_slide) {
	// задаем координаты, где не должно быть анимации
	let no_animation_up_area = viewport_height * (number_of_slide - 1.9);

	// задаем точки начала и конца анимации, когда элемент идет вверх
	let point_of_start_animation_up = viewport_height * (number_of_slide - 1.5);
	let point_of_end_animation_up = viewport_height * (number_of_slide - 1);

	// задаем точки начала и конца анимации, когда элемент идет вниз
	let point_of_start_animation_down = viewport_height * (number_of_slide - 0.1);
	let point_of_end_animation_down = viewport_height * (number_of_slide - 0.5);

	array_of_animated_elements.forEach( (animated_element) => {
		// анимация движения элемента вверх:
		if (pageYOffset < no_animation_up_area) { // если посетитель находится выше анимируего элемента
			// то опускаем анимируемый элемент, чтобы потом он поднялся
			animated_element.classList.add("title_animate_down");
			// и удаляем другие классы, влияющие на анимацию, если они есть
			if (animated_element.classList.contains("title_animate_up")) animated_element.classList.remove("title_animate_up");
			if (animated_element.classList.contains("title_animate_start-position")) animated_element.classList.remove("title_animate_start-position");
		}
		// если посетитель заходит в зону действия анимации и она еще не выполнена, то элемент поднимается
		if ((pageYOffset > point_of_start_animation_up) && (pageYOffset < point_of_end_animation_up) && (!animated_element.classList.contains("title_animate_up"))) {
			animated_element.classList.add("title_animate_start-position");
		}

		// анимация движения элемента вниз:
		// если посетитель заходит в зону действия анимации и она еще не выполнена, то элемент опускается
		if ((pageYOffset < point_of_start_animation_down) && (pageYOffset > point_of_end_animation_down) && (!animated_element.classList.contains("title_animate_down"))) {
			animated_element.classList.add("title_animate_start-position");
		}
		// если посетитель находится ниже анимируего элемента
		// то поднимаем анимируемый элемент, чтобы потом он опустился
		if (pageYOffset >= point_of_start_animation_down) {
			animated_element.classList.add("title_animate_up");
			// и удаляем другие классы, влияющие на анимацию, если они есть
			if (animated_element.classList.contains("title_animate_down")) animated_element.classList.remove("title_animate_down");
			if (animated_element.classList.contains("title_animate_start-position")) animated_element.classList.remove("title_animate_start-position");
		}
	});
}

// ==================================================
// Animation: pagination - change colors of circles
// and hide navigator on two and three slides
// ==================================================

window.addEventListener('scroll', animation_navigation);

function animation_navigation () {
	change_color_of_pagination();
	hide_indicator();
}

// эта функция меняет цвет навигации, выделяя позицию страницы, где сейчас находится пользователь
function change_color_of_pagination () {
	const array_of_pagination__circle = document.querySelectorAll(".pagination__circle");
	// точка определения номера слайда (и круга соответственно) находится выше, чем окончание слайда
	// чтобы анимация запускалась раньше, чем закончится движение до следующего слайда
	let number_active_circle = (pageYOffset + 0.5 * viewport_height) / viewport_height;
	number_active_circle = Math.trunc(number_active_circle);
	// проверяем каждый круг и обновляем цвет с помощью удаления класса pagination__circle_active, если он есть у элемента
	// то есть находим и деактивируем элемент, который раньше был активным
	array_of_pagination__circle.forEach((element, index) => {
		if (element.classList.contains("pagination__circle_active") && (index != number_active_circle)) {
			element.classList.remove("pagination__circle_active");
		}
	});
	// меняем цвет у нужного круга с помощью добавления к элементу класса pagination__circle_active
	array_of_pagination__circle[number_active_circle].classList.add("pagination__circle_active");
}

// прячем указатель на прокрутку вниз, если пользователь на 10% от высоты экрана прокрутил вниз
function hide_indicator () {
	const indicator = document.querySelector(".indicator");
	if ((pageYOffset > 0.1 * viewport_height) && !indicator.classList.contains("indicator_hidden")) {
		indicator.classList.add("indicator_hidden");
	}
	// возвращаем указатель, снимая деактивирующий класс с блока
	if ((pageYOffset <= 0.1 * viewport_height) && indicator.classList.contains("indicator_hidden")) {
		indicator.classList.remove("indicator_hidden");
	}
}

// ==================================================
// Animation: moving slides three-five by slider
// ==================================================

// задаем константу количества значений у слайдера
const values_of_input = 100;

window.addEventListener('input', change_slide);

// двигает слайды в зависимости от значения слайдера
function change_slide () {
	const input = document.querySelector(".slider");
	const wrapper = document.querySelector(".wrapper_scroll_x");
	let value = Number(input.value);
	// умножаем значение слайдера на количество пикселей, 
	// на которые должны прокрутиться слайды за одно значение слайдера
	wrapper.scrollLeft = (value) * (viewport_width * 2 / values_of_input);
	// меняем при изменении значения слайдера и его фон 
	change_scroll_bar(input, input.value); 
}

window.addEventListener('change', move_input);

// при отпускании кнопки мыши со слайдера, изменяем его значение
function move_input () {
	const input = document.querySelector(".slider");
	let value = input.value * 1;

	// задаем точки, к которым будет притягиваться слайдер
	const start = 0;
	const finish = values_of_input;
	const middle = (finish - start) / 2;

	// задаем переменную, которая будет показывать, к какой именно точке будет двигаться слайдер
	let move_to_value = 0;

	if (value < ((middle - start) / 2)) move_to_value = start;
	if ((value >= ((middle - start) / 2)) && (value < ((finish - middle) / 2 + middle))) move_to_value = middle;
	if (value >= ((finish - middle) / 2 + middle)) move_to_value = finish;
	
	// продолжительность анимации перемещения слайдера 200мс
	const duration = 200;

	// запускаем функцию, зацикленную с помощью requestAnimationFrame
	(function animate_input() {
		// определяем время начала анимации
		const time_start = performance.now();

		requestAnimationFrame( function animate_input (time){

			// определяем, какая часть анимации уже выполнена
			let time_progress = (time - time_start) / duration;
			if (time_progress > 1) time_progress = 1;
			// задаем кривую с помощью формулы, чтобы движение не было линейным и выглядело естественнее
			let point_of_animation = Math.pow(time_progress, 2);
			// изменяем значение слайдера
			let modification_value = (move_to_value - value) * point_of_animation;
			input.value = value + modification_value;
			// изменяем фон слайдера и положение слайдов вместе со значением самого слайдера
			change_scroll_bar(input, input.value);
			change_slide();
			// если анимация еще не выполнена по времени
			if (time_progress < 1) {
				requestAnimationFrame(animate_input);
			}
		});
		
	})();
	
}

// меняет длину светло-голубого фона у слайдера
function change_scroll_bar (input, value) {
	value *= 1;
	const style_input = getComputedStyle(input);
	// определяем длину слайдера, по которой будет строиться фон
	const input_width = style_input.width.substring( 0, style_input.width.length - 2) * 1 - 20;
	const scroll_bar = document.querySelector(".scroll-bar_animate");
	if (value <= 30) { // если значение меньше 30, то прибавляем слайдеру дополнительные 10px
		// чтобы не было пустоты между ползунком и фоном 
		scroll_bar.style.width = (input_width) * value / values_of_input + 10 + 'px';
	} else if (value > 95) { // если больше 95, то убираем пиксели, чтобы фон не шел впереди ползунка
        scroll_bar.style.width = (input_width) * value / values_of_input - 10 + 'px';
	} else {
		scroll_bar.style.width = (input_width) * value / values_of_input + 'px';
	}
}
