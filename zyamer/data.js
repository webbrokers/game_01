/**
 * Data Management Module
 * Handles all interactions with localStorage for the product showcase.
 */

const DB_KEY = 'product_showcase_db';

const DataManager = {
    getAll: function () {
        const storedData = localStorage.getItem(DB_KEY);
        if (storedData) {
            return JSON.parse(storedData);
        }
        // Initial data matching the reference site
        const initialData = [
            {
                id: 1,
                name: 'MoneyMan',
                amountTo: 80000,
                term: 'до 18 недель',
                description: 'Ставка от 0%',
                logo: 'logos/moneyman.png',
                link: 'https://moneyman.ru'
            },
            {
                id: 2,
                name: 'СрочноДеньги',
                amountTo: 100000,
                term: 'до 180 дней',
                description: 'от 18 до 65 лет и от 0,1% в день',
                logo: 'logos/srochnodengi.png',
                link: 'https://srochnodengi.ru'
            },
            {
                id: 3,
                name: 'Вебзайм',
                amountTo: 30000,
                term: 'до 30 дней',
                description: 'Первый займ бесплатно',
                logo: 'logos/webzaim.png',
                link: 'https://web-zaim.ru'
            },
            {
                id: 4,
                name: 'OneClickMoney',
                amountTo: 30000,
                term: 'до 60 дней',
                description: 'Без отказа',
                logo: 'logos/oneclickmoney.png',
                link: 'https://oneclickmoney.ru'
            },
            {
                id: 5,
                name: 'еКапуста',
                amountTo: 30000,
                term: 'до 21 дня',
                description: 'Мгновенный перевод',
                logo: 'logos/ekapusta.png',
                link: 'https://ekapusta.com'
            },
            {
                id: 6,
                name: 'Kviku',
                amountTo: 100000,
                term: 'до 12 мес',
                description: 'Виртуальная карта',
                logo: 'logos/kviku.png',
                link: 'https://kviku.ru'
            },
            {
                id: 7,
                name: 'ФинУслуги',
                amountTo: 100000,
                term: 'до 365 дней',
                description: 'Ставки банков',
                logo: 'logos/finuslugi.png',
                link: 'https://finuslugi.ru'
            },
            {
                id: 8,
                name: 'Зарубас',
                amountTo: 50000,
                term: 'до 30 дней',
                description: 'Быстрое решение',
                logo: 'logos/zarubas.svg',
                link: '#'
            },
            {
                id: 9,
                name: 'Турбозайм',
                amountTo: 50000,
                term: 'до 24 недель',
                description: 'Мгновенный перевод',
                logo: 'logos/turbozaim.svg',
                link: 'https://turbozaim.ru'
            },
            {
                id: 10,
                name: 'Zaymigo',
                amountTo: 70000,
                term: 'до 20 недель',
                description: 'Высокий процент одобрения',
                logo: 'logos/zaymigo.svg',
                link: 'https://zaymigo.com'
            },
            {
                id: 11,
                name: 'Vivus',
                amountTo: 29000,
                term: 'до 7 дней',
                description: 'Льготный период 7 дней',
                logo: 'logos/vivus.svg',
                link: 'https://www.vivus.ru'
            },
            {
                id: 12,
                name: 'Lime',
                amountTo: 70000,
                term: 'до 24 недель',
                description: 'Тариф VIP',
                logo: 'logos/lime.svg',
                link: 'https://www.lime-zaim.ru'
            },
            {
                id: 13,
                name: 'Webbankir',
                amountTo: 50000,
                term: 'до 30 дней',
                description: 'Без процентов',
                logo: 'logos/webbankir.svg',
                link: '#'
            },
            {
                id: 14,
                name: 'JoyMoney',
                amountTo: 60000,
                term: 'до 18 недель',
                description: 'Нужен только паспорт',
                logo: 'logos/joymoney.svg',
                link: '#'
            },
            {
                id: 15,
                name: 'PayPS',
                amountTo: 15000,
                term: 'до 25 дней',
                description: 'Быстрое решение',
                logo: 'logos/payps.svg',
                link: '#'
            },
            {
                id: 16,
                name: 'CashToYou',
                amountTo: 30000,
                term: 'до 21 дня',
                description: 'На любые цели',
                logo: 'logos/cashtoyou.svg',
                link: '#'
            },
            {
                id: 17,
                name: 'Kredito24',
                amountTo: 30000,
                term: 'до 30 дней',
                description: 'Полностью онлайн',
                logo: 'logos/kredito24.svg',
                link: '#'
            },
            {
                id: 18,
                name: 'SmartCredit',
                amountTo: 14000,
                term: 'до 30 дней',
                description: 'Умный кредит',
                logo: 'logos/smartcredit.svg',
                link: '#'
            },
            {
                id: 19,
                name: 'CreditPlus',
                amountTo: 30000,
                term: 'до 30 дней',
                description: 'Кэшбэк до 5%',
                logo: 'logos/creditplus.svg',
                link: '#'
            },
            {
                id: 20,
                name: 'DoZarplati',
                amountTo: 100000,
                term: 'до 1 года',
                description: 'Минимум документов',
                logo: 'logos/dozarplati.svg',
                link: '#'
            }
        ];
        this.save(initialData);
        return initialData;
    },

    save: function (products) {
        localStorage.setItem(DB_KEY, JSON.stringify(products));
    },

    add: function (product) {
        const products = this.getAll();
        product.id = Date.now();
        products.push(product);
        this.save(products);
    },

    update: function (updatedProduct) {
        const products = this.getAll();
        const index = products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = updatedProduct;
            this.save(products);
        }
    },

    delete: function (id) {
        const products = this.getAll();
        const filtered = products.filter(p => p.id !== id);
        this.save(filtered);
    }
};
