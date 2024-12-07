/*jshint esversion: 6 */
document.getElementById('mysctipt').remove();
var isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Родитель навигацианных ссылок, которые необходимо выделять при активации
var nav_links_parent = 'nav';
// Класс выделения навигацианных ссылок
var selected_link_class = 'selected-link';

const nav_btns = document.querySelectorAll(nav_links_parent+' a');


function get_cookie(a){
    let b = document.cookie.match('(^|;) ?' + a + '=([^;]*)(;|$)');
    return b ? unescape(b[2]) : 'null';
}

function changeTextareaContent(content_html){
            let x = document.getElementById('page_content');
            x.value = content_html;
        }
/*
if (navigator.cookieEnabled){
	let icoo = get_cookie('ut');
	var icompare =function(){
        let a = get_cookie('ut');
        if(icoo != a){
            location.reload();
        }else{
            console.log('Ничего не поменялось');
            setTimeout( icompare,2000 );
        }
	};
	setTimeout( icompare,2000 );
}
*/

function isColorLight(color) {
    let rgb = color.match(/\d+/g);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 127.5;
}
function setTextColorBasedOnBackground() {
    let backgroundColor = getComputedStyle(document.body).getPropertyValue('background');
    let textColor;
    if (isColorLight(backgroundColor)) {
        textColor = 'black';
    } else {
        textColor = 'white';
    }
    document.body.style.color = textColor;
}

//window.addEventListener('load', setTextColorBasedOnBackground);
//window.addEventListener('resize', setTextColorBasedOnBackground);

var initPage = (page)=>{
	// Блок всей страницы или контента
	const page_block = page ? page : document;
	
	// Формы
	const forms = page_block.getElementsByTagName('form');
    if ( forms ){        
        initFormButtons(forms);
    }
	// Текстовые поля
	const textareas = page_block.getElementsByTagName('textarea');
    if ( textareas ) {        
		initTextareas(textareas);
    }
	
	// Ссылки
	const links = page_block.getElementsByTagName('a');
	if ( links ) {		
		link_event(links);
	}
	
};


// Высота текстового поля
var TextAreasEventListener = function(){
            this.style.height = "auto";
            this.style.height = ((this.scrollHeight) < 122 ? (  (this.scrollHeight <= 46 ) ? "auto" : this.scrollHeight+'px' ) : 122+"px") ;
            this.style.overflowY = ((this.scrollHeight) < 122 ? 'hidden' : 'auto');
            if(isMobile()){
                if(typeof this.id != 'undefined' && this.id=='msg_text'){
                    if(document.querySelector('.chat-messages')){
                        //let safe = getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom");
                        //alert(safe);
                        let chat_footer_height = document.querySelector('.chat-footer').offsetHeight;
                        document.querySelector('.chat-messages').setAttribute('style','height:calc(100vh - '+(195+chat_footer_height)+ 'px);');
                    }
                }
            }
        };


var initTextareas = function(textareas){
    for(let i = 0; i<textareas.length;i++){
        if( (textareas[i].scrollHeight) <122 ){
        textareas[i].setAttribute("style","height:"+ (textareas[i].scrollHeight)+"px;overflow-y:hidden;" );
            if( (textareas[i].scrollHeight) <= 46 ){textareas[i].setAttribute("style","height:auto;overflow-y:hidden;" );}
        }else{
            textareas[i].setAttribute("style","height:122px;owerflow-y:auto;" );
        }
        textareas[i].addEventListener("input",TextAreasEventListener,false);
    }
    
};

//  window.onscroll = function() {};

window.addEventListener('resize',()=>{
   let vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty('--vh',vh+'px');
});

window.addEventListener('orientationchange',()=>{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh',vh+'px');
},false);

