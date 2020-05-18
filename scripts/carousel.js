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

// Slide Movement
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('slide--current');
    targetSlide.classList.add('slide--current');
    targetSlide.querySelector(
        '.slide__counter'
    ).dataset.count = increaseCounter(
        targetSlide.querySelector('.slide__counter').dataset.count
    );
    updateCounter(targetSlide);
};

// Increase Counter
const increaseCounter = (count) => {
    count = parseInt(count);
    return (count += 1);
};

// Update Counter
const updateCounter = (targetSlide) => {
    const counter = targetSlide.querySelector('.slide__counter');
    counter.textContent =
        counter.dataset.count < 2
            ? 'Viewed 1 time'
            : `Viewed ${counter.dataset.count} times`;
};

// Button Handlers
nextButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.slide--current');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.slide--current');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// Control Visibility
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
