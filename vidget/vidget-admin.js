// Логика админ-панели виджета

const isActiveCheckbox = document.getElementById('isActive');
const timerGroup = document.getElementById('timerGroup');

isActiveCheckbox.addEventListener('change', () => {
    timerGroup.style.display = isActiveCheckbox.checked ? 'block' : 'none';
});

function generateCode() {
    const position = document.getElementById('position').value;
    const isActive = document.getElementById('isActive').checked;
    const timer = document.getElementById('timer').value;
    const isBlinking = document.getElementById('isBlinking').checked;
    const text = document.getElementById('text').value;

    const links = Array.from(document.querySelectorAll('.btn-link')).map(input => input.value);

    const config = {
        position,
        isActive,
        timer: parseInt(timer),
        isBlinking,
        text,
        buttons: links.map(link => ({ text: 'Оформить', link }))
    };

    const scriptUrl = 'vidget/widget.js'; // Относительный путь для текущего сайта

    const code = `
<!-- Gift Widget Start -->
<script>
    window.GiftWidgetConfig = ${JSON.stringify(config, null, 4)};
<\/script>
<script src="${scriptUrl}"><\/script>
<!-- Gift Widget End -->
    `.trim();

    document.getElementById('outputCode').value = code;
}
