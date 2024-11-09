// pages/tutorial.tsx
import React from "react";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "ویدیو آموزشی پرایموس",
    description:
      " به وبسایت پرایموس خوش آمدید! در این ویدئو، قصد داریم شما را با روش کارکرد این پلتفرم حراجی آنلاین آشنا کنیم. در پرایموس، می‌توانید حراجی برگزار کنید و در حراجی‌های دیگران شرکت کنید و ... .",
    videoUrl: "/vid/intro.MOV",
  },
];

const TutorialPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 px-4 py-8 pt-32 md:pt-96 md:px-8"
      dir="rtl"
    >
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
          آموزش استفاده از پلتفرم پرایموس
        </h1>
        <p className="mt-4 text-gray-600">
          مجموعه‌ای از ویدیوهای آموزشی برای آشنایی شما با پلتفرم حراجی آنلاین
          پرایموس.
        </p>
      </header>

      {/* Video Tutorial Sections */}
      <section className="">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <video
              className="w-full rounded-t-lg"
              controls
              src={tutorial.videoUrl}
              poster="/images/video-placeholder.png"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {tutorial.title}
              </h2>
              <p className="text-gray-600">{tutorial.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TutorialPage;
