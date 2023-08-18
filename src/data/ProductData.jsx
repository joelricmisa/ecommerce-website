import product from "../assets/images/game-console.png";
import product2 from "../assets/images/ak-keyboard.png";
import product3 from "../assets/images/monitor.png";
import product4 from "../assets/images/comfort-chair.png";
import product5 from "../assets/images/north-coat.png";
import product6 from "../assets/images/gucci-duffle-bag.png";
import product7 from "../assets/images/rgb-liquid-cooler.png";
import product8 from "../assets/images/small-bookshelf.png";
import product9 from "../assets/images/dogfood.png";
import product10 from "../assets/images/canon-camera.png";
import product11 from "../assets/images/asus gaming laptop.png";
import product12 from "../assets/images//product-set.png";
import product13 from "../assets/images/kids-car.png";
import product14 from "../assets/images/soccer-cleats.png";
import product15 from "../assets/images/shooter-gamepad.png";
import product16 from "../assets/images/satin-jacket.png";
import category from "../assets/categoriesImages/cellphone.svg";
import category2 from "../assets/categoriesImages/computer.svg";
import category3 from "../assets/categoriesImages/smartwatch.svg";
import category4 from "../assets/categoriesImages/camera.svg";
import category5 from "../assets/categoriesImages/headphone.svg";
import category6 from "../assets/categoriesImages/gamepad.svg";
import fiveStar from "../assets/images/five-star.png";
import fourHalfStar from "../assets/images/four-half-star.png";
import fourStar from "../assets/images/four-star.png";
import threeStar from "../assets/images/three-star.png";

export const ProductData = {
	flashSales: [
		{
			productName: "HAVIT HV-G92 Gamepad",
			productImage: product,
			currentPrice: "$120",
			originalPrice: "$160",
			rating: fiveStar,
			rateCount: "88",
			discountPercentage: "-40%",
		},
		{
			productName: "AK-900 Wired Keyboard",
			productImage: product2,
			currentPrice: "$960",
			originalPrice: "$1160",
			rating: fourStar,
			rateCount: "75",
			discountPercentage: "-35%",
		},
		{
			productName: "IPS LCD Gaming Monitor",
			productImage: product3,
			currentPrice: "$370",
			originalPrice: "$400",
			rating: fiveStar,
			rateCount: "99",
			discountPercentage: "-40%",
		},
		{
			productName: "S-Series Comfort Chair ",
			productImage: product4,
			currentPrice: "$375",
			originalPrice: "$400",
			rating: fourHalfStar,
			rateCount: "99",
			discountPercentage: "-25%",
		},

		{
			productName: "AK-900 Wired Keyboard",
			productImage: product2,
			currentPrice: "$960",
			originalPrice: "$1160",
			rating: fourStar,
			rateCount: "75",
			discountPercentage: "-35%",
		},
		{
			productName: "S-Series Comfort Chair ",
			productImage: product4,
			currentPrice: "$375",
			originalPrice: "$400",
			rating: fourHalfStar,
			rateCount: "99",
			discountPercentage: "-25%",
		},
		{
			productName: "HAVIT HV-G92 Gamepad",
			productImage: product,
			currentPrice: "$120",
			originalPrice: "$160",
			rating: fiveStar,
			rateCount: "88",
			discountPercentage: "-40%",
		},

		{
			productName: "IPS LCD Gaming Monitor",
			productImage: product3,
			currentPrice: "$370",
			originalPrice: "$400",
			rating: fiveStar,
			rateCount: "99",
			discountPercentage: "-40%",
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
			productName: "The north coat",
			productImage: product5,
			currentPrice: "$260",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "65",
			discountPercentage: "",
		},
		{
			productName: "Gucci duffle bag",
			productImage: product6,
			currentPrice: "$960",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "65",
			discountPercentage: "",
		},
		{
			productName: "RGB liquid CPU Cooler",
			productImage: product7,
			currentPrice: "$160",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "65",
			discountPercentage: "",
		},
		{
			productName: "Small BookSelf",
			productImage: product8,
			currentPrice: "$360",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "65",
			discountPercentage: "",
		},
	],
	exploreOurProducts: [
		{
			productName: "Breed Dry Dog Food",
			productImage: product9,
			currentPrice: "$100",
			originalPrice: "",
			rating: threeStar,
			rateCount: "35",
			discountPercentage: "",
		},
		{
			productName: "CANON EOS DSLR Camera",
			productImage: product10,
			currentPrice: "$360",
			originalPrice: "",
			rating: fourStar,
			rateCount: "95",
			discountPercentage: "",
		},
		{
			productName: "ASUS FHD Gaming Laptop",
			productImage: product11,
			currentPrice: "$700",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "325",
			discountPercentage: "",
		},
		{
			productName: "Curology Product Set ",
			productImage: product12,
			currentPrice: "$500",
			originalPrice: "",
			rating: fourStar,
			rateCount: "145",
			discountPercentage: "",
		},
		{
			productName: "Kids Electric Car",
			productImage: product13,
			currentPrice: "$960",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "65",
			discountPercentage: "",
		},
		{
			productName: "Jr. Zoom Soccer Cleats",
			productImage: product14,
			currentPrice: "$1160",
			originalPrice: "",
			rating: fiveStar,
			rateCount: "35",
			discountPercentage: "",
		},
		{
			productName: "GP11 Shooter USB Gamepad",
			productImage: product15,
			currentPrice: "$660",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "55",
			discountPercentage: "",
		},
		{
			productName: "Quilted Satin Jacket",
			productImage: product16,
			currentPrice: "$660",
			originalPrice: "",
			rating: fourHalfStar,
			rateCount: "55",
			discountPercentage: "",
		},
	],
};
