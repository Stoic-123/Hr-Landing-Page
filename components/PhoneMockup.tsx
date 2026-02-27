import Image from "next/image";

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto h-[600px] w-[300px]">
      {/* Real Phone Frame */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Image
          src="/PhoneFrame.png"
          alt="Phone Mockup"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* App Content - Positioned inside the frame */}
      {/* Adjusting padding/margins to fit inside the screen area of the image */}
      <div className="absolute top-[1.82%] left-[3%] right-[3%] bottom-[2%] z-10 rounded-4xl overflow-hidden bg-primary-600 mx-auto">
        <div className="relative h-full w-full bg-zinc-50">
          <Image
            src="/HrLanding.jpg"
            alt="HR App Dashboard"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  );
}
