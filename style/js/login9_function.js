$(function(){
    $('.e-func-header-more').mouseenter(function(){
       $('.e-func-more-menus').slideDown('show'); 
    }).mouseleave(function(){
        $('.e-func-more-menus').slideUp('hide'); 
    });
    var menus = {
            'lcgl':{
                "title" : '内容管理',
                'module_name':'内容信息管理',
                'son_menus':{
                    "lcgl_1":"信息列表",
                    "lcgl_2":"发布内容",
                    "lcgl_3":"版本管理",
                    "lcgl_4":"流程审核",
                    "lcgl_5":"定时发布"
                },
                'son_tip':{
                    'lcgl_1':'说明：随着Zoomla!逐浪CMS团队的研发迭代，各个版本界面可能有所不同，不断趋优并适应新时代站长和开发者需求。',
                    "lcgl_2":"说明：系统可以自由订制各类种内容模型，管理员根据自己的需要设定不同的节点，不限节点数量，支持海量内容发布。",
                    "lcgl_3":"说明：全球首个支持版本管理的内容管理系统，方便企业和政务应用，可以支持不同的版本审计，从而建立起科学的内容管理。",
                    "lcgl_4":"说明：自定义流程，三级审批，并可根据需要设定不同节点的审批流量。",
                    "lcgl_5":"说明：编辑好了内容，可设定好自动发布时间，自动发布，从而大大降低管理员和编辑的成本，这是一个智慧的CMS，引领着全新的智能时代。"
                }
            },
            'nbxw':{
                "title" : '商城管理',
                'module_name':'电子商务模块',
                'son_menus':{
                    "nbxw_1":'商品管理',
                    "nbxw_2":"发布商品",
                    "nbxw_3":"库存管理",
                    "nbxw_4":"支付平台"
                },
                'son_tip':{
                    "nbxw_1":'说明：周全完善的商品管理系统。',
                    "nbxw_2":"说明：友好的商品发布管理页面，快速高效的建立电商平台。",
                    "nbxw_3":"说明：优秀的库存管理，为即时电商效力。",
                    "nbxw_4":"说明：支持各大主流支付平台，并可根据需要自由定义自己的支付网关，从而打通企业收款的最后一站。"
                }
            },
            'xxzx':{
                "title" : '店铺管理',
                'module_name':'多店铺并行管理',
                'son_menus':{
                    "xxzx_1":'店铺管理',
                    "xxzx_2":"店铺样式",
                    "xxzx_3":"网店中心",
                    "xxzx_4":"店铺商品"
                },
                'son_tip':{
                    "xxzx_1":'说明：无须进入消息模块，主页即可与同事互相交流。',
                    "xxzx_2":"说明：根据查询条件，查询消息。",
                    "xxzx_3":"说明：提供给商家的网店管理中心，支持管理订单、发布商品。",
                    "xxzx_4":"说明：管理店铺商品。"
                }        
            },
            'zsgl':{
                "title" : '黄页模块',
                'module_name':'支持企业黄页自由发布',
                'son_menus':{
                    "zsgl_1":'黄页审核',
                    "zsgl_2":"内容管理",
                    "zsgl_3":"黄页配置",
                    "zsgl_4":" 黄页样式"
                },
                'son_tip':{
                    "zsgl_1":'说明：配置专业的黄页审核平台，从而建立起类子站和应用（逐浪另有强大的站群功能），丰富的开发组件为不同的场景提供支持。',
                    "zsgl_2":"说明：提交、发布、管理各个黄页的内容，从而符合国家网信办对于信息管理的要求，凝聚逐浪人在企业信息化中的建设成就。",
                    "zsgl_3":"说明：管理各个黄页，高效、敏捷自由。",
                    "zsgl_4":" 说明：自由的管理各个黄页样式，让各个企业拥有不同的主页，在地产、装修、威客、设计师平台中都有广泛的应用。"
                }      
            }
        };
    var menusHtml = '';
    $.each(menus,function(key,value){
        menusHtml += '<div class="menu-item" item-id="'+key+'" >'+value.title+'</div>';
    });    
    $('.e-func-header-menus').html(menusHtml);
    
    var moreMenus = {
        'sxxz':{
            "title" : '版权管理',
            'module_name':'保护知识产权',
            'son_menus':{
                "sxxz_1":"配置版权",
                "sxxz_2":"发布版权",
                "sxxz_3":"版权交易"
            },
            'son_tip':{
                "sxxz_1":"说明：配置版权接口，我们与中国国际版权中心独家合作。",
                "sxxz_2":"说明：发布内容时，一键设定版权功能。",
                "sxxz_3":"说明：用版权进行交易，产生高额收益。"
            }      
        },
        'gzwb':{
            "title" : '接入头条',
            'module_name':'今日头条唯一合作CMS',
            'son_menus':{
                "gzwb_1":"头条配置",
                "gzwb_2":"传送文章",
                "gzwb_3":"传送视频"
            },
            'son_tip':{
                "gzwb_1":"说明：配置今日头条公众号帐号，从而通过中国最大的新闻客户端赚取流量。",
                "gzwb_2":"说明：通过网站后台向今日头条客户端推送内容。",
                "gzwb_3":"说明：通过网站后台向今日头条客户端推送视频。"
            }      
        },
        'szmx':{
            "title" : '支付明细',
            'module_name':'管理支付明细',
            'son_menus':{
                "szmx_1":"支付明细",
                "szmx_2":"统计报表",
                "szmx_3":" 订单 明细"
            },
            'son_tip':{
                "szmx_1":"说明：记录现金流水与记录。",
                "szmx_2":"说明：统计所有的收支情况，按全年12月份、全年四季度统计，每个月统计收支情况，显示支出金额、收入金额、收支差、收支记录个数，清楚直观。",
                "szmx_3":" 说明：订单管理界面，用于支持商务流程。"
            }      
        },
        'fyqd':{
            "title" : '会员管理',
            'module_name':'会员产生价值',
            'son_menus':{
                "fyqd_1":"会员组别",
                "fyqd_2":"会员详情",
                "fyqd_3":"会员参数"
            },
            'son_tip':{
                "fyqd_1":"说明：配置会员组信息，物以类聚、提升效率。",
                "fyqd_2":"说明：详尽的展示会员资料。",
                "fyqd_3":"说明：可以自由的设定会员参数。"
            }      
        },
        'hygl':{
            "title" : '标签管理',
            'module_name':'自由抽取数据',
            'son_menus':{
                "hygl_1":"标签列表",
                "hygl_2":"标签编辑",
                "hygl_3":"标签引用"
            },
            'son_tip':{
                "hygl_1":"说明：通过标签可以抽取数据，是程序员与数据会话的语言。",
                "hygl_2":"说明：丰富的、原生的表抽取，开发如此简易。",
                "hygl_3":"说明：方便的引用标签，根据分类抽取"
            }      
        },
        'xtzss':{
            "title" : '模板管理',
            'module_name':'管理网站模板',
            'son_menus':{
                "xtzss_1":"模板方案",
                "xtzss_2":"模板列表",
                "xtzss_3":"模板编辑",
                "xtzss_4":"设定模板"
            },
            'son_tip':{
                "xtzss_1":"说明：方案是一个独立的模板组织单元。",
                "xtzss_2":"说明：在模板板方案中通过文件夹来进行组织。",
                "xtzss_3":"说明：后台可以辅助性的智能编辑，同时由于是物理存储，可以分离编辑。",
                "xtzss_4":"说明：从容为网站选择你最想要的模板。。"
            }      
        },
        'mhgl':{
            "title" : '风格管理',
            'module_name':'门户管理模块',
            'son_menus':{
                "mhgl_1":"风格列表",
                "mhgl_2":"上传风格",
                "mhgl_3":"编辑风格",
                "mhgl_4":"备份风格"
            },
            'son_tip':{
                "mhgl_1":"说明：风格存于系统template/模板方案下的style文件夹，是由css、图片以及JS组成。",
                "mhgl_2":"说明：上传.css、.JPG等文件。",
                "mhgl_3":"说明：编辑CSS样式表-后台辅助性的编辑提升了代码阅读能力。",
                "mhgl_4":"说明：将风格的包备份。"
            }      
        },
        'wbyjzh':{
            "title" : '百变微站',
            'module_name':'随心所欲换风格',
            'son_menus':{
                "wbyjzh_1":"样式编辑器",
                "wbyjzh_2":"样式列表",
                "wbyjzh_3":"样式呈现列表"
            },
            'son_tip':{
                "wbyjzh_1":"说明：智能的CSS编辑器，一个代码都不用写。",
                "wbyjzh_2":"说明：管理样式，并根据既定规则发布。",
                "wbyjzh_3":"说明：可视化的管理样式规则。"
            }      
        },
        'yjsf':{
            "title" : '字库图标',
            'module_name':'矢量化站点设计',
            'son_menus':{
                "yjsf_1":"webfont",
                "yjsf_2":"矢量图标",
                "yjsf_3":"字体创作"
            },
            'son_tip':{
                "yjsf_1":"说明：由官方提供的webfont，使页面呈现更美丽。",
                "yjsf_2":"说明：矢量图标要怎么显示就怎么显示，颜色大小都由心。",
                "yjsf_3":"说明：高级版本支持定义自己的字体。"
            }     
        },
        'xmgl':{
            "title" : '节点管理',
            'module_name':'无限节点应用',
            'son_menus':{
                "xmgl_1":"新建节点",
                "xmgl_2":"管理节点",
                "xmgl_3":"节点迁移"
            },
            'son_tip':{
                "xmgl_1":"说明：建立一个栏目，并用于装载内容。",
                "xmgl_2":"说明：管理节点，包括删除、修改、绑定模板、模型设置、权限设置以及排序。",
                "xmgl_3":"说明：合并或变更层级。"
            }      
        },
        'xtjc':{
            "title" : '模型管理',
            'module_name':'用于定义字段',
            'son_menus':{
                "xtjc_1":"创建模型",
                "xtjc_2":"字段列表",
                "xtjc_3":"添加字段",
                "xtjc_4":"模型列表"
            },
            'son_tip':{
                "xtjc_1":"说明：添加一个模型，模型作为副表，用于装载个性化字段内容",
                "xtjc_2":"说明：管理字段，并进行字段删除或个性。",
                "xtjc_3":"说明：可以根据需要添加字段，字段提供各类型，如文本框、下拉表等。",
                "xtjc_4":"说明：管理模型，甚至是操作表数据。"
            }      
        },
        'dcgl':{
            "title" : '客服系统',
            'module_name':'与用户互动',
            'son_menus':{
                "dcgl_1":"有问必答",
                "dcgl_2":"访客跟踪",
                "dcgl_3":"客户聊天"
            },
            'son_tip':{
                "dcgl_1":"说明：与网站表单 、邮件一体的客服系统。",
                "dcgl_2":"说明：一行代码，插入任意页面，就能获得前端访客信息，在诸如在线药房开药等场景中非常实用。",
                "dcgl_3":"说明：在线聊天、自主IM。"
            }      
        },
        'rcgl':{
            "title" : '商城设置',
            'module_name':'配置电子商务策略',
            'son_menus':{
                "rcgl_1":"推广中心",
                "rcgl_2":"促销返利",
                "rcgl_3":"库存管理",
                "rcgl_4":"基础定义"
            },
            'son_tip':{
                "rcgl_1":"说明：会员推广，建立CPS和移动分销体系。",
                "rcgl_2":"说明：推广、返利、赢收。",
                "rcgl_3":"说明：管理库存。",
                "rcgl_4":"说明：定义商城的基本参数，支持各类电子商务。"
            }      
        },
        'rlzy':{
            "title" : '广告管理',
            'module_name':'维护前端广告',
            'son_menus':{
                "rlzy_1":"版位列表",
                "rlzy_2":"广告列表",
                "rlzy_3":"添加广告",
                "rlzy_4":"添加版位",
                "rlzy_5":"申请广告"
            },
            'son_tip':{
                "rlzy_1":"说明：版位是一种广告类型，有不同的类型版位。",
                "rlzy_2":"说明：广告是版位下的单元，决定广告内容。",
                "rlzy_3":"说明：添加广告时有各种类型广告，并严格按照国际广告协会标准设计。",
                "rlzy_4":"说明：提供详细的版位管理和添加功能。。",
                "rlzy_5":"说明：用户（商家）在会员中心提交广告申请，平台审核是否投放。"
            }    
        },
        'khgl':{
            "title" : '访问统计',
            'module_name':'用户行为是价值',
            'son_menus':{
                "khgl_1":"全站统计",
                "khgl_2":"外部统计",
                "khgl_3":"编辑统计"
            },
            'son_tip':{
                "khgl_1":"说明：内置强大的统计功能。",
                "khgl_2":"说明：将第三方的统计代码放入后台，也能全站统计。",
                "khgl_3":"说明：根据编辑和管理员统计工作量。"
            }     
        },
        'jybb':{
            "title" : '调查问卷',
            'module_name':'问卷之星用逐浪',
            'son_menus':{
                "jybb_1":"添加问券",
                "jybb_2":"填报问券",
                "jybb_3":"问卷统计",
                "jybb_4":"问卷列表",
                "jybb_5":"问题管理"
            },
            'son_tip':{
                "jybb_1":"说明：创建一个问卷。",
                "jybb_2":"说明：用户在前台填写问卷，并可自由设计界面。",
                "jybb_3":"说明：分析、统计问题，并按规则生成报表，下载、存档、分享、汇总。",
                "jybb_4":"说明：管理问卷，并可智能检索。",
                "jybb_5":"说明：管理、维护问题内容或删除问题，或增加问题，或排序。"
            }    
        },
        'zcgl':{
            "title" : '互动模块',
            'module_name':'互动投票留言',
            'son_menus':{
                "zcgl_1":"互动列表",
                "zcgl_2":"创建互动",
                "zcgl_3":"问题收集",
                "zcgl_4":"互动模型"
            },
            'son_tip':{
                "zcgl_1":"说明：互动是用于创建各类表单的。",
                "zcgl_2":"说明：创建一个互动，它可以是评论、调查、留言基其它信息。",
                "zcgl_3":"说明：提交的问题可以回复、审核、删除。",
                "zcgl_4":"说明：互动模型可以扩展字段。"
            }      
        },
        'wysd':{
            "title" : '开发中心',
            'module_name':'可视化后台开发',
            'son_menus':{
                "wysd_1":"数据查询",
                "wysd_2":"数据备份",
                "wysd_3":"视图管理",
                "wysd_4":"源码审查"
            },
            'son_tip':{
                "wysd_1":"说明：方便的查询数据，通过二级密码安全可靠。",
                "wysd_2":"说明：可视化的备份数据库，只要网页都能操作。",
                "wysd_3":"说明：管理数据视图，或创建视图。",
                "wysd_4":"说明：比较源码，维护内容。"
            }      
        },
        'rsgl':{
            "title" : '数据字典',
            'module_name':'维护数据选项',
            'son_menus':{
                "rsgl_1":"单级字典",
                "rsgl_2":"多级字典",
                "rsgl_3":"国藉字典"
            },
            'son_tip':{
                "rsgl_1":"说明：单选项字典，通过字典能提升字段利用效率和设计效率。",
                "rsgl_2":"说明：二联、三联、四联的字典。",
                "rsgl_3":"说明：定义国家级数据字典，中国走向世界、世界了解中国。"
            }      
        },
        'wf':{
            "title" : '插件管理',
            'module_name':'方便的插件中心',
            'son_menus':{
                "wf_1":"插件中心",
                "wf_2":"插件目录"
            },
            'son_tip':{
                "wf_1":"说明：通过插件可以方便的管理各类扩展功能。",
                "wf_2":"说明：插件目录为\CMSPlugins，只有部署并启用后才会动态生态，默认程序包不包括。"
            }  
        },
        'txgl':{
            "title" : '百科问答',
            'module_name':'论坛问答百科全搞定',
            'son_menus':{
                "txgl_1":"论坛社区",
                "txgl_2":"问答管理",
                "txgl_3":"百科管理"
            },
            'son_tip':{
                "txgl_1":"说明：贴吧论坛全集成，免去整合之苦。",
                "txgl_2":"说明：专业的问答平台。",
                "txgl_3":"说明：百科维基，只要用逐浪CMS都能达成，还有其它功能生态。"
            }      
        },
        'ztgl':{
            "title" : '专题管理',
            'module_name':'方便的内容管理经纬',
            'son_menus':{
                "ztgl_1":"添加专题",
                "ztgl_2":"录入专题",
                "ztgl_3":"专题列表"
            },
            'son_tip':{
                "ztgl_1":"说明：增加一个专题 。",
                "ztgl_2":"说明：将内容添加到专题中。",
                "ztgl_3":"说明：管理专题列表，排序、修改、或删除。"
            }      
        },
        'zhtb':{
            "title" : '智慧图表',
            'module_name':'强大的图表分析能力',
            'son_menus':{
                "zhtb_1":"图表中心",
                "zhtb_2":"添加图表",
                "zhtb_3":"查看图表"
            },
            'son_tip':{
                "zhtb_1":"说明：选择图表，系统内置了丰富的图表模型。",
                "zhtb_2":"说明：添加一个图表。",
                "zhtb_3":"说明：查看图表、预览数据。"
            }      
        },
        'xtpz':{
            "title" : '系统配置',
            'module_name':'完善的配置',
            'son_menus':{
                "xtpz_1":"基本配置",
                "xtpz_2":"邮件配置",
                "xtpz_3":"进阶配置"
            },
            'son_tip':{
                "xtpz_1":"说明：网站或平台的基本信息设置，如名称、LOGO等，逐浪软件本身不强制显示版权，保护用户权益。",
                "xtpz_2":"说明：配置SMTP邮件，并设定接收邮件，还有诸如手机短信接口等。",
                "xtpz_3":"说明：平台进一步的设置细节。"
            }      
        }

	
	
	};
    
    var moreMenusHtml = '';
    $.each(moreMenus,function(key,value){
        moreMenusHtml += '<div class="menu-item" item-id="'+key+'" >'+value.title+'</div>';
    });    
    $('.e-func-more-menus').html(moreMenusHtml);
    
    $('.e-func-header-menus').on({
        click:function(){
            loadSonMenu(menus,$(this));
        }
    },'.menu-item');
    $('.e-func-more-menus').on({
        click:function(){
            loadSonMenu(moreMenus,$(this));
        }
    },'.menu-item');
    
    $('.e-son-menus').on({
        click:function(){
            $('.e-func-left-menu').removeClass('active');
            $(this).addClass('active');
            var sonItemId = $(this).attr('son-item-id');
            var sonItemIdArr = sonItemId.split('_');
            if($.inArray(sonItemIdArr[0],['lcgl','nbxw','xxzx','zsgl']) >= 0){
                var tipMsg = menus[sonItemIdArr[0]]['son_tip'][sonItemId];
            } else {
                var tipMsg = moreMenus[sonItemIdArr[0]]['son_tip'][sonItemId];
            }
            $('#e-image-desc').html(tipMsg);
            var baseSrc = $('.e-func-body-right').attr('base-url');
            $('.e-func-body-right img').attr('src',baseSrc + '/' + sonItemId + '.png').hide().fadeIn();
        }
    },'.e-func-left-menu');
    $('.e-func-header-menus').find('.menu-item').last().click();
    $('.e-func-box').show().animate({'left':'60px','top':'122px'},'normal','',function(){
        setTimeout(" $('.e-func-header-menus').find('.menu-item').first().click();",'500');
    });
});
function loadSonMenu(menus,obj){
    $('.menu-item').removeClass('active');
    var itemId      = obj.attr('item-id');
    var moduleName  = menus[itemId].module_name;
    var sonMenus    = menus[itemId].son_menus;
    $('.e-func-left-header').text(moduleName);
    var sonHtml = '';
    $.each(sonMenus,function(k,v){
       sonHtml += '<div class="e-func-left-menu" son-item-id="'+k+'">'+v+'</div>';
    });
    $('.e-son-menus').html(sonHtml);
    obj.addClass('active');
    $('.e-son-menus').find('.e-func-left-menu').first().click();
}


