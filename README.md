# Magisk Modül Kütüphanesi

Magisk modüllerini kategorilere göre organize eden modern bir web sitesi.

## Özellikler

- 🎨 Modern ve animasyonlu tasarım
- 🔍 Gelişmiş arama fonksiyonu
- 📂 Kategori bazlı filtreleme
- 📱 Responsive tasarım (mobil uyumlu)
- 🎯 Reklam alanları
- ⚡ Hızlı ve optimize edilmiş

## GitHub Pages Kurulumu

1. Bu repository'yi GitHub'a yükleyin
2. Repository ayarlarından **Settings > Pages** bölümüne gidin
3. **Source** kısmından **main** branch'ini seçin ve **/ (root)** klasörünü seçin
4. Save butonuna tıklayın
5. Birkaç dakika sonra siteniz `https://kullaniciadi.github.io/repo-adi` adresinde yayında olacak

## Modül Ekleme

`modules.json` dosyasını düzenleyerek modül ekleyebilirsiniz:

```json
{
    "id": 1,
    "name": "Modül Adı",
    "category": "performance",
    "description": "Modül açıklaması",
    "author": "Yazar Adı",
    "version": "1.0.0",
    "downloadUrl": "https://github.com/...",
    "githubUrl": "https://github.com/..."
}
```

### Kategoriler

- `performance` - Performans ⚡
- `battery` - Pil Optimizasyonu 🔋
- `audio` - Ses Modülleri 🔊
- `ui` - Arayüz 🎨
- `system` - Sistem ⚙️
- `security` - Güvenlik 🔒
- `network` - Ağ 📡
- `camera` - Kamera 📷

## Kullanım

1. Ana sayfadaki arama çubuğunu kullanarak modül arayın
2. Kategorilere tıklayarak kategoriye göre filtreleyin
3. Modül kartlarına tıklayarak detayları görüntüleyin
4. Filtre butonlarını kullanarak kategoriye göre modülleri filtreleyin

## Reklam Alanları

Sitede 2 adet reklam alanı bulunmaktadır:
- **Reklam Alanı 1**: Ana sayfada (hero section altında)
- **Reklam Alanı 2**: Modüller bölümünde (filtre butonlarının altında)

Reklam kodlarını `index.html` dosyasındaki `.ad-placeholder` div'lerine ekleyebilirsiniz.

## Dosya Yapısı

```
magisk-modul-sitesi/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── script.js           # JavaScript fonksiyonları
├── modules.json        # Modül verileri (buraya modüllerinizi ekleyin)
├── README.md          # Bu dosya
└── .gitignore         # Git ignore dosyası
```

## Özelleştirme

### Renkleri Değiştirme
`styles.css` dosyasındaki `:root` bölümündeki CSS değişkenlerini düzenleyerek renkleri değiştirebilirsiniz.

### Kategorileri Değiştirme
`modules.json` dosyasındaki `categories` array'ini düzenleyerek kategorileri değiştirebilir veya yeni kategoriler ekleyebilirsiniz.

## Lisans

Bu proje açık kaynaklıdır ve özgürce kullanılabilir.

## Destek

Sorularınız için GitHub Issues kullanabilirsiniz.

