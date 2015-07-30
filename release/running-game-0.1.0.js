"use strict";!function(){function a(a){var b=this;c(b,a),(void 0===b.opt.fullScreen||b.opt.fullScreen)&&f(b.canvas)}function b(a){for(var b=a.length,c=0;b--;)a[b]>c&&(c=a[b]);return c+1}function c(a,b){a.canvas=document.createElement("canvas"),a.ctx=window.UPlayer.getContext(a),a.opt=b||{},a.canvas.id=b.id||"",a.plugins=a.opt.debug?[window.UPlayer.debug]:[],a.pluginsIndex={},a.curFrame=0}function d(a){e(a);for(var b=0;b<a.plugins.length;)a.plugins[b]&&("function"==typeof a.plugins[b]?a.plugins[b](a.ctx,a.curFrame):"function"==typeof a.plugins[b].render&&a.plugins[b].render(a.ctx,a.curFrame)),++b}function e(a){(a.opt.refresh||void 0===a.opt.refresh)&&a.ctx.clearRect(0,0,a.canvas.width,a.canvas.height)}function f(a){a.style.position="fixed",a.style.top=0,a.style.left=0,a.style.zIndex=1e3,document.body.appendChild(a),g(a),window.onresize=function(){g(a)}}function g(a){a.width=window.innerWidth,a.height=window.innerHeight}function h(a,b){for(var c in a.pluginsIndex)a.pluginsIndex.hasOwnProperty(c)&&a.pluginsIndex[c]>=b&&++a.pluginsIndex[c]}function i(a,b){for(var c in a.pluginsIndex)a.pluginsIndex.hasOwnProperty(c)&&a.pluginsIndex[c]>=b&&++a.pluginsIndex[c]}function j(a,b,c){a.plugins.splice(c,1),a.pluginsIndex[b]=void 0,i(a,c)}function k(a,b,c){var e=+new Date;b||(b=e),(a.playing||c>0)&&(e-b>1e3/(a.opt.fps||30)&&(d(a),++a.curFrame,b=e,void 0!==c&&--c),l.call(window,function(){k(a,b,c)}))}var l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.setTimeout;a.prototype.plug=function(a){var b=0;if(void 0!==a.zIndex){for(;b<this.plugins.length&&!(a.zIndex<this.plugins[b].zIndex);)++b;this.plugins.splice(b,0,a)}else b=this.plugins.length,this.plugins.push(a);if(void 0!==a.hash){var c=this.pluginsIndex[a.hash];void 0!==c?"object"==typeof c?c.push(b):this.pluginsIndex[a.hash]=[c,b]:(h(this,b),this.pluginsIndex[a.hash]=b)}},a.prototype.plugCard=function(a){var c=this;window.UPlayer.preImage(a.src,function(d){a.img=d,a.render=function(c,e){a.pulse&&a.pulse(c,e);var f,g,h,i=a.scale||1;"object"==typeof a.frame?(g=b(a.frame),f=a.frame[e%a.frame.length]):(g=a.frame,f=e%g),h=d.width/g,c.drawImage(d,f*h,0,h,d.height,a.x||0,a.y||0,h*i,d.height*i)},c.plug(a)})},a.prototype.unplug=function(a){var b=this.pluginsIndex[a];if(void 0!==b)if("object"!=typeof b)j(this,a,b);else for(var c=b.length;c--;)j(this,a,b[c])},a.prototype.run=function(a){var b=this;void 0===a&&(b.playing=!0),k(b,null,a)},a.prototype.pause=function(){this.playing=!1},a.prototype.stop=function(){this.curFrame=0,this.playing=!1},window.UPlayer=a}(),function(){function a(a){for(var d in a.raw)"function"==typeof a.raw[d]?b(a,d):c(a,d)}function b(a,b){a[b]=function(){a.raw[b].apply(a.raw,arguments)}}function c(a,b){a.props=a.props||{},a.props[b]={get:function(){return a.raw[b]},set:function(c){a.raw[b]=c}},Object.defineProperties(a,a.props)}function d(){}window.UPlayer.transit={},window.UPlayer.getContext=function(b){var c={raw:b.canvas.getContext("2d")};return a(c),d(c),c}}(),function(){function a(a){return c[a.src]}function b(a){var b=document.createElement("canvas"),d=b.getContext("2d");return b.width=a.width,b.height=a.height,d.drawImage(a,0,0),c[a.src]=b,b}var c={};window.UPlayer.transit.drawImage=function(c){var d=a(c);d||(d=b(c)),arguments[0]=d,this.raw.drawImage.apply(this.raw,arguments)}}(),function(){var a={};window.UPlayer.preImage=function(b,c){function d(){a[b]=e,c(e)}var e=a[b];e?c(e):(e=new Image,e.src=b,e.complete&&d(),e.onload=d)}}(),function(){function a(){if(!f){var a=document.createElement("div"),b=a.style;a.id=g,b.position="fixed",b.top=0,b.right=0,b.zIndex=1e4,b.fontSize="24px",b.color="#fff",b.margin="5px",b.padding="10px",b.background="rgba(0, 0, 0, 0.6)",a.innerText="FPS 0",document.body.appendChild(a),f=!0}}var b,c=+new Date,d=10,e=0,f=!1,g="uplayer-fps";window.UPlayer.debug=function(){a(),++e%d===0&&(b=+new Date,document.getElementById(g).innerText="FPS "+(d/((b-c)/1e3)).toFixed(1),c=b)}}(),function(){function a(){e.$music.init(),e.$p=new UPlayer({fps:10}),c(),e.$p.run(1),e._ready(),e.$point.init()}function b(a,b){e.$opt=a||{},e.$img=e.$opt.img,e.$msg=e.$opt.msg,e.$conf=e.$opt.conf,e.$audio=e.$opt.audio,e.$cd=b,e.$grade=1,e.$res=0,e.$pre="running-game",e.$css=document.createElement("link"),e.$css.rel="stylesheet",e.$css.type="text/css",e.$css.href=e.$opt.css,document.body.appendChild(e.$css),e.$root=e._div(),e.$root.id=e.$opt.id,e.$root.style.zIndex=1e3,document.body.appendChild(e.$root)}function c(){e._animateSky(),e._animateCloud(),e._animateGround(),e._animateBg(),e._animatePersonStart(),e._insert(e.$p.canvas)}function d(){e.$p.unplug("start"),e._animatePerson(e.$p),e.$p.run()}var e=window.RunningGame={};e.start=function(a,c){b(a,c),e._loading()},e._hook=function(){var b=0;e.$observer.on("loaded",function(){a()}),e.$observer.on("start",function(){e._time.init(),d()}),e.$observer.on("end",function(){e.$p.unplug("person"),e.$p.unplug("person-super"),e._animatePersonEnd(e.$p),e.$p.stop(),e.$p.run(1),e.$point.end(),e.$music.stopBg(),e.$music.playCheer(),setTimeout(function(){document.body.removeChild(document.getElementById("example")),e.$cd&&e.$cd(e.$res)},e.$opt.endTime||3e3)}),e.$observer.on("round",function(){var a,c=+new Date;c-b>1e3&&(b=c,e.$grade=e._getGrade(),console.log("grade: ",e.$grade),e.$grade===e.$conf.grade.length&&a!==e.$grade&&(e.$p.unplug("person"),e._animatePersonSuper()),a===e.$conf.grade.length&&a!==e.$grade&&(e.$p.unplug("person-super"),e._animatePerson()),e.$p.opt.fps=e.$opt.conf.fps[e.$grade-1],a=e.$grade)})},e._div=function(){return document.createElement("div")},e._span=function(){return document.createElement("span")},e._insert=function(a){e.$root.appendChild(a)},e._remove=function(a){e.$root.removeChild(a)}}(),function(){function a(a){i=e(),i.innerText=l.$opt.msg.nick,i.className=g+"-nick",a.appendChild(i)}function b(a){k=f(),a.appendChild(k)}function c(a){j=f(),d(),a.appendChild(j)}function d(){j.innerText=l.$res+" M"}function e(){return document.createElement("div")}function f(){return document.createElement("span")}var g,h,i,j,k,l=window.RunningGame,m=l.$point={};m.init=function(){g=l.$pre+"-point",h=e(),h.className=g,a(h),b(h),c(h),l.$root.appendChild(h)},m.update=function(){function a(){return Math.random()>.5?1:-1}l.$res+=l.$conf.point[l.$grade-1]+a(),d()},m.end=function(){h.className=g+" "+g+"-end",i.style.display="none",setTimeout(function(){i.className=g+"-nick "+g+"-end-nick",i.style.display="block",j.className=g+"-end-dis",k.innerText=l.$opt.msg.result},1e3)}}(),function(){function a(){l=s.$pre+"-motion",r=0,p=0,q=0,o=-1}function b(a){var b=s._div();b.className=l+"-l",c(b),a.appendChild(b)}function c(a){m=s._div(),m.className=l+"-btn "+l+"-btn-l",f(m),m.addEventListener("touchstart",i),a.appendChild(m)}function d(a){var b=s._div();b.className=l+"-r",e(b),a.appendChild(b)}function e(a){n=s._div(),n.className=l+"-btn "+l+"-btn-r",f(n),n.addEventListener("touchstart",j),a.appendChild(n)}function f(a){a.style.background='#8a8a8a url("'+s.$opt.img.step+'") no-repeat center',a.style.backgroundSize="22px 43px"}function g(){m.style.backgroundColor="#ffba15",n.style.backgroundColor="#8a8a8a"}function h(){m.style.backgroundColor="#8a8a8a",n.style.backgroundColor="#3088e2"}function i(){k(0),g()}function j(){k(1),h()}function k(a){o!==a&&(1===a&&(++p,window.navigator.vibrate&&window.navigator.vibrate(20)),o=a)}var l,m,n,o,p,q,r,s=window.RunningGame;s._initMotion=function(){var c=s._div();a(),c.className=l,b(c),d(c),s._insert(c)},s._motionChange=function(){++r,r%2?g():h()},s._getGrade=function(){for(var a,b=s.$opt.conf.grade,c=b.length;c--;)if(p>=b[c]){a=c+1;break}return p=0,a>q&&(q+=a-q>=2?2:1),q>a&&(q-=1),q},document.onkeydown=function(a){37===a.keyCode&&i(),39===a.keyCode&&j()}}(),function(){function a(a){h=j._span(),h.className=f+"-second",h.innerText="10.0",a.appendChild(h)}function b(a){var b=j._span();b.innerText="s",a.appendChild(b)}function c(a){var b=a/1e3;h.innerText=b%1!==0?b+"":b+".0",a!==i&&a%500===0&&j.$point.update()}function d(){j.$observer.emit("end"),g.className=f+" "+f+"-end",setTimeout(function(){g.className=f+" "+f+"-end "+f+"-hide"},1e3)}function e(a,b,c,d){var e=0,f=setInterval(function(){c(a-e),e+=b,e>a&&-1!==a&&(clearInterval(f),d&&d())},b)}var f,g,h,i,j=window.RunningGame,k=j._time={};k.init=function(){f=j.$pre+"-top",i=j.$conf.gameTime||1e4,g=j._div(),g.className=f,a(g),b(g),j._insert(g),e(i,100,c,d)}}(),function(){function a(){f.ele.addEventListener("touchstart",function(a){c()?(c("0"),b()):(c("1"),d()),a.cancelBubble=!0})}function b(){f.playBg(),f.ele.style.background='url("'+e.$opt.img.musicOn+'") 10px 10px no-repeat',f.ele.style.backgroundSize="30px"}function c(a){var b=window.localStorage,c="runningGameMusicOff";return void 0===a?"1"===b.getItem(c)?!0:!1:void b.setItem(c,a)}function d(){f.stopBg(),f.ele.style.background='url("'+e.$opt.img.musicOff+'") 10px 10px no-repeat',f.ele.style.backgroundSize="30px"}var e=window.RunningGame,f=e.$music={},g={},h={};f.init=function(){f.ele=e._div(),f.ele.className=e.$pre+"-music",c()?d():b(),a(),e._insert(f.ele)},f.playBg=function(){g=document.createElement("audio"),g.src=e.$audio.bg,g.volume=e.$audio.volume,g.loop=!0,g.play()},f.playCheer=function(){c()||(h=document.createElement("audio"),h.src=e.$audio.cheer,h.volume=e.$audio.volume,h.loop=!1,h.play())},f.stopBg=function(){g.pause&&g.pause(),g.src=""}}(),function(){var a=window.RunningGame;a._loading=function(){a.$loading=new UPlayer({fps:30}),a._insert(a.$loading.canvas);var b=window.innerWidth,c=window.innerHeight;a.$loading.plugCard({zIndex:0,src:a.$img.loading,frame:11,pulse:function(a){a.fillStyle="#fff",a.fillRect(0,0,b,c),this.x=b/2-this.img.width/this.frame/2,this.y=c/2-this.img.height}});var d=0;a.$loading.plug({zIndex:1,render:function(a,e){var f="",g=0;for(e%5===0&&++d;d%4>g;)f+=".",++g;a.font="normal bold 10px Helvetica",a.fillStyle="#f47021",a.fillText("Loading"+f,b/2-20,c/2+10)}}),a.$loading.run(),setTimeout(function(){a.$observer.emit("loaded"),setTimeout(function(){a.$loading.stop(),a._remove(a.$loading.canvas)},1e3)},1e3)}}(),function(){function a(){g=j._div(),g.innerText=j.$opt.msg.ready,g.className=f+"-ready",g.style.background='url("'+j.$opt.img.ready+'") 50% -200px / 225px 245px no-repeat',j._insert(g)}function b(){i=j._div(),i.className=f+"-finger";var a=0;h=setInterval(function(){++a%2?(i.style.left=0,i.style.right="initial",i.style.background='url("'+j.$opt.img.ready+'") 50% 0% / 225px 245px no-repeat'):(i.style.left="initial",i.style.right=0,i.style.background='url("'+j.$opt.img.ready+'") 50% -100px / 225px 245px no-repeat'),j._motionChange()},200),j._insert(i)}function c(){clearInterval(h),j._remove(i),j._remove(g),j._remove(j.$music.ele)}function d(){document.body.addEventListener("touchstart",e)}function e(){c(),j.$observer.emit("start"),document.body.removeEventListener("touchstart",e)}var f,g,h,i,j=window.RunningGame;j._ready=function(){f=j.$pre,j._initMotion(),a(),b(),d()}}(),function(){function a(a,b,c){a.fillStyle="#c4f2ff",a.fillRect(0,0,b,c)}function b(a,b,c){for(var e=0;e<d.length;)a.fillStyle=d[e],a.beginPath(),a.arc(.51*b,.4*c,b*d[++e],0,2*Math.PI),a.closePath(),a.fill(),++e}var c=window.RunningGame;c._animateSky=function(){c.$p.plug(function(c){var d=window.innerWidth,e=window.innerHeight;a(c,d,e),b(c,d,e)})};var d=["rgba(255,253,52,0.32)",.17,"rgba(255,255,255,1)",.15,"rgba(255,252,178,1)",.14,"rgba(255,253,52,1)",.13]}(),function(){function a(a,b){var c=.05*window.innerWidth,d=.3*window.innerHeight+b;a.beginPath(),a.moveTo(c,d),a.quadraticCurveTo(c+50,d-10,c+111,d-14),a.bezierCurveTo(c+125,d-20,c+120,d-40,c+98,d-38),a.bezierCurveTo(c+90,d-52,c+65,d-50,c+65,d-27),a.quadraticCurveTo(c+58,d-30,c+56,d-24),a.quadraticCurveTo(c+40,d-30,c+37,d-14),a.quadraticCurveTo(c+33,d-14,c+31,d-8),a.quadraticCurveTo(c+11,d-4,c,d-2),a.closePath(),a.fill(),a.stroke()}function b(a,b){var c=.49*window.innerWidth,d=.25*window.innerHeight+b;a.beginPath(),a.moveTo(c,d),a.quadraticCurveTo(c+24,d+1,c+63,d),a.arc(c+63,d-13,13,.45*Math.PI,1*Math.PI,!0),a.quadraticCurveTo(c+40,d-12,c+40,d-6),a.quadraticCurveTo(c+36,d,c+36,d-2),a.quadraticCurveTo(c,d,c,d-3),a.fill(),a.stroke(),a.closePath()}function c(a,b){var c=.625*window.innerWidth,d=.28*window.innerHeight+b;a.beginPath(),a.moveTo(c,d),a.quadraticCurveTo(c+48,d-2,c+104,d+11),a.lineTo(c+104,d+9),a.quadraticCurveTo(c+85,d+9,c+89,d-18),a.bezierCurveTo(c+88,d-41,c+56,d-41,c+53,d-22),a.quadraticCurveTo(c+38,d-26,c+39,d-11),a.quadraticCurveTo(c+32,d-11,c+32,d-5),a.quadraticCurveTo(c+32,d-2,c+29,d-2),a.quadraticCurveTo(c+15,d-1,c,d-2),a.fill(),a.stroke(),a.closePath()}var d=window.RunningGame,e=[0,2,4,6,4,2,0];d._animateCloud=function(){d.$p.plug(function(d,f){var g=e[f%7];d.fillStyle=d.strokeStyle="white",a(d,g),b(d,g),c(d,g)})}}(),function(){function a(a,b){var c=window.innerWidth,d=window.innerHeight,e=0,f=.4*d+b;a.fillStyle="#90c983",a.beginPath(),a.moveTo(e,f),a.quadraticCurveTo(.5*c,f-.1*d,c,f),a.lineTo(c,d),a.lineTo(0,d),a.closePath(),a.fill()}function b(a,b,c){var d=window.innerWidth,e=window.innerHeight,f=0,g=.4*e+c,h=f+.43*d+b,i=g-.052*e;a.fillStyle="#474540",a.beginPath(),a.moveTo(h,i),a.quadraticCurveTo(.5*d,i-5,h+.13*d,i),a.quadraticCurveTo(h+.3*d,i+.1*e,d,i+.4*e),a.lineTo(d,e),a.lineTo(0,e),a.lineTo(0,i+.4*e),a.quadraticCurveTo(h-.17*d,i+.1*e,h,i),a.closePath(),a.fill()}var c=window.RunningGame,d=[2,0,3,6,11,13,15,19,17,15,10,8,3,0],e=[4,0,-2,-4,-3,-5,0,1,-2,-3,-6,-7,-2,0];c._animateGround=function(){c.$p.plug(function(c,f){var g=d[f%d.length],h=e[f%e.length];a(c,h),b(c,g,h)})}}(),function(){function a(a){return window.innerWidth/(a.img.width/a.frame)}var b=window.RunningGame;b._animateBg=function(){b.$p.plugCard({x:0,y:.27*window.innerHeight,src:b.$opt.img.bg,frame:14,debug:!0,pulse:function(){this.scale=a(this)}})}}(),function(){var a=window.RunningGame;a._animatePerson=function(){a.$p.plugCard({hash:"person",src:a.$opt.img.person,frame:[0,1,2,3,4,5,6,7,6,5,4,3,2,1],pulse:function(b,c){this.x=window.innerWidth/2-this.img.width/8/2,this.y=.85*window.innerHeight-this.img.height,c%this.frame.length===0&&a.$observer.emit("round")}})}}(),function(){var a=window.RunningGame;a._animatePersonSuper=function(){a.$p.plugCard({hash:"person-super",src:a.$opt.img.person,frame:[0,1,2,7,5,2,1],pulse:function(b,c){this.x=window.innerWidth/2-this.img.width/8/2,this.y=.85*window.innerHeight-this.img.height,c%(2*this.frame.length)===0&&a.$observer.emit("round")}})}}(),function(){var a=window.RunningGame;a._animatePersonStart=function(){a.$p.plugCard({hash:"start",src:a.$opt.img.start,frame:1,scale:.5,pulse:function(){this.x=window.innerWidth/2-this.img.width*this.scale/this.frame/2+10,this.y=.85*window.innerHeight-this.img.height*this.scale*.7}})}}(),function(){var a=window.RunningGame;window.RunningGame._animatePersonEnd=function(){a.$p.plugCard({src:a.$opt.img.end,frame:1,scale:.5,pulse:function(){this.x=window.innerWidth/2-this.img.width*this.scale/this.frame/2+10,this.y=.85*window.innerHeight-this.img.height*this.scale*.95}})}}(),function(){function a(a){this._ctx=a||this}var b=a.prototype;b.on=function(a,b){return this._cbs=this._cbs||{},(this._cbs[a]=this._cbs[a]||[]).push(b),this},b.once=function(a,b){function c(){d.off(a,c),b.apply(this,arguments)}var d=this;return this._cbs=this._cbs||{},c.fn=b,this.on(a,c),this},b.emit=function(a,b,c,d){this._cbs=this._cbs||{};var e=this._cbs[a];if(e){e=e.slice(0);for(var f=0,g=e.length;g>f;f++)e[f].call(this._ctx,b,c,d)}return this};var c=window.RunningGame;c.$observer=new a,c._hook()}();