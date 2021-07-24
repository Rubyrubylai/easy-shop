# 簡易電商網站 API

## 環境
+ Node.js v16.4.0

## 安裝
1. 開啟終端機，cd 到存放專案位置並執行:
```
git clone https://github.com/Rubyrubylai/easy-shop.git
```

2. 安裝套件
```
npm install
```

3. 在 workbrench 中新增資料庫
```
create database easy_shop
```

4. 新增資料表
```
npx sequelize db:migrate
```

5. 新增種子資料
```
npx sequelize db:seed:all
```

6. 執行專案
```
npm run dev
```

7. 在本機端 http://localhost:3000/api-docs 開啟 API 文件

## 功能列表

|功能|URL|描述|
|----|---|----|
|首頁|/products|商品清單|
|瀏覽|/product/:id|商品明細|
|新增|/order|新增一筆訂單|