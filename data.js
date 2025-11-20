/**
 * Data Management Module
 * Handles all interactions with localStorage for the product showcase.
 */

const DB_KEY = 'product_showcase_db';

const defaultData = [
    {
        id: '1',
        name: 'Займер',
        logo: 'https://zyamer.ru/images/logo.png',
        amountFrom: 2000,
        amountTo: 30000,
        term: '7-30 дней',
        description: 'Займ на карту за 5 минут',
        link: '#',
        position: 1
    },
    {
        id: '2',
        name: 'Ekapusta',
        logo: '',
        amountFrom: 1000,
        amountTo: 30000,
        term: '7-21 день',
        description: 'Первый займ бесплатно',
        link: '#',
        position: 2
    },
    {
        id: '3',
        name: 'Moneyman',
        logo: '',
        amountFrom: 1500,
        amountTo: 80000,
        term: '5-18 недель',
        description: 'Ставка от 0%',
        link: '#',
        position: 3
    },
    {
        id: '4',
        name: 'Webbankir',
        logo: '',
        amountFrom: 3000,
        amountTo: 50000,
        term: '10-30 дней',
        description: 'Без процентов для новых клиентов',
        link: '#',
        position: 4
    },
    {
        id: '5',
        name: 'Kviku',
        logo: '',
        amountFrom: 1000,
        amountTo: 100000,
        term: 'до 12 мес',
        description: 'Виртуальная кредитная карта',
        link: '#',
        position: 5
    },
    {
        id: '6',
        name: 'Lime Zaim',
        logo: '',
        amountFrom: 2000,
        amountTo: 70000,
        term: '10-24 недели',
        description: 'Тариф VIP для постоянных',
        link: '#',
        position: 6
    },
    {
        id: '7',
        name: 'Vivus',
        logo: '',
        amountFrom: 3000,
        amountTo: 29000,
        term: '7 дней',
        description: 'Льготный период 7 дней',
        link: '#',
        position: 7
    },
    {
        id: '8',
        name: 'Joymoney',
        logo: '',
        amountFrom: 5000,
        amountTo: 60000,
        term: '5-18 недель',
        description: 'Нужен только паспорт',
        link: '#',
        position: 8
    },
    {
        id: '9',
        name: 'Pay P.S.',
        logo: '',
        amountFrom: 3000,
        amountTo: 15000,
        term: 'до 25 дней',
        description: 'Быстрое решение',
        link: '#',
        position: 9
    },
    {
        id: '10',
        name: 'Zaymigo',
        logo: '',
        amountFrom: 4000,
        amountTo: 70000,
        term: 'до 20 недель',
        description: 'Высокий процент одобрения',
        link: '#',
        position: 10
    },
    {
        id: '11',
        name: 'OneClickMoney',
        logo: '',
        amountFrom: 500,
        amountTo: 25000,
        term: '6-21 день',
        description: 'Без отказа',
        link: '#',
        position: 11
    },
    {
        id: '12',
        name: 'CashToYou',
        logo: '',
        amountFrom: 2000,
        amountTo: 30000,
        term: 'до 21 дня',
        description: 'На любые цели',
        link: '#',
        position: 12
    },
    {
        id: '13',
        name: 'Kredito24',
        logo: '',
        amountFrom: 9000,
        amountTo: 30000,
        term: '16-30 дней',
        description: 'Полностью онлайн',
        link: '#',
        position: 13
    },
    {
        id: '14',
        name: 'Turbozaim',
        logo: '',
        amountFrom: 3000,
        amountTo: 50000,
        term: 'до 24 недель',
        description: 'Мгновенный перевод',
        link: '#',
        position: 14
    },
    {
        id: '15',
        name: 'SmartCredit',
        logo: '',
        amountFrom: 2000,
        amountTo: 14000,
        term: '7-30 дней',
        description: 'Умный кредит',
        link: '#',
        position: 15
    },
    {
        id: '16',
        name: 'CreditPlus',
        logo: '',
        amountFrom: 1000,
        amountTo: 30000,
        term: 'до 30 дней',
        description: 'Кэшбэк до 5%',
        link: '#',
        position: 16
    },
    {
        id: '17',
        name: 'DoZarplati',
        logo: '',
        amountFrom: 2000,
        amountTo: 100000,
        term: 'до 1 года',
        description: 'Минимум документов',
        link: '#',
        position: 17
    },
    {
        id: '18',
        name: 'MigCredit',
        logo: '',
        amountFrom: 3000,
        amountTo: 99000,
        term: 'до 48 недель',
        description: 'Лидер рынка',
        link: '#',
        position: 18
    },
    {
        id: '19',
        name: 'FastMoney',
        logo: '',
        amountFrom: 3000,
        amountTo: 30000,
        term: '7-15 дней',
        description: 'Быстрые деньги',
        link: '#',
        position: 19
    },
    {
        id: '20',
        name: 'SrochnoDengi',
        logo: '',
        amountFrom: 2000,
        amountTo: 100000,
        term: 'до 180 дней',
        description: 'Срочно деньги',
        link: '#',
        position: 20
    }
];

const DataManager = {
    getAll: () => {
        const data = localStorage.getItem(DB_KEY);
        if (!data) {
            DataManager.save(defaultData);
            return defaultData;
        }
        return JSON.parse(data).sort((a, b) => a.position - b.position);
    },

    save: (data) => {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    },

    add: (product) => {
        const data = DataManager.getAll();
        const newProduct = {
            ...product,
            id: Date.now().toString(),
            position: data.length + 1
        };
        data.push(newProduct);
        DataManager.save(data);
        return newProduct;
    },

    update: (updatedProduct) => {
        const data = DataManager.getAll();
        const index = data.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            data[index] = updatedProduct;
            DataManager.save(data);
        }
    },

    delete: (id) => {
        let data = DataManager.getAll();
        data = data.filter(p => p.id !== id);
        // Re-normalize positions
        data.forEach((p, index) => p.position = index + 1);
        DataManager.save(data);
    },

    reorder: (orderedIds) => {
        const data = DataManager.getAll();
        const newData = orderedIds.map((id, index) => {
            const product = data.find(p => p.id === id);
            if (product) {
                product.position = index + 1;
                return product;
            }
        }).filter(Boolean);
        DataManager.save(newData);
    }
};
