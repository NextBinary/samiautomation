export default function CardCategory({ image, title }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:cursor-pointer">
      <div className="h-[400px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 transform rounded-lg bg-white px-8 py-2 shadow-md">
        <h3 className="whitespace-nowrap text-center font-nunito text-lg font-medium text-[#090A0A] transition-all duration-300 group-hover:text-[#0060B7]">
          {title}
        </h3>
      </div>
    </div>
  );
}
