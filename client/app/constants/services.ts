type TServices = {
  title: string;
  img: string;
  buttonTitle: string;
  buttonLink: string;
  alt: string;
}[];

export const services: TServices = [
  {
    title: "Do you have a question?",
    img: "/images/Home/askQuestion.png",
    buttonTitle: "Ask now ",
    buttonLink: "",
    alt: "askQuestion.png",
  },
  {
    title: "Articles on mental health",
    img: "/images/Home/articles.png",
    buttonTitle: "Go now ",
    buttonLink: "articles",
    alt: "askQuestion.png",
  },
  {
    title: "Mental health medications and products",
    img: "/images/Home/products.png",
    buttonTitle: "Show more ",
    buttonLink: "products",

    alt: "askQuestion.png",
  },
  {
    title: "Frequently asked questions",
    img: "/images/Home/FAQ.png",
    buttonTitle: "Go now ",
    buttonLink: "FAQ",
    alt: "askQuestion.png",
  },
];
