"use client"
import { contactConfig } from "@/config/contactConfig";
import Link from "next/link";
import { Mail, Phone, MapPin, EarthIcon } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen h-full">
            <div className="flex justify-center flex-row">
                <div className="pt-10 lg:w-[768px] w-fit p-6 space-y-6 dark:text-white">
                    <section>
                        <h1 className="text-4xl font-bold">Contact</h1>
                    </section>
                    <section className="">
                        <p className="mt-4">{contactConfig.contact.desc1}&nbsp;
                            <Link href={`mailto:${contactConfig.contact.link}`} className="underline">{contactConfig.contact.link}</Link>
                            &nbsp;{contactConfig.contact.desc2}
                        </p>
                    </section>
                    <div className="flex flex-col gap-12 md:flex-row md:space-x-8">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <EarthIcon className="h-6 w-6 dark:text-white" />
                                <Link href={contactConfig.contact.web}>
                                    <p className="text-gray-700">
                                        {contactConfig.contact.web}
                                    </p>
                                </Link>
                            </div>
                            <Link href={`mailto:${contactConfig.contact.link}`}>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-6 w-6 dark:text-white" />
                                    <p className="text-gray-700">{contactConfig.contact.link}</p>
                                </div>
                            </Link>
                            {/* <div className="flex items-center space-x-2">
                                <Phone className="h-6 w-6 dark:text-white" />
                                <p className="text-gray-700">+66 (0){contactConfig.contact.phone}</p>
                            </div> */}
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-6 w-6 dark:text-white" />
                                <Link href={contactConfig.contact.mapLink}>
                                    <p className="text-gray-700">
                                        {contactConfig.contact.map1}
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-grow md:w-1/2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15480.561221042812!2d100.607458!3d14.068891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e27f8adde458f3%3A0x536c67b40b52eabe!2sSirindhorn%20International%20Institute%20of%20Technology%2C%20Rangsit%20Campus%20(SIIT-RS)!5e0!3m2!1sen!2sth!4v1720200642946!5m2!1sen!2sth"
                                width="auto"
                                height="300"
                                className="border-none rounded-md"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                rel="preload"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}