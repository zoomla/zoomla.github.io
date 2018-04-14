//********************//
(function($){
    $.fn.scroller = function(options) {
		var D = {
			element: 'a',
			direction: 'horizontal',
			container: {
				name: 'inside',
				easing: 'easeOutBack',
				duration: 800
			},
			options: {
				margin: -20,
				zoom: 1.5,
				easing: ['easeOutBack', 'easeOutBounce'],
				duration: [300, 500]
			},
			onclick: function(a, img){},
			onmouseover: function(a, img){},
			onmouseout: function(a, img){}
		} // default settings
		
		var S = $.extend(true, D, options); 
		
        return this.each(function(){
			var M = $(this),
				IN = M.find('.'+S.container.name),
				E = M.find(S.element),
				P = {
					init: function(){
						this._globals.init();
						this._container.init();
						this._position.init();
						this.events.init();
					},
					_globals: {
						init: function(){
							D = {
								w: M.width(),
								h: M.height()
							},
							I = {
								w: E.width(),
								h: E.height()
							},
							DIR = S.direction,
							MW = I.w+S.options.margin,
							MH = I.h+S.options.margin;
						}
					},
					_container: {
						init: function(){
							this.dimensions();
							this.center();
						},
						dimensions: function(){
							var css = {}
							if (DIR == 'horizontal'){
								css.width = E.length*MW;
							} else if (DIR == 'vertical') {
								css.height = E.length*MH;
							}
							IN.css(css);
							C = {
								w: IN.width(),
								h: IN.height()
							}
						},
						center: function(){
							var css = {}, l = E.length;
							if (DIR == 'horizontal'){
								css.left = -(l*MW)/l*2-MW/2;
							} else if (DIR == 'vertical') {
								css.top = -(l*MH)/l*2;
							}
							IN.css(css);
						}
					},
					_position: {
						init: function(){
							this.set();
						},
						set: function(){
							E.each(function(i){
								var t = $(this),
									img = t.find('img'),
									src = img.attr('src');
								if (DIR == 'horizontal'){
									var x = MW*i,
										css = {
											left: parseInt(x),
											top: 0
										}
								} else if (DIR == 'vertical'){
									var y = MH*i,
										css = {
											left: 0,
											top: parseInt(y)
										}
								}
								css.background = 'url('+src+') no-repeat center';
								img.hide();
								t.css(css);
							});
						}
					},
					_helper: {
						zoomin: function(){
							var zoom = S.options.zoom,
								easing = S.options.easing[0],
								duration = S.options.duration[0],
								animation = {
									width: I.w*zoom,
									height: I.h*zoom,
									marginLeft:(I.w-I.w*zoom)/2,
									marginTop:(I.h-I.h*zoom)/2
								},
								css = {
									zIndex: 10
								}
							return {
								animation: animation,
								easing: easing,
								css: css,
								duration: duration
							}
						},
						zoomout: function(){
							var easing = S.options.easing[1],
								duration = S.options.duration[1],
								animation = {
									width: I.w,
									height: I.h,
									marginLeft: 0,
									marginTop: 0
								},
								css = {
									zIndex: 1
								}
							return {
								animation: animation,
								easing: easing,
								css: css,
								duration: duration
							}
						},
						animate: function(t, o){
							t.css(o.css).stop(true, true).animate(o.animation, o.duration, o.easing);
						}
					},
					events: {
						init: function(){
							this.hover();
							this.click();
						},
						hover: function(){
							E.bind('mouseover mouseleave', function(e){
								var t = $(this), img = t.find('img');
									if (e.type == 'mouseover'){
										var h = P._helper.zoomin();
										S.onmouseover.call(this, t, img);
									} else {
										var h = P._helper.zoomout();
										S.onmouseout.call(this, t, img);
									}
								if (!t.hasClass('active')) {
									P._helper.animate(t, h);
								}
							});	
						},
						click: function(){
							E.click(function(){
								var t = $(this), img = t.find('img'), container = S.container,
									position = t.position(), y = position.top, x = position.left,
									animate = {};
								if (DIR == 'horizontal'){
									animate.left = -x+D.w/2-MW/2;
								} else if (DIR == 'vertical') {
									animate.top = -y+D.h/2-MH/2;
								}
								if (!t.hasClass('active')){
									var zoomin = P._helper.zoomin(),
										zoomout = P._helper.zoomout();
									
									P._helper.animate(E, zoomout);
									P._helper.animate(t, zoomin);
									
									E.removeClass('active');
									t.addClass('active');
								}
								IN.animate(animate, container.duration, container.easing);
								S.onclick.call(this, t, img);
								return false;
							});
						}
					}
				}
			P.init();
        });
    };
}(jQuery));

$(function(){
	$('.login9_view_c').scroller();
});

//********************//
//功能模块体验
var beforecss="";
$(document.body).click(function(e){
   var current = $(e.target),weaverdialog = $(".weaver_dialog");
   if(!current.hasClass("weaver_dialog") && weaverdialog.has(current).length === 0 && current.attr("id") !='onlinechatimg' && current.attr("id") !='onlinetitle' && current.attr("id") !='chatClose' && current.attr("id") !='topcontrol'){
	   closeDialog();
   }
});

function openDialog(){
   var container = $("#menu_container"),weaverdialog = $(".weaver_dialog"),
		laywidth = container.width(),
		offset = container.offset();
   weaverdialog.css("width",laywidth+'px').css("left",(offset.left-10)+'px');
   $(".weaver_dialogbody").css("width",(laywidth+20)+'px');
   weaverdialog.show();
  //加载动画
   setTimeout(function(){$(".animateoverlay").css("width",(laywidth+20)+'px');},200);
}
function closeDialog(){
   var weaverdialog = $(".weaver_dialog");
   $(".animateoverlay").css(beforecss);
   setTimeout(function(){
	  weaverdialog.hide();},300);
}

