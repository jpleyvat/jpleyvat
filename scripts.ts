dot(100);

let touchStart, touchEnd;

let [
	currentPage,
	pages,
	container,
	numberOfPages,
	navigation,
	contactMe
]: any = [
	1,
	document.getElementsByClassName('page'),
	document.getElementById('container'),
	document.getElementsByClassName('page').length,
	document.getElementsByClassName('navigation')[0].children[0]
		.children,
	document.getElementsByClassName('contact')[0].children[2]
];

for (let i: number = 0; i < pages.length; i++)
	pages[i].style.top = String(i * 100) + '%';

document.addEventListener('wheel', (event): void => {
	if (getpPropertyValue(container.style.bottom) % 100 === 0) {
		if (event.deltaY < 0) scrollUp();
		if (event.deltaY > 0) scrollDown();
	}
});

document.addEventListener('touchstart', (event): void => {
	touchStart = event.changedTouches[0].clientY;
});

document.addEventListener('touchend', (event): void => {
	touchEnd = event.changedTouches[0].clientY;
	if (touchStart < touchEnd) scrollUp();
	else if (touchStart > touchEnd) scrollDown();
});

contactMe.addEventListener('click', (): void => {
	let animation: number = setInterval((): void => {
		if (getpPropertyValue(container.style.bottom) === 500) {
			clearInterval(animation);
		} else {
			container.style.bottom = modifyPorperty(
				container.style.bottom,
				10
			);
		}
	}, 2);
	dot(600);
});

for (let i: number = 0; i < navigation.length; i++) {
	navigation[i].children[0].addEventListener('click', (event) => {
		let pageNumber : number = Number(event.target.id.replace('dot', ''));
		let operation: number = 1;
		if (currentPage > pageNumber) operation = -1;
		let animation: number = setInterval((): void => {
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
		}, 2);
		let initialPosition = getpPropertyValue(
			container.style.bottom
		);
		let interval: number =
			(Math.abs(initialPosition - (pageNumber - 1) * 100) *
				operation) /
			100;
	});
}

function scrollUp():void {
	let initialPosition: number = getpPropertyValue(container.style.bottom);
	if (
		container.style.bottom != '' &&
		container.style.bottom != '0%'
	) {
		dot(initialPosition);
		let animation: number = setInterval((): void=>{
			if (
				getpPropertyValue(container.style.bottom) ===
					initialPosition - 100 ||
				getpPropertyValue(container.style.bottom) <= 0
			) {
				clearInterval(animation);
			} else {
				container.style.bottom = modifyPorperty(
					container.style.bottom,
					-2
				);
			}
		}, 1);
	}
}

function scrollDown():void {
	let initialPosition = getpPropertyValue(container.style.bottom);
	if (
		getpPropertyValue(container.style.bottom) <=
		numberOfPages * 100 - 200
	) {
		dot(initialPosition + 200);
		let animation: number = setInterval(():void=>{
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
		}, 1);
	}
}

function modifyPorperty(initial: string, value: number): string {
	let result = String(getpPropertyValue(initial) + value) + '%';
	return result;
}

function getpPropertyValue(property): number {
	return Number(property.replace('%', ''));
}

function dot(scroll: number): void {
	let page: number = scroll / 100;
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
