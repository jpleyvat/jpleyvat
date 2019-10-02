dot(100);

let [pages, container, numberOfPages, currentPage]: any = [
	document.getElementsByClassName('page'),
	document.getElementById('container'),
	document.getElementsByClassName('page').length,
	1
];

for (let i = 0; i < pages.length; i++)
	pages[i].style.top = String(i * 100) + '%';

document.addEventListener('wheel', (event) => {
	if (getpPropertyValue(container.style.bottom) % 100 === 0) {
		if (event.deltaY < 0) scrollUp();
		if (event.deltaY > 0) scrollDown();
	}
});

document.addEventListener('touchmove', (event) => {
	console.log(event);
});

let navigation: any;
navigation = document.getElementsByClassName('navigation')[0]
	.children[0].children;

for (let i = 0; i < navigation.length; i++) {
	navigation[i].children[0].addEventListener('click', (event) => {
		let pageNumber = Number(event.target.id.replace('dot', ''));
		let operation = 1;
		if (currentPage > pageNumber) operation = -1;
		let animation = setInterval(frame, 2);
		let initialPosition = getpPropertyValue(
			container.style.bottom
		);
		let interval =
			(Math.abs(initialPosition - (pageNumber - 1) * 100) *
				operation) /
			100;
		function frame() {
			if (
				getpPropertyValue(container.style.bottom) ===
				(pageNumber - 1) * 100
			) {
				clearInterval(animation);
				dot(pageNumber * 100);
			} else {
				container.style.bottom = modifyPorperty(
					container.style.bottom,
					interval
				);
			}
		}
	});
}

function scrollUp() {
	let initialPosition = getpPropertyValue(container.style.bottom);
	if (
		container.style.bottom != '' &&
		container.style.bottom != '0%'
	) {
		dot(initialPosition);
		let animation = setInterval(frame, 2);
		function frame() {
			if (
				getpPropertyValue(container.style.bottom) ===
					initialPosition - 100 ||
				getpPropertyValue(container.style.bottom) <= 0
			) {
				clearInterval(animation);
			} else {
				container.style.bottom = modifyPorperty(
					container.style.bottom,
					-1
				);
			}
		}
	}
}

function scrollDown() {
	let initialPosition = getpPropertyValue(container.style.bottom);
	if (
		getpPropertyValue(container.style.bottom) <=
		numberOfPages * 100 - 200
	) {
		dot(initialPosition + 200);
		let animation = setInterval(frame, 2);
		function frame() {
			if (
				getpPropertyValue(container.style.bottom) ===
					initialPosition + 100 ||
				getpPropertyValue(container.style.bottom) >
					numberOfPages * 100 - 101
			) {
				clearInterval(animation);
			} else {
				container.style.bottom = modifyPorperty(
					container.style.bottom,
					1
				);
			}
		}
	}
}

function modifyPorperty(initial: string, value: number) {
	let result = String(getpPropertyValue(initial) + value) + '%';
	return result;
}

function getpPropertyValue(property) {
	return Number(property.replace('%', ''));
}

function dot(scroll) {
	let page = scroll / 100;
	let dot: any;
	let navigation: any;
	navigation = document.getElementsByClassName('navigation')[0]
		.children[0].children;
	for (let item of navigation) {
		item.children[0].src = 'assets/dot.svg';
	}
	dot = document.getElementById('dot' + page);
	dot.src = 'assets/full-dot.svg';
	currentPage = page;
}
