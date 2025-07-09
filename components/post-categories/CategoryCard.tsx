import { Card, CardBody } from "@heroui/card";

import {
  IoBulbOutline,
  IoDocumentTextOutline,
  IoFlagOutline,
  IoHammerOutline,
  IoPeopleOutline,
  IoSchoolOutline,
} from "react-icons/io5";


interface CategoryCardProps {
  category:
  | "obra"
  | "gas"
  | "electro"
  | "capacitaciones"
  | "padron"
  | "publicaciones";
}

export const CategoryCard = ( { category }: CategoryCardProps ) => {
  const iconMap = {
    obra: <IoHammerOutline size={ 32 } />,
    gas: <IoFlagOutline size={ 32 } />,
    electro: <IoBulbOutline size={ 32 } />,
    capacitaciones: <IoSchoolOutline size={ 32 } />,
    padron: <IoPeopleOutline size={ 32 } />,
    publicaciones: <IoDocumentTextOutline size={ 32 } />,
  };

  const colorMap = {
    obra: "bg-green-100 text-green-600",
    gas: "bg-blue-100 text-blue-600",
    electro: "bg-yellow-100 text-yellow-600",
    capacitaciones: "bg-purple-100 text-purple-600",
    padron: "bg-red-100 text-red-600",
    publicaciones: "bg-gray-100 text-gray-600",
  };

  return (
    <Card
      className="
        w-full
        cursor-pointer
        transition-transform duration-300 group
        hover:scale-105
        overflow-hidden
        bg-white dark:bg-gray-800
        shadow-none
        hover:ring-4 hover:ring-offset-2 hover:ring-indigo-200
      "
    >
      <CardBody className="flex flex-col items-center justify-center p-6 gap-4">
        <div
          className={ `
            flex items-center justify-center
            p-4 rounded-full
            ${ colorMap[ category ] }
            transform transition-transform duration-300
            group-hover:scale-110
          `}
        >
          { iconMap[ category ] }
        </div>
        <span className="text-base font-semibold capitalize text-gray-700 dark:text-gray-200">
          { category }
        </span>
      </CardBody>
    </Card>
  );
};
