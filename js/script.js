const app = {};
app.currentLink='homeLink';

app.navClick=function(){
    $('header nav a').on('click', function(event){
        if($(window).width()<1050 ) {
                $('.hamburger').toggleClass("is-active");
                $('header ul').toggleClass('displayHamburger');
            
        }
        const navLinks=['homeLink', 'aboutLink', 'skillsLink', 'projectsLink','contactLink'];
        event.preventDefault();
        const previousLink = navLinks.indexOf(app.currentLink);
        const clickedLink=navLinks.indexOf($(this).attr('id'));
        if(previousLink===clickedLink) {
            return;
        }
        $(`#${app.currentLink}`).removeClass('theActive');
        $(`#${app.currentLink}`).addClass('notActive');
        if (previousLink < clickedLink) {
            i = previousLink + 1;
        }
        else {
            i = previousLink - 1;
        } 
        const t = setInterval(function () {
                $(`#${navLinks[i]}`).addClass('theActive');
                const x=setTimeout(function() {
                    if (i !== clickedLink) {
                        $(`#${navLinks[i]}`).removeClass('theActive');
                        if(previousLink<clickedLink) {
                            i++;
                        }
                        else {
                            i--;
                        }
                    }
                    else {
                        clearInterval(x);
                    }
                }, 250);    
                if (i === clickedLink) {
                    clearInterval(t);
                    $(this).removeClass('notActive');
                    $(this).addClass('theActive')
            }
        }, 300); 
        app.currentLink = $(this).attr('id');
        const section=app.currentLink.replace('Link', '');
        $(document).off("scroll");
        $('html, body').animate({
            'scrollTop': $(`#${section}`).offset().top 
        }, 1400, 'swing', function () {
           app.onScroll();
        });
    });
}

app.logoClick= function () {
$('#logo').on('click', function (){
    document.location.href = "#home";
});
}

app.hamburgerClick= function() {
    $(".hamburger").click(function () {
        $(this).toggleClass("is-active");
        $('header ul').toggleClass('displayHamburger');
    });
}

app.downloadCV= function() {
    $('.cv').on ('click', function() {
        window.open('./assets/AbirResume.pdf', '_blank');
    
    });
}

app.onScroll= function() {
    $(document).on("scroll", function() {
        const  scrollPos = $(document).scrollTop();
        $('header nav a').each(function () {
            const currLink = $(this);
            const refElement = $(currLink.attr("href"));
            
            if (scrollPos >= refElement.position().top && scrollPos < refElement.position().top + refElement.height()) {
                currLink.addClass("theActive");
                currLink.removeClass("notActive");
                app.currentLink=currLink.attr('id');
                
            }
            else {
                currLink.blur();
                currLink.removeClass("theActive");
                currLink.addClass("notActive");
            }
        });
    });
    }

    //to filter the projects
    app.projectTypeFilter=function() {
        $('.projectTypes li a').on('click', function(event){
            event.preventDefault();
            $('.projectTypes li a')
            $('.projectTypes li a').removeClass('theActive');
            $('.projectTypes li a').addClass('notActive');
            $projectType=$(this);
            $projectType.removeClass('notActive');
            $projectType.addClass('theActive');
            if ($projectType.attr('data-type')==='all'){
                $('.projects').addClass('slide-in-bottom');
                $('.projects').show();
                return;
           }
            $('.projects').each(function () {
                const $project = $(this);
                if ($project.attr('data-type') !== $projectType.attr('data-type')){
                    $project.hide();
                }
                else {
                    $project.addClass('slide-in-bottom');
                    $project.show();
                }

            });
        });
    }

    app.sendEmail=function() {
        $('form').on('submit', function(event){
            event.preventDefault();
            $('main form div img').css('display', 'block');
            Email.send({
                // Host: "smtp.gmail.com",
                // Username: "abir.halwa@gmail.com",
                // Password: "87654321@Ss",
                SecureToken: "afc44161-5d66-44bc-aa9a-66940c5ee76f",
                To: 'abir.halwa@gmail.com',
                From: $('#email').val(),
                Subject: `An email from ${$('#name').val()}`,
                Body: $('#message').val(),
            }).then(function(){
                $('main form div img').css('display', 'none');
                $('form').trigger("reset");
                $('form p').text('Thank you! Your message has been successfully sent. I will contact you very soon!');
            });
        });
    }
app.init = function () {
    app.hamburgerClick();
    app.navClick();
    app.logoClick();
    app.onScroll();
    app.downloadCV();
    app.projectTypeFilter();
    app.sendEmail();
}

$(function () {
app.init();
});