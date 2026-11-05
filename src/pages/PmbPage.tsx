import { useCallback, useContext, useMemo, useReducer, useRef, useState, type ChangeEvent, type FormEvent, type RefObject } from 'react'
import { RegistrantsContext } from '../App'

const daftarProgramStudi = ['Informatika', 'Sistem Informasi', 'Manajemen']
const daftarFakultas = ['Fakultas Ilmu Komputer', 'Fakultas Ekonomi dan Bisnis', 'Fakultas Teknik', 'Fakultas Psikologi']

type InputFieldProps = {
  label: string
  id: string
  value: string
  placeholder: string
  type?: string
  inputRef?: RefObject<HTMLInputElement | null>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function InputField({ label, id, value, placeholder, type = 'text', onChange, inputRef }: InputFieldProps) {
  return <div className="pmb-field"><label htmlFor={id}>{label}</label><input ref={inputRef} id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} required /></div>
}

type SubmitState = { message: string }
type SubmitAction = { type: 'success'; name: string } | { type: 'clear' }
function submitReducer(_state: SubmitState, action: SubmitAction): SubmitState {
  return action.type === 'success' ? { message: `Pendaftaran berhasil disiapkan. Terima kasih, ${action.name}!` } : { message: '' }
}

export default function PmbPage() {
  const { registrants, addRegistrant } = useContext(RegistrantsContext)
  const [kampus, setKampus] = useState('UPI YPTK')
  const [nama, setNama] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] = useState('')
  const [fakultas, setFakultas] = useState('')
  const [programStudi, setProgramStudi] = useState('')
  const [alamat, setAlamat] = useState('')
  const [pencarianNama, setPencarianNama] = useState('')
  const [submitState, dispatchSubmit] = useReducer(submitReducer, { message: '' })
  const namaInput = useRef<HTMLInputElement>(null)
  const fokusKeNama = useCallback(() => namaInput.current?.focus(), [])
  const daftarTerfilter = useMemo(() => {
    const kataKunci = pencarianNama.trim().toLocaleLowerCase('id')
    return registrants.filter((registrant) => registrant.name.toLocaleLowerCase('id').includes(kataKunci))
  }, [registrants, pencarianNama])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addRegistrant({ id: `${Date.now()}-${nama}`, name: nama.trim(), program: programStudi })
    console.log('Data pendaftaran PMB:', { kampus, nama, tanggalLahir, email, telepon, fakultas, programStudi, alamat })
    dispatchSubmit({ type: 'success', name: nama })
    setKampus('UPI YPTK'); setNama(''); setTanggalLahir(''); setEmail(''); setTelepon(''); setFakultas(''); setProgramStudi(''); setAlamat('')
  }

  return (
    <main className="page pmb-page">
      <div className="pmb-heading"><div><p className="eyebrow">Penerimaan mahasiswa baru / 2026</p><h1>Mulai langkahmu.</h1><p className="page-lead">Isi formulir berikut untuk memulai pendaftaran di UPI YPTK Padang.</p></div><span className="pmb-stamp" aria-hidden="true">PMB<br />2026</span></div>
      <form className="pmb-form" onSubmit={handleSubmit}>
        <div className="form-heading"><span>01 / Data pendaftar</span><div><p>Lengkapi semua informasi dengan benar.</p><button className="form-focus-button" type="button" onClick={fokusKeNama}>Mulai isi formulir</button></div></div>
        <div className="form-grid">
          <InputField label="Nama kampus" id="kampus" value={kampus} placeholder="Nama kampus" onChange={(event) => setKampus(event.target.value)} />
          <InputField label="Nama lengkap" id="nama" value={nama} placeholder="Masukkan nama lengkap" onChange={(event) => { setNama(event.target.value); dispatchSubmit({ type: 'clear' }) }} inputRef={namaInput} />
          <InputField label="Tanggal lahir" id="tanggal-lahir" type="date" value={tanggalLahir} placeholder="" onChange={(event) => setTanggalLahir(event.target.value)} />
          <InputField label="Email" id="email" type="email" value={email} placeholder="nama@email.com" onChange={(event) => setEmail(event.target.value)} />
          <InputField label="Nomor telepon" id="telepon" type="tel" value={telepon} placeholder="Nomor yang bisa dihubungi" onChange={(event) => setTelepon(event.target.value)} />
          <div className="pmb-field"><label htmlFor="fakultas">Fakultas</label><select id="fakultas" value={fakultas} onChange={(event) => setFakultas(event.target.value)} required><option value="" disabled>Pilih fakultas</option>{daftarFakultas.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
          <div className="pmb-field"><label htmlFor="program-studi">Program studi</label><select id="program-studi" value={programStudi} onChange={(event) => setProgramStudi(event.target.value)} required><option value="" disabled>Pilih program studi</option>{daftarProgramStudi.map((program) => <option key={program} value={program}>{program}</option>)}</select></div>
          <div className="pmb-field form-wide"><label htmlFor="alamat">Alamat lengkap</label><textarea id="alamat" placeholder="Masukkan alamat lengkap" value={alamat} onChange={(event) => setAlamat(event.target.value)} rows={4} required /></div>
        </div>
        <div className="form-submit"><p>Dengan mengirim formulir, data pendaftaran akan diproses oleh tim PMB.</p><button className="pmb-button" type="submit">Kirim pendaftaran <span aria-hidden="true">↗</span></button></div>
      </form>
      {submitState.message && <p className="submit-success" role="status">{submitState.message}</p>}
      <section className="registrant-list" aria-labelledby="registrant-title">
        <div className="registrant-heading"><div><p className="eyebrow">Penerimaan / Pendaftar</p><h2 id="registrant-title">Daftar nama pendaftar</h2><p>{registrants.length} pendaftar</p></div><label className="registrant-search">Cari nama<input value={pencarianNama} onChange={(event) => setPencarianNama(event.target.value)} placeholder="Ketik nama..." /></label></div>
        {daftarTerfilter.length > 0 ? <ol className="registrant-items">{daftarTerfilter.map((registrant) => <li key={registrant.id}><span>{registrant.name}</span><small>{registrant.program}</small></li>)}</ol> : <p className="registrant-empty">{registrants.length === 0 ? 'Belum ada pendaftar. Nama akan muncul setelah formulir dikirim.' : 'Nama pendaftar tidak ditemukan.'}</p>}
      </section>
    </main>
  )
}