/*
var ButtonsEventListener = function (e) {
    const classNames = ['loading_b', 'sympathy'];
    const button = this.querySelector('button');

    if (!classNames.some(className => button.classList.contains(className))) {
        addClass(button, 'loading_b');
    }
    e.preventDefault();

    var formData;

    const fileField = this.querySelector('input[type="file"]');
    if (fileField) {
        var data = new FormData();

        // Loop through each file and append it to FormData
        for (let i = 0; i < fileField.files.length; i++) {
            data.append('afile['+i+']', fileField.files[i]); // Use 'afile[]' to indicate multiple files
        }

        // Add other input values to FormData
        this.querySelectorAll('input:not([type="file"],[name="hobbies[]"])').forEach(input => {
            data.append(input.name, input.value);
        });

        if (fileField.getAttribute('data-action')) {
            data.append(fileField.getAttribute('data-action'), true);
        }
        
        formData = data;
    } else {
        let hobbies = this.querySelectorAll('input[name="hobbies[]"]');
        let hobbies_input = this.querySelector('#hobbies');
        let hobbies_str = '';

        if (hobbies) {
            for (let i = 0; i < hobbies.length; i++) {
                if (hobbies[i].checked) {
                    let r = i == 0 ? '' : ',';
                    hobbies_str = hobbies_str + r + hobbies[i].value;
                }
            }

            if (hobbies_input) {
                hobbies_input.setAttribute('name', 'hobbies_str');
                hobbies_input.value = hobbies_str;
            }
        }

        formData = new FormData(this);
    }

    let url = this.getAttribute('action') ? this.getAttribute('action') : window.location.href;
    let form_method = this.getAttribute('method') ? this.getAttribute('method') : 'GET';
    ajaxSend(formData, url, button, form_method);
};*/

var ButtonsEventListener = function (e){
	const classNames = ['loading_b,sympathy'];
	const button = this.querySelector('button');
	
                if( !classNames.some(className => button.classList.contains(className)) ){
					addClass(button,'loading_b');					
                }
                e.preventDefault();
                
                var formData;
                
                //formData = Object.fromEntries(formData); 
                
                const fileField = this.querySelector('input[type="file"]');
                if(fileField){
                    var data = new FormData();
                        //data.append('afile', fileField.files[0]);						
						for (let i = 0; i < fileField.files.length; i++) {
							data.append('afile[]', fileField.files[i]);
						}
						
                        // тут взять значение из атрибута data у файла
                        if(fileField.getAttribute('data-action')){
                        data.append(fileField.getAttribute('data-action'),true);
                        }
                    
                    formData = data;
					
                
                }else{
                let hobbies = this.querySelectorAll('input[name="hobbies[]"]');
                let hobbies_input = this.querySelector('#hobbies');
                let hobbies_str = '';
                if(hobbies){
                    for(let i=0;i<hobbies.length;i++){
                       if(hobbies[i].checked){
                       let r = i==0 ? '' : ',';
                       hobbies_str=hobbies_str+r+hobbies[i].value;
                       }
                    }
                    if(hobbies_input){
                        hobbies_input.setAttribute('name','hobbies_str');
                        hobbies_input.value = hobbies_str;
                    }
                }
                formData = new FormData(this);
				
                }
				
				let url = this.getAttribute('action') ? this.getAttribute('action') : window.location.href ;
				let form_method = this.getAttribute('method') ? this.getAttribute('method') : 'GET';
                ajaxSend(formData,url,button,form_method );
            };
var initFormButtons = function(forms){
	for (let i = 0; i < forms.length; i++) {
            forms[i].addEventListener('submit', ButtonsEventListener );
        }
};


var info_block = document.getElementById('info-block');
//const error_info = document.querySelector('.error-info');

var show_info = function(text,error=false){
    if(!info_block){
		info_block = document.createElement('div');
		info_block.setAttribute('id','info-block');
		info_block.classList.add('info_block');
		document.querySelector('body').appendChild(info_block);
	}
       info_block.classList.remove('show');
       
        //info_block.style.animation = 'none';
        if(error){
        info_block.style.color="red";
        }else{
        info_block.style.color="#00ff1f";
        }
        info_block.offsetHeight; /* trigger reflow */
        info_block.textContent = text;
        //info_block.style.animation = null; 
	   info_block.classList.add('show');
	   return false;
	
};

