import {
	product,
	product2,
	product3,
	product4,
	product5,
	product6,
	product7,
	product8,
	product9,
	product10,
	product11,
	product12,
	product13,
	product14,
	product15,
	product16,
	fiveStar,
	fourHalfStar,
	fourStar,
	threeStar,
	person1,
	person2,
	person3,
} from "../assets/images";

import { category, category2, category3, category4, category5, category6 } from "../assets/categoriesImages";
import { blackTwitter, blackInstagram, blackLinkedin } from "../assets/logo";
import { customerService, delivery, moneyGuarantee } from "../assets/icons";
import { cart, heart, shop, moneySign, moneyBag, shoppingBag } from "../assets/icons/SvgIconsList";

export const ProductData = {
	flashSales: [
		{
			id: 1,
			productName: "HAVIT HV-G92 Gamepad",
			productImage: product,
			currentPrice: "$120",
			originalPrice: "$160",
			rating: fiveStar,
			rateCount: "88",
			discountPercentage: "-40%",
			quantity: 1,
			subTotal: 120,
		},
		{
			id: 2,
			productName: "AK-900 Wired Keyboard",
			productImage: product2,
			currentPrice: "$960",
			originalPrice: "$1160",
			rating: fourStar,
			rateCount: "75",
			discountPercentage: "-35%",
			quantity: 1,
			subTotal: 960,
		},
		{
			id: 3,
			productName: "IPS LCD Gaming Monitor",
			productImage: product3,
			currentPrice: "$370",
			originalPrice: "$400",
			rating: fiveStar,
			rateCount: "99",
			discountPercentage: "-40%",
			quantity: 1,
			subTotal: 370,
		},
		{
			id: 4,
			productName: "S-Series Comfort Chair ",
			productImage: product4,
			currentPrice: "$375",
			originalPrice: "$400",
			rating: fourHalfStar,
			rateCount: "99",
			discountPercentage: "-25%",
			quantity: 1,
			subTotal: 375,
		},
	],
	browseByCategory: [
		{
			categoryName: "Phones",
			categoryImage: category,
		},
		{
			categoryName: "Computers",
			categoryImage: category2,
		},
		{
			categoryName: "SmartWatch",
			categoryImage: category3,
		},
		{
			categoryName: "Camera",
			categoryImage: category4,
		},
		{
			categoryName: "HeadPhones",
			categoryImage: category5,
		},
		{
			categoryName: "Gaming",
			categoryImage: category6,
		},
	],
	bestSellingProducts: [
		{
			id: 5,
			productName: "The north coat",
			productImage: product5,
			currentPrice: "$260",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "65",
			discountPercentage: "",
			quantity: 1,
			subTotal: 260,
		},
		{
			id: 6,
			productName: "Gucci duffle bag",
			productImage: product6,
			currentPrice: "$960",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "65",
			discountPercentage: "",
			quantity: 1,
			subTotal: 960,
		},
		{
			id: 7,
			productName: "RGB liquid CPU Cooler",
			productImage: product7,
			currentPrice: "$160",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "65",
			discountPercentage: "",
			quantity: 1,
			subTotal: 160,
		},
		{
			id: 8,
			productName: "Small BookSelf",
			productImage: product8,
			currentPrice: "$360",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "65",
			discountPercentage: "",
			quantity: 1,
			subTotal: 360,
		},
	],
	exploreOurProducts: [
		{
			id: 9,
			productName: "Breed Dry Dog Food",
			productImage: product9,
			currentPrice: "$100",
			originalPrice: "",
			rating: threeStar,
			rateCount: "35",
			discountPercentage: "",
			quantity: 1,
			subTotal: 100,
		},
		{
			id: 10,
			productName: "CANON EOS DSLR Camera",
			productImage: product10,
			currentPrice: "$360",
			originalPrice: "",
			rating: fourStar,
			rateCount: "95",
			discountPercentage: "",
			quantity: 1,
			subTotal: 360,
		},
		{
			id: 11,
			productName: "ASUS FHD Gaming Laptop",
			productImage: product11,
			currentPrice: "$700",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "325",
			discountPercentage: "",
			quantity: 1,
			subTotal: 700,
		},
		{
			id: 12,
			productName: "Curology Product Set ",
			productImage: product12,
			currentPrice: "$500",
			originalPrice: "",
			rating: fourStar,
			rateCount: "145",
			discountPercentage: "",
			quantity: 1,
			subTotal: 500,
		},
		{
			id: 13,
			productName: "Kids Electric Car",
			productImage: product13,
			currentPrice: "$960",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "65",
			discountPercentage: "",
			quantity: 1,
			subTotal: 960,
		},
		{
			id: 14,
			productName: "Jr. Zoom Soccer Cleats",
			productImage: product14,
			currentPrice: "$1160",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "35",
			discountPercentage: "",
			quantity: 1,
			subTotal: 1160,
		},
		{
			id: 15,
			productName: "GP11 Shooter USB Gamepad",
			productImage: product15,
			currentPrice: "$660",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "55",
			discountPercentage: "",
			quantity: 1,
			subTotal: 660,
		},
		{
			id: 16,
			productName: "Quilted Satin Jacket",
			productImage: product16,
			currentPrice: "$660",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "55",
			discountPercentage: "",
			quantity: 1,
			subTotal: 660,
		},
	],
};

