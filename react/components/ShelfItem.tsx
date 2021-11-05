import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { formatPrice } from '../helpers/Helper'

const CSS_HANDLES = [
    'shelfItem',
    'shelfImage',
    'shelfImage__img',
    'shelfProductName',
    'shelfPrice',
    'shelfSellingPrice',
    'shelfBestPrice',
    'shelfButtonAddToCart'
]

const ShelfItem = ({
    id,
    imageURL,
    name,
    sellingPrice,
    price,
    addToCart
}: ShelfType) => {
    const handles = useCssHandles(CSS_HANDLES)
    return (
        <>
            <div key={id} className={`${handles.shelfItem}`}>
                <div className={`${handles.shelfImage}`}>
                    <img src={`${imageURL}`} alt={`${name}`} className={`${handles.shelfImage__img}`} />
                </div>
                <h2 className={`${handles.shelfProductName}`}>{`${name}`}</h2>
                <div className={`${handles.shelfPrice}`}>
                    <p className={`${handles.shelfSellingPrice}`}>
                        {formatPrice(sellingPrice)}
                    </p>
                    <p className={`${handles.shelfBestPrice}`}>
                        {formatPrice(price)}
                    </p>
                </div>
                <div className={`${handles.shelfButtonAddToCart}`} id={id} onClick={addToCart}>
                    Adicionar ao carrinho
                </div>
            </div>
        </>
    )
}

export default ShelfItem