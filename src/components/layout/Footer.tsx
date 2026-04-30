import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/5 bg-white">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl">Dimond</span>
            <span className="text-gold text-xs uppercase tracking-[0.2em]">jewelry</span>
          </div>
          <p className="mt-3 text-sm text-ink/60 max-w-xs">
            Премиум ювелир үкгом. Бриллианттар, алтын, өзгөчө дизайн.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Каталог</h4>
          <ul className="space-y-2 text-sm text-ink/60">
            <li><Link href="/?category=rings" className="hover:text-ink">Шакектер</Link></li>
            <li><Link href="/?category=earrings" className="hover:text-ink">Сөйкөлөр</Link></li>
            <li><Link href="/?category=pendants" className="hover:text-ink">Кулондор</Link></li>
            <li><Link href="/?category=bracelets" className="hover:text-ink">Билериктер</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Компания</h4>
          <ul className="space-y-2 text-sm text-ink/60">
            <li>Биз жөнүндө</li>
            <li>Дүкөндөр</li>
            <li>Жеткирүү</li>
            <li>Кепилдик</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Байланыш</h4>
          <ul className="space-y-2 text-sm text-ink/60">
            <li>+996 (700) 00-00-00</li>
            <li>hello@dimond.kg</li>
            <li>Бишкек, Чүй пр., 100</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/5">
        <div className="container-x py-5 text-xs text-ink/40 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Dimond. Бардык укуктар корголгон.</span>
          <span>Made with ❤ in Kyrgyzstan</span>
        </div>
      </div>
    </footer>
  );
}
