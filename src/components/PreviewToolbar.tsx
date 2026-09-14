import { getSanityCreateUrl, type CreateTemplateId } from '@/lib/sanityIntent'

const actions: Array<[string, CreateTemplateId]> = [
  ['+ Bài viết', 'article-news'],
  ['+ Tin nổi bật', 'article-featured'],
  ['+ Tuyển dụng', 'article-recruitment'],
  ['+ Sản phẩm', 'product-default'],
  ['+ Dịch vụ', 'service-default'],
]

export default function PreviewToolbar() {
  return (
    <aside className="fixed right-3 bottom-3 z-[9999] flex flex-wrap justify-end gap-2 rounded-xl bg-slate-950/95 p-3 text-xs text-white shadow-2xl">
      {actions.map(([label, template]) => (
        <a
          key={template}
          href={getSanityCreateUrl(template)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-orange-500 px-3 py-2 font-semibold hover:bg-orange-400"
        >
          {label}
        </a>
      ))}
      <a href="/api/draft-mode/disable" className="rounded-full border border-white/40 px-3 py-2">
        Thoát xem nháp
      </a>
    </aside>
  )
}
