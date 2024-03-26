export type TProduct = {
	id?: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	discount_price: number;
	discount_percentage: number;
	discount_type: string;
	images: string[] | [];
	main_image_url: string;
	category_id: string;
	featured: boolean;
	points: number;
	ratings: number;
	created_at: number;
	sizes:
		| {
				name: TSize | number | string;
				quantity: number | undefined;
		  }[]
		| [];
};

export type TSize =
	| 'XS'
	| 'S'
	| 'M'
	| 'L'
	| 'XL'
	| 'XXL';
