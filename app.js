const boxes = ['red', 'blue', 'green', 'purple', 'yellow', 'pink', 'teal', 'gold'];
const game = {};
$('.startBtn').click(startGame);

$('.game').on("click", ".active",function(event){
    if(!game.pause){
        game.clicks++;
        $('.score').text(game.clicks);
        game.sel.push($(this));
        $(this).removeClass('active');
        $(this).find('.back').hide();
        $(this).find('.front').show();
        
        if(game.sel.length == 2){
            console.log(game.sel);
            if(game.sel[0].data('val') == game.sel[1].data('val')){
                game.pause=false;
                console.log('Match');
                removeItems(game.sel[0].data('val'));
                game.sel = [];
                if(game.newArray.length == 0) {
                    console.log('GAME OVER');
                    gameOver();
                }
            } else{
                game.pause=true;
                game.timer = setInterval(hideCard,1000);
            }
        }
        
    }
})

function gameOver() {
    $('.startBtn').show();
    $('.score').text('GAME OVER ' + game.clicks+ ' clicks');
    $('.game').html('');
}

function removeItems(val) {
    game.newArray = game.newArray.filter(function(ele){
        return ele != val;
    })
}

function hideCard() {
    console.log('no Match');
    flipper(game.sel[0]);
    flipper(game.sel[1]);
    clearInterval(game.timer);
    game.sel = [];
    game.pause = false;
}

function flipper(el) {
    el.addClass('active');
    el.find('.back').show();
    el.find('.front').hide();
}

function arrayRandomize(arr) {
    arr.sort(function(){
        return .5 - Math.random();
    })
}

function startGame() {
    $('.startBtn').hide();
    $('.score').text('0');
    game.clicks = 0;
    game.pause = false;
    game.sel = [];
    game.newArray = boxes.concat(boxes);
    arrayRandomize(game.newArray);

    $('.game').html('');
    $.each(game.newArray, function(key, value){

        let box = $('<div>');
        box.addClass('box active');
        box.data('cnt', key+1);
        box.data('val', value);

        let back = $('<div>');
        back.addClass('back');
        back.html(key+1);
        box.append(back);

        let front = $('<div>');
        front.css('background-color', value);
        front.text(value);
        front.addClass('front');
        box.append(front);
        $('.game').append(box);
    })
}