---
title: 如何理解javascript中的call和apply
date: 2016-10-10 14:03:15
categories: [javascript]
tags: 编程
---
``` html
<input type="text" id="myText"   value="input text">
<script>
    function Obj(){this.value="对象";}
    var value="global 变量";
    function Fun1(){alert(this.value);}

    window.Fun1();   //global 变量
    Fun1.call(window);  //global 变量
    Fun1.call(document.getElementById('myText'));  //input text
    Fun1.call(new Obj());   //对象
</script>
```
this指向了call方法的第一个参数，分别是**window**、**input text**、**对象**

所以当运行下面代码的时候第一个alert出来的值是**func**而不是**myfunc**，因为<code>this取决于call的第一个参数</code>：
``` javascript
  var func=new function(){this.a="func"}
  var myfunc=function(x){
    var a="myfunc";
    alert(this.a);
    alert(x);
  }
  myfunc.call(func,"var");
```

apply 与 call 的区别在于** apply的第二个参数必须传入一个数组，并把这个数组中的n个元素当作n的参数使用，然而call即使传入了一个数组，也只会当成一个参数处理。所以call(obj, arg1, arg2) 与 apply(obj, [arg1, arg2]) 的作用一样**。

由于它们的特性，用来做 <code> 继承 </code> 就很合适。
两个类：
``` javascript
function Person(name,age) {
  var sex = 0;
  this.name = name;
　this.age = age;
}

Person.prototype.say = function() {
  console.log("person say");
}

function Student(name,age,height) {
　　Person.apply(this,arguments);
　　//Person.call(this,name,age,height);   //call方法的传参方式;
   console.log(this.sex);
　　this.height = height;
}

var student = new Student("chams",22,"173");

console.log("name:" + student.name + "  age:" + student.age + "  height:" + student.height);
console.log(student.say);
```
可见Student类的构造方法中利用call和apply继承了Person中的成员变量和方法，但是** Person类中的私有成员变量sex和原型上的say方法却没有被继承 **

经过改进后可变为：

``` javascript
function Person(name,age) {
  var sex = 0;
  this.name = name;
　this.age = age;
}

Person.prototype.say = function() {
  console.log("person say");
}

function Student(name,age,height) {
　　Person.apply(this,arguments);
　　//Person.call(this,name,age,height);   //call方法的传参方式;
　　this.height = height;
}

Student.prototype = Person.prototype;

var student = new Student("chams",22,"173");

Student.prototype.a = 1;
console.log(Person.prototype.a);
```

现在父类的成员变量和其原型上的变量都继承过来了，但是当我 ** 改变子类原型的变量时，同样会影响到父类，这违背了继承的规则，也会影响到父类 **。

解决方法是加入一个中间变量类:

``` javascript
function Person(name,age) {
  var sex = 0;
  this.name = name;
　this.age = age;
}

Person.prototype.say = function() {
  console.log("person say");
}

function Student(name,age,height) {
　　Person.apply(this,arguments);
　　//Person.call(this,name,age,height);   //call方法的传参方式;
　　this.height = height;
}

var F = new Function(){}
F.prototype = Person.prototype;
Student.prototype = new F();

var student = new Student("chams",22,"173");

Student.prototype.a = 1;
console.log(Person.prototype.a);
```
