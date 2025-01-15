import hero from "../assets/Hero.jpg";
export default function Hero() {
  return (
    <div>
      <img src={hero} className="w-full max-h-[600px] object-cover"/>
    </div>
  )
}
