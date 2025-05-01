import React from "react";

export default function Contact() {
  return (
    <div className="mx-auto py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-2 font-nunito text-5xl font-medium text-[#0060B7]">Contact Us</h1>
        <p className="font-nunito text-xl text-[#717171]">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      <div className="mb-16 overflow-hidden rounded-lg bg-white p-4 shadow-sm">
        <div className="z-30 grid grid-cols-1 justify-between gap-8 md:grid-cols-5">
          {/* Contact Information */}
          <div className="relative col-span-2 rounded-xl bg-black p-10 text-white">
            <h2 className="mb-8 font-nunito text-2xl font-bold">Contact Information</h2>
            <p className="mb-4 font-nunito font-normal text-[#C9C9C9]">
              Say something to start a live chat!
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <span className="mr-4">✉️</span>
                <span className="font-nunito text-lg">samiautomationltd@gmail.com</span>
              </div>

              <div className="flex items-center">
                <span className="mr-4">📞</span>
                <span className="font-nunito text-lg">01905888766</span>
              </div>

              <div className="flex items-start">
                <span className="mr-4">📍</span>
                <span className="font-nunito text-lg">
                  Sami automation Nawabpur Complex,
                  <br />
                  Nawabpur Rd, Dhaka -1100
                </span>
              </div>
            </div>

            <div className="absolute -bottom-7 -right-2 z-0">
              <div className="size-28 rounded-full bg-gray-300 opacity-20"></div>
            </div>

            <div className="absolute bottom-10 right-10 z-0">
              <div className="size-16 rounded-full bg-gray-300 opacity-20"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-3">
            <form>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-nunito text-gray-600">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border-b border-gray-300 py-2 font-nunito focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-nunito text-gray-600">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full border-b border-gray-300 py-2 font-nunito focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-nunito text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-b border-gray-300 py-2 font-nunito focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-nunito text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880"
                    className="w-full border-b border-gray-300 py-2 font-nunito focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block font-nunito text-gray-600">Message</label>
                <textarea
                  placeholder="Write your message.."
                  rows="2"
                  className="w-full border-b border-gray-300 py-2 font-nunito focus:border-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="rounded-md bg-[#0060B7] px-8 py-3 font-nunito text-white hover:bg-[#00509E]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps - Free Embed */}
      <div className="mb-16">
        <div className="h-[400px] w-full overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29226.08587046777!2d90.40499302784065!3d23.70238133697383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900730dd8bf%3A0xc63e89f4bfca8097!2sNAWABPUR%20COMPLEX!5e0!3m2!1sen!2sbd!4v1746101574907!5m2!1sen!2sbd"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sami Automation Location"
            className="h-full w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
