import React, { useState, useEffect } from 'react'
import ShelfItem from './components/ShelfItem'
import { SliderLayout } from 'vtex.slider-layout'
import { useCssHandles } from 'vtex.css-handles'
import { useOrderItems } from 'vtex.order-items/OrderItems'

const CSS_HANDLES = [
    'containerShelf'
]

const Shelf = () => {
    const { addItems } = useOrderItems()
    const [arrayProducts, setArrayProducts] = useState([]) as any
    const handles = useCssHandles(CSS_HANDLES)

    useEffect(() => {
        getICategoryItems()
    }, [])

    const getICategoryItems = () => {
        fetch('/api/catalog_system/pub/products/search/moda/calcados')
            .then(response => response.json())
            .then((data) => {
                setArrayProducts(data)
            })
    }

    const addToCart = async (event: any) => {
        const id = event.target.id
        await fetch(`/api/catalog_system/pub/products/search?fq=productId:${id}`)
            .then(response => response.json())
            .then((data) => {
                populaterCart(data)
            })

    }

    const populaterCart = (data: any) => {
        const cart = [
            {
                additionalInfo: {
                    brandName: data[0].brand,
                    __typename: 'ItemAdditionalInfo',
                },
                availability: data[0].items[0].sellers[0].commertialOffer.IsAvailable,
                id: data[0].items[0].itemId,
                imageUrls: {
                    at1x: data[0].items[0].images[0].imageUrl,
                    __typename: 'ImageUrls',
                },
                listPrice: data[0].items[0].sellers[0].commertialOffer.ListPrice,
                measurementUnit: data[0].items[0].measurementUnit,
                name: data[0].productName,
                price: data[0].items[0].sellers[0].commertialOffer.Price,
                productId: data[0].productId,
                quantity: 1,
                seller: data[0].items[0].sellers[0].sellerId,
                sellingPrice: data[0].items[0].bestPrice,
                skuName: data[0].items[0].nameComplete,
                unitMultiplier: data[0].items[0].unitMultiplier,
                uniqueId: data[0].items[0].itemId,
                isGift: false,
                __typename: 'Item',
            },
        ]

        // O addItems ele espera receber um array de objeto com informações úteis do produto para adicionar ao carrinho.
        addItems(cart)
    }


    return (
        <div className={`${handles.containerShlef}`}>
            <h1>My custom shelf</h1>
            <SliderLayout
                itemsPerPage={{
                    desktop: 4,
                    tablet: 3,
                    phone: 2
                }}
                showPaginationDots="never"
                infinite={true}
            >
                {arrayProducts.map((product: any) => (
                    <ShelfItem
                        key={product.productId}
                        id={product.productId}
                        imageURL={product.items[0].images[0].imageUrl}
                        name={product.productName}
                        sellingPrice={product.items[0].sellers[0].commertialOffer.ListPrice}
                        price={product.items[0].sellers[0].commertialOffer.Price}
                        addToCart={addToCart}
                    />
                ))}
            </SliderLayout>
            {arrayProducts ?
                <>

                </>
                : ''}
        </div>
    )
}

export default Shelf