import { Container } from "@mui/material";

const AboutUs = () => {
  return (
    <Container
      maxWidth="lg"
      className="p-6 md:mt-96 md:p-10 my-10 min-h-screen bg-white rounded-lg shadow-md"
    >
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold text-black">
          درباره پرایموس
        </h1>
      </div>

      {/* Introduction Section */}
      <section
        className="text-right space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed"
        dir="rtl"
      >
        <p>
          حراجى، مزایده یا auction در تاریخ به عنوان یکی از محبوب‌ترین روش‌های
          خرید و فروش شناخته مى‌شود. محبوبیت بالای این مدل از خرید و فروش، سبب
          شده حراجى‌هاى آنلاین به موفقیت چشم‌گیری دست پیدا کنند و به سرعت گسترش
          یابند.
        </p>
        <p>
          حراجی‌های آنلاین یکی از پرکاربردترین روش‌های خرید و فروش محصولات مختلف
          در دنیا هستند که متأسفانه در برخی کشورها به دلیل نبود پلت‌فرم تخصصی،
          روان و مورد اعتماد، هنوز به مرحله‌ی فعالیت‌های گسترده نرسیده است.
        </p>
      </section>

      {/* Purpose Section */}
      <section
        className="mt-8 md:mt-12 text-right space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed"
        dir="rtl"
      >
        <p>
          <span className="font-bold text-black">پرایموس</span> با بهره‌گیری از
          تیم‌های قدرتمند و متخصص، برای پر کردن این خلاء در فضای خرید و فروش
          متولد شد.
        </p>
        <p>
          هدف از شکل‌گیری <span className="font-bold text-black">پرایموس</span>،
          ایجاد بستری برای رقابت سالم بین فروشندگان و خریداران است که منجر به
          ارائه قیمت‌های منطقی می‌شود.
        </p>
      </section>

      {/* New Closing Text */}
      <section
        className="mt-8 md:mt-12 text-right space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed font-semibold"
        dir="rtl"
      >
        <p>
          با پرایموس تجربه‌ای بی‌نظیر از حراجی آنلاین را تجربه خواهید کرد! با
          فرصت‌های استثنایی و قیمت‌های رقابتی، دنیایی متفاوت از خرید هوشمندانه
          را تجربه کنید.
        </p>
      </section>

      {/* Contact Information Section */}
      <div className="mt-12 md:mt-16 text-center" dir="rtl">
        <div className="text-gray-800">
          <p className="text-lg md:text-xl">
            <span className="font-bold">تلفن:</span>
            <a
              href="tel:02128428534"
              className="text-black hover:underline"
              dir="ltr"
            >
              ۰۲۱-۲۸۴۲۸۵۳۴
            </a>
          </p>
          <p className="text-lg md:text-xl">
            <span className="font-bold">ایمیل:</span>{" "}
            <a
              href="mailto:info@primus.com"
              className="text-black hover:underline"
            >
              info@pri22.com
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
