type Item {
    sku: String!
    name: String!
    price: Float!
    qty: Int!
}

type Promotion {
    name: String!
    description: String!
    hasItem: [Item] 
}