import Index from "./(root)/_components/assets/Index";
import Loading from "./loading";

export default function MainPage() {
  return (
    <Loading>
      <main className="transition-fade">
        <section className="scroll-area justify-center text-center">
          <Index />
        </section>
      </main>
    </Loading>
  )
}
