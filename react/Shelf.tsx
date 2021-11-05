import React, { useState, useEffect } from 'react'
import ShelfItem from './components/ShelfItem'
import { SliderLayout } from 'vtex.slider-layout'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
    'containerShelf'
]

const Shelf = () => {
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

    console.log('arrayProducts', arrayProducts)

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
                        linkUrl={product.link}
                        imageUrl={product.items[0].images[0].imageUrl}
                        name={product.productName}
                        sellingPrice={product.items[0].sellers[0].commertialOffer.ListPrice}
                        price={product.items[0].sellers[0].commertialOffer.Price}
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