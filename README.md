# contact-app
### Membuat contact app sederhana dengan nodejs


![running](https://media.giphy.com/media/0hcWCWl3qNw2akSPWQ/giphy.gif)

### Cara install :
```
git clone https://github.com/syuhendar729/contact-app.git
cd contact-app
npm i
```

### Daftar perintah :
```
 <perintah>

Perintah:
  add     Menambahkan kontak baru dengan parameter
  input   Menambah kontak baru dengan inputan
  list    Menampilkan semua nama kontak
  detail  Menampilkan detail kontak berdasarkan nama
  delete  Menghapus kontak berdasarkan nama

Pilihan:
  --help     Lihat bantuan                                             [boolean]
  --version  Lihat nomor versi                                         [boolean]
```
```
 add

Menambahkan kontak baru dengan parameter

Pilihan:
  --help     Lihat bantuan                                             [boolean]
  --version  Lihat nomor versi                                         [boolean]
  --nama     Nama lengkap                                  [string] [diperlukan]
  --email    Alamat email                                               [string]
  --notelp   Nomor telpon                                  [string] [diperlukan]
```
```
 delete

Menghapus kontak berdasarkan nama

Pilihan:
  --help     Lihat bantuan                                             [boolean]
  --version  Lihat nomor versi                                         [boolean]
  --nama     Nama kontak                                   [string] [diperlukan]
```
```
 detail

Menampilkan detail kontak berdasarkan nama

Pilihan:
  --help     Lihat bantuan                                             [boolean]
  --version  Lihat nomor versi                                         [boolean]
  --nama     Nama kontak                                   [string] [diperlukan]
```

### Contoh penggunaan :
- Menambah kontak degan parameter
```
node app add --nama="NamaAnda" --email="email@mail.com" --notelp="08139786723"
#atau
node . add --nama="NamaAnda" --email="email@mail.com" --notelp="08139786723"
```
- Mendelete kontak
```
node . delete --nama="NamaAnda"
```
- Lihat detail kontak
```
node . detail --nama="NamaAnda"
```