export const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "contact", label: "Contact" },
	{ href: "about", label: "About" },
	{ href: "signup", label: "Sign Up" },
];

export const navIconLinks = [
	{
		href: "wishlist",
		label: "Wishlist",
		icon: (styles) => heart(styles),
		storageName: "wishlistItems",
	},
	{ href: "cart", label: "Cart", icon: (styles) => cart(styles), storageName: "cartItems" },
	// { href: "cart", label: "Cart2", icon: (styles) => cart(styles), storageName: "cartItems" },
];

export const sideLinks = [
	{ href: "", label: "Women's Fashion" },
	{ href: "", label: "Men's Fashion" },
	{ href: "", label: "Electronics" },
	{ href: "", label: "Home & Lifestyle" },
	{ href: "", label: "Medicine" },
	{ href: "", label: "Sports & Outdoor" },
	{ href: "", label: "Baby’s & Toys" },
	{ href: "", label: "Groceries & Pets" },
	{ href: "", label: "Health & Beauty" },
];

export const footerLinks = [
	{
		title: "Exclusive",
		links: [
			{ href: "", label: "Subscribe" },
			{ href: "", label: "Get 10% off your first order" },
		],
	},
	{
		title: "Support",
		links: [
			{
				href: "",
				label: "20 Aurora Compound St., Metro Manila, Marikina, Philippines.",
			},
			{ href: "", label: "exclusive@gmail.com" },
			{ href: "", label: "+99075-11111-77777" },
		],
	},
	{
		title: "Account",
		links: [
			{ href: "", label: "My Account" },
			{ href: "", label: "Login / Register" },
			{ href: "", label: "Cart" },
			{ href: "", label: "Wishlist" },
			{ href: "", label: "Shop" },
			{ href: "", label: "" },
		],
	},
	{
		title: "Quick Link",
		links: [
			{ href: "", label: "Privacy Policy" },
			{ href: "", label: "Terms Of Use" },
			{ href: "", label: "FAQ" },
			{ href: "", label: "Contact" },
		],
	},
	{
		title: "Download App",
		links: [{ href: "", label: "Save $3 with App New User Only" }],
	},
];

