//Burger handler

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    const menuLinks = document.querySelectorAll('.header__link');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active');
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    });
    for (let i = 0; i <= menuLinks.length; i += 1) {
        menuLinks[i].addEventListener('click', () => {
            menu.classList.remove('header__nav_active');
        })
    }

}());


// (function () {
//     const hiddenImg = document.querySelectorAll('.hidden_additional-items');
//     const refreshBtn = document.querySelector('.refresh__button');

//     refreshBtn.addEventListener('click', function() {
//     // Show the additional menu items
//     console.log(1);
//     hiddenImg.style.display = 'block';
//   });
// })

// (function () {
//     // const hiddenImgs = document.querySelectorAll('.hidden_additional-items');
//     const refreshBtn = document.querySelector('.refresh__button');

//     refreshBtn.addEventListener('click', () => {
//         // Show the additional menu items
//         console.log(1);
//         // hiddenImgs.forEach(hiddenImg => {
//         //     hiddenImg.style.display = 'block';
//         // });
//     });
// }());

(function () {
    const refreshBtn = document.querySelector('#load-more-btn');

    refreshBtn.addEventListener('click', () => {
        console.log("1");
    });
})();


