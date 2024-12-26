"use client";

import { FaCircle, FaClock, FaMapMarkedAlt } from "react-icons/fa";
import { SiGooglemeet, SiMarketo } from "react-icons/si";
import { TbBrandZoom } from 'react-icons/tb';
import { SessionContextValue } from "next-auth/react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

interface SessionProps {
    session: SessionContextValue<boolean>;
}

const Status: React.FC<SessionProps> = ({ session }) => {
    if (!session.data || !session.data.user || !session.data.user.backend) {
        return <div></div>;
    }

    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const updatedAt = session.data.user.backend?.datePicker
        ? formatDate(session.data.user.backend?.datePicker)
        : "Unknown date";

    const unselectdate = "Tuesday, August 13, 2024 at 07:00 AM";

    const hideinfowhennotshd = updatedAt === unselectdate;
    const meetLink = session.data.user.backend.meetLink;
    const isGoogleMeet = meetLink.includes("meet.google.com");
    const isZoom = meetLink.includes("zoom.us");

    return (
        <div className="flex flex-wrap flex-col justify-center items-start border-2 border-r-4 border-b-4 rounded-md p-8 border-black dark:border-white w-fit h-fit gap-y-2">
            <div className="flex gap-1 items-center justify-center">
                <div className="flex items-center justify-center sm:text-[16px] text-[14px]">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">Registration Status:</span>
                        {session.data.user.backend.status === "NOT_REGISTER" && (
                            <>
                                <FaCircle size={16} color="gray" />
                                <span>Please register at the "Registration Form" first!</span>
                            </>
                        )}
                        {session.data.user.backend.status === "REJECT" && (
                            <>
                                <FaCircle size={16} color="red" />
                                <span>Your application is rejected!</span>
                            </>
                        )}
                        {session.data.user.backend.status === "WAITING" && (
                            <>
                                <FaCircle size={16} color="orange" />
                                <span>Your application is currently being screened!</span>
                            </>
                        )}
                        {session.data.user.backend.status === "SUCCESS" && (
                            <>
                                <FaCircle size={16} color="lime" />
                                <span>You have been selected for an interview!</span>
                            </>
                        )}
                        {session.data.user.backend.status === "PASS" && (
                            <>
                                <FaCircle size={16} color="ca98ff" />
                                <span>Welcome to OrcaBOT, you have been selected!</span>
                            </>
                        )}
                        {session.data.user.backend.status === "NOT_PASS" && (
                            <>
                                <FaCircle size={16} color="ff9090" />
                                <span>
                                    We appreciate your interest in our Club, unfortunately, you
                                    are not selected this time.
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {session.data.user.backend.status === "PASS" && (
                <div className="flex space-x-2">
                <Button
                    onClick={() =>
                        (window.location.href = `https://discord.gg/GmWFRy9R`)
                    }
                    className="bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all"
                >
                    Join Our Discord
                </Button>
                <Button
                    onClick={() =>
                        (window.location.href = `https://line.me/ti/g/zMJrMEaL9s`)
                    }
                    className="bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all"
                >
                    Join Our LINE Group
                </Button>
            </div>
            )}
            {(session.data.user.backend.status === "SUCCESS" ||
                session.data.user.backend.status === "PASS" ||
                session.data.user.backend.status === "NOT_PASS") &&
                !hideinfowhennotshd ? (
                <>
                    <p className="text-xl mt-5 font-bold">Interviewing Information</p>
                    <div className="flex flex-wrap flex-col">
                        <div className="flex gap-1 items-center justify-start text-muted-foreground">
                            <FaClock className="dark:text-white text-black" size={16} />
                            <span className="font-bold sm:text-[16px] text-[14px]">
                                Date Interview:
                            </span>
                            <span className="dark:text-white">{updatedAt}</span>
                        </div>
                        <div className="flex gap-1 items-center justify-start text-muted-foreground">
                            <FaMapMarkedAlt
                                className="dark:text-white text-black"
                                size={16}
                            />
                            <span className="font-bold sm:text-[16px] text-[14px]">
                                Interview Location:
                            </span>
                            <span className="dark:text-white">
                                {session.data.user.backend.userData?.interviewLocation ===
                                    "online" && <>Online</>}
                                {session.data.user.backend.userData?.interviewLocation ===
                                    "onsite" && <>On-site</>}
                            </span>
                        </div>
                        {session.data.user.backend.userData?.interviewLocation === "onsite" && (
                            <div className="text-muted-foreground">
                                <div className="flex gap-1 items-center justify-start">
                                    <SiMarketo className="dark:text-white text-black" size={16} />
                                    <span className="font-bold sm:text-[16px] text-[14px]">
                                        Campus:
                                    </span>
                                    <span className="dark:text-white">Rangsit</span>
                                </div>
                                <div className="mt-2 flex justify-center md:justify-start">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15480.561221042812!2d100.607458!3d14.068891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e27f8adde458f3%3A0x536c67b40b52eabe!2sSirindhorn%20International%20Institute%20of%20Technology%2C%20Rangsit%20Campus%20(SIIT-RS)!5e0!3m2!1sen!2sth!4v1720200642946!5m2!1sen!2sth"
                                        width="300"
                                        height="300"
                                        className="border-none rounded-md"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        rel="preload"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-1 items-center justify-start text-muted-foreground">
                            <div className="flex items-center gap-1">
                                {meetLink !== "wait" && session.data.user.backend.userData?.interviewLocation !== "onsite" && (
                                    <>
                                        {isGoogleMeet ? (
                                            <SiGooglemeet className="dark:text-white text-black" size={16} />
                                        ) : isZoom ? (
                                            <TbBrandZoom className="dark:text-white text-black" size={20} />
                                        ) : (
                                            <p></p>
                                        )}
                                        <span className="font-bold sm:text-[16px] text-[14px]">Link Interview:</span>
                                        <Button
                                            onClick={() => window.location.href = `${meetLink}`}
                                            className="bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all"
                                        >
                                            Join Interview
                                        </Button>
                                        {/* <Link
                    href={meetLink}
                    className="underline dark:text-white"
                    target="_blank"
                >
                    {meetLink}
                </Link> */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {session.data.user.backend.meetLink !== "wait" &&
                        session.data.user.backend.userData?.interviewLocation !== "onsite" && (
                            <>
                                {session.data.user.backend.meetLink.includes("meet.google.com") ? (
                                    <img
                                        src="https://i.pcmag.com/imagery/reviews/02y6SQ4hhnWGi8zjE2FlYqi-8..v1615070874.jpg"
                                        alt="Google Meet"
                                        className="w-96 rounded-md border"
                                    />
                                ) : session.data.user.backend.meetLink.includes("zoom.us") ? (
                                    <img
                                        src="https://i.pcmag.com/imagery/reviews/05fRE6utWAtXmByTrwqgdcU-9.fit_scale.size_760x427.v1569481702.jpg"
                                        alt="Zoom"
                                        className="w-96 rounded-md border"
                                    />
                                ) : (
                                    <p>Link type not supported</p>
                                )}
                            </>
                        )}

                </>
            ) : session.data.user.backend.status === "SUCCESS" ? (
                <>
                    <p className="text-xl mt-5 font-bold">You have not selected your Interview date!!</p>
                    {session.data.user.backend.userData?.interviewLocation ===
                        "online" && (
                            <div>
                                <span className="text-muted-foreground block">We see that you have selected an online Interview,</span>
                                <span className="text-muted-foreground block">We will reach out to you shortly with the details regarding the scheduled date and time.</span>
                            </div>
                        )}
                    {session.data.user.backend.userData?.interviewLocation === "onsite" && (
                        <div>
                            <Button
                                onClick={() =>
                                    (window.location.href = `https://calendar.app.google/D5HHDupcPhgf54GT6`)
                                }
                                className="w-full bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all"
                            >
                                Select Interview Date
                            </Button>
                            <span className="text-muted-foreground text-red-500">*Please use 6*********@g.siit.tu.ac.th</span>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );

};

export default Status;
