let jq = document.createElement('script');
jq.addEventListener('load', load_jquery);
jq.src = './jquery-ui-1.13.3.custom/external/jquery/jquery.js';
document.querySelector('head').appendChild(jq);

function load_jquery() {

};

let jqui = document.createElement('script');
jqui.addEventListener('load', load_jqueryui);
jqui.src = './jquery-ui-1.13.3.custom/jquery-ui.js';
document.querySelector('head').appendChild(jqui);

function load_jqueryui() {
    $( () => {
        $( "a" ).tooltip({
            show: null,
            position: {
              my: "left top",
              at: "left bottom"
            },
            open: ( event, ui ) => {
              ui.tooltip.animate({ top: ui.tooltip.position().top + 10 }, "fast" );
            }
          });
    });
};