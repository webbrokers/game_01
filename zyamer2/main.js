// Главная логика страницы zyamer2/index.html
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    const offers = getOffers();

    if (!offers || offers.length === 0) {
        container.innerHTML = '<p>Нет доступных предложений.</p>';
        return;
    }

    container.innerHTML = offers.map(offer => `
    <article class="card" onclick="window.location.href='${offer.link}'" style="cursor: pointer;">
      <div class="logo"><img src="${offer.logo}" alt="Company Logo"></div>
      <div class="offer">${offer.amount}<br>${offer.term}</div>
      <div class="meta">
        <span>Сумма</span>
        <span>Срок</span>
      </div>
      <p class="note">${offer.badgeText}</p>
      <button class="cta-btn" type="button">ПОЛУЧИТЬ ДЕНЬГИ</button>
      <a class="info-link" href="#" aria-label="Подробнее о компании" onclick="event.stopPropagation();">
        <span class="info-icon">i</span> подробней
      </a>
    </article>
  `).join('');

    // Функция автоматической подстройки размера шрифта, если текст превышает 2 строки
    function adjustFontSizes() {
        const offerElements = document.querySelectorAll('.offer');
        offerElements.forEach(el => {
            let fontSize = 17; // Начальный размер шрифта
            el.style.fontSize = fontSize + 'px';

            const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight);
            const maxHeight = lineHeight * 2;

            while (el.offsetHeight > maxHeight + 2 && fontSize > 12) { // +2 буфер
                fontSize--;
                el.style.fontSize = fontSize + 'px';
            }
        });
    }

    // Запуск при загрузке и при изменении размера окна
    adjustFontSizes();
    window.addEventListener('resize', adjustFontSizes);

    // Загрузка пользовательских кодов из localStorage
    const customCode = localStorage.getItem('zaymer_codes');
    if (customCode) {
        const div = document.createElement('div');
        div.innerHTML = customCode;

        // Выполнение скриптов из внедренного кода
        Array.from(div.querySelectorAll('script')).forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            document.body.appendChild(newScript);
        });

        // Добавление не-скриптовых элементов
        while (div.firstChild) {
            if (div.firstChild.nodeName !== 'SCRIPT') {
                document.body.appendChild(div.firstChild);
            } else {
                div.removeChild(div.firstChild);
            }
        }
    }
});
