import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const Links = [
    {
      title: 'Компанія',
      links: [
        {
          name: 'Головна',
          link: '/',
        },
        {
          name: 'Про нас',
          link: '/about-us',
        },
        {
          name: "Зв'яжіться з нами",
          link: '/contact-us',
        },
        {
          name: 'Фільми',
          link: '/movies',
        },
      ],
    },
    {
      title: 'Основні категорії',
      links: [
        {
          name: 'Екшн',
          link: '#',
        },
        {
          name: 'Романтика',
          link: '#',
        },
        {
          name: 'Драма',
          link: '#',
        },
        {
          name: 'Історичний',
          link: '#',
        },
      ],
    },
    {
      title: 'Мій обліковий запис',
      links: [
        {
          name: 'Приладова панель',
          link: '/dashboard',
        },
        {
          name: 'Мої улюблені',
          link: '/favorite',
        },
        {
          name: 'Профіль',
          link: '/profile',
        },
        {
          name: 'Змінити пароль',
          link: '/password',
        },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 bprder=t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div key={index} className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full hover:text-subMain">
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" className="w-2/4 object-contain h-12" />
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              <span>
                Тільки про нас <br /> Коротко про фільми
              </span>
              <br />
              <span>Tell: 380 777 777 777</span>
              <br />
              <span>Email: kraboku@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
