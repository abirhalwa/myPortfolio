const app = {};
app.currentLink='homeLink';

app.navClick=function(){
    $('header nav a').on('click', function(event){
        const navLinks=['homeLink', 'aboutLink', 'skillsLink', 'projectsLink', 'resumeLink', 'contactLink'];
        event.preventDefault();
        const previousLink = navLinks.indexOf(app.currentLink);
        const clickedLink=navLinks.indexOf($(this).attr('id'));
        if(previousLink===clickedLink) {
            return;
        }
        $(`#${app.currentLink}`).removeClass('active');
        $(`#${app.currentLink}`).addClass('notActive');
        if (previousLink < clickedLink) {
            i = previousLink + 1;
        }
        else {
            i = previousLink - 1;
        } 
        const t = setInterval(function () {
                $(`#${navLinks[i]}`).addClass('active');
                const x=setTimeout(function() {
                    if (i !== clickedLink) {
                        $(`#${navLinks[i]}`).removeClass('active');
                        if(previousLink<clickedLink) {
                            i++;
                        }
                        else {
                            i--;
                        }
                    }
                    else {
                        clearInterval(t);
                    }
                }, 250);    
        }, 300); 
        $(this).removeClass('notActive');
        app.currentLink = $(this).attr('id');
        const section=app.currentLink.replace('Link', '');
        $(document).off("scroll");
        $('html, body').animate({
            'scrollTop': $(`#${section}`).offset().top 
        }, 500, 'swing', function () {
           app.onScroll();
        });
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
                console.log(scrollPos);
                console.log(refElement.offset().top);
                console.log(refElement.offset().top + refElement.height());
                currLink.addClass("active");
                currLink.removeClass("notActive");
                app.currentLink=currLink.attr('id');
                
            }
            else {
                currLink.blur();
                currLink.removeClass("active");
                currLink.addClass("notActive");
            }
        });
    });
    }
    app.projectTypeFilter=function() {
        $('.projectTypes li').on('click', function(){
            $projectType=$(this);
            console.log($projectType.attr('data-type'));
            if ($projectType.attr('data-type')==='all'){
                $('.projects').show();
                return;
           }
            $('.projects').each(function () {
                const $project = $(this);
                if ($project.attr('data-type') !== $projectType.attr('data-type')){
                    $project.hide();
                }
                else {

                    $project.show();
                }


            });


        });
    }
app.init = function () {
    app.navClick();
    app.onScroll();
    app.downloadCV();
    app.projectTypeFilter();
}

$(function () {
app.init();
});