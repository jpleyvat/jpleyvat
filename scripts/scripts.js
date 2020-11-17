dot(100);
var touchStart, touchEnd;
var _a = [
    1,
    document.getElementsByClassName('page'),
    document.getElementById('container'),
    document.getElementsByClassName('page').length,
    document.getElementsByClassName('navigation')[0].children[0]
        .children,
    document.getElementsByClassName('contact')[0].children[2]
], currentPage = _a[0], pages = _a[1], container = _a[2], numberOfPages = _a[3], navigation = _a[4], contactMe = _a[5];
for (var i = 0; i < pages.length; i++)
    pages[i].style.top = String(i * 100) + '%';
document.addEventListener('wheel', function (event) {
    if (getpPropertyValue(container.style.bottom) % 100 === 0) {
        if (event.deltaY < 0)
            scrollUp();
        if (event.deltaY > 0)
            scrollDown();
    }
});
document.addEventListener('touchstart', function (event) {
    touchStart = event.changedTouches[0].clientY;
});
document.addEventListener('touchend', function (event) {
    touchEnd = event.changedTouches[0].clientY;
    if (touchStart < touchEnd)
        scrollUp();
    else if (touchStart > touchEnd)
        scrollDown();
});
contactMe.addEventListener('click', function () {
    var animation = setInterval(function () {
        if (getpPropertyValue(container.style.bottom) === 500) {
            clearInterval(animation);
        }
        else {
            container.style.bottom = modifyPorperty(container.style.bottom, 10);
        }
    }, 2);
    dot(600);
});
for (var i = 0; i < navigation.length; i++) {
    navigation[i].children[0].addEventListener('click', function (event) {
        var pageNumber = Number(event.target.id.replace('dot', ''));
        var operation = 1;
        if (currentPage > pageNumber)
            operation = -1;
        var animation = setInterval(function () {
            if (getpPropertyValue(container.style.bottom) ===
                (pageNumber - 1) * 100) {
                clearInterval(animation);
                dot(pageNumber * 100);
            }
            else {
                container.style.bottom = modifyPorperty(container.style.bottom, interval);
            }
        }, 2);
        var initialPosition = getpPropertyValue(container.style.bottom);
        var interval = (Math.abs(initialPosition - (pageNumber - 1) * 100) *
            operation) /
            100;
    });
}
function scrollUp() {
    var initialPosition = getpPropertyValue(container.style.bottom);
    if (container.style.bottom != '' &&
        container.style.bottom != '0%') {
        dot(initialPosition);
        var animation_1 = setInterval(function () {
            if (getpPropertyValue(container.style.bottom) ===
                initialPosition - 100 ||
                getpPropertyValue(container.style.bottom) <= 0) {
                clearInterval(animation_1);
            }
            else {
                container.style.bottom = modifyPorperty(container.style.bottom, -2);
            }
        }, 1);
    }
}
function scrollDown() {
    var initialPosition = getpPropertyValue(container.style.bottom);
    if (getpPropertyValue(container.style.bottom) <=
        numberOfPages * 100 - 200) {
        dot(initialPosition + 200);
        var animation_2 = setInterval(function () {
            if (getpPropertyValue(container.style.bottom) ===
                initialPosition + 100 ||
                getpPropertyValue(container.style.bottom) >
                    numberOfPages * 100 - 101) {
                clearInterval(animation_2);
            }
            else {
                container.style.bottom = modifyPorperty(container.style.bottom, 1);
            }
        }, 1);
    }
}
function modifyPorperty(initial, value) {
    var result = String(getpPropertyValue(initial) + value) + '%';
    return result;
}
function getpPropertyValue(property) {
    return Number(property.replace('%', ''));
}
function dot(scroll) {
    var page = scroll / 100;
    var dot;
    var navigation;
    navigation = document.getElementsByClassName('navigation')[0]
        .children[0].children;
    for (var _i = 0, navigation_1 = navigation; _i < navigation_1.length; _i++) {
        var item = navigation_1[_i];
        item.children[0].src = 'assets/dot.svg';
    }
    dot = document.getElementById('dot' + page);
    dot.src = 'assets/full-dot.svg';
    currentPage = page;
}