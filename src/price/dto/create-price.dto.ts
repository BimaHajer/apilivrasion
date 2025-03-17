export class CreatePriceDto { 
    id: number;
    name: string
    priceExcludingTax: number;
  
    priceTTC: number;
    
    retailPrice:number;
    
    wholesalePrice:number;
}
