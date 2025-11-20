/**
 * Data Management Module
 * Handles all interactions with localStorage for the product showcase.
 */

const DB_KEY = 'product_showcase_db';

const defaultData = [
    {
        id: '1',
        name: 'Займер',
        logo: 'https://zyamer.ru/images/logo.png', // Placeholder
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
