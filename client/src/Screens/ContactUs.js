import React from 'react';
import { FiPhoneCall, FiMapPin, FiMail } from 'react-icons/fi';
import Head from '../Components/Head';
import Layout from '../Layout/Layout';

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: 'Пишіть нам',
      info: 'З задоволення поспілкуємось',
      icon: FiMail,
      contact: 'kraboku@gmail.com',
    },
    {
      id: 2,
      title: 'Дзвоніть нам',
      info: 'Завжди раді чути вас',
      icon: FiPhoneCall,
      contact: '+380  777 777 777',
    },
    {
      id: 3,
      title: 'Розташування',
      info: 'Берестейський проспект (Перемоги), 37  Київ',
      icon: FiMapPin,
      contact: '',
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Зв'язок з нами" />
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>{' '}
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
