# ELH Content Studio

Trang quản trị nội dung dành cho marketing, đang chạy tại `https://admin.elh.vn`.

## Cấu hình local

1. Sao chép `.env.example` thành `.env.local`.
2. Điền Sanity Project ID và dataset.
3. Chạy `pnpm install`.
4. Chạy `pnpm dev` và mở `http://localhost:3333`.

Không commit `.env.local`, token hoặc Deploy Hook URL vào Git.

## Kiểm tra

- `pnpm typecheck`
- `pnpm build`
- `pnpm exec wrangler deploy --dry-run`

## Production

- Schema đã được deploy vào Sanity project `cm9sdebg`.
- Studio đã được deploy bằng Worker `elh-admin` và custom domain `admin.elh.vn`.
- Người dùng phải đăng nhập bằng tài khoản cá nhân đã được mời vào Sanity project; không dùng mật khẩu chung.
- Cloudflare Access chưa bật vì bước khởi tạo Zero Trust của tài khoản hiện yêu cầu thông tin thanh toán. Có thể bổ sung sau mà không cần đổi CMS.
- Webhook chỉ build lại website khi nội dung `product` hoặc `article` được publish, cập nhật hoặc unpublish; thay đổi bản nháp không kích hoạt build.
