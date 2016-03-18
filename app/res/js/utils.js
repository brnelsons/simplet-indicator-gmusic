/**
 * Created by bnelson on 3/17/16.
 */


function deactivateButtons(buttons){
    buttons.removeClass('active');
}

function updateButtons(button, btnGroupName) {
    deactivateButtons($('button[type=button][name='+btnGroupName+']'));
    button.addClass('active');
}