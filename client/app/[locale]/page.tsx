import Navbar from "./components/common/Navbar";
import FindPsychiatrists from "./components/FindPsychiatrists";
import Landing from "./components/Landing";
import Heading from "./components/common/Heading";
import Services from "./components/Services";
import AboutVitapsyche from "./components/AboutVitapsyche";
import Footer from "@components/common/Footer";
import ScrollToTopButton from "@components/scrollButton";
import DoctorCard from "@components/doctor/doctorCard";
import Button from "@components/common/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("recommendations");
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
          <Heading variant="secondary">{t("heading")}</Heading>
          <div className="flex flex-wrap justify-center gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <DoctorCard />
              </div>
            ))}
          </div>
          <Link href={"/doctorList"} className="flex justify-center mt-8">
            <Button variant="secondary" size="small" roundedValue="full">
              {t("showMore")}
            </Button>
          </Link>
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
