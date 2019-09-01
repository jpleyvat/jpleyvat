let [pages, container, numberOfPages]: any = [
	document.getElementsByClassName('page'),
	document.getElementById('container'),
	document.getElementsByClassName('page').length
];

for (let i = 0; i < pages.length; i++)
	pages[i].style.top = String(i * 100) + '%';

document.addEventListener('wheel', event => {
	if (getpPropertyValue(container.style.bottom) % 100 === 0) {
		if (event.deltaY < 0) scrollUp();
		if (event.deltaY > 0) scrollDown();
	}
});

document.addEventListener('touchmove', event => {
	console.log(event);
});

function scrollUp() {
	let initialPosition = getpPropertyValue(container.style.bottom);
	if (
		container.style.bottom != '' &&
		container.style.bottom != '0%'
	) {
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
