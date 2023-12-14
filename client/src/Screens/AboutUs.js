import React from 'react';
import Head from '../Components/Head';
import Layout from './../Layout/Layout';

function AboutUs() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Про нас" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Ласкаво просиво в KRABOKU
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                Загалом, Kraboku — це не просто стрімінговий сервіс, а справжній космос розваг. 
                Завдяки великому вибору, найкращій якості та інтуїтивному інтерфейсу, він став
                необхідністю для всіх, хто цінує високий стандарт в розважальній індустрії. 
                Отож, приготуйтеся до захопливого подорожі в світ розваг і відкрийте для себе 
                всі переваги Kraboku.
                </p>
                <p>
                Крім того, висока якість стрімінгу на Kraboku — це справжній фестиваль для очей 
                і вух. Незалежно від того, чи дивитесь ви фільм у 4K або слухаєте улюблену музику
                в найвищій якості звуку, сервіс завжди гарантує найкращий можливий враження від
                перегляду чи прослуховування.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-semibold my-2">Фільмів та сериалів</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    І поповнюються щодня
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">8K</span>
                  <h4 className="text-lg font-semibold my-2">Улюблених користувачів</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Обожнюють наш сервіс
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/images/head.png"
              alt="aboutus"
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
