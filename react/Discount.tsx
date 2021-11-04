import React, { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import styled from 'styled-components'

const CSS_HANDLES = ['container', 'price', 'discountMessage']

const Discount: StorefrontFunctionComponent = () => {
    const productContext = useProduct()
    const handles = useCssHandles(CSS_HANDLES)
    const [price, setPrice] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [discountTotal, setDiscountTotal] = useState<number>(0)

    useEffect(() => {
        if (productContext && productContext.product) {
            setPrice(productContext.product.priceRange.sellingPrice.highPrice)

            DiscountCalcution()
        }
    }, [productContext])

    const DiscountCalcution = () => {
        const discount = price * 0.05
        const priceFinal = price - discount

        setDiscountTotal(priceFinal)
        setLoading(true)
    }

    const RenderDiscountPrice = () => {
        return (
            <Container className={`${handles.container}`}>
                <Price className={`${handles.price}`}>{discountTotal}</Price>
                <DiscountMessage className={`${handles.discountMessage}`}>à vista no boleto com 5% de desconto</DiscountMessage>
            </Container>
        )
    }
    return (
        <>
            {loading ? <RenderDiscountPrice /> : null}
        </>

    )
}

const Container = styled.div``

const Price = styled.div`
  color: black;
`

const DiscountMessage = styled.div`
    font-style: italic;
    color: red
`

export default Discount
