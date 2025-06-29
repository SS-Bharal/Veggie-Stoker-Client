export const pricewithDiscount = (price, dis = 0) => {
    // Ensure price and discount are valid numbers
    const originalPrice = Number(price) || 0
    const discountPercent = Number(dis) || 0
    
    // If no discount, return original price
    if (discountPercent <= 0) {
        return originalPrice
    }
    
    // Calculate discount amount (round to 2 decimal places for accuracy)
    const discountAmount = Math.round((originalPrice * discountPercent) / 100)
    
    // Calculate final price
    const finalPrice = originalPrice - discountAmount
    
    return finalPrice
}