// Отправка данных формы
var ajaxSend = (formData,form_url,btn,method) => {
		var url = new URL(form_url, window.location.origin);//new URL(form_url);
        let content_type = "application/json";
        var body_data = formData;
		var method = method;
        //let form_method = fm ? fm : 'POST';
        let headers_content = {
				'credentials': 'same-origin',
				'X-Requested-With': 'XMLHttpRequest',
				"Content-Type": content_type
			};
        
		
		
		if(formData.has('afile') ){headers_content = {'credentials': 'same-origin','X-Requested-With': 'XMLHttpRequest'}; }else{formData = Object.fromEntries(formData);body_data = JSON.stringify(formData);}
        
		var fetch_params = {
			method: method,
			headers: headers_content,
            body: body_data
		};
		
		if(method=='GET'){
			url.search = new URLSearchParams(formData).toString();
			update_content(url,true);
			return false;
		}
		
        fetch(url, fetch_params)            
            .then((response) =>{
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Ошибка');
            })
			.then( response => {
                        if(response.success){
							if(response.action == 'redirect'){
							window.location.href = response.uri;
							}
							if(response.action == 'function'){
								//show_info('Успешно!');
								let function_name = (response.fname).toString();
								let resp_func = window[function_name];
								if (typeof resp_func === "function" ){
								    if(response.fvalue){
								    resp_func(response.fvalue);
								    }else{resp_func();}

								}
							}else{
							    if(document.querySelector('input[type=file]')){
								document.querySelector('input[type=file]').value = '';
								}
							
							        show_info('Успешно!');
							}
							setTimeout(function(){btn.classList.remove('loading_b');},500);
						}else{
							if(response.error){
								btn.classList.remove('loading_b');
								if(document.querySelector('.error-info')){
								document.querySelector('.error-info').innerHTML = response.error_text;
								document.querySelector('.error-info').classList.add('red');
								}
								if(document.querySelector('input[name=password]')){
								document.querySelector('input[name=password]').value = '';
								}
								if(document.querySelector('input[type=file]')){
								document.querySelector('input[type=file]').value = '';
								}
								
								show_info(response.error_text,true);
							}else{show_info('...',true);}
							setTimeout(function(){btn.classList.remove('loading_b');},500);

						}
                    })
            .catch( (error) => {
  console.log(error);show_info('Ошибка',true);setTimeout(function(){btn.classList.remove('loading_b');},500);
});
                //(error) => {show_info('Ошибка',true),setTimeout(function(){btn.classList.remove('loading_b');},500)/*console.error(error);*/  });
    };



/*
window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
*/

// Проверка существования элемента
var elemExists = (elem) => { return  (elem && elem != 'undefined' ) ? true : false; }

// Добавление элементу класса
var addClass = (elem,class_name)=>{
	if( !elemExists(elem) ){
		console.log('Нет элемента');
		return false;		
	}
	elem.classList.add(class_name);
	console.log('Добавить класс');	
};

// Удаление класса у элемента
var removeClass = (elem,class_name)=>{	
	if( !elemExists(elem) ){
		console.log('Нет элемента');
		return false;		
	}
	elem.classList.remove(class_name);
	if(elem.classList.length<=0){elem.removeAttribute('class');}	
	console.log('Убрать класс');
};

document.addEventListener("DOMContentLoaded", () => {

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh',vh+'px');

//window.addEventListener("contextmenu", e => e.preventDefault());
initPage();

});

var browser_history = [];

//addEventListener("popstate",function(e){
addEventListener("popstate",function(){
	let oldURL =  window.location.pathname + window.location.search;
    update_content(window.location.protocol + "//" + window.location.host+oldURL);
	            let selected_true = false;
				console.log('popstate');
				console.log(888);
				for (let y = 0; y < nav_btns.length; y++){					
					if(nav_btns[y].getAttribute('href')!=oldURL.split('?')[0]){
						removeClass(nav_btns[y],selected_link_class);						
					}else{
						console.log(123);
						addClass(nav_btns[y],selected_link_class);
						selected_true = true;
					}
				}
				if(!selected_true){
				    let sfl = document.querySelectorAll('nav a[href="'+oldURL.split('?')[0]+'"]');
				    if(sfl.length>0){
						console.log(123);
						for(let i=0;i<sfl.length;i++){
							addClass(sfl[i],selected_link_class);
						}
				    }
				}
	
},false);


