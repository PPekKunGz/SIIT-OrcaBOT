import Maintenance from "@/app/(root)/_components/assets/Maintenance";
import Loading from "../../loading";

export default function About() {
    return(
        <Loading>
            <div className="w-full -my-28">
                <Maintenance/>
            </div>
        </Loading>
    )
}