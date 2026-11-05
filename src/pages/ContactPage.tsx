export default function ContactPage() {
  return (
    <main className="page inner-page contact-page">
      <p className="eyebrow">Kontak / Kami siap membantu</p>
      <h1>Mari mulai percakapan.</h1>
      <p className="page-lead">Ada pertanyaan tentang kampus atau proses penerimaan? Hubungi tim UPI YPTK melalui informasi berikut.</p>
      <div className="contact-layout">
        <section className="contact-card"><span className="eyebrow">Kunjungi kami</span><h2>UPI YPTK Padang</h2><p>Jl. Raya Lubuk Begalung, Padang<br />Sumatera Barat, Indonesia</p></section>
        <section className="contact-card"><span className="eyebrow">Hubungi langsung</span><h2>Kami senang mendengar darimu.</h2><a href="mailto:info@upiyptk.ac.id">info@upiyptk.ac.id <span aria-hidden="true">↗</span></a><p>Untuk informasi PMB, silakan kunjungi halaman pendaftaran.</p><a className="text-link" href="/pmb">Ke halaman PMB <span aria-hidden="true">↗</span></a></section>
      </div>
    </main>
  )
}