const content_block = document.querySelector('.inner-content-body');

function update_content(link_href,back){
	console.clear();
	const loading_block = document.getElementById('loading-block');
		  removeClass(loading_block,'hidden');
	
	const url = new URL(link_href);				
		  url.searchParams.append('GetMainContentOnly', true);
		  
	const newUrl = url.toString();	
	fetch( newUrl ,{headers: {'credentials': 'same-origin','X-Requested-With': 'XMLHttpRequest'}} )
				//.then((resp) => resp.text())
				.then((resp) =>{
						//if(resp.status && resp.status!=404){
						if(resp.status){
							//resp.text();
						
							//let x_page_title = resp.headers.get("X-Page-Title");							
							//if (x_page_title){ 
							//x_page_title = decodeURIComponent(escape(window.atob(x_page_title)));
							//return ({data:resp_data,p_title:x_page_title});
							//}
							return resp.text();
							
						}else{
							return '404 ошибочка';
							}
						})
				.then(function(data){
					let content_block = document.querySelector('.inner-content-body');
						 content_block.innerHTML = data;
						
    					// перезапись script из контента в dom
						content_block.querySelectorAll('script').forEach(function(content_script){
							let scriptElement = document.createElement('script');
									scriptElement.textContent =  content_script.textContent;
									
									content_script.parentNode.replaceChild(scriptElement, content_script);
									
									//content_block.appendChild(scriptElement);
									//content_script.remove();
						});

						window.scrollTo(0, 0);
						if(back){
							browser_history.push(link_href);
							//history.pushState(browser_history, null, link_href);
							history.pushState(null, "", link_href);
						}
						
						const newTitleText = content_block.querySelector('#NewTitleTextByOnlyMain');
						const newParentsUrls = content_block.querySelector('#NewParentsUrlsByOnlyMain');
						const reloadpage = content_block.querySelector('#ReloadPageByOnlyMain');
						if(reloadpage){
							document.location.reload();
						}
						
						if(newTitleText){
							console.log('New-text-Title:'+newTitleText.value);
						    document.title = newTitleText.value;
						}
						
						let parentsUrls;
						if(newParentsUrls){
							parentsUrls = JSON.parse(  (newParentsUrls.value) );
							console.log( parentsUrls );
							console.log( Array.isArray(parentsUrls) );
						}
						
						console.log(999);
						const nav_btns = document.querySelectorAll(nav_links_parent+' a');
						const realurl =  decodeURI( (window.location.pathname + window.location.search).split('?')[0] );
						for (let y = 0; y < nav_btns.length; y++){
						    //||  ( parentsUrls.find(element => element > realurl ) )
							if( (nav_btns[y].getAttribute('href') != realurl ) && (  Array.isArray(parentsUrls) && !Boolean(parentsUrls.find(element => element === nav_btns[y].getAttribute('href') ) ) )   ){
								console.log(987);
								console.log(realurl);
								removeClass(nav_btns[y],selected_link_class);
							}else{
								addClass(nav_btns[y],selected_link_class);
								selected_true = true;
							}
						}
						
						/*
						let sfl = document.querySelectorAll(nav_links_parent+' a[href="'+(window.location.pathname + window.location.search).split('?')[0]+'"]');						
						if(sfl.length>0){
							for(let i=0; i<sfl.length;i++){
								addClass(sfl[i],selected_link_class);
							}
							selected_true = true;
						}
						*/
						
						initPage(content_block);                        
						
						//addClass(loading_block,'hidden');
						setTimeout(function(){addClass(loading_block,'hidden');},1);
						
						if(document.querySelector('.wrapper')){
						document.querySelector('.wrapper').scrollTo( 0, 0 );
						}
						
						})
						.catch(function(error) {
							console.log(error);
							show_info('Не удалось загрузить страницу(',true);
							setTimeout(function(){addClass(loading_block,'hidden');},1);
						});
}

