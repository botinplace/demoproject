/* jshint esversion: 6 */
class BaseCoreScript {
    // Constants
    static navLinksParent = 'nav';
    static selectedLinkClass = 'selected-link';

    constructor() {
        // Initialize elements
        this.openModalBtn = document.getElementById('open-modal-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.modalWindow = document.getElementById('modal-window');
        this.html = document.documentElement;
        this.infoBlock = document.getElementById('info-block');

        // Bind events
        this.bindEvents();		

        // Initialize page on load
        document.addEventListener("DOMContentLoaded", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            this.initPage();
        });

        // Handle back button in history
        window.addEventListener("popstate", () => {
            this.updateContent(window.location.href);
        });
		
		this.bindEvents = this.bindEvents.bind(this);
    }

    // Utility Functions
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static getCookie(name) {
        const match = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return match ? unescape(match[2]) : null;
    }

    showInfo(text, isError = false) {
        if (!this.infoBlock) {
            const newInfoBlock = document.createElement('div');
            newInfoBlock.id = 'info-block';
            newInfoBlock.classList.add('info_block');
            document.body.appendChild(newInfoBlock);
            this.infoBlock = document.getElementById('info-block');
        }
        this.infoBlock.classList.remove('show');
        setTimeout(() => {
            this.infoBlock.style.color = isError ? "red" : "#00ff1f";
            this.infoBlock.textContent = text;
            this.infoBlock.classList.add('show');
        }, 50);
		return;
    }

    // Element Manipulation
    elemExists(elem) {
        return Boolean(elem);
    }

    addClass(elem, className) {
        if (this.elemExists(elem)) {
            elem.classList.add(className);
        }
    }

    removeClass(elem, className) {
        if (this.elemExists(elem)) {
            elem.classList.remove(className);
            if (elem.classList.length === 0) {
                elem.removeAttribute('class');
            }
        }
    }

