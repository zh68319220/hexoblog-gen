---
title: 使用font-spider在H5中嵌入自定义字体
date: 2016-06-08 17:41:58
categories: [css]
tags: CSS3
---
设计往往会提供一些自定义字体，而调用自定义字体往往会增加这种单页页面的负担，但是我们为了尽量还原设计图，
可以考虑将压缩之后的字体文件嵌入的网页之中。

### 1.全局安装font-spider插件

``` bash
$ npm install -g font-spider
```

### 2.在你需要加入字体的HTML页面上加入下列CSS

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<style type="text/css">
		/*声明 WebFont*/
		@font-face {
		  font-family: 'ouzhou';
		  src: url('./ouzhou.eot');
		  src:
		    url('./ouzhou.eot?#font-spider') format('embedded-opentype'),
		    url('./ouzhou.woff') format('woff'),
		    url('./ouzhou.ttf') format('truetype'),
		    url('./ouzhou.svg') format('svg');
		  font-weight: normal;
		  font-style: normal;
		}
		body{
			font-family: 'ouzhou';
		}
	</style>
</head>
<body>
123456789.:法国英国美国德国
</body>
</html>
```
其中的.ttf文件是必须存在的,body标签中的文字是font-spider用来转化的字体,未在body中出现的字符将会用浏览器默认的字体显示。

### 3.执行font-spider的指令
``` bash
font-spider ./index.html(html的路径)
```
这时font-spider会在目录下生成：

![生成的文件][id1]

[id1]: /css/images/20160608.png

浏览器上查看，字体文件成功应用:

![应用的字体][id2]

[id2]: /css/images/201606082.png

demo中使用自定义字体的字符仅有“123456789.:法国英国美国德国”这几个，
所以字体文件都在5KB左右的大小。
比较麻烦的是需要将H5中会使用到的字体都收集过来让font-spider解析并生成字体文件。