var LinksEventListener = function (e){
				const classNames = ['auth_b,reg_b','exit'];
				
				if( this.hasAttribute('download') ||
				(this.getAttribute('href') && this.getAttribute('href').indexOf('mailto:') !== -1) ||
				(this.getAttribute('href') && this.getAttribute('href').indexOf('tel:') !== -1)
				){return;}
				
				if( !classNames.some(className => this.classList.contains(className)) ){
				e.preventDefault();
				
				//if( this.closest(nav_links_parent) ){console.log('Ссылки в блоке навигации');addClass( this,selected_link_class);}
				
				/* MAILTO достать адрес
				if (this.getAttribute('href') && this.getAttribute('href').indexOf('mailto:') !== -1) {
				    window.open('mailto:' + emailAddress);
				    return false;
				}
				*/
				
				if( this.getAttribute('href') != '#'){
				const link_href = window.location.protocol + "//" + window.location.host+this.getAttribute('href');
				
					if(this.getAttribute('href').substr(0,1)=='#'){
						
						const anchor_block = this.getAttribute('href').substr(1);
						
							if(anchor_block){
								if(document.getElementById(anchor_block)){
									document.getElementById(anchor_block).scrollIntoView({behavior:'smooth',block: 'start'});
								}
							}
							return false;
					}
    				if( this.getAttribute('target') && this.getAttribute('target') == '_blank' ){
    				    window.open(link_href, '_blank');
    				}else{
						const nav_btns = document.querySelectorAll(nav_links_parent+' a');
						console.log(777);
						for (let y = 0; y < nav_btns.length; y++){						
							removeClass(nav_btns[y],selected_link_class);
						}
						/*
						let sfl = document.querySelectorAll('nav a[href="'+this.getAttribute('href').split('?')[0]+'"]');
						if(sfl.length>0){
							for(let i=0; i<sfl.length;i++){
								addClass(sfl[i],selected_link_class);
							}
							selected_true = true;
						}
						*/
						let side_menu_button = document.getElementById('side-menu');
						    if(side_menu_button){
						        side_menu_button.checked = false;
						    }
						update_content(link_href,true);
    				}
				}
				//window.location.href = links[i].getAttribute('href');
}
			};

function link_event(links){
		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('click', LinksEventListener);
		}
}

/*
	for (let i = 0; i < nav_btns.length; i++){
		nav_btns[i].addEventListener('click',function(){
			
		});
	}
*/

const open_modal_btn = document.getElementById('open-modal-btn');
const close_modal_btn = document.getElementById('close-modal-btn');
const html = document.documentElement;
const modal_window = document.getElementById('modal-window');
const user_status = document.getElementById('user_acc_status') ? document.getElementById('user_acc_status').value : 0;
function closeModal(){
	if(modal_window.classList.contains('static_window')){return false;}
	html.style.top = '';
	html.style.overflow = '';		
	//html.style.position = '';
	modal_window.classList.add('hidden');
//	enableScroll();
}

if(open_modal_btn){
open_modal_btn.addEventListener('click',function(e){
	e.preventDefault();	
	let window_scrollY = window.scrollY;	
	html.style.top = '-'+window_scrollY;
	html.style.overflow = 'hidden';
	//html.style.position = 'fixed';
	//html.style.width = 'calc(100% - 17px)';	
	modal_window.classList.remove('hidden');
//	disableScroll();
});
}
close_modal_btn.addEventListener('click',function(e){
	e.preventDefault();
	closeModal();
});
modal_window.addEventListener('click',function(e){	
	//.contains(event.target)
	if(e.target==this){
		e.preventDefault();
		closeModal();
	}else{		
	//return false;
	}
});

//window.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        closeModal();
    }
};
