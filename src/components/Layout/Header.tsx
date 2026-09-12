'use client'

import { LuTextSearch } from 'react-icons/lu'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Container from '../Container'
import NavBar from './Navbar'
import NavbarMobile from './NavbarMobile'
import { A } from '../magicui/animated-grid-pattern'

const Header = () => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(`/?product=${path}#powered`)
  }

  const nav = [
    {
      label: 'Trang chủ',
      href: '/',
    },
    {
      label: 'Giới thiệu',
      href: '/about',
    },
    {
      label: 'Sản phẩm',
      href: '/products',
      children: [
        { label: 'Xy lanh, thiết bị khí nén', href: 'janatics', children: [], clickable: true },
        { label: 'Đá cắt, vật tư tiêu hao', href: 'cutflex', children: [], clickable: true },
        { label: 'Bôi trơn và bảo dưỡng', href: '#', children: [] },
        {
          label: 'Ổ cắm công nghiệp',
          href: '#',
          children: [
            { label: 'MPE', href: '#' },
            { label: 'Harting', href: '' },
            { label: 'Mennekes', href: '' },
            { label: 'Weidmuller', href: '' },
            { label: 'Hensel', href: '' },
          ],
        },
        {
          label: 'Cảm biến',
          href: 'tempco',
          clickable: true,
          children: [
            { label: 'Tempco', href: '' },
            { label: 'ABB', href: '' },
            { label: 'Landz', href: '' },
            { label: 'Omron', href: '' },
            { label: 'Keyence', href: '' },
            { label: 'Ifm', href: '' },
            { label: 'AUTONICS', href: '' },
            { label: 'SICK', href: '' },
            { label: 'Turch banner', href: '' },
            { label: 'Coognex', href: '' },
          ],
        },
        {
          label: 'Đồng hồ lưu lượng',
          href: 'meihe',
          clickable: true,
          children: [],
        },
        {
          label: 'Bơm hoá chất',
          href: '#',
          children: [
            {
              label: 'Prominent',
              href: '',
            },
          ],
        },
        // {
        //   label: 'Thiết bị thủy lực',
        //   href: '#',
        //   children: [
        //     { label: 'Norgen', href: '' },
        //     { label: 'YUKEN', href: '' },
        //     { label: 'Parker', href: '' },
        //   ],
        // },
        // {
        //   label: 'Van, bơm',
        //   href: '#',
        //   children: [
        //     { label: 'Grundfos', href: '' },
        //     { label: 'Alfa Laval', href: '' },
        //     { label: 'XYLEM', href: '' },
        //     { label: 'Parker', href: '' },
        //   ],
        // },
        // {
        //   label: 'Hộp số truyền động, motor',
        //   href: '#',
        //   children: [
        //     { label: 'ABB', href: '' },
        //     { label: 'Nord', href: '' },
        //     { label: 'Flender', href: '' },
        //     { label: 'Siemens', href: '' },
        //     { label: 'Wolong', href: '' },
        //     { label: 'SEW-EURODRIVE', href: '' },
        //     { label: 'Bonfiglioli', href: '' },
        //   ],
        // },
        {
          label: 'Cáp điện',
          href: '#',
          children: [
            { label: 'Lapp', href: '' },
            { label: 'TKD', href: '' },
            { label: 'Cadivi', href: '' },
            { label: 'Helukabel', href: '' },
            { label: 'IGUS', href: '' },
          ],
        },
        {
          label: 'Biến tần, servo, Intever, HMI',
          href: '#',
          children: [
            { label: 'Danfoss', href: '' },
            { label: 'Schneider', href: '' },
            { label: 'Siemens', href: '' },
            { label: 'ABB', href: '' },
            { label: 'Servo', href: '' },
            { label: 'Allen Bradley', href: '' },
            { label: 'Bonfiglioli', href: '' },
          ],
        },
        {
          label: 'Phụ kiện khác',
          href: '#',
          children: [
            { label: 'Máng xích nhựa', href: '' },
            { label: 'THIẾT BỊ LÀM MÁT', href: '' },
            { label: 'PLC', href: '' },
            { label: 'Cầu dao', href: '' },
            { label: 'Quạt tản nhiệt', href: '' },
            { label: 'Điện trở', href: '' },
            {
              label: 'Bạc lót, vòng bi nhựa, ray trượt không dầu',
              href: '',
            },
            { label: 'Bộ lọc, phụ kiện máy nén khí', href: '' },
            { label: 'Cầu chì, thyristor', href: '' },
          ],
        },
      ],
    },
    {
      label: 'Dịch vụ',
      href: '/services',
    },
    {
      label: 'Tư vấn',
      href: '/news-&-event',
      children: [
        { href: '/news-&-event', label: 'Tin tức & sự kiện' },
        { href: '/featured-news', label: 'Tin nổi bật' },
        { href: '#', label: 'Tin tuyển dụng' },
      ],
    },
    {
      label: 'Liên hệ',
      href: '/contact',
    },
  ]
  return (
    <header className="relative">
      <A className="z-[-1]" />
      <Container>
        <div className="mx-auto py-4 xl:w-3/4">
          <div className="justify-between space-y-2 text-sm xl:flex xl:space-y-0">
            <div className="flex items-center gap-x-2">
              <div className="shrink-0">
                <Image src="/icons/map-blue.svg" width={15} height={15} alt="Map" />
              </div>
              <Link
                href="https://maps.app.goo.gl/Bfk51u4gX9vk5tX8A"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                23/3a Đường TTH21, Phường Tân Thới Hiệp, TP.HCM
              </Link>
            </div>
            <div className="flex items-center gap-x-2">
              <div>
                <Image src="/icons/phone-blue.svg" width={15} height={15} alt="Phone" />
              </div>
              <Link href="tel:+84915706936" className="block">
                (+84) 915 706 936
              </Link>
            </div>
            <div className="flex items-center gap-x-2">
              <div>
                <Image src="/icons/shop.svg" width={15} height={15} alt="Shop" />
              </div>
              <div>SHOPPING</div>
            </div>
          </div>
          <div className="mx-auto w-fit pt-8">
            <Image src="/images/logo_elh.svg" width={235} height={134} alt="ELH" />
          </div>
        </div>
      </Container>
      <nav className="bg-primary-blue">
        <Container className="lg:px-20 xl:px-32">
          <div className="w-full items-center justify-between space-y-2 py-4 xl:flex xl:space-y-0">
            <NavBar data={nav} handleClick={handleClick} />
            <NavbarMobile data={nav} handleClick={handleClick} />
            <div className="grid grid-cols-2 gap-x-4">
              <div className="text-primary-orange font-semibold text-nowrap">Danh mục sản phẩm</div>
              <div className="flex items-center gap-x-2 rounded bg-white p-1">
                <LuTextSearch className="text-lg" />
                <input type="text" className="placeholder:text-primary-blue/70 outline-0" placeholder="Tìm kiếm..." />
              </div>
            </div>
          </div>
        </Container>
      </nav>

      <div className="bg-white">
        <Container>
          <div className="text-elh-gray py-4">
            <span className="font-semibold">Top Tags:</span> Cảm biến nhiệt độ | Đồng hồ lưu lượng | Bơm hoá chất | Đá
            cắt | Bạc lót, vòng bi nhựa, ray trượt không dầu | Ổ cắm | Tủ điện chống cháy nổ | Khí nén
          </div>
        </Container>
      </div>
    </header>
  )
}

export default Header
