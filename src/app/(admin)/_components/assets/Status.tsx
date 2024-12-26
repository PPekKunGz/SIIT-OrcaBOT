import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SessionContextValue, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaClock, FaMapMarkedAlt } from "react-icons/fa";
import { SiGooglemeet, SiMarketo } from "react-icons/si";
import { TbBrandZoom } from 'react-icons/tb';
import { Toaster, toast } from 'sonner';
import { PiWarningCircleFill } from "react-icons/pi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SessionProps {
    session: SessionContextValue<boolean>,
    data: DataRegister,
}

interface DataRegister {
    id: number
    email: string
    name: string
    role: string
    status: string
    meetLink: string
    datePicker: Date,
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
        phoneNumber: string;
    }
}

const Status: React.FC<SessionProps> = ({ session, data }) => {
    if (!session.data || !session.data.user) {
        return (<div></div>);
    }

    const [status, setStatus] = useState(data.status || "blank");
    const [meetLink, setMeetLink] = useState(data.meetLink || "wait");
    const [dataTime, setDataTime] = useState(data.datePicker || new Date());

    useEffect(() => {
        setStatus(data.status || "blank");
        setMeetLink(data.meetLink || "wait");
        setDataTime(data.datePicker || new Date());
    }, [data]);

    const confirm = () => {
        if (status === "blank") {
            window.alert("กรุณาเลือกข้อมูล");
            return;
        }
        toast.warning('Do you wish to proceed this?', {
            closeButton: true,
            duration: 3000,
            action: {
                label: 'Confirm',
                onClick: async () => {
                    toast.loading('Now sending your data...');
                    try {
                        await onSubmit();
                        toast.dismiss();
                        toast.success(
                            <div className="flex flex-col">
                                <span className="font-bold">Data Saved!</span>
                            </div>
                        );
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } catch (error) {
                        console.error("Error in onSubmit:", error);
                        toast.error('Failed to save data. Please try again.');
                    }
                }
            },
            cancel: {
                label: 'Cancel',
                onClick: () => toast.success('Cancelled sending!')
            },
        });
    };

    const onSubmit = async () => {
        const res = await fetch(`${process.env.apiUrl}/apis/v1/admin/@register/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'dms_token': session.data.user.accessToken || ""
            },
            body: JSON.stringify({
                id: data.id,
                status: status.toUpperCase(),
                meetLink: meetLink,
                datePicker: dataTime,
            }),
        });
        const result = await res.json();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setMeetLink(value === '' ? 'wait' : value);
    };

    const updatedAt = formatDate(data.datePicker.toString());

    const isGoogleMeet = data.meetLink.includes("meet.google.com");
    const isZoom = data.meetLink.includes("zoom.us");

    const emailToStudent = (a: string | null | undefined) => {
        if (a == undefined || a == null) return ""
        return a.split("@")[0]
    }

    return (
        <div className="flex flex-wrap flex-col justify-center items-start border-2 border-r-4 border-b-4 rounded-md p-8 border-black dark:border-white w-fit h-fit gap-y-2">
            <div className="flex gap-1 items-center justify-center">
                <div className="flex items-center justify-center sm:text-[16px] text-[14px]">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center">
                            <h1 className="text-2xl">Applicant Data ID: {emailToStudent(data.email)}</h1>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="font-bold">Current Registration Status:</span>
                            <span className="font-bold text-red-400">
                                {
                                    data.status === "NOT_REGISTER" &&
                                    <span className="text-gray-500">NOT_REGISTER</span>
                                }
                                {
                                    data.status === "REJECT" &&
                                    <span className="text-red-500">REJECT</span>
                                }
                                {
                                    data.status === "WAITING" &&
                                    <span className="text-orange-500">WAITING</span>
                                }
                                {
                                    data.status === "SUCCESS" &&
                                    <span className="text-green-500">SUCCESS</span>
                                }
                                {
                                    data.status === "PASS" &&
                                    <span className="ca98ff">PASS</span>
                                }
                                {
                                    data.status === "NOT_PASS" &&
                                    <span className="text-red-500">NOT_PASS</span>
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Registration Status:</span>
                            <span className="flex flex-row">
                                <div>
                                    <select
                                        name="status"
                                        id="status"
                                        className={`rounded-md p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${status === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                                        value={status}
                                        onChange={(event) => setStatus(event.target.value)}
                                    >
                                        <option value="blank" disabled>-- select an option --</option>
                                        <option value="not_register" className="text-black dark:text-white">NOT_REGISTER</option>
                                        <option value="reject" className="text-black dark:text-white">REJECT</option>
                                        <option value="waiting" className="text-black dark:text-white">WAITING</option>
                                        <option value="success" className="text-black dark:text-white">SUCCESS</option>
                                        <option value="pass" className="text-black dark:text-white">PASS</option>
                                        <option value="not_pass" className="text-black dark:text-white">NOT_PASS</option>
                                    </select>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xl mt-5 font-bold">Interview Information</p>
            <div className="flex flex-wrap flex-col">
                <div className="flex sm:flex-row flex-col justify-center text-muted-foreground">
                    <div className="flex sm:flex-row sm:items-center items-start flex-col gap-1">
                        <FaClock className="hidden sm:flex dark:text-white text-black" size={16} />
                        <span className="sm:block flex items-center gap-1 font-bold sm:text-[16px] text-[14px] ">
                            <FaClock className="sm:hidden flex dark:text-white text-black" size={16} />
                            Date Interview:
                        </span>
                        <span className="dark:text-white">{updatedAt}</span>
                    </div>
                </div>
                <div className="flex w-fit">
                    <Input
                        type="datetime-local"
                        id="datePicker"
                        name="datePicker"
                        min="2024-08-13T00:00:00"
                        max="2024-10-13T00:00:00"
                        step={1}
                        onChange={(e) => setDataTime(new Date(e.target.value))}
                    />
                </div>
                <div className="flex gap-1 items-center justify-start text-muted-foreground">
                    <FaMapMarkedAlt className="dark:text-white text-black" size={16} />
                    <span className="font-bold sm:text-[16px] text-[14px]">Interview Location:</span>
                    <span className="dark:text-white">
                        {data.userData.interviewLocation === "online" && <>Online</>}
                        {data.userData.interviewLocation === "onsite" && <>On-site</>}
                    </span>
                </div>
                {data.userData.interviewLocation === "onsite" && (
                    <div className="flex gap-1 items-center justify-start text-muted-foreground">
                        <SiMarketo className="dark:text-white text-black" size={16} />
                        <span className="font-bold sm:text-[16px] text-[14px]">Campus:</span>
                        <span className="dark:text-white">Rangsit</span>
                    </div>
                )}

                {data.userData.interviewLocation === "online" && (
                    <div className="flex gap-1 items-center justify-start text-muted-foreground">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                {isGoogleMeet ? (
                                    <SiGooglemeet className="dark:text-white text-black" size={16} />
                                ) : isZoom ? (
                                    <TbBrandZoom className="dark:text-white text-black" size={20} />
                                ) : (
                                    <p> </p>
                                )}
                                <span className="font-bold sm:text-[16px] text-[14px]">Link Interview:</span>
                            </div>
                            <Input placeholder={data.meetLink} onChange={handleInputChange} />
                        </div>
                    </div>
                )}
            </div>
            {data.userData.interviewLocation === "online" && (
                <>
                    {data.meetLink.includes("meet.google.com") ? (
                        <img
                            src="https://i.pcmag.com/imagery/reviews/02y6SQ4hhnWGi8zjE2FlYqi-8..v1615070874.jpg"
                            alt="Google Meet"
                            className="w-96 rounded-md"
                        />
                    ) : data.meetLink.includes("zoom.us") ? (
                        <img
                            src="https://i.pcmag.com/imagery/reviews/05fRE6utWAtXmByTrwqgdcU-9.fit_scale.size_760x427.v1569481702.jpg"
                            alt="Zoom"
                            className="w-96 rounded-md"
                        />
                    ) : (
                        <p></p>
                    )}
                </>
            )}

            <Toaster richColors expand position="top-right" duration={5000} />
            <Button onClick={confirm} className="w-full bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all">
                Confirm
            </Button>
        </div>
    );
};

export default Status;

