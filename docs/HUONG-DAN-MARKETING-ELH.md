# Hướng dẫn quản trị nội dung website ELH

**Dành cho:** Team Marketing ELH  
**Website quản trị:** <https://admin.elh.vn>  
**Website chính thức:** <https://elh.vn>  
**Phiên bản tài liệu:** 1.0 — 14/09/2026

---

## 1. Quy trình ngắn gọn

1. Mở <https://admin.elh.vn> và đăng nhập bằng tài khoản cá nhân đã được mời vào dự án Sanity.
2. Chọn **Quản lý nội dung** để tìm hoặc tạo nội dung; chọn **Xem & chỉnh trên website** để duyệt website và bấm vào nội dung cần sửa.
3. Nhập đầy đủ nội dung, hình ảnh, Alt text, slug và SEO.
4. Kiểm tra bản nháp trong **Xem & chỉnh trên website**.
5. Bấm **Publish/Xuất bản** khi đã kiểm tra xong.
6. Website chính chỉ cập nhật sau khi quá trình build Cloudflare hoàn tất. Hãy kiểm tra lại sau vài phút.

> Không dùng chung tài khoản. Không gửi mật khẩu, mã đăng nhập hoặc token qua nhóm chat.

## 2. Hiểu đúng ba trạng thái

| Trạng thái | Ý nghĩa | Xuất hiện trên `elh.vn`? |
|---|---|---|
| Draft/Bản nháp | Nội dung đang soạn hoặc đã sửa nhưng chưa Publish | Không |
| Published/Đã xuất bản | Phiên bản đang được website chính sử dụng | Có |
| Unpublished/Gỡ xuất bản | Nội dung đã được gỡ khỏi bản công khai | Không, sau khi website build lại |

- **Save/Lưu tự động** không có nghĩa là đã đăng lên website.
- Chỉ **Publish/Xuất bản** mới đưa thay đổi sang website chính.
- Nếu sửa một bài đã xuất bản, khách vẫn thấy phiên bản cũ cho đến khi bạn Publish phiên bản mới.

## 3. Hai khu vực làm việc

### Quản lý nội dung

Dùng khi cần:

- Tạo bài viết, sản phẩm hoặc dịch vụ mới.
- Tìm nội dung theo danh sách.
- Lọc Bản nháp, Đã xuất bản, Tin nổi bật hoặc Tin tuyển dụng.
- Quản lý Danh mục, Hãng sản xuất và Thẻ.

### Xem & chỉnh trên website

Dùng khi cần:

- Nhìn đúng vị trí nội dung trên website.
- Bấm vào chữ hoặc hình được đánh dấu để mở đúng trường cần sửa.
- Xem thay đổi của bản nháp trước khi Publish.
- Dùng thanh nút nhanh: **+ Bài viết**, **+ Tin nổi bật**, **+ Tuyển dụng**, **+ Sản phẩm**, **+ Dịch vụ**.

Các trang tin còn có nút thêm ngay cạnh tiêu đề:

- **Tin tức & Sự kiện** → `+ Thêm bài viết`.
- **Tin nổi bật** → `+ Thêm tin nổi bật`.
- **Tuyển dụng** → `+ Thêm tin tuyển dụng`.

## 4. Tạo đúng loại nội dung

| Nút | Giá trị được chọn sẵn | Nội dung sẽ xuất hiện ở đâu? |
|---|---|---|
| + Bài viết | Loại `Tin tức & sự kiện`, không nổi bật | Trang Tin tức & Sự kiện |
| + Tin nổi bật | Loại `Tin tức & sự kiện`, bật Nổi bật | Tin tức & Sự kiện và Tin nổi bật |
| + Tuyển dụng | Loại `Tin tuyển dụng` | Trang Tuyển dụng |
| + Sản phẩm | Mẫu sản phẩm mới | Danh sách sản phẩm sau khi Publish |
| + Dịch vụ | Mẫu dịch vụ mới | Có dữ liệu dịch vụ; cần thêm vào thứ tự trang Dịch vụ nếu muốn hiển thị ở đó |

