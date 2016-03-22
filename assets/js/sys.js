// react stuff
var Router = ReactRouter; // 由于是html直接引用的库，所以 ReactRouter 是以全局变量的形式挂在 window 上  
var Route = ReactRouter.Route;  
var RouteHandler = ReactRouter.RouteHandler;  
var Link = ReactRouter.Link;
var StateMixin = ReactRouter.State;

var App = React.createClass({
    handleMenuClick: function(event) {
		document.getElementById("loading").style.display = "block";
        console.log(this);
    },
	render: function () {
		return (
			<div className="main">
				<div className="menu">
                    <ul className="nav nav-pill" onClick={this.handleMenuClick}>
						<Link className="nav-title" to="main">
							<i className="glyphicon glyphicon-user"></i>用户管理</Link>
						<li>
                            <Link to="adduser">增加用户</Link>
                        </li>
                        <li>
                            <Link to="users">用户列表</Link>
                        </li>
						<Link className="nav-title" to="main">
							<i className="glyphicon glyphicon-list-alt"></i>文章管理</Link>
						<li>
                            <Link to="addblog">增加文章</Link>
                        </li>
						<li>
                            <Link to="blogs">文章列表</Link>
                        </li>
						<Link className="nav-title" to="main">
							<i className="glyphicon glyphicon-comment"></i>评论管理</Link>
						<li>
                            <Link to="coms">评论列表</Link>
                        </li>
						<Link className="nav-title" to="main">
							<i className="glyphicon glyphicon-cog"></i>系统设置</Link>
						<li>
                            <Link to="slides">幻灯片管理</Link>
                        </li>
						<li>
                            <Link to="tags">标签管理</Link>
                        </li>
						<li>
                            <Link to="cates">分类管理</Link>
                        </li>
                    </ul>
				</div>
				<div className="content">
					<div className="loading" id="loading">
						<i className="glyphicon glyphicon-refresh"></i>
					</div>
					<RouteHandler />
				</div>
			</div>
		)
	}
});

var Users = React.createClass({
	render: function () {
		return (
			<div>用户列表</div>
		)
	}
});

var AUser = React.createClass({
	render: function () {
		return (
			<div>添加用户</div>
		)
	}
});

var Blogs = React.createClass({
	render: function () {
		return (
			<div>文章列表</div>
		)
	}
});

var ABlog = React.createClass({
	render: function () {
		return (
			<div>新增文章</div>
		)
	}
});

var Coms = React.createClass({
	render: function () {
		return (
			<div>评论列表</div>
		)
	}
});

var Slides = React.createClass({
	render: function () {
		return (
			<div>幻灯片列表</div>
		)
	}
});

var Tags = React.createClass({
	render: function () {
		return (
			<div>标签列表</div>
		)
	}
});

var Cates = React.createClass({
	render: function () {
		return (
			<div>分类列表</div>
		)
	}
});

var Main = React.createClass({
	render: function () {
		return (
			<div>main</div>
		)
	}
});

var routes = (
	<Route handler={App}>
		<Route path="/" name="main" handler={Main}/>

		<Route path="users" name="users" handler={Users}/>
		<Route path="adduser" name="adduser" handler={AUser}/>

		<Route path="blogs" name="blogs" handler={Blogs}/>
		<Route path="addblog" name="addblog" handler={ABlog}/>

		<Route path="coms" name="coms" handler={Coms}/>

		<Route path="slides" name="slides" handler={Slides}/>
		<Route path="tags" name="tags" handler={Tags}/>
		<Route path="cates" name="cates" handler={Cates}/>
	</Route>
);

// 将匹配的路由渲染到 DOM 中
Router.run(routes, Router.HashLocation, function(Root){  
	React.render(<Root />, document.body);
});