$(document).ready(function () {
    //menu
    $(".small-screens .menu-icon").click(function (e) {
        e.preventDefault()
        $(".sm-main-menu").slideToggle("slow")
    })
    $(".sm-main-menu button").click(function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("open active")
        $(this).next().slideToggle();
        if ($(this).children().hasClass("fa-plus-circle")) {
            this.children[0].classList = "fas fa-minus-circle"
        }
        else {
            this.children[0].classList = "fas fa-plus-circle"
        }
    })
});
//slider
$(document).ready(function (e) {
    if (!document.querySelector('#home-slider')) {
        return false
    }
    const slider = document.querySelector('.slider');
    const sliderImages = document.querySelectorAll('.slider img');
    let counter = 1;
    let width = sliderImages[0].clientWidth;
    $(window).resize(function () {
        width = $(document).width();
        slider.style.transform = 'translateX(0px)'
        counter = 0;
    })
    let sliderInterval = setInterval(() => {
        moveRightSlider()
    }, 5000);
    setTimeout(() => {
        clearInterval(sliderInterval)
    }, 20000);
    slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
    $(document).on("click", ".next", function () {
        clearInterval(sliderInterval)
        moveRightSlider()
    })
    $(document).on("click", ".prev", function () {
        clearInterval(sliderInterval)
        moveLeftSlider()
    })
    $(document).on("transitionend", ".slider", function () {
        if (sliderImages[counter].getAttribute("data-id") === "last-clone") {
            slider.style.transition = "none";
            counter = slider.children.length - 2;
            slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
        }
        if (sliderImages[counter].getAttribute("data-id") === "first-clone") {
            slider.style.transition = "none";
            counter = sliderImages.length - counter;
            slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
        }
    })

    function moveRightSlider() {
        if (counter >= sliderImages.length - 1) return;
        slider.style.transition = "transform 0.4s linear";
        counter++;
        slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
    }
    function moveLeftSlider() {
        if (counter <= 0) return;
        slider.style.transition = "transform 0.4s linear";
        counter--;
        slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
    }

});
//search-tabs section
$(document).ready(function () {
    $(document).on("click", "#search-tabs .large-screen-tabs li a", function (e) {
        e.preventDefault();
        let id = $(this).parent().attr("id")
        $("#search-tabs .large-screen-tabs li.active").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parents(".row").next().children().children().each(function (index, element) {
            if ($(element).attr("id") !== id) {
                $(element).hide()
            }
            else {
                $(element).fadeIn("slow")
            }
        })
    })
    $(document).on("click", "#search-tabs .small-screen-tabs .right", function () {
        let activeLi = $("#search-tabs .small-screen-tabs li.active");
        if ([...activeLi][0] !== $("#search-tabs .small-screen-tabs li")[1]) {
            $('#search-tabs .small-screen-tabs .left').css("backgroundColor", "#01b7f2");
        }
        if ([...activeLi][0] == $("#search-tabs .small-screen-tabs li")[$("#search-tabs .small-screen-tabs li").length - 2]) {
            this.style.backgroundColor = "#d9d9d9";
        }
        if ([...activeLi][0] == $("#search-tabs .small-screen-tabs li")[$("#search-tabs .small-screen-tabs li").length - 1]) {
            return false;
        }
        tabChanger(activeLi, $(activeLi).next().attr("id"))
        $(activeLi).removeClass("active");
        $(activeLi).next().addClass("active")
    })
    $(document).on("click", "#search-tabs .small-screen-tabs .left", function () {

        let activeLi = $("#search-tabs .small-screen-tabs li.active");
        if ([...activeLi][0] !== $("#search-tabs .small-screen-tabs li")[$("#search-tabs .small-screen-tabs li").length - 2]) {
            $('#search-tabs .small-screen-tabs .right').css("backgroundColor", "#01b7f2");
        }
        if ([...activeLi][0] == $("#search-tabs .small-screen-tabs li")[1]) {
            this.style.backgroundColor = "#d9d9d9";
        }
        if ([...activeLi][0] == $("#search-tabs .small-screen-tabs li")[0]) {
            return false;
        }
        tabChanger(activeLi, $(activeLi).prev().attr("id"))
        $(activeLi).removeClass("active");
        $(activeLi).prev().addClass("active")

    })
    function tabChanger(li, element) {
        let id = element
        $(li).parents(".row").next().children().children().each(function (index, element) {
            if ($(element).attr("id") !== id) {
                $(element).hide()
            }
            else {
                $(element).fadeIn("slow")
            }
        })
    }
});
$(window).resize(function () {
    if ($(document).width() <= 993) {
        $("#scroll-head").hide()
    }
});
$(document).scroll(function () {
    if ($(document).width() <= 993) {
        return false
    }
    if ($(document).scrollTop() > 150) {
        $("#scroll-head").slideDown()
    }
    else {
        $("#scroll-head").slideUp()
    }
});
$(document).ready(function () {
    if (document.querySelector('.small-screen-tabs')) {
        $(document).on("click", ".small-screen-tabs li a", function (e) { 
            e.preventDefault()
         })
    }
});
//carusel
$(document).ready(function () {
    caruselItemWidthUploader()
    let count = 0;
    caruselUploader("#h-hotel-choice");
    caruselUploader("#recommended-hotels");
    caruselUploader("#air-tickets");
    function caruselUploader(which) {
        count = 0
        $(document).on("click", `${which} #carusel-arrows .right`, function (e) {
            e.preventDefault();
            if ($(window).width() >= 992) {
                if (count < 1) {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth - 30}px)`
                    count++
                }
                else {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(0px)`;
                    count = 0;
                }
            }
            if ($(window).width() >= 768 && $(window).width() < 992) {
                if (count < 2) {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth * (count + 1) - 30 * (count + 1)}px)`
                    count++
                }
                else {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(0px)`;
                    count = 0;
                }
            }
            if ($(window).width() < 768) {
                if (count < 3) {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth * (count + 1) - 30 * (count + 1)}px)`
                    count++
                }
                else {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(0px)`;
                    count = 0;
                }
            }
        })
        $(document).on("click", `${which} #carusel-arrows .left`, function (e) {
            e.preventDefault()
            if ($(window).width() >= 992) {
                if (count < 1) {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth - 30}px)`
                    count++
                }
                else {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(0px)`;
                    count = 0;
                }
            }
            if ($(window).width() >= 768 && $(window).width() < 992) {
                if (document.querySelector(`${which} #carusel`).style.transform !== "translateX(0px)") {
                    count--;
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth * (count) - 30 * (count)}px)`
                }
                else {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth * 2 - 30 * 2}px)`;
                    count = 2;
                }
            }
            if ($(window).width() < 768) {
                if (document.querySelector(`${which} #carusel`).style.transform !== "translateX(0px)") {
                    count--;
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth * (count) - 30 * (count)}px)`
                }
                else {
                    document.querySelector(`${which} #carusel`).style.transform = `translateX(${-document.querySelector(`${which} #carusel .carusel-item`).clientWidth * 3 - 30 * 3}px)`;
                    count = 3;
                }
            }
        })
    }
    function caruselItemWidthUploader() {
        if ($(window).width() >= 992) {
            [...document.querySelectorAll("#carusel .carusel-item")].forEach(item => {
                item.style.width = ((document.querySelector('#carusel-holder').clientWidth - 90) / 4) + "px";
            })
        }
        if ($(window).width() >= 768 && $(window).width() < 992) {
            [...document.querySelectorAll("#carusel .carusel-item")].forEach(item => {
                item.style.width = ((document.querySelector('#carusel-holder').clientWidth - 60) / 3) + "px";
            })
        }
        if ($(window).width() < 768) {
            [...document.querySelectorAll("#carusel .carusel-item")].forEach(item => {
                item.style.width = ((document.querySelector('#carusel-holder').clientWidth - 30) / 2) + "px";
            })
        }
    }
    $(window).resize(function () {
        if (document.querySelector('#carusel') == undefined) {
            return false
        }
        count = 0;
        caruselItemWidthUploader()
        document.querySelector("#carusel").style.transform = `translateX(0px)`;

    });
})
//accordion
$(document).ready(function () {
    $("#about-flights .accordion").first().addClass("active");
    $("#about-flights .accordion").first().children("p").slideDown();
    $(document).on("click", "#about-flights .accordion a", function (e) {
        e.preventDefault();
        if (!$(this).parent().parent().hasClass("active")) {
            $(this).parent().parent().parent().children(".accordion").children("p").slideUp()
            $(this).parent().parent().parent().children(".accordion.active").removeClass("active");
            this.children[0].classList = "fas fa-minus-circle"
            $(this).parent().parent().addClass("active");
            $(this).parent().next().slideDown()
        }
        else {
            $(this).parent().parent().removeClass("active");
            $(this).parent().next().slideUp();
        }
        $(this).parent().parent().parent().children().each(function (indexInArray, el) {
            if (!el.classList.contains("active")) {
                if ($(el).children("h4").children("a").children("i").hasClass("fas fa-minus-circle")) {
                    $(el).children("h4").children("a").children("i").removeClass("fas fa-minus-circle");
                    $(el).children("h4").children("a").children("i").addClass("fas fa-plus-circle")
                }
                else {
                    $(el).children("h4").children("a").children("i").addClass("fas fa-plus-circle")
                }
            }
        });
        let src = $(this).parent().parent().children("img").attr("src")
        $(this).parent().parent().parent().children(".image-holder").children("img").attr("src", src)
    })
});

