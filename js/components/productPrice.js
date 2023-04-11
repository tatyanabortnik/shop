const productPrice = (price, salePercent, count=1) => {
    const finalPrice = salePercent ? price-((price*salePercent)/100) : price;
    return count * finalPrice;
}

export default productPrice;