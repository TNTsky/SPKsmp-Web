let jq = document.createElement('script');
jq.addEventListener('load', load_jquery);
jq.src = './jquery-ui-1.13.3.custom/external/jquery/jquery.js';
document.querySelector('head').appendChild(jq);

function load_jquery() {
    // jQuery loaded
};

let jqui = document.createElement('script');
jqui.addEventListener('load', load_jqueryui);
jqui.src = './jquery-ui-1.13.3.custom/jquery-ui.js';
document.querySelector('head').appendChild(jqui);

function load_jqueryui() {
    $(() => {
        $(".social-link").tooltip({
            content: function() {
                // return $(this).prop('title') + "<br><br>" + $(this).find('.social-description').text();
                return $(this).prop('title');
            },
            show: null,
            position: {
                my: "center bottom",
                at: "center top-10"
            },
            open: (event, ui) => {
                ui.tooltip.animate({ top: ui.tooltip.position().top + 10 }, "fast");
            }
        });
    });
};