const favouriteList = document.querySelector('.favourite__list'),
buttonLeft = document.querySelector('.favourite__slider__left'),
buttonRight = document.querySelector('.favourite__slider__right'),
favouriteControls = document.querySelectorAll('.favourite__controls__item')


let position = 0,
 favouriteControlIndex = 0


nextSlide = () => {
    if (position < 60) {
       position += 30 
       favouriteControlIndex++
    } else {
        position = 0
        favouriteControlIndex = 0
    }

favouriteList.style.transform = `translateX(-${position + "rem"})`;
thisSlide(favouriteControlIndex)
}

buttonRight.addEventListener('click', nextSlide)




prevSlide = () => {
    if (position > 0) {
       position -= 30 
       favouriteControlIndex--
    } else {
        position = 60
        favouriteControlIndex = 2
    }

favouriteList.style.transform = `translateX(-${position + "rem"})`;
}

buttonLeft.addEventListener('click', prevSlide)


thisSlide = (favouriteControlIndex) => {
    for (let favouriteControl of favouriteControls) {
        favouriteControl.classList.remove('favourite__controls__item__selected')
    }
favouriteControls[favouriteControlIndex].classList.add('favourite__controls__item__selected')    
    }

// favouriteControls.forEach((favourite__controls__item, index))




setInterval(() => {
    nextSlide()
}, 4000)



