//
const show_add_buttons = document.getElementById('show_add_buttons');
show_add_buttons.addEventListener('click',function(e){
    e.preventDefault();
        let add_buttons = document.querySelectorAll('.add_page');
        add_buttons.forEach(function(element) { 
            element.classList.toggle('hidden');
        });
});
// Функция для копирования содержимого из одного элемента в другой
function copyContent(from, to) {
    // Копируем HTML содержимое
    document.getElementById(to).value = document.getElementById(from).innerHTML;
    console.log(document.getElementById(to).value);
    return true;
}

// Функция для коррекции размера текстовой области в соответствии с ее содержимым
function fixTextareaSize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 2 + "px";
}

// Функция для очистки HTML содержимого от лишних атрибутов и стилей
function cleanContent(html) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Удаляем лишние атрибуты и стили у всех элементов
    var allElements = tempDiv.querySelectorAll('*');
	const attributesToRemove = ['class','style','align','name','clear','onafterprint','onbeforeprint','onbeforeunload','onerror','onhashchange','onload','onmessage','onoffline','ononline','onpagehide','onpageshow','onpopstate','onresize','onstorage','onunload','onblur','onchange','oncontextmenu','onfocus','oninput','oninvalid','onreset','onsearch','onselect','onsubmit','ontouchstart','onkeydown','onkeypress','onkeyup','onclick','ondblclick','onmousedown','onmousemove','onmouseout','onmouseover','onmouseup','onmousewheel','onwheel','ondrag','ondragend','ondragenter','ondragleave','ondragover','ondragstart','ondrop','onscroll','oncopy','oncut','onpaste','onabort','oncanplay','oncanplaythrough','oncuechange','ondurationchange','onemptied','onended','onloadeddata','onloadedmetadata','onloadstart','onpause','onplay','onplaying','onprogress','onratechange','onseeked','onseeking','onstalled','onsuspend','ontimeupdate','onvolumechange','onwaiting','onshow','ontoggle'];
    allElements.forEach(function(element) {
        attributesToRemove.forEach(function(attribute) {
            element.removeAttribute(attribute);
        });
    });

    var emptyOTags = tempDiv.getElementsByTagName('o:p');
    for (let i = emptyOTags.length - 1; i >= 0; i--) {
        var oTag = emptyOTags[i];
        if (!oTag.textContent.trim()) {
            oTag.parentNode.removeChild(oTag);
        }
    }

    emptyOTags = tempDiv.getElementsByTagName('*');
    for (let i = emptyOTags.length - 1; i >= 0; i--) {
        var oTag = emptyOTags[i];
        if (!oTag.textContent.trim()) {
            oTag.parentNode.removeChild(oTag);
        }
    }

	
	// Удаляем комментарии
	const regex = /<!--[\s\S]*?-->/g;
    // Заменяем все вхождения на пустую строку
    let resultDiv = tempDiv.innerHTML.replace(regex, '');

    // Возвращаем очищенное HTML содержимое
	return resultDiv;
}

// Основная функция, вызываемая после загрузки DOM
DOMContentLoaded.version = "1.2.6";
function DOMContentLoaded() { "use strict"; var ael = 'addEventListener', rel = 'removeEventListener', aev = 'attachEvent', dev = 'detachEvent'; var alreadyRun = false, funcs = arguments; function type(obj) { return (obj === null) ? 'null' : Object.prototype.toString.call(obj).slice(8,-1).toLowerCase() } function microtime() { return + new Date() } var jscript_version = Number( new Function("/*@cc_on return @_jscript_version; @*\/")() ) || NaN; if (document.readyState === 'complete') { ready(null); return; } if (jscript_version < 9) { doIEScrollCheck(); return; } if (document[ael]) { document[ael]("DOMContentLoaded", ready, false); window[ael]("load", ready, false); } else if (aev in window) { window[aev]('onload', ready); } else { addOnload(ready); } function addOnload(fn) { var prev = window.onload; if ( type( addOnload.queue ) !== 'array') { addOnload.queue = []; if ( type(prev) === 'function') { addOnload.queue.push( prev ); } } if (typeof fn === 'function') { addOnload.queue.push(fn) } window.onload = function() { for (var i = 0; i < addOnload.queue.length; i++) { addOnload.queue[i]() } }; } function dequeueOnload(fn) { var q = addOnload.queue, i = 0; if (type( q ) === 'array') { for (; i < q.length; i++) { ;;(fn === q[i]) ? q.splice(i, 1) : 0; } } } function ready(ev) { if (alreadyRun) {return} alreadyRun = true; var readyTime = microtime(); detach(); for (var i=0; i < funcs.length; i++) {  var func = funcs[i]; if (type(func) === 'function') { func.call(document, { 'readyTime': (ev === null ? null : readyTime), 'funcExecuteTime': microtime() }, func); } } } function detach() { if (document[rel]) { document[rel]("DOMContentLoaded", ready); window[rel]("load", ready); } else if (dev in window) { window[dev]("onload", ready); } else { dequeueOnload(ready); } } function doIEScrollCheck() { if ( window.frameElement ) { try { window.attachEvent("onload", ready); } catch (e) { } return; } try { document.documentElement.doScroll('left'); } catch(error) { setTimeout(function() { (document.readyState === 'complete') ? ready() : doIEScrollCheck(); }, 50); return; } ready(); } }
DOMContentLoaded(function(e){
	
    var textarea = document.getElementById('page_content'),
        contentEditableBlock = document.getElementById('content_edit_block');
    
    // Добавляем обработчик события для автоматической коррекции размера текстовой области
    textarea.addEventListener('input', function(e) {
        fixTextareaSize(e.target);
    });
    fixTextareaSize(textarea);
    textarea.style.display = 'none';

    // Обработчик события вставки, предотвращающий стандартное поведение и очищающий вставляемый контент
	contentEditableBlock.addEventListener('paste', function(e) {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html');
    
    // Очищаем вставляемое HTML содержимое от лишних атрибутов и стилей
    const cleanedContent = cleanContent(pastedData);
    
    // Вставляем очищенное HTML содержимое
    document.execCommand('insertHTML', false, cleanedContent);
	});
    
    // Добавляем обработчики событий для отслеживания активации и деактивации блока
    contentEditableBlock.addEventListener("blur", () => {
        console.log("Блок потерял фокус");
    });

    contentEditableBlock.addEventListener("focus", () => {
        console.log("Блок активирован");
    });
	
	
});