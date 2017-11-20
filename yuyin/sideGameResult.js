/**
 * Created by wb-zxs269841 on 2017/6/27.
 */
/*resultBox({
 	game_index:1,//第几个游戏
    award_type:0, ///奖品类型: 0不中，1现金，3优惠券，5实物，6金币，8通关卡
   	name:"大奖", //奖品名称
   	pop_image:"url",//图片路径
   	left_times: 1,  // 剩余游戏次数
    task_times: 1,  // 剩余任务次数
    canToTaskFn:function(){},//做任务回调
    againFn:function(){}//重玩
});*/
var resultBox = function () {
    this.init();
    return this.initData.bind(this);
};
resultBox.prototype = {
    el:null,
    _data:{
    game_index:1,//第几个游戏
    award_type:0,//奖品类型: 0不中，1现金，3优惠券，5实物，6金币，8通关卡
    name:"大奖", //奖品名称
    left_times: 1,  // 剩余游戏次数
    task_times: 1  // 剩余任务次数
    },
    data:null,
    init:function () {
        var _this = this;
        _this.el = $("<div class='result_mask'></div>");
        _this.el.html(
	        "<section class='gameresult'>"+
	            "<div class='result_box'>"+
	                "<p class='get_text'></p>"+
	                "<span class='result_close'></span>"+
	                "<div class='result_img'> </div>"+
	                "<p class='img_text'></p>"+
	            "</div>"+
	            "<div class='btn result_btn'></div>"+
	        "</section>"
        );
        $(document.body).append(_this.el);
        _this.el.on('transitionend webkitTransitionEnd',function () {
            if(_this.el.hasClass('show')){
                _this.el.addClass('enable');
            }
        });
        _this.bindEvent();
    },
    initData:function (data) {
        var _this = this;
        if(!data)return;
        _this.data = $.extend({},_this._data,data);
        _this.el.find('.gameresult').attr('class','gameresult gameresult'+_this.data.game_index);
		 if (_this.data.award_type == 0) {
//          _this.show();
            $('.result_box').addClass('pureThanks');
            $('.result_btn').addClass('pureThanks');
            $('.result_img').attr('style', '');
//          $('.result_close').on('click', function () {
//              _this.hide();
//          });
            if (_this.data.left_times) {
                $('.result_btn').html('再玩一次').data('play', 'again');
            } else {
                if (_this.data.task_times) {
                    $('.result_btn').html('做任务赢次数').data('play', 'canToTask');
                } else {
                    $('.result_btn').html('确定').data('play', 'done');
                }
            }
        }
        if (_this.data.award_type && _this.data.award_type != 0) {
            $('.result_box').removeClass('pureThanks');
            $('.result_btn').removeClass('pureThanks');
//          _this.show();
            $('.img_text').html(_this.data.name);
//          $('.result_close').on('click', function () {
//              _this.hide();
//          });
            if (_this.data.award_type == 1) {
                $('.result_btn').html('查看奖品').data('play', 'goPocket');
                $('.result_img').css('background-image', 'url(' + _this.data.pop_image + ')');
            } else if (_this.data.award_type == 8) {
                $('.result_btn').html('前往活动').data('play', 'goIndex');
                $('.result_img').css('background-image', 'url(' + _this.data.pop_image + ')');
            } else if (_this.data.award_type == 6) {
                $('.result_btn').html('前往金币商城').data('play', 'goGoldMall');
                $('.result_img').css('background-image', 'url(' + _this.data.pop_image + ')');
            } else {
                $('.result_btn').html('查看奖品').data('play', 'goPocket');
                $('.result_img').css('background-image', 'url(' + _this.data.pop_image + ')');
            }
        }
        _this.show();
    },
    bindEvent:function () {
        var _this = this;

        _this.el.off('click').on('click', '.btn', function () {
            clearTimeout(flagTimer);
            flagTimer = setTimeout(function () {
                flag = false;
            }, 600);
            if (flag)return;
            flag = true;
            var active = $(this).data('play') || '';
            if (active == 'canToTask') {
                _this.data.canToTaskFn();
            } else if (active == 'again') {
                 _this.data.againFn();
            } else if (active) {
                _this[active](this);
            } 
            _this.hide();
        })
    },
    goPocket: function () {
        AmapApp.util.login(function () {
            AmapApp.Log.logJump(function() {
                AmapApp.util.pageJump('./pocket.html?gd_from=side_mission1');
            }, 'gopocket');
        });
    },
    goIndex: function () {
        AmapApp.util.pageJump('./index.html?gd_from=side_mission1');
    },
    goGoldMall: function () {
        var _this = this;
        AmapApp.Native.loadSchema(AmapApp.util.getSchema(AmapApp.LINKURL.goldcoin + '?gd_from=' + AmapApp.ACTNAME, false, false));
        _this.hide();
    },
    done: function () {
        var _this = this;
        _this.hide();
    },
    show:function () {
        var _this = this;
        _this.el.attr('style','');
        setTimeout(function () {
            _this.el.addClass('show');
        },50);
    },
    hide:function () {
        var _this = this;
        _this.el.removeClass('show').removeClass('enable');
    }
};
module.exports = new resultBox();