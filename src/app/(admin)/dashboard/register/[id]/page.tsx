"use client"

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import React from "react";
import PersonalPage from '../../../_components/assets/Personal'
import { FaAddressCard, FaBars, FaCircle } from "react-icons/fa";
import Status from "../../../_components/assets/Status";
import Loading from "../../loading";

interface SessionProps {
    params: {
        id: string
    }
}

interface DataRegister {
    id: number
    email: string
    name: string
    role: string
    status: string
    meetLink: string
    datePicker: Date
    createdAt: string
    updatedAt: string
    userData: {
        lineID: string;
        program: string;
        academicYear: string;
        degree: string;
        campus: string;
        clubRole: string;
        whyJoinClub: string;
        afterBetterClub: string;
        portfolio: string;
        interviewLocation: string;
        phoneNumber: string,
    }
}

const AuthSession: React.FC<SessionProps> = ({ params }) => {
    const session = useSession();
    const router = useRouter();

    if (session.data?.user.backend?.role != "ADMIN") {
        const msg = "%c Hey!! You're not ADMIN!"
        const styles = [
            'font-size: 12px',
            'font-family: monospace',
            'background: white',
            'display: inline-block',
            'color: black',
            'padding: 8px 19px',
            'border: 1px dashed;'
        ].join(';')
        console.log(msg, styles);
        router.push("/")
    }

    if (!session.data || !session.data.user) {
        return (<div></div>)
    }

    const [selectPage, setSelectPage] = useState<string>("personal")
    const [data, setData] = useState<DataRegister>();

    const registerCount = async () => {
        const res = await fetch(`${process.env.apiUrl}/apis/v1/admin/@register/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'dms_token': session.data?.user.accessToken || ""
            },
            body: JSON.stringify({
                email: params.id,
            })
        });

        const { code, personalData }: { code: number, personalData: DataRegister } = await res.json();

        if (code === 200) {
            setData(personalData);
        }
    }

    useEffect(() => {
        registerCount();
    }, []);

    if (!data) {
        return <Loading children={undefined} />
    }

    return (
        <div className="min-h-screen h-full w-screen">
            <div className="relative flex flex-col lg:flex-row">

                <div className="flex flex-row lg:hidden justify-center w-full h-fit py-2 gap-2">
                    <button onClick={() => setSelectPage("personal")} disabled={selectPage === "personal"} className="bg-black/20 p-2 rounded-lg hover:scale-110 active:scale-90 duration-300">
                        <FaAddressCard size={30} />
                    </button>
                    <button onClick={() => setSelectPage("status")} disabled={selectPage === "status"} className="bg-black/20 p-2 rounded-lg hover:scale-110 active:scale-90 duration-300">
                        <FaBars size={30} />
                    </button>
                </div>

                <div className="hidden lg:block min-w-[20rem] h-screen px-10 pt-4">
                    <div className="flex flex-col w-full h-fit gap-2">
                        <button
                            onClick={() => router.back()}
                            className="gap-1 outline-none flex items-center justify-center flex-row py-3 rounded-lg border w-full duration-300 border-black/80 dark:border-white/80 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90"
                        >
                            <p className="text-lg -translate-x-3">Back</p>
                        </button>
                        <button disabled={selectPage === "personal"} onClick={() => setSelectPage("personal")} className="gap-1 outline-none flex items-center justify-center flex-row py-3 rounded-lg border w-full duration-300 border-black/80 dark:border-white/80 disabled:bg-black/80 disabled:text-white dark:disabled:bg-white/20 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 disabled:active:scale-100">
                            <FaAddressCard size={30} className="-translate-x-3" />
                            <p className="text-lg -translate-x-3">Registration Form</p>
                        </button>

                        <button disabled={selectPage === "status"} onClick={() => setSelectPage("status")} className="gap-1 outline-none flex items-center justify-center flex-row py-3 rounded-lg border w-full duration-300 border-black/80 dark:border-white/80 disabled:bg-black/80 disabled:text-white dark:disabled:bg-white/20 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 disabled:active:scale-100">
                            <FaBars size={30} />
                            <p className="text-lg">Registration Status</p>
                            {
                                data.status == "NOT_REGISTER" &&
                                <>
                                    <FaCircle size={10} color="gray" className="-translate-y-2 -translate-x-1" />
                                </>
                            }
                            {
                                data.status == "REJECT" &&
                                <>
                                    <FaCircle size={10} color="red" className="-translate-y-2 -translate-x-1" />
                                </>
                            }
                            {
                                data.status == "WAITING" &&
                                <>
                                    <FaCircle size={10} color="orange" className="-translate-y-2 -translate-x-1" />
                                </>
                            }
                            {
                                data.status == "SUCCESS" &&
                                <>
                                    <FaCircle size={10} color="lime" className="-translate-y-2 -translate-x-1" />
                                </>
                            }
                            {
                                data.status == "PASS" &&
                                <>
                                    <FaCircle size={10} color="ca98ff" className="-translate-y-2 -translate-x-1" />
                                </>
                            }
                            {
                                data.status == "NOT_PASS" &&
                                <>
                                    <FaCircle size={10} color="ff9090" className="-translate-y-2 -translate-x-1" />
                                </>
                            }
                        </button>

                    </div>
                </div>

                <div className="relative flex justify-center w-full min-h-screen h-full mt-4 mb-4">
                    {
                        selectPage === "personal" && (<PersonalPage data={data} />)
                    }
                    {
                        selectPage === "status" && (<Status session={session} data={data} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthSession;