    // Height Adjustment for Textareas
    adjustTextareaHeight(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight < 122) ? 
            ((textarea.scrollHeight <= 46) ? "auto" : textarea.scrollHeight + 'px') : 
            "122px";
        textarea.style.overflowY = (textarea.scrollHeight < 122) ? 'hidden' : 'auto';
    }

    // Page Initialization
    initPage(page = document) {
        const forms = page.getElementsByTagName('form');
        if (forms) this.initFormButtons(forms);

        const textareas = page.getElementsByTagName('textarea');
        if (textareas) this.initTextareas(textareas);

        const links = page.getElementsByTagName('a');
        if (links) this.initLinkEvents(links);
    }

    // Initialize Form Buttons
    initFormButtons(forms) {
        for (const form of forms) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    // Initialize Text Areas
    initTextareas(textareas) {
        for (const textarea of textareas) {
            this.adjustTextareaHeight(textarea);
            textarea.addEventListener("input", () => this.adjustTextareaHeight(textarea));
        }
    }

    // Handle Form Submission
    async handleFormSubmit(e) {
        e.preventDefault();

        const button = this.querySelector('button');
        this.addClass(button, 'loading_b');

        const fileField = this.querySelector('input[type="file"]');
        let formData;

        if (fileField) {
            formData = new FormData();
            formData.append('afile', fileField.files[0]);
            if (fileField.dataset.action) {
                formData.append(fileField.dataset.action, true);
            }
        } else {
            formData = new FormData(this);
        }

        const url = this.getAttribute('action') || window.location.href;
        const method = this.getAttribute('method') || 'GET';
        await this.ajaxSend(formData, url, button, method);
    }

    // AJAX send function
    async ajaxSend(formData, formUrl, btn, method) {
        const url = new URL(formUrl, window.location.origin);
        const headers = { 'credentials': 'same-origin', 'X-Requested-With': 'XMLHttpRequest' };

        if (formData.has('afile')) {
            headers['Content-Type'] = undefined; // let the browser set it
        } else {
            formData = JSON.stringify(Object.fromEntries(formData));
        }

        const fetchParams = {
            method,
            headers,
            body: formData,
        };

        try {
            const response = await fetch(url, fetchParams);
            if (!response.ok) throw new Error('Ошибка');
            const data = await response.json();
            this.handleResponse(data, btn);
        } catch (error) {
            console.error(error);
            this.showInfo('Ошибка', true);
            setTimeout(() => this.removeClass(btn, 'loading_b'), 500);
        }
    }

    // Handle AJAX Response
    handleResponse(response, btn) {
        if (!response.success) {
            return this.handleErrorResponse(response, btn);
        }

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
                if (document.querySelector('input[type=file]')) {
                    document.querySelector('input[type=file]').value = '';
                }
                break;
        }

        this.showInfo('Успешно!');
        setTimeout(() => this.removeClass(btn, 'loading_b'), 500);
    }

    // Handle Error Responses
    handleErrorResponse(response, btn) {
        this.removeClass(btn, 'loading_b');
        if (response.error) {
            this.showInfo(response.error_text, true);
        } else {
            this.showInfo('...', true);
        }
        setTimeout(() => this.removeClass(btn, 'loading_b'), 500);
    }

    // Link Event Handler
    linkEvent(e) {
		
        if (this.classList.contains('auth_b') || this.classList.contains('reg_b') || this.classList.contains('exit')) {
            return;
        }

        if (this.hasAttribute('download') || this.href.includes('mailto:') || this.href.includes('tel:')) {
            return;
        }

        e.preventDefault();
        const linkHref = this.getAttribute('href');

        // Handle URL Hash
        if (linkHref.startsWith('#')) {
            const anchorId = linkHref.slice(1);
            const anchor = document.getElementById(anchorId);
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        if (this.target === '_blank') {
            window.open(linkHref, '_blank');
        } else {
            // ТУТ this.updateContent не будет работать
			baseCore.updateContent(linkHref, true);
			
        }
    }

    // Initialize Link Events
    initLinkEvents(links) {
        for (const link of links) {
            //link.addEventListener('click', this.linkEvent.bind(link));			
			link.addEventListener('click', (e) => this.linkEvent.call(link, e));
        }
    }

    // Modal Functions
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

        // Escape Key Handler
        document.onkeydown = (evt) => {
            if (evt.key === "Escape" || evt.keyCode === 27) {
                this.closeModal();
            }
        };
    }

    // Content Update Function
    updateContent(linkHref, back) {
        console.clear();
        const loadingBlock = document.getElementById('loading-block');
        this.removeClass(loadingBlock, 'hidden');

        // Получаем все ссылки навигации
        const navLinks = document.querySelectorAll(`${BaseCoreScript.navLinksParent} a`);

        // Удаляем класс "selected-link" у всех ссылок
        navLinks.forEach(link => {
            this.removeClass(link, BaseCoreScript.selectedLinkClass);
        });

        // Найти текущую ссылку
        const normalizedLinkHref = new URL(linkHref, window.location.origin).href;
        const currentLink = Array.from(navLinks).find(link => new URL(link.href, window.location.origin).href === normalizedLinkHref);

        if (currentLink) {
            this.addClass(currentLink, BaseCoreScript.selectedLinkClass);
        }

        const url = new URL(linkHref, window.location.origin);
        url.searchParams.append('GetMainContentOnly', true);

        fetch(url, { headers: { 'credentials': 'same-origin', 'X-Requested-With': 'XMLHttpRequest' } })
            .then(response => {
                if (!response.ok) throw new Error('404 Not Found');
                return response.text();
            })
            .then(data => {
                const contentBlock = document.querySelector('.inner-content-body');
                contentBlock.innerHTML = data;

                // Повторная оценка скриптов
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

                setTimeout(() => this.addClass(loadingBlock, 'hidden'), 1);
            })
            .catch(error => {
                console.error(error);
                this.showInfo('Не удалось загрузить страницу(', true);
                setTimeout(() => this.addClass(loadingBlock, 'hidden'), 1);
            });
    }
}

// Initialize the script
const baseCore = new BaseCoreScript();