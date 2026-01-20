# CityFix - Belediye Yönetim Paneli ve Şehir Sorunları Takip Sistemi

CityFix, vatandaşların şehirdeki altyapı sorunlarını (çukur, bozuk lamba, vb.) bildirmesini ve belediye yetkililerinin bu sorunları görselleştirip, takip edip çözmesini sağlayan modern bir web platformudur. Bu proje, vatandaş katılımını artırmak ve belediye hizmetlerini daha şeffaf ve hızlı hale getirmek için geliştirilmiştir.

## 🚀 Özellikler

### 🏛️ Yönetim Paneli (B2G Dashboard)
Belediye yetkilileri ve yöneticiler için geliştirilen kapsamlı panel:
*   **Genel Bakış:** Açık, işlenen ve çözülen sorunların anlık istatistikleri ve çözüm oranı analizleri.
*   **Harita Analizi (Heatmap):** Şehrin hangi bölgelerinde sorunların yoğunlaştığını gösteren, Leaflet tabanlı interaktif harita. Sorunlar durumlarına göre renk kodlarıyla (Kırmızı: Açık, Sarı: İşleniyor, Yeşil: Çözüldü) işaretlenir.
*   **Rapor Yönetimi:** Gelen tüm şikayetlerin listesi, filtreleme ve detaylı inceleme ekranları.
*   **Durum Güncelleme:** Yetkililer, raporların durumunu anlık olarak değiştirebilir. Vatandaşlar bu güncellemeleri anında görebilir.
*   **Rol Bazlı Yetkilendirme:**
    *   **Admin:** Raporları görüntüler ve durum günceller.
    *   **Super Admin:** Raporları kalıcı olarak silme yetkisine sahiptir.

### 📱 Mobil/Vatandaş Tarafı (Veri Entegrasyonu)
Bu proje, mobil uygulamadan gelen verileri (`glitch-hunters` mobil uygulaması) yöneten merkezi veri ve yönetim katmanıdır.
*   Vatandaşlar sorunların fotoğrafını çekip konum bilgisi ile paylaşır.
*   Puanlama ve yorum sistemi ile topluluk etkileşimi sağlanır.

## 🛠️ Teknolojiler

Bu proje en güncel ve modern web teknolojileri kullanılarak inşa edilmiştir:

*   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) - React tabanlı full-stack framework.
*   **Dil:** [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği ve geliştirilebilir kod yapısı için.
*   **Veritabanı & ORM:** [Prisma](https://www.prisma.io/) ile PostgreSQL.
*   **Harita:** [Leaflet](https://leafletjs.com/) ve `react-leaflet` - İnteraktif harita görselleştirmeleri için.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Hızlı ve modern UI tasarımı için.
*   **Icons:** [Lucide React](https://lucide.dev/) - Modern ikon seti.
*   **Authentication:** Güvenli, sunucu taraflı, JWT ve Cookie tabanlı özel yetkilendirme sistemi (NextAuth kullanılmadan, `bcryptjs` ve `jose` ile in-house çözüm).

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
*   Node.js (v18 veya üzeri)
*   PostgreSQL veritabanı

### Adım 1: Depoyu Klonlayın
```bash
git clone https://github.com/kullaniciadi/glitch-hunters-data.git
cd glitch-hunters-data
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Çevresel Değişkenleri Ayarlayın
Kök dizinde `.env` dosyası oluşturun ve veritabanı bağlantı adresinizi ekleyin:
```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/glitch_db"
# Auth için gizli anahtar (src/server/auth.ts içinde hardcoded, prod için env'ye taşınmalı)
```

### Adım 4: Veritabanını Hazırlayın
Prisma şemasını veritabanına uygulayın:
```bash
npx prisma generate
npm run db:push
```

### Adım 5: Projeyi Başlatın
Geliştirme sunucusunu başlatın:
```bash
npm run dev
```
Uygulamanız `http://localhost:3000` adresinde çalışacaktır.

## 🔐 Giriş Bilgileri (Demo)

Yönetim paneline erişmek için `/dashboard` yolunu kullanın.

*   **Standart Yönetici (Admin):**
    *   Kullanıcı Adı: (Gerekmez, sadece şifre)
    *   Şifre: `admin`
*   **Süper Yönetici (Super Admin):**
    *   Şifre: `admin5454`
    *(Not: Bu şifreler demo amaçlıdır, prodüksiyonda değiştirilmelidir.)*

## 📂 Proje Yapısı

```
src/
├── app/
│   ├── dashboard/       # Yönetim paneli sayfaları (layout, map, reports vb.)
│   ├── login/           # Giriş sayfası
├── server/
│   ├── auth.ts          # Auth mantığı (JWT, Cookie, Bcrypt)
│   ├── db.ts            # Prisma istemcisi
│   ├── actions.ts       # Server Actions (Veritabanı işlemleri)
├── middleware.ts        # Sayfa koruması için ara yazılım
```

## 🤝 Katkıda Bulunma
Katkıda bulunmak isterseniz lütfen bir `issue` açın veya `pull request` gönderin.

## 📄 Lisans
Bu proje MIT lisansı ile lisanslanmıştır.
