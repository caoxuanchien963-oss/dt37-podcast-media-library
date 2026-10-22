# Đề tài 37 — Website Podcast / Media Library

Website demo thư viện podcast với giao diện responsive, tìm kiếm, lọc chủ đề, lưu tập yêu thích, danh sách nghe gần đây và thanh điều khiển phát mẫu.

> **Phạm vi hiện tại:** Đây là bản demo giao diện chạy bằng HTML/CSS/JavaScript và Docker Compose + Nginx. Các tập podcast là dữ liệu mẫu; chưa có tệp âm thanh thật, tài khoản người dùng, cơ sở dữ liệu, WordPress, HTTPS, Prometheus, Grafana hoặc Loki. Những phần đó cần được cấu hình riêng nếu yêu cầu của báo cáo bắt buộc.

## Công nghệ
- HTML5, CSS3, JavaScript thuần
- Docker Compose
- Nginx

## Chạy dự án bằng Docker
1. Cài Docker Desktop và mở Docker Desktop.
2. Giải nén thư mục dự án.
3. Mở Terminal/PowerShell tại thư mục có file `docker-compose.yml`.
4. Chạy:

```bash
docker compose up -d
```

5. Mở trình duyệt tại http://localhost:8080

Kiểm tra trạng thái:

```bash
docker compose ps
```

Dừng website:

```bash
docker compose down
```

## Chạy không cần Docker
Mở file `site/index.html` bằng trình duyệt. Một số tính năng giao diện hoạt động trực tiếp vì đây là website tĩnh.

## Cấu trúc thư mục

```text
dt37-podcast-media-library/
├── docker-compose.yml
├── README.md
├── nginx/
│   └── default.conf
└── site/
    ├── index.html
    ├── styles.css
    └── app.js
```

## Ảnh minh chứng có thể tự chụp sau khi chạy
- Giao diện trang chủ tại `http://localhost:8080`
- Chức năng tìm kiếm podcast
- Lọc theo chủ đề
- Lưu/bỏ lưu tập podcast
- Danh sách “Đã lưu” và “Nghe gần đây”
- Kết quả `docker compose ps`

Chỉ chụp và đưa vào báo cáo các kết quả đã thực sự chạy/kiểm tra trên máy.