$(".tilecomponent").click(function(e){
 //  openDialog();
  var container = $("#menu_container"),weaverdialog = $(".weaver_dialog"),
  laywidth = 1000,
  offset = container.offset(),
  target = $(this),position = target.position(),
  moduleid = target.attr("itemid");
  weaverdialog.css("width",laywidth+'px').css("left",(offset.left-124)+'px');
  $(".weaver_dialogbody").css("width",(laywidth+20)+'px');


  weaverdialog.show();
  $(".animateoverlay").hide();
  var topnew = position.top+($("#menu_container").offset().top-$(".weaver_dialog").offset().top);
  beforecss = {left:(position.left+124)+"px",top:topnew+"px","right":(laywidth-position.left-target.width()-120)+"px","bottom":(weaverdialog.height()-target.height()-topnew)+"px"};
  $(".animateoverlay").show();
  $(".animateoverlay").css(beforecss);

  //加载动画
  setTimeout(function(){
	   var after = {left:0,top:0,width:"auto","height":"auto","right":"-20px","bottom":0};
	   $("span[itemid='"+moduleid+"']").trigger("click");
	   $(".animateoverlay").css(after); },100);
   e.stopPropagation();
});

  function showMenu(){
	  $(".e8_menuswrapper").css("height","auto").css("overflow","auto").css("background","#2a2e34");
	  $(".e8_menus").css("color","#63aeeb");
	  $(".e8_menusmore").css("background-color","#2a2e34");
  }
  function hideMenu(){
	  $(".e8_menuswrapper").css("height","40px").css("overflow","hidden").css("background","#006ec6");
	  $(".e8_menus").css("color","#A4CCEB");
	  $(".e8_menusmore").css("background-color","#0783e5");
  }

<!--二级栏目图片-->
<!--执行力平台-->
function showwf1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/01_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：专业的医院三甲办公平台，为大型医疗门户提供成长动力！"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showwf2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/01_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：服务于各个大型医院，建立起从专家、到科室、到分院、再到各个应用的强大站群。"+
"</div>" ;
$(".e8_silideritem").html(html);
}

