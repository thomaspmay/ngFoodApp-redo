export class Recipe {
    id: number;
    title: string;
    ingredients: Ingredient[];
    description: string;
    instructions: string[];
    unproIngredients: string[];
    tags: any;
    image: string;
    // location: string; /* remove */
    // likes: number; /* remove */
    // comments: number; /* remove */
}

export class Ingredient {
    quantity: string;
    unit: string;
    ingredient: string;
    minQty: string;
    maxQty: string;
}