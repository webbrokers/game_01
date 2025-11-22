(function () {
    // Default configuration
    const defaults = {
        position: 'right', // 'left' or 'right'
        isActive: false,
        timer: 5, // seconds
        isBlinking: true,
        text: 'Вам подарок',
        buttons: [
            { text: 'Оформить', link: '#' },
            { text: 'Оформить', link: '#' },
            { text: 'Оформить', link: '#' },
            { text: 'Оформить', link: '#' }
        ]
    };

    // Merge user config with defaults
    const config = Object.assign({}, defaults, window.GiftWidgetConfig || {});

    // Styles
    const styles = `
        .gw-widget-container {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9999;
            font-family: 'Arial', sans-serif;
        }
        .gw-widget-container.gw-left { left: 0; }
        .gw-widget-container.gw-right { right: 0; }

        .gw-bookmark {
            background: linear-gradient(135deg, #ff4081, #d81b60);
            color: white;
            padding: 15px 10px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            border-radius: 0 0 10px 10px;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .gw-left .gw-bookmark {
            border-radius: 0 10px 10px 0;
        }
        .gw-right .gw-bookmark {
            border-radius: 10px 0 0 10px;
        }

        .gw-bookmark:hover {
            transform: scale(1.05);
        }

        .gw-blink {
            animation: gw-pulse 2s infinite;
        }

        @keyframes gw-pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 64, 129, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(255, 64, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 64, 129, 0); }
        }

        /* Popup Overlay */
        .gw-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: none;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .gw-overlay.gw-visible {
            display: flex;
            opacity: 1;
        }

        /* Popup Content */
        .gw-popup {
            background: white;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 400px;
            position: relative;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .gw-overlay.gw-visible .gw-popup {
            transform: scale(1);
        }

        .gw-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            line-height: 1;
        }
        .gw-close:hover { color: #333; }

        .gw-title {
            font-size: 22px;
            margin-bottom: 20px;
            color: #333;
            font-weight: bold;
        }

        .gw-buttons-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .gw-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            transition: background 0.2s;
            display: block;
        }
        .gw-btn:hover {
            background: #45a049;
        }
    `;

    // Inject Styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create Widget Elements
    const container = document.createElement('div');
    container.className = `gw-widget-container gw-${config.position}`;

    const bookmark = document.createElement('div');
    bookmark.className = 'gw-bookmark';
    if (config.isBlinking) bookmark.classList.add('gw-blink');
    bookmark.innerText = config.text;

    container.appendChild(bookmark);
    document.body.appendChild(container);

    // Create Popup Elements
    const overlay = document.createElement('div');
    overlay.className = 'gw-overlay';

    const popup = document.createElement('div');
    popup.className = 'gw-popup';

    const closeBtn = document.createElement('div');
    closeBtn.className = 'gw-close';
    closeBtn.innerHTML = '&times;';

    const title = document.createElement('div');
    title.className = 'gw-title';
    title.innerText = 'Ваш подарок!';

    const grid = document.createElement('div');
    grid.className = 'gw-buttons-grid';

    config.buttons.forEach(btnConfig => {
        const btn = document.createElement('a');
        btn.className = 'gw-btn';
        btn.href = btnConfig.link;
        btn.innerText = btnConfig.text;
        btn.target = '_blank';
        grid.appendChild(btn);
    });

    popup.appendChild(closeBtn);
    popup.appendChild(title);
    popup.appendChild(grid);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Logic
    function openPopup() {
        overlay.classList.add('gw-visible');
    }

    function closePopup() {
        overlay.classList.remove('gw-visible');
    }

    bookmark.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });

    // Auto open
    if (config.isActive && config.timer > 0) {
        setTimeout(openPopup, config.timer * 1000);
    }
})();