# sango8-form
Sango/Kingdom Heroes 8 2.3.1 from UserJoy

# 🛠️ Bộ Công Cụ (Utils Unit 3d)

### 1. AssetStudio (v0.16)
* **Chức năng:** Trích xuất (extract) file đóng gói để xem định dạng JSON.
* **Liên kết tải về:** [GitHub - Perfare/AssetStudio](https://github.com/perfare/assetstudio)

### 2. UABE (v3.0 / v2.2)
* **Chức năng:** Đóng gói lại (repack) hoặc thay thế (replace) tài nguyên và tệp văn bản.
* **Liên kết tải về:** [GitHub - SeriousCache/UABE](https://github.com/SeriousCache/UABE)

---

# 🔄 Công Cụ Hỗ Trợ Chỉnh Sửa JSON / Văn Bản

* `convert-json.js`: Chuyển đổi định dạng JSON của AssetStudio sang dạng Text Dump của UABE.
* `json-to-csv.js`: Chuyển đổi tệp JSON từ AssetStudio thành tệp CSV để nhập (import) vào Google Sheets/Excel chỉnh sửa.
* `tsv-to-json.js`: Chuyển đổi tệp TSV (xuất từ Google Sheets) ngược lại thành mảng JSON của AssetStudio sau khi hoàn tất chỉnh sửa.

---

# 📖 Hướng Dẫn Sử Dụng (Workflow)

### Bước 1: Trích xuất dữ liệu
* Sử dụng **AssetStudio v0.16** để mở tệp đóng gói của game.
* Tiến hành trích xuất (extract) toàn bộ tài nguyên hoặc tệp văn bản cần thiết.

### Bước 2: Chuyển đổi để chỉnh sửa
* Chạy công cụ `json-to-csv.js` để chuyển tệp JSON vừa trích xuất thành định dạng CSV.
* Tải tệp CSV này lên **Google Sheets** (hoặc Excel) để tiến hành chỉnh sửa nội dung/dịch thuật một cách dễ dàng.
* Import loại plan text, không convert.

### Bước 3: Xuất dữ liệu sau chỉnh sửa
* Sau khi chỉnh sửa xong trên Google Sheets, hãy xuất tệp dưới dạng **TSV** (.tsv).
* Chạy công cụ `tsv-to-json.js` để biến đổi tệp TSV này quay trở lại cấu trúc mảng JSON của AssetStudio.

---

# 🚀 Hướng Dẫn Đóng Gói & Phát Hành (Release)

### Bước 1: Chuyển đổi sang định dạng UABE
* Sử dụng công cụ `convert-json.js` để chuyển đổi tệp JSON (đã chỉnh sửa ở cấu trúc AssetStudio) sang định dạng **UABE Text Dump**.

### Bước 2: Đóng gói lại vào Game
* Mở **UABE**, tìm đến tài nguyên tương ứng và chọn chức năng nhập dữ liệu (**Import Text Dump**).
* Chọn tệp văn bản vừa chuyển đổi được ở Bước 1.
* Nhấn **Apply** và **Save** để lưu lại thay đổi vào tệp đóng gói gốc của game.
