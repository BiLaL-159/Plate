import appVersion from "../assets/app.png"
import appDownload from "../assets/appDownload.png"
export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-black">
            Delivered In a Blink
        </h1>
        <span className="text-xl">Explore. Order. Enjoy — the perfect bite awaits!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={appVersion}/>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
            Hungry? Let us bring the feast to you.
            </span>
            <span>
            Enjoy exclusive offers—Download our app now!
            </span>
            <img src={appDownload}/>
        </div>
      </div>
    </div>
  )
}
