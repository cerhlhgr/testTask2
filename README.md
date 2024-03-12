В репозитории infra выполнить:

sudo docker-compose build

sudo docker-compose up -d

API совершить покупку POST http://localhost:5000/user/buy Тело: { amount: number, userId: number }
API получить историю GET http://localhost:5000/user/getUserHistory?userIds[]=${id}&action=BUY

БД: wallet
