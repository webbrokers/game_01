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
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Moneyman_logo.png/800px-Moneyman_logo.png',
                link: 'https://moneyman.ru'
            },
            {
                id: 2,
                name: 'СрочноДеньги',
                amountTo: 100000,
                term: 'до 180 дней',
                description: 'от 18 до 65 лет и от 0,1% в день',
                logo: 'https://srochnodengi.ru/local/templates/main/assets/images/logo.svg',
                link: 'https://srochnodengi.ru'
            },
            {
                id: 3,
                name: 'Вебзайм',
                amountTo: 30000,
                term: 'до 30 дней',
                description: 'Первый займ бесплатно',
                logo: 'https://web-zaim.ru/layout/img/logo.svg',
                link: 'https://web-zaim.ru'
            },
            {
                id: 4,
                name: 'OneClickMoney',
                amountTo: 30000,
                term: 'до 60 дней',
                description: 'Без отказа',
                logo: 'https://oneclickmoney.ru/local/templates/oneclickmoney/img/logo.svg',
                link: 'https://oneclickmoney.ru'
            },
            {
                id: 5,
                name: 'еКапуста',
                amountTo: 30000,
                term: 'до 21 дня',
                description: 'Мгновенный перевод',
                logo: 'https://ekapusta.com/static/img/logo.svg',
                link: 'https://ekapusta.com'
            },
            {
                id: 6,
                name: 'Kviku',
                amountTo: 100000,
                term: 'до 12 мес',
                description: 'Виртуальная карта',
                logo: 'https://kviku.ru/static/img/logo.svg',
                link: 'https://kviku.ru'
            },
            {
                id: 7,
                name: 'ФинУслуги',
                amountTo: 100000,
                term: 'до 365 дней',
                description: 'Ставки банков',
                logo: 'https://finuslugi.ru/assets/images/logo.svg',
                link: 'https://finuslugi.ru'
            },
            {
                id: 8,
                name: 'Зарубас',
                amountTo: 50000,
                term: 'до 30 дней',
                description: 'Быстрое решение',
                logo: 'https://zarubas.ru/img/logo.png',
                link: '#'
            },
            {
                id: 9,
                name: 'Турбозайм',
                amountTo: 50000,
                term: 'до 24 недель',
                description: 'Мгновенный перевод',
                logo: 'https://turbozaim.ru/layout/img/logo.svg',
                link: 'https://turbozaim.ru'
            },
            {
                id: 10,
                name: 'Zaymigo',
                amountTo: 70000,
                term: 'до 20 недель',
                description: 'Высокий процент одобрения',
                logo: 'https://zaymigo.com/assets/images/logo.svg',
                link: 'https://zaymigo.com'
            },
            {
                id: 11,
                name: 'Vivus',
                amountTo: 29000,
                term: 'до 7 дней',
                description: 'Льготный период 7 дней',
                logo: 'https://www.vivus.ru/assets/images/logo.svg',
                link: 'https://www.vivus.ru'
            },
            {
                id: 12,
                name: 'Lime',
                amountTo: 70000,
                term: 'до 24 недель',
                description: 'Тариф VIP',
                logo: 'https://www.lime-zaim.ru/assets/images/logo.svg',
                link: 'https://www.lime-zaim.ru'
            },
            {
                id: 13,
                name: 'Webbankir',
                amountTo: 50000,
                term: 'до 30 дней',
                description: 'Без процентов',
                logo: 'https://webbankir.com/images/logo.svg',
                link: '#'
            },
            {
                id: 14,
                name: 'JoyMoney',
                amountTo: 60000,
                term: 'до 18 недель',
                description: 'Нужен только паспорт',
                logo: 'https://joy.money/local/templates/joymoney/img/logo.svg',
                link: '#'
            },
            {
                id: 15,
                name: 'PayPS',
                amountTo: 15000,
                term: 'до 25 дней',
                description: 'Быстрое решение',
                logo: 'https://payps.ru/Content/img/logo.svg',
                link: '#'
            },
            {
                id: 16,
                name: 'CashToYou',
                amountTo: 30000,
                term: 'до 21 дня',
                description: 'На любые цели',
                logo: 'https://cashtoyou.ru/assets/images/logo.svg',
                link: '#'
            },
            {
                id: 17,
                name: 'Kredito24',
                amountTo: 30000,
                term: 'до 30 дней',
                description: 'Полностью онлайн',
                logo: 'https://kredito24.ru/assets/images/logo.svg',
                link: '#'
            },
            {
                id: 18,
                name: 'SmartCredit',
                amountTo: 14000,
                term: 'до 30 дней',
                description: 'Умный кредит',
                logo: 'https://smartcredit.ru/assets/images/logo.svg',
                link: '#'
            },
            {
                id: 19,
                name: 'CreditPlus',
                amountTo: 30000,
                term: 'до 30 дней',
                description: 'Кэшбэк до 5%',
                logo: 'https://creditplus.ru/local/templates/creditplus/img/logo.svg',
                link: '#'
            },
            {
                id: 20,
                name: 'DoZarplati',
                amountTo: 100000,
                term: 'до 1 года',
                description: 'Минимум документов',
                logo: 'https://dozarplati.com/assets/images/logo.svg',
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
