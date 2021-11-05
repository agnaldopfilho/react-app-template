import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { formatPrice } from '../helpers/Helper'

const CSS_HANDLES = [
    'shelfItem',
    'shelfLink',
    'shelfImage',
    'shelfImage__img',
    'shelfProductName',
    'shelfPrice',
    'shelfSellingPrice',
    'shelfBestPrice',
]

const ShelfItem = ({ linkUrl, imageUrl, name, sellingPrice, price }: ShelfType) => {
    const handles = useCssHandles(CSS_HANDLES)
    return (
        <>
            <div className={`${handles.shelfItem}`}>
                <a href={`${linkUrl}`} className={`${handles.shelfLink}`}>
                    <div className={`${handles.shelfImage}`}>
                        <img src={`${imageUrl}`} alt={`${name}`} className={`${handles.shelfImage__img}`} />
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
                </a>
            </div>
        </>
    )
}

export default ShelfItem