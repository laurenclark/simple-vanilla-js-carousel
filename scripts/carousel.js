const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

// Controls
const nextButton = document.querySelector('.carousel__button.right');
const prevButton = document.querySelector('.carousel__button.left');

// Slide positioning
const setSlidePosition = (slide, i) => {
    return (slide.style.left =
        slide.childNodes[1].getBoundingClientRect().width * i + 'px');
};
slides.forEach(setSlidePosition);

// Slide Movement
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('slide--current');
    targetSlide.classList.add('slide--current');
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