Một bài **Tin nổi bật** không phải là bản sao riêng. Đó là bài Tin tức có bật checkbox **Bài viết nổi bật**.

## 5. Cách tạo bài viết

1. Bấm **+ Bài viết**, **+ Tin nổi bật** hoặc **+ Tuyển dụng**.
2. Điền **Tiêu đề** — tối đa 140 ký tự.
3. Tại **Đường dẫn/Slug**, bấm **Generate/Tạo** sau khi có tiêu đề.
4. Điền **Tóm tắt** — tối đa 320 ký tự.
5. Tải **Ảnh đại diện** và nhập **Alt text** mô tả đúng nội dung ảnh.
6. Soạn **Nội dung bài viết** bằng các tiêu đề, đoạn văn, danh sách và hình ảnh phù hợp.
7. Chọn **Danh mục**, **Thẻ**, tác giả và ngày xuất bản nếu cần.
8. Kiểm tra **Loại bài viết** và checkbox **Bài viết nổi bật**.
9. Mở nhóm **SEO**, điền tiêu đề SEO và mô tả SEO.
10. Xem trước, sau đó bấm **Publish**.

### Không sửa slug tùy tiện

Slug tạo thành URL, ví dụ:

`https://elh.vn/news/ten-bai-viet/`

- Có thể sửa slug trước lần Publish đầu tiên.
- Không nên đổi slug của bài đã được chia sẻ hoặc đã xuất hiện trên Google.
- Nếu thật sự cần đổi URL của bài cũ, hãy báo kỹ thuật để kiểm tra chuyển hướng URL.

## 6. Cách tạo sản phẩm

Các trường quan trọng:

- **Tên sản phẩm**: bắt buộc, tối đa 140 ký tự.
- **Slug**: bắt buộc; bấm Generate sau khi nhập tên.
- **Model** và **SKU**: nhập đúng theo tài liệu hãng.
- **Mô tả ngắn**: tối đa 320 ký tự.
- **Nội dung chi tiết** và **Thông số kỹ thuật**.
- **Ảnh đại diện** và Alt text: bắt buộc.
- **Album ảnh**: dùng ảnh rõ ràng, cùng phong cách.
- **Catalogue/Datasheet**: chỉ tải PDF và đặt tên tài liệu dễ hiểu.
- **Hãng sản xuất**, **Danh mục**, **Thẻ**.
- **Sản phẩm nổi bật**: bật khi muốn ưu tiên ở các khu vực nổi bật.
- **Ngừng hiển thị**: dùng khi tạm dừng sản phẩm; không xóa dữ liệu cũ.
- **Sản phẩm liên quan** và **SEO**.

> Tạo sản phẩm xong chưa chắc tự xuất hiện ở khu vực “Sản phẩm nổi bật” trên Trang chủ. Hãy mở Trang chủ và thêm sản phẩm vào danh sách **Sản phẩm nổi bật** nếu cần.

## 7. Cách tạo dịch vụ

1. Bấm **+ Dịch vụ**.
2. Nhập tên, slug, mô tả ngắn và nội dung chi tiết.
3. Tải ảnh đại diện và nhập Alt text.
4. Kiểm tra nhãn nút liên hệ.
5. Bật **Hiển thị ở trang chủ** nếu cần.
6. Điền SEO và Publish.
7. Mở **Chỉnh nội dung các trang → Trang dịch vụ**.
8. Thêm dịch vụ vừa tạo vào **Dịch vụ và thứ tự hiển thị**, rồi kéo thả đến vị trí mong muốn.
9. Publish Trang dịch vụ.

Nếu dịch vụ đã cũ, dùng **Ngừng hiển thị** thay vì xóa ngay.

## 8. Chỉnh các trang bằng chế độ trực quan

