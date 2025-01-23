import Image from "next/image";
import Button from "./common/Button";
import Link from "next/link";

interface ICategory {
  category: {
    title: string;
    description: string;
    icon: string;
    buttonTitle: string;
    buttonLink: string;
    alt: string;
  };
}

export function Category({ category }: ICategory) {
  return (
    <div className=" flex flex-col justify-between items-center space-y-2 border-2 p-5 text-center rounded-2xl shadow-sm hover:shadow-md transition  bg-backgroundcolor hover:scale-105 duration-200 mx-6 md:mx-0">
      <div className="space-y-2">
        <Image
          src={category.icon}
          alt={category.alt}
          width={100}
          height={100}
          className="mx-auto"
        />
        <h3 className="text-xl font-semibold text-center mb-2">
          {category.title}
        </h3>
        <p className=" text-gray-600 text-center text-md">
          {category.description}
        </p>
      </div>
      <Link href={category.buttonLink} className="mx-auto">
        <Button variant="secondary" size="small" roundedValue="full">
          {category.buttonTitle}
        </Button>
      </Link>
    </div>
  );
}
