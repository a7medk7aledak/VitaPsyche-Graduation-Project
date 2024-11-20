import Navbar from "./components/common/Navbar";
import FindPsychiatrists from "./components/FindPsychiatrists";
import Landing from "./components/Landing";
import Heading from "./components/common/Heading";
import Services from "./components/Services";
import AboutVitapsyche from "./components/AboutVitapsyche";
import Footer from "@components/common/Footer";
import ScrollToTopButton from "@components/scrollButton";

export default function Home() {
  return (
    <>
      <ScrollToTopButton />
      <div className=" bg-[#dce9e6] -z-20">
        <Navbar />

        {/* landing page */}
        <Landing />
        {/* landing page */}
      </div>

      {/* find psychiatrists */}
      <FindPsychiatrists />
      {/* find psychiatrists */}

      {/* Psychiatrists recommandations */}
      <section id="recommandations" className="relative">
        <div className="container mx-auto px-3">
          <Heading variant="secondary">The most famous psychiatrists</Heading>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {/* box */}
            <div className="w-[300px] h-[300px] border-2 p-10 text-center text-3xl">
              <h2>To Do...</h2>
            </div>
            {/* box */}

            {/* box */}
            <div className="w-[300px] h-[300px] border-2 p-10 text-center text-3xl">
              <h2>To Do...</h2>
            </div>
            {/* box */}

            {/* box */}
            <div className="w-[300px] h-[300px] border-2 p-10 text-center text-3xl">
              <h2>To Do...</h2>
            </div>
            {/* box */}
          </div>
        </div>
      </section>
      {/* Psychiatrists recommandations */}

      {/* services */}
      <Services />
      {/* services */}

      {/* about vitapsyche */}
      <AboutVitapsyche />
      {/* about vitapsyche */}

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
}
