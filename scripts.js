var _a = [
    document.getElementsByClassName('page'),
    document.getElementById('container'),
    document.getElementsByClassName('page').length
], pages = _a[0], container = _a[1], numberOfPages = _a[2];
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
function scrollUp() {
    var initialPosition = getpPropertyValue(container.style.bottom);
    if (container.style.bottom != '' &&
        container.style.bottom != '0%') {
        var animation_1 = setInterval(frame, 2);
        function frame() {
            if (getpPropertyValue(container.style.bottom) ===
                initialPosition - 100 ||
                getpPropertyValue(container.style.bottom) <= 0) {
                clearInterval(animation_1);
            }
            else {
                container.style.bottom = modifyPorperty(container.style.bottom, -1);
            }
        }
    }
}
function scrollDown() {
    var initialPosition = getpPropertyValue(container.style.bottom);
    if (getpPropertyValue(container.style.bottom) <=
        numberOfPages * 100 - 200) {
        var animation_2 = setInterval(frame, 2);
        function frame() {
            if (getpPropertyValue(container.style.bottom) ===
                initialPosition + 100 ||
                getpPropertyValue(container.style.bottom) >
                    numberOfPages * 100 - 101) {
                clearInterval(animation_2);
            }
            else {
                container.style.bottom = modifyPorperty(container.style.bottom, 1);
            }
        }
    }
}
function modifyPorperty(initial, value) {
    var result = String(getpPropertyValue(initial) + value) + '%';
    return result;
}
function getpPropertyValue(property) {
    return Number(property.replace('%', ''));
}
