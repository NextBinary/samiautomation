import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SAMI Automation. Visit us at Nawabpur Complex, Dhaka, Bangladesh or send us a message for server racks, network cabinets, and automation solutions.",
  openGraph: {
    title: "Contact Us | SAMI Automation",
    description:
      "Get in touch with SAMI Automation. Visit us at Nawabpur Complex, Dhaka, Bangladesh.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
