"use client"
import { pageConfig } from "@/config/pageConfig";
import Image from "next/image";
import TeamSection from "../_components/assets/Team";
import Slider from "../_components/assets/Swiper";
import Loading from "@/app/loading";
import styles from '.././_components/assets/css/image-responsive.module.css';

export default function AboutPage() {
    return (
        <div className="min-h-screen h-full pt-10">
            <div className="flex justify-center flex-row">
                <div className="lg:w-[768px] w-fit p-6 space-y-6 dark:text-white">
                    <section>
                        <h1 className="text-6xl font-bold">About</h1>
                    </section>
                    <h2 className="text-2xl font-semibold">About our team</h2>
                    <h2 className="text-2xl font-semibold">2nd Gen</h2>
                    <section className="">
                        <div className={styles.slider}>
                            <Slider />
                        </div>
                        <p className="mt-4">
                            {pageConfig.description}
                        </p>
                    </section>
                    <h2 className="text-2xl font-semibold">1st Gen</h2>
                    <div className={styles.slider} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            src="https://i.imgur.com/1E9pF1M.jpeg"
                            alt=""
                            width={10}
                            height={10}
                            className="w-fit h-fit"
                            draggable="false" />
                    </div>
                    <div className=" border-b" />
                </div>
            </div>
            {/* <TeamSection /> */}
        </div>
    )
}