//----------变量部分-----------//
let autoPlayNumber = 0, //初始化自动播放序号
	$button = $('.imgControl>div'),
	$img = $('.imgContainers'),
	autoPlaySize = $button.length //获取每一轮自动播放次数

//----------模块部分-----------//
let carousel = { //创建轮播函数对象，一些与轮播相关的funciton放这里
	eventBind: function() { //事件绑定模块
		$button.on('click', function() { //右侧点击事件绑定
			let _index = $(this).index() //获取被点击按钮的下标
			autoPlayNumber = _index //重置播放序号
			let moveRange = _index * 200 //计算移动距离
			carousel.pictureSlide(moveRange) //调用图片滑动方法
			$(this).addClass('active').siblings().removeClass('active') //添加自身选中标识，并移除兄弟姐妹选中标识
		})
		let x = [$button, $img] //创建待绑定对象[选择按钮区域，图片区域]
		for(let i = 0; i < x.length; i++) {
			x[i].on('mouseenter', () => { //绑定鼠标移入时清除自动播放功能
					window.clearInterval(timerId)
				})
				.on('mouseleave', function() { //绑定鼠标移除时再次激活自动播放功能
					timerId = setTimer()
				})
		}
	},
	pictureSlide: function(moveRange) { //图片滑动模块
		$img.css({
			transform: 'translateY(-' + moveRange + 'px)' //根据eventBind传入的移动距离，对图片区域进行移动操作
		})
	},
	init: function() { //轮播模块初始化
		this.eventBind() //初始化绑定事件
		timerId = setTimer() //初始化自动轮播定时器
	}
}

//----------执行部分-----------//
carousel.init() //执行轮播模块

//----------函数部分-----------//
function setTimer() { //自动轮播定时器
	return setInterval(() => {
		autoPlayNumber += 1 //初始值为0，下次轮播index应为1，所以先+1
		$button.eq(autoPlayNumber % autoPlaySize).trigger('click') //模拟点击切换按钮
	}, 1500) //每1.5秒一次
}