//h-tabs
$(document).ready(function () {
    $(document).on("click", "#h-tabs li a", function (e) {
        e.preventDefault()
        let lastActiveContent = ($(`.h-tab-content[data-id="${document.querySelector('#h-tabs li.active').getAttribute("id")}"]`));
        document.querySelector('#h-tabs li.active').classList.remove("active");
        $(this).parent().addClass("active");
        let id = $(this).parent().attr("id")
        $(lastActiveContent).fadeOut("fast", function () {
            $(`.h-tab-content[data-id="${id}"]`).fadeIn()
        })
    })
});
//testimonials
$(document).ready(function () {
    [...document.querySelectorAll('#h-details .testimonials-item')].forEach(item => {
        item.style.width = `${parseFloat(document.querySelector('.parent-col').clientWidth) - 30}px`
    })
    $(window).resize(function () {
        [...document.querySelectorAll('#h-details .testimonials-item')].forEach(item => {
            item.style.width = `${parseFloat(document.querySelector('#h-details .parent-col').clientWidth) - 30}px`
            document.querySelector("#h-details .testimonials").style.transform = `translateX(0px)`
            document.querySelector('#h-details .testimo-nav a.active').classList.remove("active");
            document.querySelector('#h-details .testimo-nav a').classList.add("active")
        })
    });
    $(document).on("click", "#h-details .testimo-nav a", function (e) {
        e.preventDefault()
        document.querySelector('#h-details .testimo-nav a.active').classList.remove("active");
        $(this).addClass("active")
        let id = $(this).attr("data-id");
        document.querySelector("#h-details .testimonials").style.transform = `translateX(${-document.querySelector("#h-details .testimonials .testimonials-item").clientWidth * id}px)`
    })
});

$(document).ready(function () {
    if (document.querySelector('#holidays-tabs')) {
        
        $(window).resize(function () {
            hTabsResponsiveCols()
        });
        hTabsResponsiveCols()
    }
    function hTabsResponsiveCols() {
        const responsiveCol = document.querySelector('#holidays-tabs .h-tab-content [data-id="js-responsive-col6"]')
        if ($(window).width() < 974) {
            responsiveCol.classList.add("pb-5", "mb-4")
            responsiveCol.nextElementSibling.classList.add("pb-5", "mb-5")
        }
        else {
            responsiveCol.classList.remove("pb-5", "mb-4")
            responsiveCol.nextElementSibling.classList.remove("pb-5", "mb-5")
        }
    }
});
$(document).ready(function(){
    if (document.querySelector('#preloader')) {
        setTimeout(() => {
            $("#preloader").fadeOut()
        }, 2000);
    }
})