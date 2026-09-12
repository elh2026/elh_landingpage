# ELH Content Studio

Trang quản trị nội dung dành cho marketing, dự kiến chạy tại `https://admin.elh.vn`.

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

Studio chỉ được deploy sau khi:

- schema đã deploy vào đúng Sanity project;
- `admin.elh.vn` đã được bảo vệ bằng Cloudflare Access;
- danh sách email và vai trò đã được xác nhận;
- build local và Wrangler dry-run đều thành công.
