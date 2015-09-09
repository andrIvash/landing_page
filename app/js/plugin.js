//плагин смены экранов по скролу мыши


var ScreenChange = (function () {
	//инициализация 
	var screen = 0, // счетчик экрана
		container = $('.main-content'), // контейнер
		pages = $('.page'), // страницы - экраны
		scroll = false; // флаг скрола
		$('.page:first-child').addClass('active'); // присваиваем активный класс первому экрану

	// Подключаем прослушку событий
    function _setUpListners(){
    	$('body').on('mousewheel', function(event){
			_changeScreen(event.deltaY)
		});
    };              

    function _changeScreen(posY) {
    	var activePage = pages.filter('.active'), //  активный экран
			position = 0; // расчет позиции активного экрана

		if (!scroll) {
			scroll = true;
			if (posY > 0) {  // при движении изменяем счетчик экрана
				if(activePage.prev().length) { // ограничиваем перемещение количеством экранов
					screen--;
				}
			}else {
				if(activePage.next().length) {
					screen++;
				}
			};
		};

		position = (-screen * 100) + '%'; // расчет позиции экрана
		pages.eq(screen).addClass('active').siblings().removeClass('active');  // навешиваем активный класс
		container.css({
			'top' : position 
		});


		setTimeout(function(){
			scroll = false;  // изменяем флаг скролла
		},1300);

    };

    return {
    	init: function () {
    		_setUpListners();
    	}
    }

}());