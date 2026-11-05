import upiLogo from '../assets/upi-yptk-logo.png'

export default function HomePage() {
  return (
    <main className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Universitas Putra Indonesia YPTK Padang</p>
          <h1>Masa depan dimulai dari sini.</h1>
          <p className="hero-copy">Temukan ruang untuk belajar, bertumbuh, dan berkarya bersama komunitas akademik UPI YPTK.</p>
          <a className="button-link" href="/pmb">Jelajahi PMB <span aria-hidden="true">↗</span></a>
        </div>
        <img className="hero-logo" src={upiLogo} alt="Logo UPI YPTK" />
      </section>
      <section className="home-intro">
        <p className="eyebrow">Selamat datang</p>
        <h2>Belajar dengan tujuan.<br />Berkarya untuk masa depan.</h2>
        <p>UPI YPTK Padang mendampingi mahasiswa mengembangkan ilmu, karakter, dan keterampilan yang relevan dengan dunia nyata.</p>
      </section>
      <section className="feature-grid">
        <article><span>01 / Kampus</span><h3>Lingkungan yang mendukung</h3><p>Ruang belajar dan komunitas untuk mencoba hal baru dan tumbuh bersama.</p><a href="/about">Kenali kampus <span aria-hidden="true">↗</span></a></article>
        <article><span>02 / Penerimaan</span><h3>Langkah pertama dimulai</h3><p>Temukan informasi pendaftaran dan mulai perjalanan akademikmu.</p><a href="/pmb">Daftar sekarang <span aria-hidden="true">↗</span></a></article>
        <article><span>03 / Informasi</span><h3>Kami siap membantu</h3><p>Hubungi tim kami untuk pertanyaan seputar kampus dan penerimaan.</p><a href="/contact">Hubungi kami <span aria-hidden="true">↗</span></a></article>
      </section>
    </main>
  )
}