export const wishlistData = [
	{
		id: 5,
		productName: "The north coat",
		productImage: product5,
		currentPrice: "$260",
		originalPrice: "",
		rating: fiveStar,
		rateCount: "65",
		discountPercentage: "",
		quantity: 1,
		subTotal: 260,
	},
	{
		id: 6,
		productName: "Gucci duffle bag",
		productImage: product6,
		currentPrice: "$960",
		originalPrice: "",
		rating: fourHalfStar,
		rateCount: "65",
		discountPercentage: "",
		quantity: 1,
		subTotal: 960,
	},
	{
		id: 7,
		productName: "RGB liquid CPU Cooler",
		productImage: product7,
		currentPrice: "$160",
		originalPrice: "",
		rating: fourHalfStar,
		rateCount: "65",
		discountPercentage: "",
		quantity: 1,
		subTotal: 160,
	},
	{
		id: 8,
		productName: "Small BookSelf",
		productImage: product8,
		currentPrice: "$360",
		originalPrice: "",
		rating: fiveStar,
		rateCount: "65",
		discountPercentage: "",
		quantity: 1,
		subTotal: 360,
	},
];

export const cartData = {
	tableHeaders: [{ title: "Product" }, { title: "Product" }, { title: "Price" }, { title: "Quantity" }, { title: "Subtotal" }, { title: "Action" }],
	cartProducts: [
		{
			id: 8,
			productName: "Small BookSelf",
			productImage: product8,
			currentPrice: "$360",
			quantity: 1,
			subTotal: 360,
		},
		{
			id: 6,
			productName: "Gucci duffle bag",
			productImage: product6,
			currentPrice: "$960",
			quantity: 1,
			subTotal: 960,
		},
	],
};
export const shopInfo = [
	{
		label: "shop",
		shopInfoIcon: shop(),
		shopInfoNumber: "10.5k ",
		shopInfoDescription: "Active sellers in our site",
	},
	{
		label: "moneySign",
		shopInfoIcon: moneySign(),
		shopInfoNumber: "33k",
		shopInfoDescription: "Monthly Product Sales",
	},
	{
		label: "shoppingBag",
		shopInfoIcon: shoppingBag(),
		shopInfoNumber: "45.5k",
		shopInfoDescription: "Active customers in our site",
	},
	{
		label: "moneyBag",
		shopInfoIcon: moneyBag(),
		shopInfoNumber: "25k",
		shopInfoDescription: "Anual gross sales in our site",
	},
];
export const services = [
	{
		serviceImg: delivery,
		serviceTitle: "FREE AND FAST DELIVERY",
		serviceDescription: "Free delivery for all orders over $140",
	},
	{
		serviceImg: customerService,
		serviceTitle: "24/7 CUSTOMER SERVICE",
		serviceDescription: "Friendly 24/7 customer support",
	},
	{
		serviceImg: moneyGuarantee,
		serviceTitle: "MONEY BACK GUARANTEE",
		serviceDescription: "We reurn money within 30 days",
	},
];

export const people = [
	{
		personImg: person1,
		personName: "John Doe",
		position: "Founder & Chairman",
	},
	{
		personImg: person2,
		personName: "Jane Watson",
		position: "Managing Director",
	},
	{
		personImg: person3,
		personName: "Mike Rose",
		position: "Product Designer",
	},
];

export const socials = [
	{
		name: "Twitter",
		icon: blackTwitter,
	},
	{
		name: "Instagram",
		icon: blackInstagram,
	},
	{
		name: "LinkedIn",
		icon: blackLinkedin,
	},
];

export const billingDetails = [
	{
		id: "name",
		label: "Name *",
		type: "text",
	},
	{
		id: "companyName",
		label: "Company Name",
		type: "text",
	},
	{
		id: "street",
		label: "Street Address*",
		type: "text",
	},
	{
		id: "apartment",
		label: "Apartment, floor, etc. (optional)",
		type: "text",
	},
	{
		id: "city",
		label: "Town/City *",
		type: "text",
	},
	{
		id: "phoneNumber",
		label: "Phone Number *",
		type: "number",
	},
	{
		id: "email",
		label: "Email Address *",
		type: "email",
	},
];
