/**
 * Комбекер - Скрипт перехвата кликов и перенаправления
 * 
 * Автоматически перехватывает клики по кнопкам "Оформить карту",
 * открывает оффер в новом окне и перенаправляет текущую вкладку
 */

(function () {
    'use strict';

    // Конфигурация скрипта
    const config = {
        // URL страницы для перенаправления текущей вкладки
        redirectUrl: 'zyamer2/index.html',

        // URL страницы с оффером (открывается в новом окне)
        offerPageUrl: 'comebacker/offer-link.html',

        // Селекторы кнопок для перехвата
        buttonSelectors: [
            'a[href*="оформить"]',
            'button:contains("Оформить")',
            '.offer-button',
            'a.btn',
            'button.btn'
        ],

        // Задержка перед перенаправлением (мс)
        redirectDelay: 100,

        // Включить/выключить функционал
        enabled: true
    };

    /**
     * Инициализация скрипта
     */
    function init() {
        if (!config.enabled) {
            console.log('[Комбекер] Скрипт отключен');
            return;
        }

        console.log('[Комбекер] Инициализация...');
        attachEventListeners();
    }

    /**
     * Подключение обработчиков событий к кнопкам
     */
    function attachEventListeners() {
        // Находим все кнопки "Оформить карту"
        const buttons = findOfferButtons();

        console.log(`[Комбекер] Найдено кнопок: ${buttons.length}`);

        buttons.forEach((button, index) => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Предотвращаем стандартное поведение
                event.stopPropagation();

                console.log(`[Комбекер] Клик по кнопке #${index + 1}`);

                // Получаем оригинальную ссылку из кнопки
                const originalUrl = button.href || button.getAttribute('data-url') || '#';

                // Обрабатываем клик
                handleButtonClick(originalUrl);
            });
        });
    }

    /**
     * Поиск всех кнопок "Оформить карту" на странице
     */
    function findOfferButtons() {
        const buttons = [];

        // Ищем по тексту кнопки
        const allLinks = document.querySelectorAll('a, button');
        allLinks.forEach(element => {
            const text = element.textContent.trim().toLowerCase();
            if (text.includes('оформить') || text.includes('получить')) {
                buttons.push(element);
            }
        });

        // Дополнительно ищем по классам
        const buttonsByClass = document.querySelectorAll('.btn, .button, .offer-btn');
        buttonsByClass.forEach(btn => {
            if (!buttons.includes(btn)) {
                buttons.push(btn);
            }
        });

        return buttons;
    }

    /**
     * Обработка клика по кнопке
     */
    function handleButtonClick(originalUrl) {
        console.log(`[Комбекер] Оригинальный URL: ${originalUrl}`);

        // Формируем URL страницы оффера с параметрами
        const offerUrl = `${config.offerPageUrl}?url=${encodeURIComponent(originalUrl)}`;

        // Открываем оффер в новом окне
        const newWindow = window.open(offerUrl, '_blank', 'noopener,noreferrer');

        if (newWindow) {
            console.log('[Комбекер] Новое окно открыто');
        } else {
            console.warn('[Комбекер] Не удалось открыть новое окно (возможно заблокировано браузером)');
        }

        // Перенаправляем текущую вкладку с небольшой задержкой
        setTimeout(() => {
            console.log(`[Комбекер] Перенаправление на: ${config.redirectUrl}`);
            window.location.href = config.redirectUrl;
        }, config.redirectDelay);
    }

    /**
     * Публичный API для настройки
     */
    window.Comebacker = {
        config: config,

        // Метод для изменения конфигурации
        configure: function (options) {
            Object.assign(config, options);
            console.log('[Комбекер] Конфигурация обновлена', config);
        },

        // Метод для повторной инициализации
        reinit: function () {
            init();
        }
    };

    // Запускаем скрипт после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
