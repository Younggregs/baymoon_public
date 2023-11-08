const cardWidth = "30ch"

const currencySymbols = {
    NAIRA: "₦",
    DOLLAR: "$",
    EURO: "€"
}

const currencyFormat = {
    NAIRA: {
      format: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    })
    },
    DOLLAR: {
      format: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    },
    EURO: {
      format: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    })
    }
}

// dev
// const url = "http://localhost:8000/graphql"
// const uiUrl = "http://localhost:3000"
// const baseUrl = "http://localhost:8000"

// prod
const url = "https://api.baymoon.app/graphql"
const uiUrl = "http://baymoon.app"
const baseUrl = "https://api.baymoon.app"

export {
    cardWidth,
    url,
    uiUrl,
    baseUrl,
    currencySymbols,
    currencyFormat
}