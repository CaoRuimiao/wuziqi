window.onload=function(){

	var body=document.getElementById('body');
	body.onmousedown=function(e){
		e.preventDefault();
	};
	var ROW=15;
	var el=document.getElementById('sence');
	var row,col;
	//-------------棋盘部分-------------
	for (var i = 0; i < ROW; i++) {
			row=document.createElement('div');
			row.style.position='absolute';
			row.style.top=((600/ROW)/2+600/ROW*i)+'px';
			row.style.width='600px';
			row.style.height='1px';
			row.style.background='#FFDDC5';
			el.appendChild(row);

			col=document.createElement('div');
			col.style.position='absolute';
			col.style.left=((600/ROW)/2+600/ROW*i)+'px';
			col.style.width='1px';
			col.style.height='600px';	
			col.style.background='#FFDDC5';
			el.appendChild(col);
	}

	var width=600/ROW-1+'px';
	var div;
	for (var i = 0; i < ROW; i++) {
		for (var j = 0; j < ROW; j++) {
			div=document.createElement('div');
			div.setAttribute('class','block');
			div.setAttribute('id',i+'_'+j);
			div.style.width=width;
			div.style.height=width;
			el.appendChild(div);
		}
	}
	// -----------游戏规则-------------
	var panduan=function(id,dic){
		var x=Number(id.split('_')[0]);
		var y=Number(id.split('_')[1]);
		var hang=1,shu=1,pie=1,na=1;
		var tx,ty;
		tx=x; ty=y;
		while(dic[tx+'_'+(ty+1)]){ hang++; ty++; }
		tx=x; ty=y;
		while(dic[tx+'_'+(ty-1)]){ hang++; ty--; }
		if (hang>=5) { return true; }
		tx=x; ty=y;
		while(dic[(tx+1)+'_'+ty]){ shu++; tx++;	}
		tx=x; ty=y;
		while(dic[(tx-1)+'_'+ty]){ shu++; tx--; }
		if (shu>=5) { return true; }
		tx=x; ty=y;
		while(dic[(tx-1)+'_'+(ty+1)]){ pie++; tx--; ty++; }
		tx=x; ty=y;
		while(dic[(tx+1)+'_'+(ty-1)]){ pie++; tx++; ty--; }
		if (pie>=5) { return true; }
		tx=x; ty=y;
		while(dic[(tx-1)+'_'+(ty-1)]){ na++; tx--; ty--; }
		tx=x; ty=y;
		while(dic[(tx+1)+'_'+(ty+1)]){ na++; tx++; ty++; }
		if (na>=5) { return true; }
		return false;
	};
	
	var blocks=document.getElementsByClassName('block');
	var fail=document.getElementById('fail');
	var kaiguan=true,dict1={},dict2={};
	for (i = 0; i < blocks.length; i++) {	
		blocks[i].onclick=function(){
			if (this.hasAttribute('hasColor')) {
				return;
			}
			var id=this.getAttribute('id');
			this.style.webkitTransform='scale(0.9)';
			
			if (kaiguan) {
				this.style.background='url(./img/black.png)';
				this.style.backgroundSize='cover';
				kaiguan=false;
				dict1[id]=true;
				if (panduan(id,dict1)) {
					// black 赢了
					fail.style.background='url(./img/wfail.png)';
					fail.style.zIndex=101;
					title.style.display='block';
					title.innerHTML='';
					play.onclick=null;
					clearInterval(timer);
					time.innerHTML = str;
				}
			}else{
				this.style.background='url(./img/white.png)';
				this.style.backgroundSize='cover';
				kaiguan=true;
				dict2[id]=true;
				if (panduan(id,dict2)) {
					// white 赢了
					fail.style.background='url(./img/bfail.png)';
					fail.style.zIndex=101;
					title.style.display='block';
					title.innerHTML='';
					play.onclick=null;
					clearInterval(timer);
					time.innerHTML = str;
				}
			}
			this.setAttribute('hasColor','true');
		};	
	}
	// --------------------------------
	var guize=document.getElementById('guize');
	var youxiguize=document.getElementById('youxiguize');
	var kaiguan2=true;
	guize.onclick=function(){
		if(kaiguan2){	
			youxiguize.style.display='block';
			kaiguan2=false;
		}else{
			youxiguize.style.display='none';
			kaiguan2=true;
		}	
	};
	
	youxiguize.onclick=function(){
		youxiguize.style.display='none';
	};
	var play=document.getElementById('play');
	var title=document.getElementById('title');
	vartime=document.getElementById('time');
	var kaiguan1=true,timer;
	play.onclick=function(){
		if(kaiguan1){
			title.style.display='none';
			play.innerHTML='暂停';
			kaiguan1=false;
			timer = setInterval(function(){
			str = "";
			if(ss++==60){
				if(mm++==60){
					HH++;
					mm=0;
				}
				ss=0;
			}
			str+=HH<10?"0"+HH:HH;
			str+=":";
			str+=mm<10?"0"+mm:mm;
			str+=":";
			str+=ss<10?"0"+ss:ss;
			time.innerHTML = str;
			},1000);
		}else{
			title.style.display='block';
			title.innerHTML='五子棋';
			play.innerHTML='开始';
			kaiguan1=true;
			clearInterval(timer);
			time.innerHTML = str;
		}
	};
	var replay=document.getElementById('replay');
	replay.onclick=function(){
		location.reload();
	};
	// -----------------计时器----------------------
	var HH = 0;
	var mm = 0;
	var ss = 0;
	var str = '';
	


	








};