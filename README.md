# Proje Hakkında
Proje bir blog ve haber uygulamasıdır. 
Proje responive bir yapıya sahiptir her cihazda tasarım bozulmadan kullanılabilir.
Blog tarafında anasayfada adminlerin eklediği içerikler yer almaktadır.
Adminler yeni içerikler ekleyebilir, silebilir veya güncelleme işlemleri gerçekleştirebilirler.
Haber tarafında ise kullanılan API'dan her 30 dakikada 8 adet haber lisetelnecek şekilde bir filtre uygulanmıştır.
API'dan gelen haberler veritabanı üzerine kaydedilmktedir.
İletişim sayfasında yollanan mesajlar belirlenen mail adresine iletilmektedir. (routes/contact.js)
Projede hem güncel haberlere yer verilmektedir hemde kullanıcılara özel içerik üretmek adına blog sayfası özelliklerini içinde barındırmaktadır.

## Projede Kullandıklarım
HTML, CSS, Bootstrap, JavaScript, NodeJs, Handlebars, MongoDB, API. 

## Proje Nasıl Çalışır?
Projeyi kendi bilgisayarımızda visual studio code üzerinden açıyoruz.
Terminali açıp 'npm start' komutu ile projeyi başlatabiliriz.
Daha sonra tarayıcımızdan http://localhost:3000/blog adresini arattığımızda projemizin anasayfası karşımıza gelmiş olacaktır.

### Admin Girişi
Projeye admin olarak giriş yapabilmek için öncelikle veritabanı üzerinden(users) kayıt oluşturulmalıdır.
Veritabanında kaydedilen e-mail ve şifre ile giriş ekranından giriş işlemi gerçekleştirebilirsiniz.

## Proje İçi Bazı Görselleri

### Anasayfa
![BlogAnaSayfa](https://user-images.githubusercontent.com/71833177/150979587-ed4ac59f-9450-4380-aed2-30b6393882e4.PNG)

### Admin Sayfası
![BlogAdminSayfası](https://user-images.githubusercontent.com/71833177/150980180-db4f7575-ef58-4583-957d-cbd414035dec.PNG)

### Post Ekleme Formu
![BlogPostEkle](https://user-images.githubusercontent.com/71833177/150980364-ddcee158-45bb-4877-9c79-38adcd4a9ccb.PNG)