function showwf3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/01_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：在线挂号、问诊等服务。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showwf4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/01_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：在线挂号，通过浏览器或手机，都可以方便的挂号，全新一代挂号服务平台。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showwf5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/01_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：为医院党群平台提供相应服务。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showwf6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/01_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：专业学术门户，逐浪系统起步！"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--门户管理-->
function showmhgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：个人门户是一个网上办公室，是一个个人资讯、知识、工作获取平台，个人工作门户最大的价值就是帮我把所有的事情都集中起来，把所有需要我处理的，需要我知道，需要我查阅的，需要我参与等等都展现在个人门户中。这样的集中实际上就成为了我的每天的工作指引"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：企业战略思想统一、文化宣传、信息发布的重要渠道，集团（公司）统一的信息发布平台、各项重大规章制度以及企业动态的推送"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：在营销门户中会每天自动推送签约新闻、每月的销售之星、销售相关的培训知识、销售过程中常会用到的模板或参考学习文件、销售部的一些制度和流程、我们常见的一些解决方案、投标中可能会涉及用到的资质文件等"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：通过产品门户可以方便获取产品功能介绍、产品宣传资料及培训课件等。作为新员工可以根据产品自学引导快速掌握产品知识"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：通过项目门户我们可以清晰的了解项目基本信息、参与人员、目前的进展等。作为项目实施人员可以随时获取项目有关的模板文件，了解实施方法体系，而这些文件都是受权限控制的"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：作为集团型企业可以查看下属子公司门户，及时的了解子公司的最新资讯以及经营状况"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl7(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_07.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：根据中华人民共和国关于政府网站无障碍浏览的要求，只有使用了相应无障碍技术的网站才符合需求，而逐浪CMS作为政府门户的首选，率先响应并开放此功能。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl8(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_08.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：推送各类员工活动、公司旅游等信息，丰富员工的业余生活，加强团队建设"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl9(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_09.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：报表门户用图形化的方式提供给领导很方便的查看数据、和决策信息，便于全面、宏观、整体的了解公司及各业务上的运营情况，实时跟进和调整业务发展。这些报表数据的来源不仅仅局限与本系统内的数据，也可以从企业其他异构系统内获取。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl10(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_10.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：报表门户用图形化的方式提供给领导很方便的查看数据、和决策信息，便于全面、宏观、整体的了解公司及各业务上的运营情况，实时跟进和调整业务发展。这些报表数据的来源不仅仅局限与本系统内的数据，也可以从企业其他异构系统内获取。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl11(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_11.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：报表门户用图形化的方式提供给领导很方便的查看数据、和决策信息，便于全面、宏观、整体的了解公司及各业务上的运营情况，实时跟进和调整业务发展。这些报表数据的来源不仅仅局限与本系统内的数据，也可以从企业其他异构系统内获取。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showmhgl12(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/02_12.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：报表门户用图形化的方式提供给领导很方便的查看数据、和决策信息，便于全面、宏观、整体的了解公司及各业务上的运营情况，实时跟进和调整业务发展。这些报表数据的来源不仅仅局限与本系统内的数据，也可以从企业其他异构系统内获取。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--流程管理-->
function showlcgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/03_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：严密的状态码，并可创建各种工作流。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showlcgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/03_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：根据政府或企业的需求，进行流程的设计，与逐浪CMS的字段模型设计一样的强大。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showlcgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/03_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：与企业结构严谨结合一体，从而藕合生产关系链。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showlcgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/03_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：可以与内容管理系统结合，进行公文流转。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showlcgl5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/03_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：自由便利的公文流程，符合不同的事务场景，并支持自由订制。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showlcgl6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/03_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：符合我国政府的公文头体系，严格按照国务院规范办事。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--知识管理-->
function showzsgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/04_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：选择您要发布的内容和目标节点，可上传rar、zip、WORD、EXCEL、WPS等各种形式的文档，保存提交后文档即上传到系统中"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzsgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/04_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：后台随心所欲的点击【预览】来查看文档的发布效果"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzsgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/04_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：在内容提交发布后，我们可以通过【共享】，赋予其他人查看、编辑、完全控制等权限，我们也可以批量共享文档"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzsgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/04_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：高效推送，互联产生价值！"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzsgl5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/04_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：支持全文检索的查询，易用方便，后台只要一个ID就能检索出相应信息。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzsgl6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/04_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：我们可以对任意具有编辑权限的文档进行修改，修改后可记录相关历史版本，支持高效发布。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--人力资源-->
function showrlzy1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/05_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：点击【人事】的【我的卡片】，通过人力资源卡片可以直接了解到我工作过程以及现在正在进行的工作，如未处理的工作流程、未读的文档、需关注的计划任务、参与过的会议与日程、项目任务、我的资产信息、参加过的培训等信息"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrlzy2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/05_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：【我的下属】中列出的是当前操作者的直接下级，也就是他们人事卡片中的【上级】字段中的上级是当前操作者，下级的下级是不会在这里直接列出的，这样单独列出的目的是为了方便领导更好的查找自己的下级，并通过菜单了解下级的工作日程、待办流程等信息"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrlzy3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/05_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：查询人员我们最常用的就是通过人员的姓名进行查找，那样我们只要在快捷搜索框中输入姓名就可以了。但是有些时候我们并不知道对方的姓名，甚至并不知道要找的这个人具体是谁，这个时候我们就需要通过这里的查询人员的其它人员信息进行查询，比如需要查找对象所在的部门、岗位、直接上级等"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrlzy4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/05_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：员工假期、考勤状况自助查询"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrlzy5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/05_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：个人的财务信息（工资，福利，成本，费用）自助查询"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showrlzy6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/05_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：建立统一的在线招聘管理和内部人才库"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--资产管理-->
function showzcgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/06_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：点击【流程】的【新建流程】，找到【办公用品领用申请流程】，选择领用的办公用品名称，填写并提交"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzcgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/06_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：资产管理员收到我的申请流程后，审批通过"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzcgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/06_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：点击【资产】的【查询资产】，根据页面条件查询资产的库存信息，通过左侧【我的资产】就可以了解到属于自己负责的资产情况"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showzcgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/06_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：点击【人事】的【我的卡片】的【资产信息】，可以查到我申请的办公用品信息；点击【资产】的【我的资产】也可以查询我所有的资产信息"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--客户管理-->
function showkhgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/07_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：提供基本信息、联络信息、企业信息、企业选项、备注信息、个人信息、业务信息等字段，并可增加所需要的字段。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showkhgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/07_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：百万会员可以自由进行迁移、分组、升级为客户，支持按ID或呢称或关键字检索。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showkhgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/07_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：有问必答与邮箱系统一体化，从而实现与客户的多点接触和无缝关怀。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showkhgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/07_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：会员中心界面高可订制，提供丰富的应用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showkhgl5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/07_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：免费提供舆情监测，可以从百度新闻、微博、微信等平台抓取相应信息并生成报表，便于企业、政府决策。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showkhgl6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/07_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：提供大数据分析技术，深度挖掘，让智能神经元一头连起客户，一头接通未来。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
<!--项目管理-->
function showxmgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：自由的发布项目，各类模板方便创建，对应各个项目。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxmgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：精美的项目定义卡片，方便各类流程管理，也提供移动管理端。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxmgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：方便的安排项目，可以有不同的项目流程，敏捷、易用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxmgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：可以添加子任务，并维护项目，支持不同的流程管理"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxmgl5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：管理项目、监督执行，项目可以自由的设计，并监督执行。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxmgl6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：展现项目细节，易于维护"+
"</div>" ;
$(".e8_silideritem").html(html);
}
function showxmgl7(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/08_07.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：方便的维护所有项目，进行汇总分析。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--事项协助-->
function showsxxz1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：支持自由的组卷管理，根据需要进行试题增、删，并生成试卷并存为本地WORD模式，提供多种版面，进一步可为知识库应用提供支持。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showsxxz2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：根据系统题库，进行在线考试，填入姓名、班级、学校，并在指定时间内完成题目，整个界面加密不能拷贝、粘贴。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showsxxz3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：会员中心提供教育模块的各类应用入口。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showsxxz4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：面向杂志、电子书藉、报纸进行数字出版应用支持，方便报社等平台建设。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showsxxz5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：提供详细的班级管理，并拥有细致的资源维度，方便大型教育机构进行管理，提升教育资源的颗粒精度。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showsxxz6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：支持详细、完善的题库管理。"+
"</div>" ;
$(".e8_silideritem").html(html);
}
function showsxxz7(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/09_07.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：添加、发布、审核题库，进行教育与知识门户的建设。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
<!--工作微博-->
function showgzwb1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/10_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：后台支持智能可视化编辑，所见即所得，即使是毫无编程经验的人也能快速上手管理。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showgzwb2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/10_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：系统内置丰富的管理员角色，并可以自由订制角色，从而为企业级应用提供支持。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showgzwb3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/10_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：细致的栏目权限，便于企业进行权限设定，如上市公司的权限栏目、收费栏目等应用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showgzwb4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/10_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：只要掌握三成Word操作技巧就能熟悉的管理、发布、编辑内容。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showgzwb5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/10_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：对会员进行分组，并可以设定积分、点券、升级、分成等应用，便于企业开发各类商务应用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--日程管理-->
function showrcgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/11_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：Zoomla!逐浪CMS集成强大的日程管理应用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrcgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/11_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：方便的创建日程，完全生产力平台的操作。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrcgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/11_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：方便的管理日程。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showrcgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/11_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：支持个人日程与工作日程不同记录表，从而生活、工作两不误。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--会议管理-->
function showhygl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/12_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：点击【会议】的【会议日历】，在日历面板选择要召开会议的时间，点击新建，填写会议的基本信息，如会议类型、召集人、会议名称、地点、内容，会议日程等信息"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showhygl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/12_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：在填写会议基本信息的时候，设置会议提醒方式：不提醒、短信提醒、邮件提醒，提醒时间"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showhygl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/12_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：我们召开会议是为了集中在一起讨论问题，安排任务的，点击【会议任务】就是查看负责人或检查人是自己的会议决议，在这里用户可以直观得看到会议之后需要自己完成的任务，检查人也可以在这里监督负责人完成任务的情况"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--工作微博-->
function showtxgl1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/13_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：智能生成三维全景为虚拟现实打开通途。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showtxgl2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/13_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：强大的HTML5算法接口，接通您的摄像设备，让网站也有了眼和耳！"+
"</div>" ;
$(".e8_silideritem").html(html);

} 
function showtxgl3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/13_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：基于LBS大数据平台进行分析应用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}  
function showtxgl4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/13_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：根据需要生成各种可设计的图形。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showtxgl5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/13_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：智写、自由生成。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showtxgl6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/13_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：微软的AR以及时尚的VR我们都有成熟的解决方案。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--政府办事-->
function showxtjc1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/14_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：政府为个人建立的办事平台。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxtjc2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/14_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：为法人和企业提供的办事服务平台，提供专业的报表与应用体系。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxtjc3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/14_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：面对大众的服务平台。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxtjc4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/14_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：接通各个厅局，打通政府信息化的经脉。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showxtjc5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/14_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：一站式服务大厅，符合中华人民共和国政府平台标准规范。"+
"</div>" ;
$(".e8_silideritem").html(html);

} 

