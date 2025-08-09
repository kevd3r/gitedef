import Image from "next/image";
import Link from "next/link";

const Card = ({ title, link, imagesrc }) => {
  return (
    <Link
      href={link}
      className="relative w-[80%] md:w-full max-w-sm overflow-hidden rounded-lg shadow-lg group block"
    >
      <div className="relative w-full h-64">
        <Image
          src={imagesrc}
          alt={title}
          fill
          className="object-cover transition duration-300 ease-in-out group-hover:blur-sm"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h2 className="text-white text-4xl font-semibold text-center drop-shadow-md">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;