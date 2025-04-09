export interface Product {
    id: number;
    name: string;
    slug: string;
    get_absolute_url: string;
    description: string;
    price: string;
    image: string;
    discount: string;
    category: string;
    tags: string[];
    get_image: string;
}
