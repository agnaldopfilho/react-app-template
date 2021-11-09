import React, { useState, useEffect } from 'react'
import ShelfItem from './components/ShelfItem'
import { SliderLayout } from 'vtex.slider-layout'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { useOrderItems } from 'vtex.order-items/OrderItems'

const CSS_HANDLES = [
    'containerShelf'
]

const Shelf = () => {
    const productContext = useProduct()
    const { addItems } = useOrderItems()
    const [arrayProducts, setArrayProducts] = useState() as any
    const [categoryTitle, setCategoryTitle] = useState('...') as any
    const [categoryURL, setCategoryURL] = useState() as any

    const handles = useCssHandles(CSS_HANDLES)

    useEffect(() => {
        const URL = productContext?.product?.categoryTree?.slice(-1)[0].href
        const TITLE = productContext?.product?.categoryTree?.slice(-1)[0].name
        setCategoryURL(URL)
        setCategoryTitle(TITLE)
        if (categoryURL && categoryTitle) {
            getCategoryItems()
        }
    }, [productContext])

    const getCategoryItems = () => {
        fetch(`/api/catalog_system/pub/products/search${categoryURL}`)
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    setArrayProducts(data)
                }
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
        <div className={`${handles.containerShelf}`}>
            {arrayProducts ?
                <>
                    <h1 className={`t-heading-2 fw3 w-100 flex justify-center pt7 pb6 c-muted-1`}>
                        {`My custom shelf - Category: ${categoryTitle ? categoryTitle : '...'}`}
                    </h1>

                    <SliderLayout
                        itemsPerPage={{
                            desktop: 4,
                            tablet: 3,
                            phone: 2
                        }}
                        showPaginationDots="mobileOnly"
                        showNavigationArrows="desktopOnly"
                        infinite={true}
                    >
                        {arrayProducts.map((product: any) => (
                            <ShelfItem
                                key={product.productId}
                                id={product.productId}
                                linkProduct={product.link}
                                imageURL={product.items[0].images[0].imageUrl}
                                name={product.productName}
                                sellingPrice={product.items[0].sellers[0].commertialOffer.ListPrice}
                                price={product.items[0].sellers[0].commertialOffer.Price}
                                addToCart={addToCart}
                            />
                        ))}
                    </SliderLayout>
                </>
                : ''
            }
        </div>
    )
}

export default Shelf