<!--经营报表-->
function showjybb1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：专业的门户设计开发团队。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showjybb2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：合理的内容布局，便于访问浏览与收藏。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showjybb3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：对接农业GIS和智能终端，并为移动平台提供接口数据，展现大数据之美。"+
"</div>" ;
$(".e8_silideritem").html(html);

} 
function showjybb4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：农村电商如此美好。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showjybb5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：农业实验分析、展示、发布，可众筹、互动交流。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showjybb6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：为中国农村提供专业的内容服务。"+
"</div>" ;
$(".e8_silideritem").html(html);

} 
function showjybb7(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_07.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：专业的农业解决方案平台。"+
"</div>" ;
$(".e8_silideritem").html(html);

}
function showjybb8(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/15_08.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：村村通，处处通，基于逐浪更轻松！"+
"</div>" ;
$(".e8_silideritem").html(html);

}

<!--微云商店-->
function showwysd1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/16_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：卓越的商城管理界面，初始模板轻松开发也能建成强大的在线电商平台。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showwysd2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/16_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：店铺展示可以自由抽取字段，方便促销应用。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showwysd3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/16_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：共结算方便，发票、收件人、支付方式灵活多种。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showwysd4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/16_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：对于特殊商业场景，支持详细的购物应用，满足中国企业的商务需求。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showwysd5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/16_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：已经服务上万家电商平台建设。"+
"</div>" ;
$(".e8_silideritem").html(html);

}


