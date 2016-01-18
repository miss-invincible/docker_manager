define("docker-manager/app",["exports","ember","ember/resolver","ember/load-initializers","docker-manager/config/environment"],function(e,t,r,a,n){"use strict";t["default"].MODEL_FACTORY_INJECTIONS=!0;var d=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:r["default"]});a["default"](d,n["default"].modulePrefix),e["default"]=d}),define("docker-manager/components/progress-bar",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({classNameBindings:[":progress",":progress-striped","active"],active:function(){return 100!==parseInt(this.get("percent"),10)}.property("percent"),barStyle:function(){var e=parseInt(this.get("percent"),10);return e>0?(e>100&&(e=100),("width: "+this.get("percent")+"%").htmlSafe()):"".htmlSafe()}.property("percent")})}),define("docker-manager/components/repo-status",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({tagName:"tr",upgradeDisabled:function(){var e=this.get("upgradingRepo");if(!e){var t=this.get("managerRepo");return t?!t.get("upToDate")&&t!==this.get("repo"):!1}return!0}.property("upgradingRepo","repo","managerRepo","managerRepo.upToDate"),actions:{upgrade:function(){this.sendAction("upgrade",this.get("repo"))}}})}),define("docker-manager/components/x-console",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({classNameBindings:[":logs"],render:function(e){t["default"].isEmpty(this.get("output"))||e.push(this.get("output"))},_outputChanged:function(){t["default"].run.scheduleOnce("afterRender",this,"_scrollBottom"),this.rerender()}.observes("output"),_scrollBottom:function(){this.get("followOutput")&&this.$().scrollTop(this.$()[0].scrollHeight)},_scrollOnInsert:function(){this._scrollBottom()}.on("didInsertElement")})}),define("docker-manager/components/x-tab",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({tagName:"li",classNameBindings:["active"],active:function(){return this.get("childViews").anyBy("active")}.property("childViews.@each.active")})}),define("docker-manager/controllers/application",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({showBanner:function(){if(this.get("bannerDismissed"))return!1;var e=this.get("banner");return e&&e.length>0}.property("banner","bannerDismissed","banner.@each"),appendBannerHtml:function(e){var t=this.get("banner")||[];-1===t.indexOf(e)&&t.pushObject(e),this.set("banner",t)},logoUrl:function(){return Discourse.getURL("/assets/images/docker-manager-ea64623b074c8ec2b0303bae846e21e6.png")}.property(),returnToSiteUrl:function(){return Discourse.getURL("/")}.property(),backupsUrl:function(){return Discourse.getURL("/admin/backups")}.property(),actions:{dismiss:function(){this.set("bannerDismissed",!0)}}})}),define("docker-manager/controllers/index",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({managerRepo:null,upgrading:null})}),define("docker-manager/controllers/processes",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({autoRefresh:!1,init:function(){this._super();var e=this;window.setInterval(function(){e.performRefresh()},5e3)},performRefresh:function(){this.get("autoRefresh")&&this.get("model").refresh()}})}),define("docker-manager/controllers/upgrade",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({output:null,init:function(){this._super(),this.reset()},complete:t["default"].computed.equal("status","complete"),failed:t["default"].computed.equal("status","failed"),messageReceived:function(e){switch(e.type){case"log":this.set("output",this.get("output")+e.value+"\n");break;case"percent":this.set("percent",e.value);break;case"status":this.set("status",e.value),("complete"===e.value||"failed"===e.value)&&this.set("model.upgrading",!1),"complete"===e.value&&this.set("model.version",this.get("model.latest.version"))}},upgradeButtonText:function(){return this.get("model.upgrading")?"Upgrading...":"Start Upgrading"}.property("model.upgrading"),startBus:function(){var e=this;MessageBus.subscribe("/docker/upgrade",function(t){e.messageReceived(t)})},stopBus:function(){MessageBus.unsubscribe("/docker/upgrade")},reset:function(){this.setProperties({output:"",status:null,percent:0})},actions:{start:function(){this.reset();var e=this.get("model");e.get("upgrading")||e.startUpgrade()},resetUpgrade:function(){var e=this;bootbox.confirm("WARNING: You should only reset upgrades that have failed and are not running.\n\nThis will NOT cancel currently running builds and should only be used as a last resort.",function(t){if(t){var r=e.get("model");r.resetUpgrade().then(function(){e.reset()})}})}}})}),define("docker-manager/helpers/fa-icon",["exports","ember"],function(e,t){"use strict";var r=/^fa\-.+/,a=t["default"].Logger.warn,n=function(e,n){if("string"!==t["default"].typeOf(e)){var d="fa-icon: no icon specified";return a(d),new t["default"].Handlebars.SafeString(d)}var i=n.hash,c=[],s="";return c.push("fa"),e.match(r)||(e="fa-"+e),c.push(e),i.spin&&c.push("fa-spin"),i.flip&&c.push("fa-flip-"+i.flip),i.rotate&&c.push("fa-rotate-"+i.rotate),i.lg&&(a("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}"),c.push("fa-lg")),i.x&&(a("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\""+i.x+'"}}'),c.push("fa-"+i.x+"x")),i.size&&("number"===t["default"].typeOf(i.size)?c.push("fa-"+i.size+"x"):c.push("fa-"+i.size)),i.fixedWidth&&c.push("fa-fw"),i.listItem&&c.push("fa-li"),i.pull&&c.push("pull-"+i.pull),i.border&&c.push("fa-border"),i.classNames&&!t["default"].isArray(i.classNames)&&(i.classNames=[i.classNames]),t["default"].isEmpty(i.classNames)||Array.prototype.push.apply(c,i.classNames),s+="<i",s+=" class='"+c.join(" ")+"'",i.title&&(s+=" title='"+i.title+"'"),s+="></i>",new t["default"].Handlebars.SafeString(s)};e["default"]=t["default"].Handlebars.makeBoundHelper(n),e.faIcon=n}),define("docker-manager/helpers/fmt-ago",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Handlebars.makeBoundHelper(function(e){return t["default"].isEmpty(e)?new t["default"].Handlebars.SafeString("&mdash;"):moment(e).fromNow()})}),define("docker-manager/helpers/fmt-commit",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Handlebars.makeBoundHelper(function(e,r){return t["default"].isNone(r)?void 0:new t["default"].Handlebars.SafeString("(<a href='"+r+"'>"+e+"</a>)")})}),define("docker-manager/initializers/app-version",["exports","docker-manager/config/environment","ember"],function(e,t,r){"use strict";var a=r["default"].String.classify,n=!1;e["default"]={name:"App Version",initialize:function(e,d){if(!n){var i=a(d.toString());r["default"].libraries.register(i,t["default"].APP.version),n=!0}}}}),define("docker-manager/initializers/crsf-token",["exports","ic-ajax"],function(e,t){"use strict";e["default"]={name:"findCsrfToken",initialize:function(){return t["default"](Discourse.getURL("/session/csrf")).then(function(e){var t=e.csrf;$.ajaxPrefilter(function(e,r,a){e.crossDomain||a.setRequestHeader("X-CSRF-Token",t)})})}}}),define("docker-manager/initializers/export-application-global",["exports","ember","docker-manager/config/environment"],function(e,t,r){"use strict";function a(e,a){var n=t["default"].String.classify(r["default"].modulePrefix);r["default"].exportApplicationGlobal&&!window[n]&&(window[n]=a)}e.initialize=a,e["default"]={name:"export-application-global",initialize:a}}),define("docker-manager/models/process-list",["exports","ic-ajax","ember"],function(e,t,r){"use strict";var a=r["default"].Object.extend({init:function(){this._super()},refresh:function(){var e=this;return t["default"](Discourse.getURL("/admin/docker/ps")).then(function(t){return e.set("output",t),e})}});a.reopenClass({find:function(){var e=a.create();return e.refresh()}}),e["default"]=a}),define("docker-manager/models/repo",["exports","ic-ajax","ember"],function(e,t,r){"use strict";var a=[],n=r["default"].Object.extend({upToDate:function(){return!this.get("upgrading")&this.get("version")===this.get("latest.version")}.property("upgrading","version","latest.version"),shouldCheck:function(){if(r["default"].isNone(this.get("version")))return!1;if(this.get("checking"))return!1;var e=this.get("lastCheckedAt");if(e){var t=(new Date).getTime()-e;return t>6e4}return!0}.property()["volatile"](),repoAjax:function(e,r){return r=r||{},r.data=this.getProperties("path","version","branch"),t["default"](Discourse.getURL(e),r)},findLatest:function(){var e=this;return new r["default"].RSVP.Promise(function(t){return e.get("shouldCheck")?(e.set("checking",!0),void e.repoAjax("/admin/docker/latest").then(function(a){e.setProperties({checking:!1,lastCheckedAt:(new Date).getTime(),latest:r["default"].Object.create(a.latest)}),t()})):t()})},findProgress:function(){return this.repoAjax("/admin/docker/progress").then(function(e){return e.progress})},resetUpgrade:function(){var e=this;return this.repoAjax("/admin/docker/upgrade",{type:"DELETE"}).then(function(){e.set("upgrading",!1)})},startUpgrade:function(){var e=this;return this.set("upgrading",!0),this.repoAjax("/admin/docker/upgrade",{type:"POST"})["catch"](function(){e.set("upgrading",!1)})}});n.reopenClass({findAll:function(){return new r["default"].RSVP.Promise(function(e){return a.length?e(a):void t["default"](Discourse.getURL("/admin/docker/repos")).then(function(t){a=t.repos.map(function(e){return n.create(e)}),e(a)})})},findUpgrading:function(){return this.findAll().then(function(e){return e.findBy("upgrading",!0)})},find:function(e){return this.findAll().then(function(t){return t.findBy("id",e)})}}),e["default"]=n}),define("docker-manager/router",["exports","ember","docker-manager/config/environment"],function(e,t,r){"use strict";var a=t["default"].Router.extend({location:r["default"].locationType});a.map(function(){this.route("processes"),this.resource("upgrade",{path:"/upgrade/:id"})}),e["default"]=a}),define("docker-manager/routes/index",["exports","docker-manager/models/repo","ember"],function(e,t,r){"use strict";e["default"]=r["default"].Route.extend({model:function(){return t["default"].findAll()},setupController:function(e,t){var r=this,a=r.controllerFor("application");e.setProperties({model:t,upgrading:null}),window.Discourse&&window.Discourse.hasLatestPngcrush||a.appendBannerHtml("<b>WARNING:</b> You are running an old Docker image, <a href='https://meta.discourse.org/t/how-do-i-update-my-docker-image-to-latest/23325'>please upgrade</a>."),t.forEach(function(t){t.findLatest(),t.get("upgrading")&&e.set("upgrading",t),"docker_manager"===t.get("id")&&e.set("managerRepo",t),"discourse"===t.get("id")&&"origin/master"===t.get("branch")&&a.appendBannerHtml("<b>WARNING:</b> Your Discourse is tracking the 'master' branch which may be unstable, <a href='https://meta.discourse.org/t/change-tracking-branch-for-your-discourse-instance/17014'>we recommend tracking the 'tests-passed' branch</a>.")})},actions:{upgrade:function(e){this.transitionTo("upgrade",e)}}})}),define("docker-manager/routes/processes",["exports","docker-manager/models/process-list","ember"],function(e,t,r){"use strict";e["default"]=r["default"].Route.extend({model:function(){return t["default"].find()}})}),define("docker-manager/routes/upgrade",["exports","docker-manager/models/repo","ember"],function(e,t,r){"use strict";e["default"]=r["default"].Route.extend({model:function(e){return t["default"].find(e.id)},afterModel:function(e){var a=this;return t["default"].findUpgrading().then(function(t){return t&&t!==e?r["default"].RSVP.Promise.reject("wat"):e.findLatest().then(function(){return e.findProgress().then(function(e){a.set("progress",e)})})})},setupController:function(e,t){e.reset(),e.setProperties({model:t,output:this.get("progress.logs"),percent:this.get("progress.percentage")}),e.startBus()},deactivate:function(){this.controllerFor("upgrade").stopBus()}})}),define("docker-manager/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("img");return e.setAttribute(r,"class","logo"),e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.element;a.detectNamespace(r);var i;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(i=this.build(a),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=a.cloneNode(this.cachedFragment,!0))):i=this.build(a);var c=a.childAt(i,[0]);return d(t,c,e,"bind-attr",[],{src:"logoUrl"}),i}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("Upgrade");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),r=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("        ");e.appendChild(t,r);var r=e.createElement("p"),a=e.createComment("");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.content;a.detectNamespace(r);var i;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(i=this.build(a),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=a.cloneNode(this.cachedFragment,!0))):i=this.build(a);var c=a.createUnsafeMorphAt(a.childAt(i,[1]),0,0);return d(t,c,e,"row"),i}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("    ");e.appendChild(t,r);var r=e.createElement("div");e.setAttribute(r,"id","banner");var a=e.createTextNode("\n      ");e.appendChild(r,a);var a=e.createElement("div");e.setAttribute(a,"id","banner-content");var n=e.createTextNode("\n        ");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","close");var d=e.createElement("i");e.setAttribute(d,"class","fa fa-times"),e.setAttribute(d,"title","Dismiss this banner."),e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("      ");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n    ");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,d=r.hooks,i=d.element,c=d.get,s=d.block;n.detectNamespace(a);var o;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.childAt(o,[1,1]),h=n.childAt(l,[1]),u=n.createMorphAt(l,3,3);return i(r,h,t,"action",["dismiss"],{}),s(r,u,t,"each",[c(r,t,"banner")],{keyword:"row"},e,null),o}}}(),a=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("Versions");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),n=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("Processes");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("header");e.setAttribute(r,"class","container");var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createElement("h1"),n=e.createComment("");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createElement("div");e.setAttribute(r,"class","container");var a=e.createTextNode("\n\n");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createElement("ul");e.setAttribute(a,"class","nav nav-tabs");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("li"),d=e.createElement("a"),i=e.createTextNode("Return to site");e.appendChild(d,i),e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("li"),d=e.createElement("a"),i=e.createTextNode("Backups");e.appendChild(d,i),e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n\n  ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(d,i,c){var s=i.dom,o=i.hooks,l=o.block,h=o.get,u=o.element,p=o.content;s.detectNamespace(c);var m;i.useFragmentCache&&s.canClone?(null===this.cachedFragment&&(m=this.build(s),this.hasRendered?this.cachedFragment=m:this.hasRendered=!0),this.cachedFragment&&(m=s.cloneNode(this.cachedFragment,!0))):m=this.build(s);var g=s.childAt(m,[0]),f=s.childAt(m,[2]),v=s.childAt(f,[3]),b=s.childAt(v,[5,0]),C=s.childAt(v,[7,0]),F=s.createMorphAt(g,1,1),x=s.createMorphAt(s.childAt(g,[3]),0,0),N=s.createMorphAt(f,1,1),T=s.createMorphAt(v,1,1),k=s.createMorphAt(v,3,3),R=s.createMorphAt(f,5,5);return l(i,F,d,"link-to",["index"],{},e,null),l(i,x,d,"link-to",["index"],{},t,null),l(i,N,d,"if",[h(i,d,"showBanner")],{},r,null),l(i,T,d,"x-tab",[],{route:"index"},a,null),l(i,k,d,"x-tab",[],{route:"processes"},n,null),u(i,b,d,"bind-attr",[],{href:"returnToSiteUrl"}),u(i,C,d,"bind-attr",[],{href:"backupsUrl"}),p(i,R,d,"outlet"),m}}}())}),define("docker-manager/templates/components/progress-bar",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("div");e.setAttribute(r,"class","progress-bar"),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.get,i=n.attribute;a.detectNamespace(r);var c;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(c=this.build(a),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=a.cloneNode(this.cachedFragment,!0))):c=this.build(a);var s=a.childAt(c,[0]),o=a.createAttrMorph(s,"style");return i(t,o,s,"style",d(t,e,"barStyle")),c}}}())}),define("docker-manager/templates/components/repo-status",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("    Checking for new version...\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),t=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("    Up to date\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),t=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("        ");e.appendChild(t,r);var r=e.createElement("button");e.setAttribute(r,"class","btn");var a=e.createTextNode("Currently Upgrading...");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.element;a.detectNamespace(r);var i;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(i=this.build(a),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=a.cloneNode(this.cachedFragment,!0))):i=this.build(a);var c=a.childAt(i,[1]);return d(t,c,e,"action",["upgrade"],{}),i}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("        ");e.appendChild(t,r);var r=e.createElement("button");e.setAttribute(r,"class","btn");var a=e.createTextNode("Upgrade to the Latest Version");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.element;a.detectNamespace(r);var i;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(i=this.build(a),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=a.cloneNode(this.cachedFragment,!0))):i=this.build(a);var c=a.childAt(i,[1]);return d(t,c,e,"action",["upgrade"],{}),d(t,c,e,"bind-attr",[],{disabled:"upgradeDisabled"}),i}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("    ");e.appendChild(t,r);var r=e.createElement("div");e.setAttribute(r,"class","new-version");var a=e.createTextNode("\n      ");e.appendChild(r,a);var a=e.createElement("h4"),n=e.createTextNode("New Version Available!");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n      ");e.appendChild(r,a);var a=e.createElement("ul"),n=e.createTextNode("\n        ");e.appendChild(a,n);var n=e.createElement("li"),d=e.createTextNode("Remote Version: ");e.appendChild(n,d);var d=e.createComment("");e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n        ");e.appendChild(a,n);var n=e.createElement("li"),d=e.createTextNode("Last Updated: ");e.appendChild(n,d);var d=e.createComment("");e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n        ");e.appendChild(a,n);var n=e.createElement("li");e.setAttribute(n,"class","new-commits");var d=e.createComment("");e.appendChild(n,d);var d=e.createTextNode(" new commits");e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n      ");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("    ");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n  ");return e.appendChild(t,r),t},render:function(r,a,n){var d=a.dom,i=a.hooks,c=i.get,s=i.inline,o=i.content,l=i.block;d.detectNamespace(n);var h;a.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(h=this.build(d),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=d.cloneNode(this.cachedFragment,!0))):h=this.build(d);var u=d.childAt(h,[1]),p=d.childAt(u,[3]),m=d.createMorphAt(d.childAt(p,[1]),1,1),g=d.createMorphAt(d.childAt(p,[3]),1,1),f=d.createMorphAt(d.childAt(p,[5]),0,0),v=d.createMorphAt(u,5,5);return s(a,m,r,"fmt-commit",[c(a,r,"repo.latest.version"),c(a,r,"url")],{}),s(a,g,r,"fmt-ago",[c(a,r,"repo.latest.date")],{}),o(a,f,r,"repo.latest.commits_behind"),l(a,v,r,"if",[c(a,r,"repo.upgrading")],{},e,t),h}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");return e.appendChild(t,r),t},render:function(r,a,n){var d=a.dom,i=a.hooks,c=i.get,s=i.block;d.detectNamespace(n);var o;a.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(o=this.build(d),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=d.cloneNode(this.cachedFragment,!0))):o=this.build(d);var l=d.createMorphAt(o,0,0,n);return d.insertBoundary(o,null),d.insertBoundary(o,0),s(a,l,r,"if",[c(a,r,"repo.upToDate")],{},e,t),o}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("td"),a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");e.appendChild(t,r);var r=e.createElement("td"),a=e.createTextNode("\n");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(r,a,n){var d=a.dom,i=a.hooks,c=i.content,s=i.get,o=i.inline,l=i.block;d.detectNamespace(n);var h;a.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(h=this.build(d),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=d.cloneNode(this.cachedFragment,!0))):h=this.build(d);var u=d.childAt(h,[0]),p=d.createMorphAt(u,1,1),m=d.createMorphAt(u,3,3),g=d.createMorphAt(d.childAt(h,[2]),1,1);return c(a,p,r,"repo.name"),o(a,m,r,"fmt-commit",[s(a,r,"repo.version"),s(a,r,"repo.url")],{}),l(a,g,r,"if",[s(a,r,"repo.checking")],{},e,t),h}}}())}),define("docker-manager/templates/components/x-tab",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.content;a.detectNamespace(r);var i;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(i=this.build(a),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=a.cloneNode(this.cachedFragment,!0))):i=this.build(a);var c=a.createMorphAt(i,0,0,r);return a.insertBoundary(i,null),a.insertBoundary(i,0),d(t,c,e,"yield"),i}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,d=r.hooks,i=d.get,c=d.block;n.detectNamespace(a);var s;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(s=this.build(n),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=n.cloneNode(this.cachedFragment,!0))):s=this.build(n);var o=n.createMorphAt(s,0,0,a);return n.insertBoundary(s,0),c(r,o,t,"link-to",[i(r,t,"route")],{},e,null),s}}}())}),define("docker-manager/templates/index",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("      ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r,a){var n=t.dom,d=t.hooks,i=d.set,c=d.get,s=d.inline;n.detectNamespace(r);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.createMorphAt(o,1,1,r);return i(t,e,"repo",a[0]),s(t,l,e,"repo-status",[],{repo:c(t,e,"repo"),upgradingRepo:c(t,e,"upgrading"),managerRepo:c(t,e,"managerRepo"),upgrade:"upgrade"}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("table");e.setAttribute(r,"class","table"),e.setAttribute(r,"id","repos");var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createElement("tr"),n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("th");e.setAttribute(n,"style","width: 50%");var d=e.createTextNode("Repository Name");e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("th"),d=e.createTextNode("Status");e.appendChild(n,d),e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createElement("tbody"),n=e.createTextNode("\n");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("  ");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,d=r.hooks,i=d.get,c=d.block;n.detectNamespace(a);var s;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(s=this.build(n),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=n.cloneNode(this.cachedFragment,!0))):s=this.build(n);var o=n.createMorphAt(n.childAt(s,[0,3]),1,1);return c(r,o,t,"each",[i(r,t,"model")],{},e,null),s}}}())}),define("docker-manager/templates/loading",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("h3");e.setAttribute(r,"class","loading");var a=e.createTextNode("Loading...");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}())}),define("docker-manager/templates/processes",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");
return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.get,i=n.inline;a.detectNamespace(r);var c;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(c=this.build(a),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=a.cloneNode(this.cachedFragment,!0))):c=this.build(a);var s=a.createMorphAt(c,0,0,r);return a.insertBoundary(c,0),i(t,s,e,"x-console",[],{output:d(t,e,"model.output")}),c}}}())}),define("docker-manager/templates/upgrade",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createElement("p"),a=e.createTextNode("Upgrade completed successfully!");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n  ");e.appendChild(t,r);var r=e.createElement("p"),a=e.createTextNode("Note: The web server restarts in the background. It's a good idea to wait 30 seconds or so\n     before refreshing your browser to see the latest version of the application.");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createElement("p"),a=e.createTextNode("Sorry, there was an error upgrading Discourse. Please check the logs below.");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),r=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createElement("p"),a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode(" is at the newest version ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode(".");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.content,i=n.get,c=n.inline;a.detectNamespace(r);var s;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(s=this.build(a),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=a.cloneNode(this.cachedFragment,!0))):s=this.build(a);var o=a.childAt(s,[1]),l=a.createMorphAt(o,0,0),h=a.createMorphAt(o,2,2);return d(t,l,e,"model.name"),c(t,h,e,"fmt-commit",[i(t,e,"model.version"),i(t,e,"model.url")],{}),s}}}(),a=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("      ");e.appendChild(t,r);var r=e.createElement("button");e.setAttribute(r,"class","btn unlock");var a=e.createTextNode("Reset Upgrade");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,d=n.element;a.detectNamespace(r);var i;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(i=this.build(a),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=a.cloneNode(this.cachedFragment,!0))):i=this.build(a);var c=a.childAt(i,[1]);return d(t,c,e,"action",["resetUpgrade"],{}),i}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createElement("div");e.setAttribute(r,"style","clear: both");var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("button");e.setAttribute(a,"class","btn");var n=e.createComment("");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("  ");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,d=r.hooks,i=d.element,c=d.content,s=d.get,o=d.block;n.detectNamespace(a);var l;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(l=this.build(n),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=n.cloneNode(this.cachedFragment,!0))):l=this.build(n);var h=n.childAt(l,[1]),u=n.childAt(h,[1]),p=n.createMorphAt(u,0,0),m=n.createMorphAt(h,3,3);return i(r,u,t,"action",["start"],{}),i(r,u,t,"bind-attr",[],{disabled:"model.upgrading"}),c(r,p,t,"upgradeButtonText"),o(r,m,t,"if",[s(r,t,"model.upgrading")],{},e,null),l}}}();return{isHTMLBars:!0,revision:"Ember@1.11.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("h3"),a=e.createTextNode("Upgrade ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(n,d,i){var c=d.dom,s=d.hooks,o=s.content,l=s.get,h=s.inline,u=s.block;c.detectNamespace(i);var p;d.useFragmentCache&&c.canClone?(null===this.cachedFragment&&(p=this.build(c),this.hasRendered?this.cachedFragment=p:this.hasRendered=!0),this.cachedFragment&&(p=c.cloneNode(this.cachedFragment,!0))):p=this.build(c);var m=c.createMorphAt(c.childAt(p,[0]),1,1),g=c.createMorphAt(p,2,2,i),f=c.createMorphAt(p,4,4,i),v=c.createMorphAt(p,6,6,i),b=c.createMorphAt(p,8,8,i),C=c.createMorphAt(p,10,10,i);return o(d,m,n,"model.name"),h(d,g,n,"progress-bar",[],{percent:l(d,n,"percent")}),u(d,f,n,"if",[l(d,n,"complete")],{},e,null),u(d,v,n,"if",[l(d,n,"failed")],{},t,null),u(d,b,n,"if",[l(d,n,"model.upToDate")],{},r,a),h(d,C,n,"x-console",[],{output:l(d,n,"output"),followOutput:!0}),p}}}())}),define("docker-manager/config/environment",["ember"],function(e){var t="docker-manager";try{var r=t+"/config/environment",a=e["default"].$('meta[name="'+r+'"]').attr("content"),n=JSON.parse(unescape(a));return{"default":n}}catch(d){throw new Error('Could not read config from meta tag with name "'+r+'".')}}),runningTests?require("docker-manager/tests/test-helper"):require("docker-manager/app")["default"].create({name:"docker-manager",version:"0.0.0.b6c2232e"});