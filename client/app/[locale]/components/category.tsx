import Image from "next/image";
import Button from "./common/Button";
import { useRouter } from "next/navigation";

interface ICategory {
  category: {
    name: string;
    description: string;
    image: string;
  };
}

export function Category({ category }: ICategory) {
  const router = useRouter();

  const handlePath = () => {
    const queryParams = new URLSearchParams({
      specialization: encodeURIComponent(category.name),
    }).toString();

    router.push(`/doctorList?${queryParams}`);
  };
  return (
    <div className=" flex flex-col justify-between items-center space-y-2 border-2 p-5 text-center rounded-2xl shadow-sm hover:shadow-md transition  bg-backgroundcolor hover:scale-105 duration-200 mx-6 md:mx-0">
      <div className="space-y-2">
        <Image
          src={category.image}
          alt={category.name}
          width={100}
          height={100}
          className="mx-auto"
        />
        <h3 className="text-xl font-semibold text-center mb-2">
          {category.name}
        </h3>
        <p className=" text-gray-600 text-center text-md">
          {category.description}
        </p>
      </div>
      <div onClick={handlePath} className="mx-auto">
        <Button variant="secondary" size="small" roundedValue="full">
          Go Now{" "}
        </Button>
      </div>
    </div>
  );
}