### Trang chủ

- Banner: thêm, xóa và kéo thả thứ tự banner.
- Tiêu đề, mô tả, hình ảnh phần giới thiệu.
- Danh sách sản phẩm, dịch vụ và bài viết nổi bật.
- Tiêu đề khu vực liên hệ.

### Trang Giới thiệu

- Banner và hình nền.
- Tiêu đề, đoạn giới thiệu và nội dung chi tiết.
- Thư viện hình ảnh và năng lực chính.

### Trang Dịch vụ

- Banner, mô tả mở đầu.
- Danh sách và thứ tự dịch vụ.

### Trang Liên hệ

- Banner, tiêu đề và mô tả biểu mẫu.
- Bản đồ Google Maps dạng Embed.
- Danh sách hãng sản xuất hiển thị.

### Thông tin dùng chung

Vào **Chỉnh nội dung các trang → Thông tin dùng chung** để sửa:

- Tên công ty, email, điện thoại, địa chỉ.
- Facebook, LinkedIn, YouTube.
- Top Tags và chính sách bán hàng ở chân trang.
- SEO mặc định và dòng bản quyền.

Sửa tại đây có thể ảnh hưởng Header, Footer và nhiều trang cùng lúc. Luôn xem trước trước khi Publish.

## 9. Quy chuẩn hình ảnh

- Dùng JPG/WebP cho ảnh chụp; PNG chỉ khi cần nền trong suốt hoặc logo.
- Ảnh banner nên theo tỷ lệ gần **16:9**, khuyến nghị khoảng **1920 × 1080 px**.
- Ảnh sản phẩm nên vuông hoặc gần vuông, khuyến nghị **1200 × 1200 px**.
- Ảnh bài viết nên thống nhất tỷ lệ, khuyến nghị **1600 × 900 px**.
- Cố gắng giữ mỗi ảnh dưới **500 KB**; không tải ảnh vài MB trực tiếp từ điện thoại.
- Không dùng ảnh mờ, méo, dính watermark trái phép hoặc ảnh không có quyền sử dụng.
- Tên file nên dễ hiểu: `cam-bien-nhiet-tempco.webp`, không dùng `IMG_1234-final-final.jpg`.

### Alt text

Alt text là mô tả ngắn cho Google và người dùng trình đọc màn hình.

- Tốt: `Cảm biến nhiệt độ Tempco model X tại nhà máy`.
- Không tốt: `ảnh`, `image1`, hoặc nhồi hàng loạt từ khóa.
- Không cần bắt đầu bằng “Hình ảnh của…”.

## 10. Checklist SEO trước khi Publish

- [ ] Mỗi trang/bài có một tiêu đề rõ ràng.
- [ ] Tiêu đề SEO không quá 60 ký tự.
- [ ] Mô tả SEO không quá 160 ký tự.
- [ ] Từ khóa chính xuất hiện tự nhiên trong tiêu đề, tóm tắt và nội dung.
- [ ] Heading được dùng theo thứ tự; không dùng chữ in đậm thay cho mọi tiêu đề.
- [ ] Mọi ảnh đều có Alt text.
- [ ] Slug ngắn, không dấu, dùng dấu gạch ngang.
- [ ] Danh mục và thẻ đúng chủ đề; không tạo nhiều thẻ trùng nghĩa.
- [ ] `No index/Không lập chỉ mục` đang tắt, trừ khi có yêu cầu đặc biệt.
- [ ] Canonical URL để trống nếu không hiểu rõ mục đích; hỏi kỹ thuật trước khi nhập.
- [ ] Ảnh chia sẻ Open Graph hiển thị rõ khi đăng Facebook/LinkedIn.

Hashtag mạng xã hội nằm trong **Thẻ (tag)**, ví dụ `#MayBomCongNghiep`. Hashtag không thay thế từ khóa SEO và không nên được nhồi vào nội dung.

