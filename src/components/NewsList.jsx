import React from 'react';
import NewsCard from './NewsCard';
import styled from 'styled-components';

const NewsList = () => {
  const newsData = [
    {
      title: 'Открытие нового учебного центра',
      description:
        'В университете открыт новый современный учебный центр, оснащенный передовой техникой и оборудованием. Здесь студенты смогут более эффективно заниматься и развиваться в своих областях.',
      date: '10 ноября 2023',
      imageUrl:
        'https://i.pinimg.com/564x/b3/11/22/b311220b5e0bbd0a45a2be83319987c7.jpg',
    },
    {
      title: 'Старт нового курса по искусственному интеллекту',
      description:
        'Университет запускает новый курс по искусственному интеллекту, предлагая студентам возможность погрузиться в захватывающий мир машинного обучения и разработки искусственного интеллекта.',
      date: '12 ноября 2023',
      imageUrl:
        'https://i.pinimg.com/564x/b3/11/22/b311220b5e0bbd0a45a2be83319987c7.jpg',
    },
    {
      title: 'Лекция от известного профессора по физике',
      description:
        'Приглашаем студентов посетить лекцию от известного профессора в области физики. Это уникальная возможность узнать о последних тенденциях и открытиях в мире физики от ведущего специалиста.',
      date: '18 ноября 2023',
      imageUrl:
        'https://i.pinimg.com/564x/b3/11/22/b311220b5e0bbd0a45a2be83319987c7.jpg',
    },
  ];

  const visibleNews = newsData.slice(0, 4);

  return (
    <>
      <List>
        {visibleNews.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            description={news.description}
            date={news.date}
            imageUrl={news.imageUrl}
          />
        ))}
      </List>
    </>
  );
};

export default NewsList;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
const Link = styled.a`
  display: block;
  text-align: end;
  color: white;
`;
