import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SessionContextValue } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from 'sonner'
import { PiWarningCircleFill } from "react-icons/pi";


interface SessionProps {
    session: SessionContextValue<boolean>
}

const PersonalPage: React.FC<SessionProps> = ({ session }) => {
    if (!session.data || !session.data.user || !session.data.user.backend) {
        return (<div></div>)
    }

    const emailToStudent = (a: string | null | undefined) => {
        if (a == undefined || a == null) return ""
        return a.split("@")[0]
    }
    const [globalDisabled, setGlobalDisabled] = useState<boolean>(false);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [sProgram, setSProgram] = useState("blank")
    const [sAcademicY, setSAcademicY] = useState("blank")
    const [sInterview, setSInterview] = useState("blank")
    const [sDegree, setSDegree] = useState("blank")
    const [sCampus, setSCampus] = useState("blank")
    const [sPosition, setSPosition] = useState("blank")
    const [sLineID, setSLineID] = useState("")
    const [sWhyJoinClub, setSWhyJoinClub] = useState("")
    const [sAfterBetterClub, setSAfterBetterClub] = useState("")
    const [sPortfolio, setSPortfolio] = useState("")
    const [sPhoneNumber, setSPhoneNumber] = useState("")

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.replace(/\D/g, '');
        setSPhoneNumber(newValue);
    };

    const onSubmit = async () => {
        const res = await fetch(`${process.env.apiUrl}/apis/v1/user/@personal/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'dms_token': session.data.user.accessToken || ""
            },
            body: JSON.stringify({
                lineID: sLineID,
                program: sProgram,
                academicYear: sAcademicY,
                degree: sDegree,
                campus: sCampus,
                clubRole: sPosition,
                whyJoinClub: sWhyJoinClub,
                afterBetterClub: sAfterBetterClub,
                portfolio: sPortfolio,
                interviewLocation: sInterview,
                phoneNumber: sPhoneNumber,
            }),
        })
        const { code }: { code: number } = await res.json();
        if (code === 200) {
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
    }

    const toggleEdit = async () => {
        const res = await fetch(`${process.env.apiUrl}/public/toggleEdit.json`, {
            method: 'GET',
        })
        const dataRes: { toggleEdit: boolean } = await res.json();
        setGlobalDisabled(!dataRes.toggleEdit)
    }

    const toggleEditStatus = async () => {
        const res = await fetch(`${process.env.apiUrl}/public/toggleEdit.json`, {
            method: 'GET',
        })
        const dataRes: { toggleEdit: boolean } = await res.json();
        setGlobalDisabled(!dataRes.toggleEdit)
    }

    useEffect(() => {
        if (session.data.user.backend && session.data.user.backend.userData) {
            const { lineID, program, academicYear, degree, campus, clubRole, whyJoinClub, afterBetterClub, portfolio, interviewLocation, phoneNumber } = session.data.user.backend.userData;
            if (lineID) setSLineID(lineID)
            if (program) setSProgram(program)
            if (academicYear) setSAcademicY(academicYear)
            if (degree) setSDegree(degree)
            if (campus) setSCampus(campus)
            if (clubRole) setSPosition(clubRole)
            if (whyJoinClub) setSWhyJoinClub(whyJoinClub)
            if (afterBetterClub) setSAfterBetterClub(afterBetterClub)
            if (portfolio) setSPortfolio(portfolio)
            if (interviewLocation) setSInterview(interviewLocation)
            if (phoneNumber) setSPhoneNumber(phoneNumber)
        }

        if (session.data.user.backend && (session.data.user.backend.status == "SUCCESS" || session.data.user.backend.status == "REJECT" || session.data.user.backend.status == "PASS" || session.data.user.backend.status == "NOT_PASS")) {
            setGlobalDisabled(true)
        } else {
            toggleEdit()
        }
    }, [])

    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const updatedAt = session.data.user.backend?.updatedAt
        ? formatDate(session.data.user.backend?.updatedAt)
        : "Unknown date";

    // console.log(updatedAt)

    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: `Personal ID: ${emailToStudent(session.data.user.email)}` }), 2000));
    const apply = () => {
        if (sProgram === "blank" || sAcademicY === "blank" || sInterview === "blank" || sDegree === "blank" || sCampus === "blank" || sPosition === "blank" ||
            sLineID.length === 0 ||
            sWhyJoinClub.length === 0 ||
            sAfterBetterClub.length === 0 ||
            sPhoneNumber.length === 0
        ) {
            toast(
                <div>
                    <div className="flex items-center justify-center gap-1">
                        <PiWarningCircleFill size={18} className="text-yellow-400" />
                        <span className="text-gray-600 font-bold">Please provide all necessary information first!</span>
                    </div>
                </div>,
                {
                    duration: 3000,
                    closeButton: true
                }
            )
            return;
        }
        if (sPortfolio && !sPortfolio.startsWith("https://")) {
            toast(
                <div>
                    <div className="flex items-center justify-center gap-1">
                        <PiWarningCircleFill size={18} className="text-yellow-400" />
                        <span className="text-gray-600 font-bold">Please provide a valid URL for the Portfolio field!</span>
                    </div>
                </div>,
                {
                    duration: 3000,
                    closeButton: true
                }
            )
            return;
        }
        if (!sPhoneNumber.length || sPhoneNumber.length !== 10) {
            toast(
                <div>
                    <div className="flex items-center justify-center gap-1">
                        <PiWarningCircleFill size={18} className="text-yellow-400" />
                        <span className="text-gray-600 font-bold">Please provide a valid Phone Number!</span>
                    </div>
                </div>,
                {
                    duration: 3000,
                    closeButton: true
                }
            )
            return;
        }
        toast.warning('Do you wish to proceed the form?', {
            closeButton: true,
            duration: 3000,
            action: {
                label: 'Confirm',
                onClick: () => {
                    toast.promise(promise, {
                        loading: 'Now sending your data...',
                        success: (data: any) => {
                            return (
                                <div className="flex flex-col">
                                    <span className="font-bold">{data.name}</span>
                                    <span className="text-muted-foreground">
                                        Data Saved, Check Status Page for more information.
                                    </span>
                                </div>
                            )
                        }
                    });
                    onSubmit();
                    setIsDisable(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            },
            cancel: {
                label: 'Cancel',
                onClick: () => toast.success('Cancelled sending!')
            },
        });
    };

    return (
        <div className="flex flex-wrap flex-col justify-center items-center border-2 border-r-4 border-b-4 rounded-md p-8 border-black dark:border-white w-fit h-fit gap-y-2">
            <p className="text-3xl">Personal Information</p>
            <span className="text-[.96rem] text-gray-400">
                The application is now currently{" "}
                <span className={globalDisabled ? "text-red-500" : "text-green-500"}>
                    {globalDisabled ? "Closed!" : "Open!"}
                </span>
            </span>
            <span className="text-[1.3rem] underline translate-y-2">Please click "Edit" on the bottom to fill the application!</span>
            <span className="text-[.96rem] text-red-500 underline translate-y-2">*Don't refresh the page before you submit this form.</span>
            <span className="text-[.86rem] text-red-500 underline translate-y-2">You can re-summit this form many times until the form closed!</span>
            <div className="flex flex-col gap-2">

                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <Label htmlFor="text">Full Name</Label>
                        <Input type="text" placeholder={session.data.user.name || ""} disabled className="dark:placeholder:text-white placeholder:text-black" />
                    </div>
                    <div>
                        <Label htmlFor="text">Student ID</Label>
                        <Input type="text" placeholder={emailToStudent(session.data.user.email)} disabled className="dark:placeholder:text-white placeholder:text-black" />
                    </div>
                    <div className="flex justify-between flex-col">
                        <Label htmlFor="lindid" className="py-1">Line ID</Label>
                        <Input type="text" required disabled={globalDisabled ? true : (!isDisable)} placeholder={session.data.user.backend?.userData?.lineID} value={sLineID} onChange={(event) => setSLineID(event.target.value)} name="lineID" className="" maxLength={18} />
                    </div>
                    <div className="flex justify-between flex-col ">
                        <Label htmlFor="program" className="py-1">Program</Label>
                        <span className="text-[.65rem] text-gray-400">If you're a 1st year student, please select your expected Program!</span>
                        {/* <Select
                            value={sProgram}
                            onValueChange={setSProgram}
                           disabled={globalDisabled || !isDisable}
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="-- select an option --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank" disabled>
                                    -- select an option --
                                </SelectItem>
                                <SelectItem value="che">ChE</SelectItem>
                                <SelectItem value="ce">CE</SelectItem>
                                <SelectItem value="ie">IE</SelectItem>
                                <SelectItem value="me">ME</SelectItem>
                                <SelectItem value="ee">EE</SelectItem>
                                <SelectItem value="cpe">CPE</SelectItem>
                                <SelectItem value="de">DE</SelectItem>
                                <SelectItem value="ba">BA</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <select
                            name="program"
                            id="program"
                            className={`rounded-md p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${sProgram === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                            value={sProgram}
                            required

                            disabled={globalDisabled ? true : (!isDisable)}
                            onChange={(event) => setSProgram(event.target.value)}
                        >
                            <option value="blank" disabled>-- select an option --</option>
                            <option value="che" className="text-black dark:text-white">ChE</option>
                            <option value="ce" className="text-black dark:text-white">CE</option>
                            <option value="ie" className="text-black dark:text-white">IE</option>
                            <option value="me" className="text-black dark:text-white">ME</option>
                            <option value="ee" className="text-black dark:text-white">EE</option>
                            <option value="cpe" className="text-black dark:text-white">CPE</option>
                            <option value="de" className="text-black dark:text-white">DE</option>
                            <option value="ba" className="text-black dark:text-white">BA</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="flex justify-between flex-col ">
                        <Label htmlFor="text" className="py-1">Academic Year</Label>
                        {/* <Select
                            value={sAcademicY}
                            onValueChange={setSAcademicY}
                           disabled={globalDisabled || !isDisable}
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="-- select an option --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank" disabled>
                                    -- select an option --
                                </SelectItem>
                                <SelectItem value="firstyear">First Year</SelectItem>
                                <SelectItem value="secondyear">Second Year</SelectItem>
                                <SelectItem value="thirdyear">Third Year</SelectItem>
                                <SelectItem value="forthyear">Forth Year</SelectItem>
                                <SelectItem value="aboveforthyear">Above Forth Year</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <select
                            name="academicy"
                            id="academicy"
                            className={`rounded-sm p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${sAcademicY === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                            value={sAcademicY}
                            required

                            disabled={globalDisabled ? true : (!isDisable)}
                            onChange={(event) => setSAcademicY(event.target.value)}
                        >
                            <option value="blank" disabled>-- select an option --</option>
                            <option value="firstyear" className="text-black dark:text-white">First Year</option>
                            <option value="secondyear" className="text-black dark:text-white">Second Year</option>
                            <option value="thirdyear" className="text-black dark:text-white">Third Year</option>
                            <option value="forthyear" className="text-black dark:text-white">Forth Year</option>
                            <option value="aboveforthyear" className="text-black dark:text-white">Above Forth Year</option>
                        </select>
                    </div>
                    <div className="flex justify-between flex-col">

                        <Label htmlFor="text" className="py-1">Degree</Label>
                        {/* <Select
                            value={sDegree}
                            onValueChange={setSDegree}
                           disabled={globalDisabled || !isDisable}
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="-- select an option --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank" disabled>
                                    -- select an option --
                                </SelectItem>
                                <SelectItem value="bachelor">Bachelor Degree</SelectItem>
                                <SelectItem value="master">Master Degree</SelectItem>
                                <SelectItem value="ph.d.">Ph.D.</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <select
                            name="degree"
                            id="degree"
                            className={`rounded-md p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${sDegree === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                            value={sDegree}
                            required

                            disabled={globalDisabled ? true : (!isDisable)}
                            onChange={(event) => setSDegree(event.target.value)}
                        >
                            <option value="blank" disabled>-- select an option --</option>
                            <option value="bachelor" className="text-black dark:text-white">Bachelor Degree</option>
                            <option value="master" className="text-black dark:text-white">Master Degree</option>
                            <option value="ph.d." className="text-black dark:text-white">Ph.D.</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="flex justify-between flex-col">
                        <Label htmlFor="text" className="py-1">Main Campus</Label>
                        {/* <Select
                            value={sCampus}
                            onValueChange={setSCampus}
                           disabled={globalDisabled || !isDisable}
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="-- select an option --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank" disabled>
                                    -- select an option --
                                </SelectItem>
                                <SelectItem value="bangkadi">Bangkadi</SelectItem>
                                <SelectItem value="rangsit">Rangsit</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <select
                            name="campus"
                            id="campus"
                            className={`rounded-md p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${sCampus === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                            value={sCampus}
                            required

                            disabled={globalDisabled ? true : (!isDisable)}
                            onChange={(event) => setSCampus(event.target.value)}
                        >
                            <option value="blank" disabled>-- select an option --</option>
                            <option value="bangkadi" className="text-black dark:text-white">Bangkadi</option>
                            <option value="rangsit" className="text-black dark:text-white">Rangsit</option>
                        </select>
                    </div>
                    <div className="flex justify-between flex-col">
                        <Label htmlFor="text" className="py-1">Club Role</Label>
                        {/* <Select
                            value={sPosition}
                            onValueChange={setSPosition}
                           disabled={globalDisabled || !isDisable}
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="-- select an option --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank" disabled>
                                    -- select an option --
                                </SelectItem>
                                <SelectItem value="lowlevel">Low Level</SelectItem>
                                <SelectItem value="hoghlevel">High Level</SelectItem>
                                <SelectItem value="mechanic">Mechanic</SelectItem>
                                <SelectItem value="electronic">Electronic</SelectItem>
                                <SelectItem value="other">Other (Only if You're an exception)</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <select
                            name="position"
                            id="position"
                            className={`rounded-md p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${sPosition === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                            value={sPosition}
                            required

                            disabled={globalDisabled ? true : (!isDisable)}
                            onChange={(event) => setSPosition(event.target.value)}
                        >
                            <option value="blank" disabled>-- select an option --</option>
                            <option value="lowlevel" className="text-black dark:text-white">Low Level</option>
                            <option value="hoghlevel" className="text-black dark:text-white">High Level</option>
                            <option value="mechanic" className="text-black dark:text-white">Mechanic</option>
                            <option value="electronic" className="text-black dark:text-white">Electronic</option>
                            <option value="other" className="text-black dark:text-white">Other (Only if You're an exception)</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between flex-col">
                    <Label htmlFor="text">Phone Number</Label>
                    <span className="text-[.65rem] text-gray-400"> *Only Thai Number</span>
                    <Input name="phoneNumber" type="tel" maxLength={10} required disabled={globalDisabled ? true : (!isDisable)} placeholder={session.data.user.backend?.userData?.phoneNumber || "012 345 6789"} value={sPhoneNumber} onChange={handlePhoneNumberChange} className="" />
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-3xl">Screening Questions</p>
                </div>
                <span className="text-[.96rem] text-gray-400">*Please Answer Elaborately in English but Thai is also acceptable</span>
                <span className="text-[.86rem] text-gray-400">Don't afraid to be too casual, feel free to be yourself in the answer!</span>
                <div>
                    <Label htmlFor="text">Why do you want to join this club?</Label>
                    <Textarea name="whyJoinClub" required disabled={globalDisabled ? true : (!isDisable)} placeholder={session.data.user.backend?.userData?.whyJoinClub || "Type your message here."} value={sWhyJoinClub} onChange={(event) => setSWhyJoinClub(event.target.value)} id="message" />
                </div>
                <div>
                    <Label htmlFor="text">What do you do after you joining or make it much better for the club?</Label>
                    <Textarea name="afterBetterClub" required disabled={globalDisabled ? true : (!isDisable)} placeholder={session.data.user.backend?.userData?.afterBetterClub || "Type your message here."} value={sAfterBetterClub} onChange={(event) => setSAfterBetterClub(event.target.value)} id="message" />
                </div>
                <div className="flex justify-between flex-col">
                    <Label htmlFor="text">Portfolio (Link)</Label>
                    <span className="text-[.65rem] text-gray-400">*This is optional, but If you have one, you may attach them!</span>
                    <Input name="portfolio" type="url" required disabled={globalDisabled ? true : (!isDisable)} placeholder={session.data.user.backend?.userData?.portfolio || "Portfolio Link"} value={sPortfolio} onChange={(event) => setSPortfolio(event.target.value)} className="" />
                </div>
                <div className="flex justify-between flex-col">

                    <Label htmlFor="text" className="py-1">Interview Location</Label>
                    {/* <Select
                            value={sInterview}
                            onValueChange={setSInterview}
                           disabled={globalDisabled || !isDisable}
                        >
                            <SelectTrigger className="w-[500px]">
                                <SelectValue placeholder="-- select an option --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank" disabled>
                                    -- select an option --
                                </SelectItem>
                                <SelectItem value="onsite">On-Site</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                            </SelectContent>
                        </Select> */}
                    <select
                        name="interview"
                        id="interview"
                        className={`rounded-md p-1 py-2 border border-black/20 dark:border-white/10 outline-none ${sInterview === 'blank' ? 'text-zinc-500' : 'dark:text-white text-black'}`}
                        value={sInterview}
                        required

                        disabled={globalDisabled ? true : (!isDisable)}
                        onChange={(event) => setSInterview(event.target.value)}
                    >
                        <option value="blank" disabled>-- select an option --</option>
                        <option value="onsite" className="text-black dark:text-white">On-Site</option>
                        <option value="online" className="text-black dark:text-white">Online</option>
                    </select>
                </div>
                <div className="flex justify-end pt-4 gap-4">
                    <div className="flex">
                        <Toaster richColors expand position="top-right" duration={5000} />
                        <Button variant={isDisable ? "yes" : "outline"} disabled={globalDisabled} onClick={() => { if (isDisable) (apply()) }}>Apply</Button>
                    </div>
                    <div className="flex">
                        <Button type="button" variant={isDisable ? "outline" : "edit"} disabled={globalDisabled} onClick={() => setIsDisable(!isDisable)}>Edit</Button>

                    </div>
                </div>
                <div>
                    <span className="text-[.90rem] text-gray-400">
                        By submitting this form, you agree to provide your information to us and consent to our <a href="https://orcabot.in.th/privacy-policy" className="underline">Privacy Policy</a> and <a href="https://orcabot.in.th/terms-condition" className="underline">Terms and Conditions</a>.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PersonalPage;