## 11. Kiểm tra trước và sau khi Publish

### Trước khi Publish

- [ ] Đọc lại chính tả, số điện thoại, email, model và thông số kỹ thuật.
- [ ] Kiểm tra trên cả desktop và mobile trong cửa sổ preview.
- [ ] Bấm thử các nút và liên kết.
- [ ] Kiểm tra ảnh không bị cắt mất nội dung quan trọng.
- [ ] Xác nhận đúng loại bài và trạng thái Nổi bật.
- [ ] Không còn cảnh báo trường bắt buộc.

### Sau khi Publish

1. Chờ website build lại trong vài phút.
2. Mở trang tương ứng trên <https://elh.vn>.
3. Nhấn `Ctrl + F5` hoặc mở cửa sổ ẩn danh để tránh cache trình duyệt.
4. Kiểm tra nội dung, hình ảnh, URL và liên kết một lần nữa.

## 12. Xử lý lỗi thường gặp

### Bấm nút thêm nhưng trang trống hoặc báo lỗi intent

1. Nhấn `Ctrl + F5` tại `admin.elh.vn`.
2. Đóng tab lỗi và bấm lại nút thêm từ Preview.
3. Nếu vẫn lỗi, chụp toàn màn hình có thanh địa chỉ và gửi cho kỹ thuật.

### Không thấy bài trên website chính

- Kiểm tra bài đã **Publish**, không chỉ Save.
- Kiểm tra đúng Loại bài viết.
- Chờ build hoàn tất rồi mở cửa sổ ẩn danh.
- Với dịch vụ/sản phẩm nổi bật, kiểm tra đã thêm vào danh sách của Trang chủ/Trang dịch vụ chưa.

### Không Publish được

- Tìm các trường có dấu lỗi hoặc cảnh báo.
- Bài viết cần tiêu đề, slug, ảnh đại diện và nội dung.
- Ảnh đại diện cần Alt text.
- Kiểm tra kết nối mạng, sau đó tải lại trang.

### Ảnh hiển thị xấu

- Dùng đúng tỷ lệ ảnh.
- Chỉnh vùng Hotspot/Crop trong Sanity.
- Không tải ảnh độ phân giải quá thấp.

### Bản đồ lỗi

Chỉ dùng URL trong thuộc tính `src` của mã **Google Maps → Share/Chia sẻ → Embed a map/Nhúng bản đồ**. Không dùng URL tìm kiếm thông thường hoặc tự sửa tham số `pb`.

## 13. Những việc Marketing không nên tự làm

- Không xóa hàng loạt document, danh mục hoặc hãng sản xuất.
- Không đổi slug của nội dung đã chạy quảng cáo hoặc đã có trên Google.
- Không sửa Canonical URL hoặc bật No index nếu chưa hiểu rõ.
- Không xóa cấu hình Trang chủ, Trang Giới thiệu, Trang Dịch vụ, Trang Liên hệ hoặc Thông tin dùng chung.
- Không chia sẻ tài khoản, mã đăng nhập hoặc quyền quản trị.
- Không tự chỉnh DNS, Cloudflare Worker, GitHub Actions hoặc source code.

## 14. Thông tin cần gửi khi báo lỗi

Gửi đủ các mục sau để kỹ thuật xử lý nhanh:

1. Bạn đang thao tác tại URL nào?
2. Bạn đang tạo/sửa bài, sản phẩm, dịch vụ hay trang nào?
3. Bạn đã bấm Save hay Publish?
4. Lỗi xảy ra lúc mấy giờ?
5. Ảnh chụp toàn màn hình có thanh địa chỉ và thông báo lỗi.
6. Nếu website chính chưa cập nhật, gửi cả URL trên `elh.vn`.

---

**Nguyên tắc vàng:** Tạo đúng loại nội dung → điền đủ trường bắt buộc → xem bản nháp → Publish → kiểm tra lại trên website chính.
