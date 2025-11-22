const defaultOffers = [
    {
        id: 'offer_1',
        logo: 'img_for_main/moneyman144x60.png',
        amount: 'до 80 000 руб.',
        term: 'до 30 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_2',
        logo: 'img_for_main/srochno.png',
        amount: 'до 100 000 руб.',
        term: 'до 180 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_3',
        logo: 'img_for_main/webzaim.png',
        amount: 'до 100 000 руб.',
        term: 'до 30 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_4',
        logo: 'img_for_main/oneclickmoney.png',
        amount: 'до 100 000 руб.',
        term: 'до 376 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    // Duplicates to reach 12 items
    {
        id: 'offer_5',
        logo: 'img_for_main/moneyman144x60.png',
        amount: 'до 80 000 руб.',
        term: 'до 30 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_6',
        logo: 'img_for_main/srochno.png',
        amount: 'до 100 000 руб.',
        term: 'до 180 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_7',
        logo: 'img_for_main/webzaim.png',
        amount: 'до 100 000 руб.',
        term: 'до 30 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_8',
        logo: 'img_for_main/oneclickmoney.png',
        amount: 'до 100 000 руб.',
        term: 'до 376 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_9',
        logo: 'img_for_main/moneyman144x60.png',
        amount: 'до 80 000 руб.',
        term: 'до 30 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_10',
        logo: 'img_for_main/srochno.png',
        amount: 'до 100 000 руб.',
        term: 'до 180 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_11',
        logo: 'img_for_main/webzaim.png',
        amount: 'до 100 000 руб.',
        term: 'до 30 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    },
    {
        id: 'offer_12',
        logo: 'img_for_main/oneclickmoney.png',
        amount: 'до 100 000 руб.',
        term: 'до 376 дней',
        link: '#',
        badgeText: 'всем бесплатный скоринг в подарок'
    }
];

function getOffers() {
    const stored = localStorage.getItem('zaymer_offers');
    if (stored) {
        return JSON.parse(stored);
    }
    return defaultOffers;
}

function saveOffers(offers) {
    localStorage.setItem('zaymer_offers', JSON.stringify(offers));
}
