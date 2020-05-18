const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

// Controls
const nextButton = document.querySelector('.arrow__right');
const prevButton = document.querySelector('.arrow__left');

// Slide positioning
const setSlidePosition = (slide, i) => {
    return (slide.style.left =
        slide.childNodes[3].getBoundingClientRect().width * i + 'px');
};
slides.forEach(setSlidePosition);

/**
 * Slide Movement
 *
 * @param {Object} htmlElement
 * @param {Obect} htmlElement
 * @param {Object} htmlElement
 */

const moveToSlide = (track, currentSlide, targetSlide) => {
    const counterEl = targetSlide.querySelector('.slide__counter');
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('slide--current');
    targetSlide.classList.add('slide--current');
    counterEl.dataset.count = increaseCounter(counterEl.dataset.count);
    updateCounter(targetSlide);
};

/**
 * Increase Counter
 *
 * @param {String} NumberAsString
 */
const increaseCounter = (count) => {
    count = parseInt(count);
    return (count += 1);
};

/**
 * Update Counter
 *
 * @param {Object} htmlElement
 */
const updateCounter = (targetSlide) => {
    const counter = targetSlide.querySelector('.slide__counter');
    counter.textContent =
        counter.dataset.count < 2
            ? 'Viewed 1 time'
            : `Viewed ${counter.dataset.count} times`;
};

/**
 * Next Slide Handler
 */
nextButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.slide--current');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

/**
 * Prev Slide Handler
 */
prevButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.slide--current');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

/**
 * Control Visibility
 *
 * @param {Object} htmlElement
 * @param {Object} htmlElement
 * @param {Object} htmlElement
 * @param {Number} index
 */
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
    } else {
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(event) {
    return event.touches || event.originalEvent.touches;
}

function handleTouchStart(event) {
    const firstTouch = getTouches(event)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = event.touches[0].clientX;
    var yUp = event.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            const currentSlide = track.querySelector('.slide--current');
            const nextSlide = currentSlide.nextElementSibling;
            const nextIndex = slides.findIndex((slide) => slide === nextSlide);
            moveToSlide(track, currentSlide, nextSlide);
            hideShowArrows(slides, prevButton, nextButton, nextIndex);
        } else {
            const currentSlide = track.querySelector('.slide--current');
            const prevSlide = currentSlide.previousElementSibling;
            const prevIndex = slides.findIndex((slide) => slide === prevSlide);
            moveToSlide(track, currentSlide, prevSlide);
            hideShowArrows(slides, prevButton, nextButton, prevIndex);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}
