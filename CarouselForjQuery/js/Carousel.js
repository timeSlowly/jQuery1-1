let autoPlayNumber = 0,
	$button = $('.imgControl>div'),
	$img = $('.imgContainers'),
	autoPlaySize = $button.length

let carousel = {
	eventBind: function() {
		$button.on('click', function() {
			let _index = $(this).index()
			autoPlayNumber = _index
			let moveRange = _index * 200
			carousel.pictureSlide(moveRange)
			$(this).addClass('active').siblings().removeClass('active')
		})
		let x = [$button, $img]
		for(let i = 0; i < x.length; i++) {
			x[i].on('mouseenter', () => {
					window.clearInterval(timerId)
				})
				.on('mouseleave', function() {
					timerId = setTimer()
				})
		}
	},
	pictureSlide: function(moveRange) {
		$img.css({
			transform: 'translateY(-' + moveRange + 'px)'
		})
	},
	init: function() {
		this.eventBind()
		timerId = setTimer()
	}
}

carousel.init()

function setTimer() {
	return setInterval(() => {
		autoPlayNumber += 1
		$button.eq(autoPlayNumber % autoPlaySize).trigger('click')
	}, 1500)
}