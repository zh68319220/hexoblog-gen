---
title: 使用createjs完成一次H5开发
date: 2016-09-27 15:59:58
categories: [javascript]
tags: 编程
---
#### 预加载
``` javascript
var preload = new createjs.LoadQueue(false);
preload.addEventListener("fileload", handleFileComplete);
preload.loadManifest([
    { "id": "img1", "src": "img1url" },
    { "id": "img2", "src": "img2url" },
    { "id": "img3", "src": "img3url" }
]);
function handleFileComplete() {
    if(preload._numItems == preload._numItemsLoaded){
      // 隐藏加载层
      $('.loading').hide();
      // 初始化舞台
      main = new stageUtil();
    }else{
      // 处理全部未加载成功
    }
}
```

#### 制作SpriteSheet
首先下载TexturePacker的破解版，把切好的图统一放在一个文件夹下，并选择easelJs的方式导出json和png文件：

![TexturePacker设置导出][tp1]

[tp1]: /css/images/20160928.png

使用TexturePacker为我们生成的json文件(data)和png文件(1.png)来加入舞台之中：
``` html
<div id="main"><canvas id="cvs"></canvas></div>
<script type="text/javascript" src="create.min.js的路径"></script>
<script type="text/javascript">
	var preload = new createjs.LoadQueue(false),
		canvas = document.getElementById('cvs'),
		stage = new createjs.Stage('cvs');
	createjs.Touch.enable(stage);
	createjs.Ticker.framerate = 60;
	createjs.Ticker.on("tick", stage);

    preload.addEventListener("fileload", handleFileComplete);
    preload.loadManifest([
        { "id": "img1", "src": "1.png" }
    ]);
    function handleFileComplete() {
        if(preload._numItems == preload._numItemsLoaded){
    	    var data = {
				"images": ["1.png"],
				"frames": [
				    [2, 1380, 1091, 573],
				    [2, 695, 1165, 683],
				    [2, 2, 1176, 691]
				],
				"animations": {
			        "1b":[0],
			        "3707_a7098e26_e5ea_06ad_e6dd_49c956d23071_1":[1],
			        "mxg2":[2]
				}
			};
		    drawSprite(0, 0, data, "mxg2", 0.1, 5);
		    drawSprite(0, 0, data, "3707_a7098e26_e5ea_06ad_e6dd_49c956d23071_1", 0.1, 5);
		    drawSprite(0, 0, data, "1b", 0.1, 5);
        }
    };
    function drawSprite(x, y, data, name, scale, rate) {
      var spriteSheet = new createjs.SpriteSheet(data);
	  var animation = new createjs.Sprite(spriteSheet, name);
	  animation.x = x;
  	animation.y = y;
  	animation.scaleY = animation.scaleX = scale;
  	animation.framerate = rate;
  	var child = stage.addChild(animation);
  	stage.setChildIndex(child, 999);
    };
</script>
```

由于图片资源已经预加载，所以重复<b>drawSprite</b>方法画出的图片的z-index关系完全取决于调用的先后顺序： "1b"在最上层， "3707_a7098e26_e5ea_06ad_e6dd_49c956d23071_1" 在中间，"mxg2"在最下层：

![stage中的z-index关系][tp2]

[tp2]: /css/images/201609282.png

#### 几种createJs动画的实现方式

##### 1.SpriteSheet
修改由TexturePacker生成的json数据中的"animations"属性，如：
``` json
{
  "images": ["1.png"],
  "frames": [
      [2, 1380, 1091, 573],
      [2, 695, 1165, 683],
      [2, 2, 1176, 691]
  ],
  "animations": {
        "a1":[0, 1],
        "a2":[1, 2],
        "a3":[2]
  }
}
```
"frames"数组的length代表了TexturePacker合成了多少张单图，而"animations"就配置了你需要组合动画的3种方式：a1,a2,a3。

##### 2.TweenJs
createJs 细分为easelJs(基本库)、tweenJs(补间动画库)、preloadJs(预加载库)、soundJs(音频库)。各个库的使用方式官方都有详细介绍，tweenJs的用法例如：
``` javascript
createjs.Tween.get(child,{loop:true}).to({skewY: 720, alpha: 1}, 1000).wait(1000);
```

##### 3.container
将动画资源加入container之中，通过container的动画来实现一些整体的动画效果。可避免重复对各个资源加动画：
``` javascript
// 斜轮播
var contianer = new createjs.Container();
contianer.x = 300;
contianer.y = 300;
contianer.regX = 230;
contianer.regY = 400;
contianer.rotation = 30;
for (var i = 0; i <= 6; i++) {
  if( (i+1)%2 == 1 ){
    _this.drawBitmap("http://xx.png", -300, (150*i + 50), 1, "1", function(child) {
      contianer.addChild(child);
      createjs.Tween.get(child,{loop:false}).to({ x: -60}, 600).call(cn1);
      function cn1() {
        child.x = -300;
        createjs.Tween.get(child,{loop:false}).to({ x: -60}, 600).call(cn1);
      }
    });
  }
  else{
    _this.drawBitmap("http://xx2.png", -60, (150*i + 50), 1, "1", function(child) {
      contianer.addChild(child);
      createjs.Tween.get(child,{loop:false}).to({ x: -300}, 600).call(cn1);
      function cn1() {
        child.x = -60;
        createjs.Tween.get(child,{loop:false}).to({ x: -300}, 600).call(cn1);
      }
    });
  }
}
_this.stage.addChild(contianer);
_this.stage.setChildIndex(contianer, 1);
```

#### 点击域
``` javascript
// 画点击域
stageUtil.prototype.drawHitarea = function(event, conf, fn){
	var _this = this;
	var hit = new createjs.Shape(new createjs.Graphics().f("rgba(0,0,0,0.01)").r(conf.x,conf.y,conf.w,conf.h));
	_this.stage.addChild(hit);
	_this.stage.setChildIndex(hit, 99);
	_this.stage.update();
	hit.addEventListener(event, function(e) {
		fn(e);
	}, false);
};
```
