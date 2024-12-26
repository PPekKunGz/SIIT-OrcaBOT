import Maintenance from "@/app/(root)/_components/assets/Maintenance";
import Loading from "../../loading";

export default function Home() {
    return(
        <Loading>
            <div className="w-full min-h-screen h-full -my-28">
                <Maintenance/>
            </div>
        </Loading>
    )
}