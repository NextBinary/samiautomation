import box from "@/assets/images/box.png";
import car from "@/assets/images/car.png";
import card from "@/assets/images/card.png";
import file from "@/assets/images/file.png";
import headphone from "@/assets/images/headphone.png";
import world from "@/assets/images/world.png";
import Image from "next/image";

export default function WhySamiAutomation() {
  const features = [
    {
      icon: headphone,
      title: "CUSTOMER CARE",
      description: "Sami automation Has customer care service",
    },
    {
      icon: car,
      title: "HOME DELIVERY",
      description: "Sami automation provide fastest Home Delivery All Over bangladesh",
    },
    {
      icon: card,
      title: "FAST PAYMENT",
      description: "All king of E-Payment for online order",
    },
    {
      icon: file,
      title: "ONE YEAR WARRANTY",
      description: "Sami automation provide one year service Warranty for all Product",
    },
    {
      icon: box,
      title: "AFTER SALES SERVICE",
      description: "Sami automation dedicate team available for your service 24/7",
    },
    {
      icon: world,
      title: "ASSEMBLING & SHIFTING",
      description: "Expert team ready for assembling & shifting service",
    },
  ];

  return (
    <section className="my-12 px-4 lg:my-24 lg:px-0">
      <h2 className="mb-6 text-center font-nunito text-2xl font-light text-[#202020] sm:mb-8 sm:text-3xl md:mb-10 md:text-left md:text-4xl">
        Why Sami Automation
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="group flex flex-col items-center text-center">
            <div className="flex items-center justify-center rounded-full p-3">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
                className="size-16 object-contain transition duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <h3 className="mb-2 font-nunito text-xl font-normal leading-7 text-[#141414]">
              {feature.title}
            </h3>
            <p className="font-nunito text-lg font-light leading-7 text-[#133240]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
