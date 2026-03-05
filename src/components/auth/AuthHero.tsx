import logo from "../../assets/logo.png";
export const AuthHero = () => {
  return (
    <div className="flex flex-col  gap-6 lg:gap-16 py-10">

        <div className="">
          <img
            src={logo}
            alt="Cotechy"
            className="w-[202.731px] h-[52.657px] object-contain"
          />
        </div>
    
      <section> </section>
      <main className="">
        <h1 className="font-semibold text-[40px] md:text-[72px] lg:text-[108.115px] leading-[112.694%] tracking-[-10.812px] text-white">
          Build Your{" "}<br/>
          <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]">
            Skills
          </span>{" "}
          Online
        </h1>
        <p className="text-[14px] md:text-[18px] lg:text-[24px] font-normal leading-[145%] tracking-[-1.2px] text-white/75 max-w-[598.881px]">
          Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis
          neque sagittis malesuada mi erat natoque malesuada.
        </p>
      </main>
    </div>
  );
};
