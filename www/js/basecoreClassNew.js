class BaseCoreScript {
    static navLinksParent = 'nav';
    static selectedLinkClass = 'selected-link';
	
	browserHistory = [];

    constructor() {
        this.initElements();
        this.bindEvents();
        this.onDOMLoaded();
    }

    initElements() {
        this.openModalBtn = document.getElementById('open-modal-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.modalWindow = document.getElementById('modal-window');
        this.html = document.documentElement;
        this.infoBlock = document.getElementById('info-block');
    }

    onDOMLoaded() {
        document.addEventListener("DOMContentLoaded", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            this.initPage();
        });

        window.addEventListener("popstate", () => {
            this.updateContent(window.location.href);
        });
    }

    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static getCookie(name) {
        const match = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return match ? unescape(match[2]) : null;
    }

    showInfo(text, isError = false) {
        if (!this.infoBlock) {
            this.createInfoBlock();
        }
        this.displayInfo(text, isError);
    }

    createInfoBlock() {
        this.infoBlock = document.createElement('div');
        this.infoBlock.id = 'info-block';
        this.infoBlock.classList.add('info_block');
        document.body.appendChild(this.infoBlock);
    }

    displayInfo(text, isError) {
        this.infoBlock.classList.remove('show');
        setTimeout(() => {
            this.infoBlock.style.color = isError ? "red" : "#00ff1f";
            this.infoBlock.textContent = text;
            this.infoBlock.classList.add('show');
        }, 50);
    }

    elemExists(elem) {
        return Boolean(elem);
    }

    toggleClass(elem, className, action) {
        if (this.elemExists(elem)) {
            elem.classList[action](className);
        }
    }

    adjustTextareaHeight(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 122) + 'px';
        textarea.style.overflowY = textarea.scrollHeight <= 122 ? 'hidden' : 'auto';
    }

    initPage(page = document) {
        const forms = page.getElementsByTagName('form');
        this.initFormButtons(forms);

        const textareas = page.getElementsByTagName('textarea');
        this.initTextareas(textareas);

        const links = page.getElementsByTagName('a');
        this.initLinkEvents(links);
    }

    initFormButtons(forms) {
        [...forms].forEach(form => form.addEventListener('submit', this.handleFormSubmit.bind(this)));
    }

    initTextareas(textareas) {
        [...textareas].forEach(textarea => {
            this.adjustTextareaHeight(textarea);
            textarea.addEventListener("input", () => this.adjustTextareaHeight(textarea));
        });
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const formData = this.createFormData(e.target);
        const url = e.target.getAttribute('action') || window.location.href;
        const method = e.target.getAttribute('method') || 'GET';

        await this.ajaxSend(formData, url, e.target.querySelector('button'), method);
    }

    createFormData(form) {
        const formData = new FormData(form);
        const fileField = form.querySelector('input[type="file"]');

        if (fileField) {
            formData.append('afile', fileField.files[0]);
            if (fileField.dataset.action) {
                formData.append(fileField.dataset.action, true);
            }
        }
        return formData;
    }

    async ajaxSend(formData, formUrl, btn, method) {
        const url = new URL(formUrl, window.location.origin);
        const headers = { 'credentials': 'same-origin', 'X-Requested-With': 'XMLHttpRequest' };

		if (method === 'GET') {
			let params = new URLSearchParams(window.location.search);
			
			formData.forEach((value, key) => {
				params.set(key, value);
			});
			window.history.pushState(this.browserHistory, null, new URL(window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString()));
		}
		
        if (!formData.has('afile')) {
            formData = JSON.stringify(Object.fromEntries(formData));
        }

        const fetchParams = {
            method,
            headers,
            ...(method === 'GET' ? {} : { body: formData }),
        };

        try {
            const response = await fetch(url, fetchParams);
            if (!response.ok) throw new Error('Ошибка');
            const data = await response.json();
            this.handleResponse(data, btn);
        } catch (error) {
            console.error("Ошибка AJAX:", error);
            this.showInfo('Ошибка', true);
            setTimeout(() => this.toggleClass(btn, 'loading_b', 'remove'), 500);
        }
    }

    handleResponse(response, btn) {
        if (!response.success) {
            this.handleErrorResponse(response, btn);
            return;
        }

        this.handleActionResponse(response);
        this.showInfo('Успешно!');
        setTimeout(() => this.toggleClass(btn, 'loading_b', 'remove'), 500);
    }

    handleActionResponse(response) {
        switch (response.action) {
            case 'redirect':
                window.location.href = response.uri;
                break;
            case 'function':
                const func = window[response.fname] || functions[response.fname];
                if (typeof func === "function") {
                    func(response.fvalue);
                }
                break;
            case 'updatedata':
                if (response.data_data) {
                    this.updateData(response.data_data);
                }
                break;
            default:
                this.resetFileInput();
                break;
        }
    }

    resetFileInput() {
        const fileInput = document.querySelector('input[type=file]');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    handleErrorResponse(response, btn) {
        this.toggleClass(btn, 'loading_b', 'remove');
        const errorText = response.error ? response.error_text : 'Неизвестная ошибка.';
        this.showInfo(errorText, true);
        setTimeout(() => this.toggleClass(btn, 'loading_b', 'remove'), 500);
    }

    linkEvent(e) {
		e.preventDefault();
        const target = e.currentTarget;

        if (baseCore.shouldIgnoreLinkEvent(target)) {
            return;
        }

        e.preventDefault();
        const linkHref = target.getAttribute('href');

        if (linkHref.startsWith('#')) {
            baseCore.scrollToAnchor(linkHref);
            return;
        }

        if (target.target === '_blank') {
            window.open(linkHref, '_blank');
        } else {
            baseCore.updateContent(linkHref, true);
        }
    }

    shouldIgnoreLinkEvent(target) {
        return target.classList.contains('auth_b') || 
               target.classList.contains('reg_b') || 
               target.classList.contains('exit') || 
               target.hasAttribute('download') || 
               target.href.includes('mailto:') || 
               target.href.includes('tel:');
    }

    scrollToAnchor(linkHref) {
        const anchorId = linkHref.slice(1);
        const anchor = document.getElementById(anchorId);
        if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    initLinkEvents(links) {
        [...links].forEach(link => link.addEventListener('click', (e) => this.linkEvent.call(link, e)));
    }

    closeModal() {
        if (!this.modalWindow.classList.contains('static_window')) {
            this.html.style.top = '';
            this.html.style.overflow = '';
            this.modalWindow.classList.add('hidden');
        }
    }

    bindEvents() {
        if (this.openModalBtn) {
            this.openModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.html.style.top = `-${window.scrollY}px`;
                this.html.style.overflow = 'hidden';
                this.modalWindow.classList.remove('hidden');
            });
        }

        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });

            this.modalWindow.addEventListener('click', (e) => {
                if (e.target === this.modalWindow) this.closeModal();
            });
        }

        document.onkeydown = (evt) => {
            if (evt.key === "Escape" || evt.keyCode === 27) {
                this.closeModal();
            }
        };
    }

    updateContent(linkHref, back) {
        console.clear();
        const loadingBlock = document.getElementById('loading-block');
        this.toggleClass(loadingBlock, 'hidden', 'remove');

        const navLinks = [...document.querySelectorAll(`${BaseCoreScript.navLinksParent} a`)];
        navLinks.forEach(link => this.toggleClass(link, BaseCoreScript.selectedLinkClass, 'remove'));

        const normalizedLinkHref = new URL(linkHref, window.location.origin).href;
        const currentLink = navLinks.find(link => new URL(link.href, window.location.origin).href === normalizedLinkHref);
        if (currentLink) this.toggleClass(currentLink, BaseCoreScript.selectedLinkClass, 'add');

        const url = new URL(linkHref, window.location.origin);
        url.searchParams.append('GetMainContentOnly', true);

        fetch(url, { headers: { 'credentials': 'same-origin', 'X-Requested-With': 'XMLHttpRequest' } })
            .then(response => {
                if (!response.ok) throw new Error('404 Not Found');
                return response.text();
            })
            .then(data => this.handleContentUpdate(data, linkHref, back, loadingBlock))
            .catch(error => {
                console.error("Ошибка при обновлении контента:", error);
                this.showInfo('Не удалось загрузить страницу(', true);
                this.toggleClass(loadingBlock, 'hidden', 'add');
            });
    }

    handleContentUpdate(data, linkHref, back, loadingBlock) {
        const contentBlock = document.querySelector('.inner-content-body');
        contentBlock.innerHTML = data;

        contentBlock.querySelectorAll('script').forEach(contentScript => {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = contentScript.textContent;
            contentScript.parentNode.replaceChild(scriptElement, contentScript);
        });

        window.scrollTo(0, 0);
        if (back) {
            history.pushState(null, "", linkHref);
        }

        const newTitleText = contentBlock.querySelector('#NewTitleTextByOnlyMain');
        if (newTitleText) {
            document.title = newTitleText.value;
        }

        const reloadPage = contentBlock.querySelector('#ReloadPageByOnlyMain');
        if (reloadPage) {
            document.location.reload();
        }

        this.initPage(contentBlock);
        this.toggleClass(loadingBlock, 'hidden', 'add');
    }
}

// Initialize the script
const baseCore = new BaseCoreScript();