<!--系统知识树-->
function showxtzss1(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/17_01.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：为政务、政府提供强大的站群开发服务，从而构建起面向未来的、集群的、强大的站群体系，深得中国高端集成单位喜爱。"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showxtzss2(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/17_02.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：系统的说明书，图文并茂展示功能使用方法"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showxtzss3(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/17_03.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：统一需求库管理需求"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showxtzss4(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/17_04.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：负责人答疑提问，也可讨论需求功能"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showxtzss5(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/17_05.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：接口API、技术规范，方便开发人员查阅"+
"</div>" ;
$(".e8_silideritem").html(html);

}

function showxtzss6(){
var html = "<div class='weaver_img' >"+
"<img src='/Template/office/style/images/function/17_06.png'/>" +
"</div>" +
"<div class='weaver_title' >"+
"说明：新功能新版本发布渠道"+
"</div>" ;
$(".e8_silideritem").html(html);

}



$(function() {
$(".e8_menusmore").click(function(){
showMenu();
});
$(".e8_menuswrapper").hover(function(){

},function(){
hideMenu();
});
$(document.body).click(function(e){
var current = $(e.target),e8_menuswrapper = $(".e8_menuswrapper");
if(!current.hasClass("e8_menuswrapper") && e8_menuswrapper.has(current).length === 0){
hideMenu();
}
});
$(".e8_submenus").delegate(".e8_submenu","click",function(e){
var current = $(this);
var itemid = current.attr("itemid");
$(".e8_submenu").removeClass("subactive");
current.addClass('subactive');
if(itemid === 'wf_1'){
showwf1();
}else if(itemid === 'wf_2'){
showwf2();
}else if(itemid === 'wf_3'){
showwf3();
}else if(itemid === 'wf_4'){
showwf4();
}else if(itemid === 'wf_5'){
showwf5();
}else if(itemid === 'wf_6'){
showwf6();
}else if(itemid === 'mhgl_1'){
showmhgl1();
}else if(itemid === 'mhgl_2'){
showmhgl2();
}else if(itemid === 'mhgl_3'){
showmhgl3();
}else if(itemid === 'mhgl_4'){
showmhgl4();
}else if(itemid === 'mhgl_5'){
showmhgl5();
}else if(itemid === 'mhgl_6'){
showmhgl6();
}else if(itemid === 'mhgl_7'){
showmhgl7();
}else if(itemid === 'mhgl_8'){
showmhgl8();
}else if(itemid === 'mhgl_9'){
showmhgl9();
}else if(itemid === 'mhgl_10'){
showmhgl10();
}else if(itemid === 'mhgl_11'){
showmhgl11();
}else if(itemid === 'mhgl_12'){
showmhgl12();
}else if(itemid === 'lcgl_1'){
showlcgl1();
}else if(itemid === 'lcgl_2'){
showlcgl2();
}else if(itemid === 'lcgl_3'){
showlcgl3();
}else if(itemid === 'lcgl_4'){
showlcgl4();
}else if(itemid === 'lcgl_5'){
showlcgl5();
}else if(itemid === 'lcgl_6'){
showlcgl6();
}else if(itemid === 'zsgl_1'){
showzsgl1();
}else if(itemid === 'zsgl_2'){
showzsgl2();
}else if(itemid === 'zsgl_3'){
showzsgl3();
}else if(itemid === 'zsgl_4'){
showzsgl4();
}else if(itemid === 'zsgl_5'){
showzsgl5();
}else if(itemid === 'zsgl_6'){
showzsgl6();
}else if(itemid === 'rlzy_1'){
showrlzy1();
}else if(itemid === 'rlzy_2'){
showrlzy2();
}else if(itemid === 'rlzy_3'){
showrlzy3();
}else if(itemid === 'rlzy_4'){
showrlzy4();
}else if(itemid === 'rlzy_5'){
showrlzy5();
}else if(itemid === 'rlzy_6'){
showrlzy6();
}else if(itemid === 'zcgl_1'){
showzcgl1();
}else if(itemid === 'zcgl_2'){
showzcgl2();
}else if(itemid === 'zcgl_3'){
showzcgl3();
}else if(itemid === 'zcgl_4'){
showzcgl4();
}else if(itemid === 'khgl_1'){
showkhgl1();
}else if(itemid === 'khgl_2'){
showkhgl2();
}else if(itemid === 'khgl_3'){
showkhgl3();
}else if(itemid === 'khgl_4'){
showkhgl4();
}else if(itemid === 'khgl_5'){
showkhgl5();
}else if(itemid === 'khgl_6'){
showkhgl6();
}else if(itemid === 'xmgl_1'){
showxmgl1();
}else if(itemid === 'xmgl_2'){
showxmgl2();
}else if(itemid === 'xmgl_3'){
showxmgl3();
}else if(itemid === 'xmgl_4'){
showxmgl4();
}else if(itemid === 'xmgl_5'){
showxmgl5();
}else if(itemid === 'xmgl_6'){
showxmgl6();
}else if(itemid === 'xmgl_7'){
showxmgl7();
}else if(itemid === 'sxxz_1'){
showsxxz1();
}else if(itemid === 'sxxz_2'){
showsxxz2();
}else if(itemid === 'sxxz_3'){
showsxxz3();
}else if(itemid === 'sxxz_4'){
showsxxz4();
}else if(itemid === 'sxxz_5'){
showsxxz5();
}else if(itemid === 'sxxz_6'){
showsxxz6();
}else if(itemid === 'sxxz_7'){
showsxxz7();
}else if(itemid === 'gzwb_1'){
showgzwb1();
}else if(itemid === 'gzwb_2'){
showgzwb2();
}else if(itemid === 'gzwb_3'){
showgzwb3();
}else if(itemid === 'gzwb_4'){
showgzwb4();
}else if(itemid === 'gzwb_5'){
showgzwb5();
}else if(itemid === 'rcgl_1'){
showrcgl1();
}else if(itemid === 'rcgl_2'){
showrcgl2();
}else if(itemid === 'rcgl_3'){
showrcgl3();
}else if(itemid === 'rcgl_4'){
showrcgl4();
}else if(itemid === 'hygl_1'){
showhygl1();
}else if(itemid === 'hygl_2'){
showhygl2();
}else if(itemid === 'hygl_3'){
showhygl3();
}else if(itemid === 'txgl_1'){
showtxgl1();
}else if(itemid === 'txgl_2'){
showtxgl2();
}else if(itemid === 'txgl_3'){
showtxgl3();
}else if(itemid === 'txgl_4'){
showtxgl4();
}else if(itemid === 'txgl_5'){
showtxgl5();
}else if(itemid === 'txgl_6'){
showtxgl6();
}else if(itemid === 'xtjc_1'){
showxtjc1();
}else if(itemid === 'xtjc_2'){
showxtjc2();
}else if(itemid === 'xtjc_3'){
showxtjc3();
}else if(itemid === 'xtjc_4'){
showxtjc4();
}else if(itemid === 'xtjc_5'){
showxtjc3();
}else if(itemid === 'jybb_1'){
showjybb1();
}else if(itemid === 'jybb_2'){
showjybb2();
}else if(itemid === 'jybb_3'){
showjybb3();
}else if(itemid === 'jybb_4'){
showjybb4();
}else if(itemid === 'jybb_5'){
showjybb5();
}else if(itemid === 'jybb_6'){
showjybb6();
}else if(itemid === 'jybb_7'){
showjybb7();
}else if(itemid === 'jybb_8'){
showjybb8();
}else if(itemid === 'wysd_1'){
showwysd1();
}else if(itemid === 'wysd_2'){
showwysd2();
}else if(itemid === 'wysd_3'){
showwysd3();
}else if(itemid === 'wysd_4'){
showwysd4();
}else if(itemid === 'wysd_5'){
showwysd5();
}else if(itemid === 'xtzss_1'){
showxtzss1();
}else if(itemid === 'xtzss_2'){
showxtzss2();
}else if(itemid === 'xtzss_3'){
showxtzss3();
}else if(itemid === 'xtzss_4'){
showxtzss4();
}else if(itemid === 'xtzss_5'){
showxtzss5();
}else if(itemid === 'xtzss_6'){
showxtzss6();
}

e.stopPropagation();
});
$(".e8_close").click(function(){
closeDialog();
});
$(".e8_menu").click(function(){
var current = $(this);
var itemid = current.attr("itemid"),submenus= [],submenu;
if(itemid === 'wf'){
submenu= "<div class='e8_submenu' itemid='wf_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医院办公平台</span> "+
"</div>";
submenus.push(submenu);
submenu= "<div class='e8_submenu' itemid='wf_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医院站群平台</span> "+
"</div>";
submenus.push(submenu);
submenu= "<div class='e8_submenu' itemid='wf_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医院问诊平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='wf_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医院挂号平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='wf_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医院党群平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='wf_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医院学术平台</span> "+
"</div>";
submenus.push(submenu);


$(".e8_modulename").html("建设中国三甲医院门户");
}else if(itemid === 'mhgl'){
submenu= "<div class='e8_submenu' itemid='mhgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>个人门户</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>公司门户</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>营销门户</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>互动移动门户</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>视频富媒体门户</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>拖拽式傻瓜建站</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_7'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>无障碍浏览网站</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_8'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>手机移动平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_9'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>医药监管平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_10'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>百科网站</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_11'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>问答平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='mhgl_12'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>社区平台</span> "+
"</div>";
submenus.push(submenu);


$(".e8_modulename").html("中国排名第一的网站系统");	  

} else if(itemid === 'lcgl'){
submenu= "<div class='e8_submenu' itemid='lcgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>流程的新建</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='lcgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>流程填写并提交</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='lcgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>流程与企业组织结构</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='lcgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>绑定工作流</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='lcgl_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>公文的流转</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='lcgl_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>红头公文</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("流程管理模块");	  
}else if(itemid === 'zsgl'){
submenu= "<div class='e8_submenu' itemid='zsgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>文档上传</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zsgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>文档预览</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zsgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>文档共享</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zsgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>文档推送</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zsgl_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>文档查询</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zsgl_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>文档修改</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("知识管理模块");	  
}else if(itemid === 'rlzy'){
submenu= "<div class='e8_submenu' itemid='rlzy_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农业全产业链跟踪系统</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rlzy_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>智能LED终端</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rlzy_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>体感设备开发</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rlzy_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>全景与虚拟现实</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rlzy_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>触屏终端平台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rlzy_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>在线试戴平台</span> "+
"</div>";
submenus.push(submenu);


$(".e8_modulename").html("接入各类智能设备");	  
}else if(itemid === 'zcgl'){
submenu= "<div class='e8_submenu' itemid='zcgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>会员金额的操作</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zcgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>会员推广与分润</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zcgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>会员数字控制台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='zcgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>优惠卡券及虚拟币</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("资产管理模块");	  
}else if(itemid === 'khgl'){
submenu= "<div class='e8_submenu' itemid='khgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>客户查询是否撞单</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='khgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>会员管理界面</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='khgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>有问必答系统</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='khgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>丰富会员菜单</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='khgl_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>有舆情监测的智能CRM</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='khgl_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>提供大数据挖掘的CRM</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("客户管理模块");	  
}else if(itemid === 'xmgl'){
submenu= "<div class='e8_submenu' itemid='xmgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目立项</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xmgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目卡片</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xmgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目计划安排</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xmgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目任务排布</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xmgl_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目任务执行</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xmgl_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目日报展现</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xmgl_7'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>项目验收</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("项目管理模块");	  
}else if(itemid === 'sxxz'){
submenu= "<div class='e8_submenu' itemid='sxxz_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>在线组卷</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='sxxz_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>在线考试</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='sxxz_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>会员应用</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='sxxz_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>电子出版</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='sxxz_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>班级管理</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='sxxz_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>题库管理</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='sxxz_7'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>试卷管理</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("为教育和知识分享而生");	  
}  else if(itemid === 'gzwb'){
submenu= "<div class='e8_submenu' itemid='gzwb_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>所见即所得后台操作</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='gzwb_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>周密安全管理员角色</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='gzwb_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>安全细致的栏目权限</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='gzwb_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>简洁易用的内容管理</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='gzwb_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>可以细致分组的会员</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("企业建站的明智之选");	  
}  else if(itemid === 'rcgl'){
submenu= "<div class='e8_submenu' itemid='rcgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>我的日程安排</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rcgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>创建日程</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rcgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>所有的日程安排</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='rcgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>多日程管理</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("卓越的事务日程管理");	  
}  else if(itemid === 'hygl'){
submenu= "<div class='e8_submenu' itemid='hygl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>接入公众号</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='hygl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>粉丝量暴增</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='hygl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>微信支付秒到</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("快速接入公众号");	  
}  else if(itemid === 'txgl'){
submenu= "<div class='e8_submenu' itemid='txgl_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>三维全景</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='txgl_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>在线拍照</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='txgl_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>地图标记</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='txgl_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>在线设计</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='txgl_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>图片生成</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='txgl_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>VR与AR展现</span> "+
"</div>";
submenus.push(submenu);


$(".e8_modulename").html("全景与VR虚拟现实");	  
}  else if(itemid === 'xtjc'){
submenu= "<div class='e8_submenu' itemid='xtjc_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>个人办事</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtjc_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>法人办事</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtjc_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>生活服务</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtjc_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>厅局服务</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtjc_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>办事大厅</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("符合中国政策要求的办事平台");	  
}else if(itemid === 'jybb'){
submenu= "<div class='e8_submenu' itemid='jybb_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>高大大气主页</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>资讯展示合理</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农技平台数据</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农业商城精美</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农业实验频道</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农业服务导航</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_7'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农业解决方案</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='jybb_8'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>农业村村通</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("为农业门户建建提供支持");	  
}else if(itemid === 'wysd'){
submenu= "<div class='e8_submenu' itemid='wysd_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>商城主页</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='wysd_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>购物界面</span> "+
"</div>";
submenus.push(submenu);
submenu= "<div class='e8_submenu' itemid='wysd_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>结算支付</span> "+
"</div>";
submenus.push(submenu);
submenu= "<div class='e8_submenu' itemid='wysd_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>试戴购物</span> "+
"</div>";
submenus.push(submenu);
submenu= "<div class='e8_submenu' itemid='wysd_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>漂亮商城</span> "+
"</div>";
submenus.push(submenu);
$(".e8_modulename").html("专为中国供应链设计");	  
}else if(itemid === 'xtzss'){
submenu= "<div class='e8_submenu' itemid='xtzss_1'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>服务器集群</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtzss_2'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>跨站整合性能卓越</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtzss_3'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>无限节点自由扩展</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtzss_4'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>服务器真实IIS管理</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtzss_5'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>企业级模板云台</span> "+
"</div>";
submenus.push(submenu);

submenu= "<div class='e8_submenu' itemid='xtzss_6'> "+
" <span class='middlehelper'></span> "+
" <img src='/Template/office/style/images/login9_nav.png'> "+
" <span>军工级站群平台</span> "+
"</div>";
submenus.push(submenu);

$(".e8_modulename").html("大型政务门户站群");	  
}

$(".e8_menu").removeClass("e8_menulight");
current.addClass("e8_menulight");
$(".e8_submenus").html(submenus.join(""));
$(".e8_submenu").eq(0).trigger("click");
});
$(".e8_menu").eq(0).trigger("click");
});

//********************//
//角色部门应用体验
(function($) {

    $.fn.appFolders = function(options) {
    	//Defaults to extend options
        var settings = $.extend({  
            opacity: .2, 							// Opacity of non-selected items
            marginTopAdjust: false, 				// Adjust the margin-top for the folder area based on row selected?
            marginTopBase: '0px', 					// If margin-top-adjust is "true", the natural margin-top for the area
            marginTopFirst: '0px', 					// If margin-top-adjust is "true", the natural margin-top for the area
            marginTopIncrement: '-100px',			// If margin-top-adjust is "true", the increment of margin-top per row
            animationSpeed: 200,					// Time (in ms) for transition
            URLrewrite: false, 						// Use URL rewriting?
            URLbase: "",							// If URL rewrite is enabled, the URL base of the page where used
            internalLinkSelector: '.login9_roles .jaf-internal a',// a jQuery selector containing links to content within a jQuery App Folder
			instaSwitch: false,
			scrollTopBase: 70,
			clickFolderBefore: null,
			clickFolderAfter: null,
			showCloseBtn: true
		}, options);

		$.fn.appFolders.closeFolder = function() {
			var openFolder = $('.login9_roles .folder.active-tool').attr('id');
			if(openFolder) {
				$(".login9_roles .folder").removeClass("active-tool");

				var folderContent = $('.login9_roles .folderContent.' + openFolder);
				folderContent.slideUp(settings.animationSpeed);
				
				//Reset the margin-top for the container
				if( settings.marginTopAdjust === true) folderContent.animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );
			}

			$("html,body").animate({scrollTop: 0}, settings.animationSpeed);
		};
		
		//Do work on each selector
        return this.each(function() {
	        
// ==============
// ! START jQuery App Folders SCRIPT   
// ==============

			var appFolders = $(".login9_roles .folderContent").hide();
			
			//when a folder is clicked,
			//position the content folder after the clicked row
			//and toggle all folder / app icon that is not the one clicked.
			//and toggle the folder content panel
			$(".login9_roles .folder").click(function(event) {
				if(typeof settings.clickFolderBefore === "function") settings.clickFolderBefore.call(this);

				var openFolder = $(this).attr('id');
				var folderContent = $('.login9_roles .folderContent.' + openFolder);
				var folderContentShown = $(folderContent).css("display") != "none";
				var clickedFolder = $(this);
				
				// // Auto-scroll to the folder being clicked
				// if( settings.marginTopAdjust == false) {
				// 	$('html, body').animate({
				// 		scrollTop: $(this).offset().top
				// 	}, settings.animationSpeed);
				// }

				//If there is no currently displayed content area...
				if ($(".login9_roles .jaf-container .active-tool").length === 0){
					var row = clickedFolder.parent(".jaf-row");
					$(row).after(folderContent);
								
					$(this).addClass('active-tool');
					$(folderContent).slideToggle(settings.animationSpeed);
							
					$(".login9_roles .jaf-container").find(".folder").not(clickedFolder).each(function() {
						if (!folderContentShown) {
							$(this).animate({ opacity: settings.opacity }, settings.animationSpeed);
						}
						else {
							$(this).animate({ opacity: 1.00 }, settings.animationSpeed);
						}
					});

					
					
// ==============
// ! Shift Rows (margin-top-adjust)   
// ==============
					if( settings.marginTopAdjust === false) {
						//return false;
					//if no margin-top adjustment, leave it alone
					} else {
					// To enable shifting of the rows' top margin on click (works best with overflow: hidden):
						var $i = $(this).parent().index('.jaf-row');
						var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
						$(this).parent().parent().animate({ marginTop: marTop }, settings.animationSpeed );
					}


//--Add the id to the URL but change it temporarily
//--to keep it from scrolling to it
					var hash = $(clickedFolder).attr('id');
					var node = $( '#' + hash );
					if ( node.length ) {
						node.attr( 'id', '' );
					}
					//document.location.hash = hash;
					var scrolTop = clickedFolder.offset().top - settings.scrollTopBase;
					$("html,body").animate({scrollTop: scrolTop}, settings.animationSpeed);

					if ( node.length ) {
						node.attr( 'id', hash );
					}
		
		
				}
				
				//If there IS a currently displayed tool details area, CLOSE IT
				else {
					
					if (folderContentShown) {
						//Active icon was clicked
						$(this).toggleClass("active-tool");
						$(folderContent).slideToggle(settings.animationSpeed);
						$(".login9_roles .jaf-container").find(".folder").not(clickedFolder).each(function() {
							if (!folderContentShown) {
								$(this).animate({ opacity: 0.20 }, settings.animationSpeed);
							}
							else {
								$(this).animate({ opacity: 1.00 }, settings.animationSpeed);
							}
						});

						//document.location.hash = '';
						$("html,body").animate({scrollTop: 0}, settings.animationSpeed);
						
						//Reset the margin-top for the container
						if( settings.marginTopAdjust === true) $(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );
					
					} else {

						if (settings.instaSwitch !== false) {

							var speed = settings.animationSpeed;

							//Open clicked icon
							if ($(this).parent().find('.active-tool').length !== 0){
								$('.login9_roles .active-tool').removeClass('active-tool');
								$('.login9_roles .jaf-container .folder').animate({ opacity: 1.00 }, speed);

								$('.login9_roles .folderContent:visible').fadeOut(speed, function(){
									clickedFolder.addClass('active-tool');
									var row = clickedFolder.parent(".jaf-row");
									$(row).after(folderContent);

									$(folderContent).fadeIn(speed, function() {
										var scrolTop = clickedFolder.offset().top - settings.scrollTopBase;
										$("html,body").animate({scrollTop: scrolTop}, settings.animationSpeed);
									});
								});
							} else {
								$('.login9_roles .active-tool').removeClass('active-tool');
								$('.login9_roles .jaf-container .folder').animate({ opacity: 1.00 }, speed);

								$('.login9_roles .folderContent:visible').slideUp(speed);

								clickedFolder.addClass('active-tool');
								var row = clickedFolder.parent(".jaf-row");
								$(row).after(folderContent);

								$(folderContent).slideToggle(speed, function() {
									var scrolTop = clickedFolder.offset().top - settings.scrollTopBase;
									$("html,body").animate({scrollTop: scrolTop}, settings.animationSpeed);
								});
							}
									
							$(".login9_roles .jaf-container").find(".folder").not(clickedFolder).each(function() {
								if (!folderContentShown) {
									$(this).animate({ opacity: settings.opacity }, speed);
								}
								else {
									$(this).animate({ opacity: 1.00 }, speed);
								}
							});

							var hash = $(clickedFolder).attr('id');
							var node = $( '#' + hash );

							//document.location.hash = hash;

							if ( node.length ) {
								node.attr( 'id', hash );
							}

							// Set the margin top to the correct value for the newly clicked folder - See line 69
							if( settings.marginTopAdjust === false) {
								//return false;
								//if no margin-top adjustment, leave it alone
							} else {
								// To enable shifting of the rows' top margin on click (works best with overflow: hidden):
								var $i = $(this).parent().index('.jaf-row');
								var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
								$(this).parent().parent().animate({ marginTop: marTop }, settings.animationSpeed );
							}

						} else {

							//Inactive icon was clicked
							$('.login9_roles .folderContent').slideUp(settings.animationSpeed);
							$('.login9_roles .active-tool').removeClass('active-tool');
							$('.login9_roles .jaf-container .folder').animate({ opacity: 1.00 }, settings.animationSpeed);
											
							//Reset the margin-top for the container
							if( settings.marginTopAdjust === true) $(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );

						}
					}
				}

				if(typeof settings.clickFolderAfter === "function") settings.clickFolderAfter.call(this);
				
				event.preventDefault();
				return false;
			});

			// close button
			if (settings.showCloseBtn === true) {
				$('<a href="javascript:void(0)" class="jaf-close"></a>').click(function(){
					$(".login9_roles .folder").removeClass("active-tool");
					$(this).parent().slideToggle(settings.animationSpeed);
					
					//Reset the margin-top for the container
					if( settings.marginTopAdjust === true) $(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );

					//$("html,body").animate({scrollTop: 0}, settings.animationSpeed);
				}).appendTo('.folderContent');
				$(".jaf-container_c button").click(function(){
					$(this).parent().parent().parent().find(".jaf-close").click();
				})
			};
			
			
// ==============
// ! OPEN SECTION BY URL HASH on load   
// ==============
			var clickedFolder = $(window.location.hash),
				openFolder = $(clickedFolder).attr('id'),
				folderContent = $('.' + openFolder),
				folderContentShown = $(folderContent).css("display") != "none",
				row = clickedFolder.parent(".jaf-row");
			
			$(row).after(folderContent);
						
			$('#' + openFolder).addClass('active-tool');
			$(folderContent).delay(200).slideDown();
			
			$(".login9_roles .jaf-container").find(".folder").not(clickedFolder).each(function() {
				if (!folderContentShown) {
					$(this).css('opacity', settings.opacity);
				}
				else {
					$(this).css('opacity', '1.00');
				}
			});
			
			// To enable shifting of the rows' top margin on click (works best with overflow: hidden)
			var $i = $(row).index('.jaf-row');
			if ($i != -1) {
				if( settings.marginTopAdjust === true) {
					var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
					$(this).animate({ marginTop: marTop }, settings.animationSpeed );
				}
							
				// Don't scroll to the linked item
				//$('body').animate({scrollTop:0}, 200, 'linear');
				var scrolTop = clickedFolder.offset().top - settings.scrollTopBase;
				$("html,body").animate({scrollTop: scrolTop}, settings.animationSpeed);
			}

			// Re-load any links outside the App Folders that refer to an opened App Folder.
			$(settings.internalLinkSelector).click(function(event) {
				var link = $(this).attr('href');
				window.location.href = link;
				window.location.reload();
				//return false;
			});
			// data-ajax="false" ?

		}); // end EACH function
	}
}) ( jQuery );
$(document).ready(function() {
	$(".jaf-container_c").css('height', $(window).height() - 135 + "px");

	$('#app-folders-container').appFolders({
		opacity: 1,
		instaSwitch: true,
		animationSpeed: 400,
		scrollTopBase: 75
	});
});

//********************//
//移动办公体验
var beforecss1="";
function  closeDialog1(){
    $(".mobile_curtain").css(beforecss1);
	setTimeout(function(){
       $(".mobile_frame_wrapper").hide();
    },450);
}
$(document).ready(function() {
	$(".login9_mobile .folder").click(function() {
		var left = $(window).width() / 2 - $("#app-folders-container1").width() / 2,
			current = $(this),
			position = current.position(),
			mobileframe = $(".mobile_frame_wrapper"),
			miaoid = current.attr("id");
		var toleft = position.left,
			totop = position.top + 120,
			toright = mobileframe.width() - position.left - current.width(),
			tobuttom = mobileframe.height() - totop - current.height();
		$(".mobile_frame_wrapper").css("left", left + 'px');
		$(".mobile_frame_wrapper").show();
		$(".mobile_curtain_c").hide();
		$("#mobile_curtain_" + miaoid).show();
		beforecss1 = {
			left: position.left + 'px',
			top: position.top + 120 + 'px',
			right: toright + 'px',
			bottom: tobuttom
		};
		$(".mobile_curtain").css(beforecss1);
		setTimeout(function(){
          var after = {left:0,top:0,width:"auto","height":"auto","right":"0","bottom":0};
          $(".mobile_curtain").css(after);
        },100);
	});
	$(document).bind('click',function(ev){
         var ev=ev||window.event;
		  var element=ev.target||ev.srcElement;  
		   var current = $(ev.target);
		  if(element.className !='item' && element.className !='item2' && element.className !='applyspan'  && current.attr("id") !='onlinechatimg' && current.attr("id") !='onlinetitle' && current.attr("id") !='chatClose'){
		      closeDialog1();
		  }
    });
});

//********************//
//逐浪云平台
$(document).ready(function() {
	$(".cd-popup-trigger").click(function() {
		$(".popdiv .popcontent").hide();
		$(".popdiv .popcontent." + $(this).attr('popdiv')).show();

		$(".popmask").fadeIn('fast');
		$(".popdiv").fadeIn('slow');

		$(".applyfloat").fadeIn();
	});
	$(".cloud").each(function() {
		var left = $(this).position().left;
		$(this).attr("data-left", left);
	});

	var flag;
	var timeinter;

	function initMove() {
		flag = 0;
		timeinter = setInterval(function() {
			$(".cloud").each(function() {
				var left = ~~$(this).attr("data-left");
				if (flag === 0) $(this).animate({
					"left": (left - 20) + 'px'
				}, 1000);
				else $(this).animate({
					"left": (left + 20) + 'px'
				}, 1000);
			});
			if (flag === 0) flag = 1;
			else flag = 0;
		}, 1000);

	}

	$(".cloud").hover(function() {
		clearInterval(timeinter);
	}, function() {
		initMove();
	});

	initMove();

	$(".leftitem").click(function() {
		if ($(this).hasClass('curitem')) return;
		$(this).addClass('curitem').siblings('.leftitem').removeClass('curitem');
		var curpopcontent = $(this).parents('.popcontent');
		var idx = curpopcontent.find('.leftitem').index(this);
		var popcontright = curpopcontent.find(".popcontright");
		if (idx == popcontright.find('.rightitem.curitem').index()) return;
		popcontright.find('.rightitem.curitem').fadeOut('slow', function() {
			popcontright.find('.rightitem').removeClass('curitem');
			popcontright.find('.rightitem:eq(' + idx + ')').fadeIn('slow').addClass('curitem');
		});
	});

	$(".closeicon, .popmask, #header").click(function() {
		$(".popdiv").fadeOut('slow');
		$(".popmask").fadeOut('fast');
		$(".applyfloat").fadeOut();
	});
});
