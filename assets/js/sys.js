// var Hello = React.createClass({
// 	handleClick: function (event) {
// 		alert('lick');
// 	},
// 	render: function() {
// 		return(<div onClick={this.handleClick}>sadas</div>);
// 	}
// });

// React.render(
// 	<div><Hello /></div>,
// 	document.getElementById('main')
// );

var Router = ReactRouter; // 由于是html直接引用的库，所以 ReactRouter 是以全局变量的形式挂在 window 上  
var Route = ReactRouter.Route;  
var RouteHandler = ReactRouter.RouteHandler;  
var Link = ReactRouter.Link;  
var StateMixin = ReactRouter.State;

var App = React.createClass({
	render: function () {
		return (
			<div className="main">
				<div className="menu">
					<Link to="userlist">用户</Link>
					<Link to="bloglist">文章</Link>
				</div>
				<div className="content">
					<RouteHandler />
				</div>
			</div>
		)
	}
});

var Users = React.createClass({
	render: function () {
		return (
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>
		)
	}
});

var Blogs = React.createClass({
	render: function () {
		return (
			<ul>
				<li>b1</li>
				<li>b2</li>
				<li>b3</li>
			</ul>
		)
	}
});

var routes = (
	<Route handler={App}>
		<Route path="users" name="userlist" handler={Users}/>
		<Route path="blogs" name="bloglist" handler={Blogs}/>
	</Route>
);

// 将匹配的路由渲染到 DOM 中
Router.run(routes, Router.HashLocation, function(Root){  
  React.render(<Root />, document.body);
});