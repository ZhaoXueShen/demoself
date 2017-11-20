var Tetris = {
	ele:document.getElementById('tetris'),
	canvasW:document.getElementById('cont').offsetWidth,
	canvasH:document.getElementById('cont').offsetHeight,
	ctx:document.getElementById('tetris').getContext("2d"),
	cell:null,
	cellW:null,
	cellH:null,
	cellbg:document.getElementById('cellbg'),
	oimgarr:[],
	matrix:new Array(21),
	config:{
        I: -1, // 方块出现的初始行位置
        J: 6, // 方块出现的初始列位置
        SPEED: 25, // 正常速度
        FASTSPEED: 1, // 最快速度
        TIME: 40 // 40ms的刷新速度
   },
   init:function(){	
   		var _this = this;
   		this.loadAllImg(['cellbg.jpg'],function(){
   			_this.initCanvas(_this.oimgarr)
   		});
   },
   initCanvas:function(){
   		var _this =this;
   		this.ele.width = this.canvasW;//注意：没有单位
//  	this.ele.height= this.canvasH;//注意：没有单位
    	
        this.cell =(this.ele.width)/ 12; // 单元块的边长
        this.ele.height = this.ele.width*21/12
        //_this.ctx.drawImage(_this.cellbg,10,10);
        for(var i = 0; i < 21; i ++) { // 初始化矩阵数组
                    _this.matrix[i] = new Array(12);
                    for (var j = 0; j < 12; j ++) {
                        _this.matrix[i][j] = -1;      
                        _this.ctx.drawImage(_this.oimgarr['cellbg.jpg'], j * _this.cell, i * _this.cell, _this.cell, _this.cell);
                    }
                }
   },
   
   
   
   
     /**
     * @param img img对象数组
     * @param fun 程序入口函数
     */
  	loadAllImg:function(img,fun) {
  		var _this = this;
        var len = img.length,
            i,h = 0;
        for(i = 0; i < len; i ++){
  		 	_this.oimgarr[img[i]] = _this.dlImg(img[i]);  
            _this.oimgarr[img[i]].onload = function () { // 加载是异步的
                _this.cellW = this.width;
                _this.cellH = this.height;
                h ++;
                h >= len && fun(); // 所有图片加载成功后调用fun函数
            }
        }
   	},
 	dlImg : function (img) { // 返回一个img对象
        var oimg = new Image();
        oimg.src = 'img/' + img;
        return oimg;
    }
}
Tetris.init();
