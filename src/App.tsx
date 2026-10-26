import { useEffect, useState } from 'react'

type Screen = 'home' | 'courses' | 'catalog' | 'detail' | 'downloads' | 'progress' | 'wallet' | 'transfer' | 'statement' | 'earnings' | 'lessonAnalytics' | 'addLesson' | 'profile' | 'settings' | 'notifications' | 'lesson' | 'quiz' | 'checkout' | 'admin' | 'add' | 'content' | 'students' | 'structure'

const navigateTo = (screen: Screen) => window.dispatchEvent(new CustomEvent('navigate', { detail: screen }))

const icons: Record<string, string> = {
  home: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  courses: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zm0 0v15A2.5 2.5 0 0 1 6.5 18H20',
  chart: 'M4 19V9m6 10V5m6 14v-7m5 7H2',
  wallet: 'M3 7h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2zm0 2V6a2 2 0 0 1 2-2h12m0 9h4',
  user: 'M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  play: 'm9 7 8 5-8 5z',
  plus: 'M12 5v14M5 12h14',
  upload: 'M12 16V4m0 0L7 9m5-5 5 5M5 20h14',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8m13 10v-2a4 4 0 0 0-3-3.87m0-12a4 4 0 0 1 0 7.75',
  grid: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h4',
  back: 'm15 18-6-6 6-6',
  check: 'm5 12 4 4L19 6',
  card: 'M3 6h18v12H3zm0 4h18',
  file: 'M6 2h9l5 5v15H6zm9 0v5h5',
  download: 'M12 3v12m0 0 5-5m-5 5-5-5M5 21h14',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3m-9 0h8a2 2 0 0 1 2 2v8H6v-8a2 2 0 0 1 2-2',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10m-3-10 2 2 4-4',
  eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12m10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
  eyeOff: 'm3 3 18 18M10.6 6.2Q11.3 6 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8M6.6 6.6C3.6 8.5 2 12 2 12s3.5 6 10 6c1.4 0 2.7-.3 3.8-.7M9.9 9.9a3 3 0 0 0 4.2 4.2',
}

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>
}

function Brand({ className = '' }: { className?: string }) {
  const [imageFailed, setImageFailed] = useState(false)
  if (imageFailed) return <span className={`brand-fallback ${className}`} aria-label="B Developer Logo">B</span>
  return <img src="/b-developer-logo.jpeg" alt="B Developer Logo" className={`h-10 w-auto object-contain ${className}`} onError={() => setImageFailed(true)} />
}

function Button({ children, onClick, variant = 'primary', icon, type = 'button' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost'; icon?: string; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} className={`btn ${variant}`}>{icon && <Icon name={icon} size={19} />}{children}</button>
}

function Field({ label, placeholder, area = false }: { label: string; placeholder: string; area?: boolean }) {
  return <label className="field"><span>{label}</span>{area ? <textarea placeholder={placeholder} /> : <input placeholder={placeholder} />}</label>
}

function Header({ title, subtitle, back, onBack, action, onNotify }: { title: string; subtitle?: string; back?: boolean; onBack?: () => void; action?: React.ReactNode; onNotify?: () => void }) {
  return <header className="topbar"><div className="title-row">{back && <button className="icon-btn" onClick={onBack} aria-label="رجوع"><Icon name="back" /></button>}<div className="topbar-copy"><div className="topbar-brand"><Brand /><b>EDU-APP</b></div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div></div>{action ?? <button className="icon-btn notify" onClick={onNotify ?? (()=>window.dispatchEvent(new CustomEvent('navigate',{detail:'notifications'})))} aria-label="الإشعارات"><Icon name="bell" /><i /></button>}</header>
}

function AuthFlow({ onDone }: { onDone: () => void }) {
  const [stage,setStage]=useState<'splash'|'login'|'register'>('splash')
  const [error,setError]=useState('')
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirm,setShowConfirm]=useState(false)
  if(stage==='splash') return <div className="auth-screen splash"><Brand/><h1>منصة د/ خالد أحمد</h1><p>تعلّم. تطوّر. تقدّم.</p><button className="splash-start" onClick={()=>setStage('login')}>ابدأ الآن</button><small>اضغط للمتابعة إلى تسجيل الدخول</small></div>
  const submit=(e:React.FormEvent)=>{e.preventDefault();const form=e.currentTarget as HTMLFormElement;const data=new FormData(form);const account=String(data.get('account'));const password=String(data.get('password'));if(account.trim().length<5||password.length<6){setError('أدخل بريدًا إلكترونيًا أو رقم هاتف صحيحًا وكلمة مرور من 6 أحرف على الأقل.');return}if(stage==='register'&&password!==String(data.get('confirmPassword'))){setError('كلمتا المرور غير متطابقتين.');return}setError('');onDone()}
  return <div className="auth-screen auth-form">{stage==='register'&&<button className="icon-btn" onClick={()=>{setStage('login');setError('')}} aria-label="العودة لتسجيل الدخول"><Icon name="back"/></button>}<div className="login-brand"><Brand/><b>منصة د/ خالد أحمد</b></div><h1>{stage==='login'?'تسجيل الدخول':'إنشاء حساب جديد'}</h1><p>{stage==='login'?'أدخل بيانات حسابك للمتابعة إلى منصتك التعليمية':'أنشئ حسابك وابدأ رحلة التعلّم'}</p><form onSubmit={submit}>{stage==='register'&&<Field label="الاسم بالكامل" placeholder="أدخل اسمك"/>}<label className="field"><span>البريد الإلكتروني أو رقم الهاتف</span><input name="account" type="text" inputMode="email" placeholder="name@example.com أو 01xxxxxxxxx"/></label><label className="field password-field"><span>كلمة المرور</span><input name="password" type={showPassword?'text':'password'} placeholder="أدخل كلمة المرور"/><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?'إخفاء كلمة المرور':'إظهار كلمة المرور'}><Icon name={showPassword?'eyeOff':'eye'} size={20}/></button></label>{stage==='register'&&<label className={`field password-field ${error.includes('متطابقتين')?'invalid':''}`}><span>تأكيد كلمة المرور</span><input name="confirmPassword" type={showConfirm?'text':'password'} placeholder="أعد إدخال كلمة المرور"/><button type="button" onClick={()=>setShowConfirm(!showConfirm)} aria-label={showConfirm?'إخفاء تأكيد كلمة المرور':'إظهار تأكيد كلمة المرور'}><Icon name={showConfirm?'eyeOff':'eye'} size={20}/></button></label>}{error&&<div className="form-error">{error}</div>}{stage==='login'&&<button className="forgot" type="button" onClick={()=>setError('تم إرسال رابط استعادة كلمة المرور إلى بيانات التواصل المسجلة.')}>نسيت كلمة المرور؟</button>}<Button type="submit">{stage==='login'?'تسجيل الدخول':'إنشاء الحساب'}</Button></form><button className="auth-link auth-bottom" onClick={()=>{setStage(stage==='login'?'register':'login');setError('')}}>{stage==='login'?<>مستخدم جديد؟ <b>إنشاء حساب</b></>:<>لديك حساب؟ <b>تسجيل الدخول</b></>}</button></div>
}

function DeviceAuthFlow({ onDone }: { onDone: (isInstructor: boolean) => void }) {
  const [stage, setStage] = useState<'splash' | 'login' | 'register'>('splash')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  if (stage === 'splash') {
    return <div className="auth-screen splash"><Brand/><h1>EDU-APP</h1><p>تعلّم. تطوّر. تقدّم.</p><button className="splash-start" onClick={() => setStage('login')}>ابدأ الآن</button><small>اضغط للمتابعة إلى تسجيل الدخول</small></div>
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim().length < 5 || password.length < 6) {
      setError('أدخل بريدًا إلكترونيًا أو رقم هاتف صحيحًا وكلمة مرور من 6 أحرف على الأقل.')
      return
    }
    if (stage === 'register' && password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.')
      return
    }
    setError('')
    onDone(stage === 'login' && email.trim().toLowerCase() === 'instructor@bdev.com')
  }

  const fillCredentials = (role: 'instructor' | 'student') => {
    setEmail(`${role}@bdev.com`)
    setPassword('Password123!')
    setError('')
  }

  return <div className="auth-screen auth-form">
    {stage === 'register' && <button className="icon-btn" onClick={() => { setStage('login'); setError('') }} aria-label="العودة لتسجيل الدخول"><Icon name="back" /></button>}
    <div className="login-brand"><Brand/><b>EDU-APP</b></div>
    <h1>{stage === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h1>
    <p>{stage === 'login' ? 'أدخل بيانات حسابك للمتابعة إلى منصتك التعليمية' : 'أنشئ حسابك وابدأ رحلة التعلّم'}</p>
    <form onSubmit={submit}>
      {stage === 'register' && <Field label="الاسم بالكامل" placeholder="أدخل اسمك" />}
      <label className="field"><span>البريد الإلكتروني أو رقم الهاتف</span><input name="account" type="text" inputMode="email" autoComplete="username" placeholder="name@example.com أو 01xxxxxxxxx" value={email} onChange={event => setEmail(event.target.value)} /></label>
      <label className="field password-field"><span>كلمة المرور</span><input name="password" type={showPassword ? 'text' : 'password'} autoComplete={stage === 'login' ? 'current-password' : 'new-password'} placeholder="أدخل كلمة المرور" value={password} onChange={event => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}><Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} /></button></label>
      {stage === 'register' && <label className={`field password-field ${error.includes('متطابقتين') ? 'invalid' : ''}`}><span>تأكيد كلمة المرور</span><input name="confirmPassword" type={showConfirm ? 'text' : 'password'} autoComplete="new-password" placeholder="أعد إدخال كلمة المرور" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} /><button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? 'إخفاء تأكيد كلمة المرور' : 'إظهار تأكيد كلمة المرور'}><Icon name={showConfirm ? 'eyeOff' : 'eye'} size={20} /></button></label>}
      {error && <div className="form-error" role="alert">{error}</div>}
      {stage === 'login' && <button className="forgot" type="button" onClick={() => setError('تم إرسال رابط استعادة كلمة المرور إلى بيانات التواصل المسجلة.')}>نسيت كلمة المرور؟</button>}
      <Button type="submit">{stage === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}</Button>
    </form>
    {stage === 'login' && <section className="demo-credentials" aria-label="بيانات الحسابات التجريبية">
      <div><b>حسابات تجريبية</b><span>استخدم بيانات الاختبار للدخول بسرعة</span></div>
      <button type="button" onClick={() => fillCredentials('instructor')}>Login as Instructor</button>
      <button type="button" onClick={() => fillCredentials('student')}>Login as Student</button>
      <small>instructor@bdev.com · Password123!</small>
      <small>student@bdev.com · Password123!</small>
    </section>}
    <button className="auth-link auth-bottom" onClick={() => { setStage(stage === 'login' ? 'register' : 'login'); setError('') }}>{stage === 'login' ? <>مستخدم جديد؟ <b>إنشاء حساب</b></> : <>لديك حساب؟ <b>تسجيل الدخول</b></>}</button>
  </div>
}

const courses = [
  { title: 'أساسيات البرمجة', category: 'علوم الحاسب', progress: 72, color: 'blue', lessons: 24 },
  { title: 'اللغة الإنجليزية', category: 'المستوى المتقدم', progress: 46, color: 'purple', lessons: 18 },
  { title: 'التسويق الرقمي', category: 'إدارة الأعمال', progress: 18, color: 'orange', lessons: 32 },
]

function CourseCard({ course, onClick }: { course: typeof courses[0]; onClick: () => void }) {
  return <article className="course-card" onClick={onClick} role="button" tabIndex={0}>
    <div className={`course-art ${course.color}`}><span>0{course.lessons}</span><Icon name="play" size={28} /></div>
    <div className="course-copy"><small>{course.category}</small><h3>{course.title}</h3><div className="progress-meta"><span>{course.progress}% مكتمل</span><b>{course.lessons} درسًا</b></div><div className="progress-bar"><i style={{ width: `${course.progress}%` }} /></div></div>
  </article>
}

function Home({ go }: { go: (s: Screen) => void }) {
  return <><Header title="مرحبًا، أحمد" subtitle="لنواصل التعلّم من حيث توقفت" />
    <section className="hero"><div><span className="eyebrow">خطتك الأسبوعية</span><h2>أنت على بُعد درسين<br />من تحقيق هدفك</h2><Button onClick={() => go('lesson')} variant="secondary" icon="play">متابعة التعلّم</Button></div><div className="hero-ring"><strong>68%</strong><span>هذا الأسبوع</span></div></section>
    <section className="stats"><div><b>12</b><span>درسًا مكتملًا</span></div><div><b>8.5</b><span>ساعة تعلّم</span></div><div><b>3</b><span>شهادات</span></div></section>
    <SectionTitle title="تابع التعلّم" action="عرض الكل" onClick={() => go('courses')} />
    <div className="course-list">{courses.slice(0, 2).map(c => <CourseCard key={c.title} course={c} onClick={() => go('lesson')} />)}</div>
    <div className="tip"><div className="tip-icon"><Icon name="chart" /></div><div><b>تقدّم رائع!</b><p>تعلّمت 35 دقيقة أكثر من الأسبوع الماضي.</p></div></div>
  </>
}

function SectionTitle({ title, action, onClick }: { title: string; action?: string; onClick?: () => void }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button onClick={onClick}>{action}</button>}</div>
}

function Courses({ go }: { go: (s: Screen) => void }) {
  const [filter, setFilter] = useState('الكل')
  return <><Header title="دوراتي" subtitle="3 دورات نشطة" action={<button className="icon-btn" onClick={()=>go('downloads')} aria-label="التنزيلات"><Icon name="download"/></button>} /><button className="search" onClick={()=>go('catalog')}>ابحث واستكشف دورات جديدة... <span>⌕</span></button><button className="offline-shortcut" onClick={()=>go('downloads')}><div><Icon name="shield"/></div><span><b>المشاهدة دون إنترنت</b><small>3 دروس محفوظة بأمان داخل التطبيق</small></span><i>‹</i></button><div className="chips">{['الكل', 'قيد الدراسة', 'مكتملة'].map(x => <button className={filter === x ? 'active' : ''} onClick={() => setFilter(x)} key={x}>{x}</button>)}</div><div className="course-list roomy">{courses.filter(c => filter !== 'مكتملة' || c.progress > 90).map(c => <CourseCard key={c.title} course={c} onClick={() => go('detail')} />)}</div>{filter==='مكتملة'&&<div className="empty"><Icon name="check" size={32}/><h3>لا توجد دورات مكتملة بعد</h3><p>واصل التعلّم وستظهر إنجازاتك هنا.</p></div>}</>
}

function Catalog({go}:{go:(s:Screen)=>void}) {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('الكل'); const [loading,setLoading]=useState(false)
  const search=()=>{setLoading(true);setTimeout(()=>setLoading(false),650)}
  return <><Header title="استكشف الدورات" back onBack={()=>go('courses')}/><div className="search-input"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ماذا تريد أن تتعلّم؟"/><button onClick={search}>بحث</button></div><div className="chips scroll">{['الكل','البرمجة','اللغات','الأعمال','التصميم'].map(x=><button className={category===x?'active':''} onClick={()=>setCategory(x)} key={x}>{x}</button>)}</div><section className="catalog-banner"><small>الأكثر طلبًا</small><h2>تعلّم مهارات المستقبل<br/>مع أفضل المحاضرين</h2><span>خصم يصل إلى 30% هذا الأسبوع</span></section><SectionTitle title="دورات مقترحة لك"/>{loading?<div className="skeleton-list">{[1,2,3].map(x=><i key={x}/>)}</div>:<div className="catalog-grid">{courses.filter(c=>!query||c.title.includes(query)).map((c,i)=><button className="catalog-card" onClick={()=>go('detail')} key={c.title}><div className={`catalog-art ${c.color}`}><Icon name="play" size={30}/><span>{i===0?'الأكثر مبيعًا':'جديد'}</span></div><small>{c.category}</small><h3>{c.title}</h3><p>د/ خالد أحمد</p><div><b>4.9 ★</b><strong>{280+i*70} ج.م</strong></div></button>)}</div>}</>
}

type DownloadState = 'available' | 'downloading' | 'downloaded' | 'locked' | 'completed'

function LessonRow({number,title,duration,state,onDownload,onPlay,progress=0}:{number:number;title:string;duration:string;state:DownloadState;onDownload?:()=>void;onPlay:()=>void;progress?:number}) {
  const playable=state!=='locked'&&state!=='downloading'
  return <div className={`lesson-row ${state}`}><button className="lesson-main" disabled={!playable} onClick={onPlay}><i>{state==='completed'?<Icon name="check" size={15}/>:state==='locked'?<Icon name="lock" size={15}/>:number}</i><span><b>{title}</b><small>{duration} {state==='downloaded'&&'• متاح دون إنترنت'}{state==='completed'&&'• مكتمل'}</small></span></button>{state==='downloading'?<div className="download-progress"><svg viewBox="0 0 36 36"><path d="M18 2a16 16 0 1 1-11.3 4.7"/><path className="value" strokeDasharray={`${progress} 100`} d="M18 2a16 16 0 1 1-11.3 4.7"/></svg><b>{progress}%</b></div>:state==='downloaded'?<button className="download-action done" onClick={onPlay} aria-label="تشغيل دون إنترنت"><Icon name="play" size={17}/></button>:state==='locked'?<Icon name="lock" size={18}/>:<button className="download-action" onClick={onDownload} aria-label="تحميل للمشاهدة بدون إنترنت"><Icon name="download" size={18}/></button>}</div>
}

function CourseDetail({go}:{go:(s:Screen)=>void}) {
  const [tab,setTab]=useState('المحتوى'); const [downloading,setDownloading]=useState<number|null>(3); const [progress,setProgress]=useState(42); const [downloaded,setDownloaded]=useState([2])
  useEffect(()=>{if(downloading===null)return;const t=setInterval(()=>setProgress(p=>{if(p>=96){clearInterval(t);setDownloaded(d=>[...new Set([...d,downloading])]);setDownloading(null);return 100}return p+4}),350);return()=>clearInterval(t)},[downloading])
  const startDownload=(n:number)=>{setDownloading(n);setProgress(4)}
  const play=(offline=false)=>{localStorage.setItem('lessonMode',offline?'offline':'online');go('lesson')}
  const lessons=[['مقدمة إلى عالم البرمجة','08:24'],['تجهيز بيئة العمل','12:10'],['المتغيرات وأنواع البيانات','18:45'],['تطبيق عملي قصير','09:30'],['اختبار الوحدة','10 أسئلة']]
  return <><Header title="تفاصيل الدورة" back onBack={()=>go('courses')} action={<button className="icon-btn" onClick={()=>go('downloads')}><Icon name="download"/></button>}/><div className="detail-cover blue"><button onClick={()=>play(false)}><Icon name="play" size={32}/></button><span>شاهد المقدمة</span></div><div className="detail-title"><span>علوم الحاسب</span><h1>أساسيات البرمجة من الصفر</h1><p>د/ خالد أحمد • 4.9 ★ (328 تقييمًا)</p></div><div className="detail-facts"><div><b>24</b><span>درسًا</span></div><div><b>12 ساعة</b><span>محتوى</span></div><div><b>5 وحدات</b><span>منهج منظم</span></div></div><div className="tabs">{['نظرة عامة','المحتوى','التقييمات'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>{tab==='نظرة عامة'?<div className="detail-body"><h3>عن الدورة</h3><p>مسار عملي متكامل يأخذك من المبادئ الأساسية حتى بناء مشاريع حقيقية، مع تمارين واختبارات قصيرة بعد كل وحدة.</p><h3>ماذا ستتعلّم؟</h3>{['فهم منطق البرمجة والخوارزميات','بناء تطبيقات عملية خطوة بخطوة','حل المشكلات بأسلوب منهجي'].map(x=><div className="learn" key={x}><Icon name="check"/>{x}</div>)}</div>:tab==='المحتوى'?<div className="curriculum"><div className="secure-note"><Icon name="shield"/><span><b>تنزيل آمن داخل التطبيق</b><small>الفيديوهات مشفّرة ولا تُحفظ في معرض الصور أو ملفات الجهاز.</small></span></div><section className="module"><header><span>الوحدة 1</span><div><b>البداية مع البرمجة</b><small>5 دروس • 59 دقيقة</small></div><Icon name="check"/></header>{lessons.map((l,i)=>{const n=i+1;const state:DownloadState=i===0?'completed':downloaded.includes(n)?'downloaded':downloading===n?'downloading':i===4?'locked':'available';return <LessonRow key={l[0]} number={n} title={l[0]} duration={l[1]} state={state} progress={downloading===n?progress:0} onDownload={()=>startDownload(n)} onPlay={()=>play(state==='downloaded')}/>})}</section><section className="module collapsed"><header><span>الوحدة 2</span><div><b>منطق البرمجة والتحكم</b><small>6 دروس • 1 ساعة و24 دقيقة</small></div><Icon name="lock"/></header></section><button className="download-bundle" onClick={()=>{setDownloading(3);setProgress(4)}}><Icon name="download"/><span><b>تحميل الوحدة للمشاهدة دون إنترنت</b><small>المساحة المطلوبة: 480 MB</small></span></button></div>:<div className="reviews"><strong>4.9</strong><span>من 5 • ممتاز</span><p>“شرح واضح ومنظم، والتطبيقات العملية مفيدة جدًا.”</p></div>}</>
}

function Downloads({go}:{go:(s:Screen)=>void}) {
  const [progress,setProgress]=useState(68); const [paused,setPaused]=useState(false)
  useEffect(()=>{if(paused||progress>=100)return;const t=setInterval(()=>setProgress(p=>Math.min(100,p+2)),400);return()=>clearInterval(t)},[paused,progress])
  const play=()=>{localStorage.setItem('lessonMode','offline');go('lesson')}
  return <><Header title="المشاهدة دون إنترنت" subtitle="محتوى مشفّر ومحفوظ داخل التطبيق" back onBack={()=>go('courses')}/><div className="storage"><div><span>مساحة التنزيلات</span><b>1.2 GB من 5 GB</b></div><div className="storage-bar"><i/></div><small>يمكنك إدارة المساحة من إعدادات التطبيق</small></div><div className="secure-banner"><Icon name="shield"/><div><b>محتواك محمي</b><p>يتم تشفير الفيديوهات وتشغيلها حصريًا داخل المشغل الآمن. لا يمكن تصديرها أو حفظها في معرض الهاتف.</p></div></div><SectionTitle title="قيد التنزيل"/>{progress<100&&<div className="offline-card downloading-card"><div className="mini-art blue"><Icon name="play"/></div><div><b>المتغيرات وأنواع البيانات</b><span>أساسيات البرمجة • {progress}%</span><div className="progress-bar"><i style={{width:`${progress}%`}}/></div></div><button onClick={()=>setPaused(!paused)}>{paused?'استئناف':'إيقاف'}</button></div>}<SectionTitle title="تم التنزيل" action="حذف الكل" onClick={()=>window.dispatchEvent(new Event('toast'))}/>{[['مقدمة إلى عالم البرمجة','08:24','84 MB'],['تجهيز بيئة العمل','12:10','126 MB'],['مبادئ التسويق الرقمي','16:32','190 MB']].map((l,i)=><div className="offline-card" key={l[0]}><button className={`offline-thumb ${i===2?'orange':'blue'}`} onClick={play}><Icon name="play"/></button><div><b>{l[0]}</b><span>{i===2?'التسويق الرقمي':'أساسيات البرمجة'} • {l[1]}</span><small><Icon name="shield" size={12}/> مشفّر • {l[2]}</small></div><button className="more" onClick={()=>window.dispatchEvent(new Event('toast'))}>•••</button></div>)}<div className="offline-help"><Icon name="shield"/><p><b>كيف تعمل المشاهدة دون إنترنت؟</b> يبقى المحتوى داخل مساحة التطبيق الآمنة، ويتطلب تسجيل الدخول دوريًا للتحقق من الاشتراك.</p></div></>
}

function UtilityScreen({screen,go}:{screen:Screen;go:(s:Screen)=>void}) {
  const [enabled,setEnabled]=useState([true,true,false])
  if(screen==='notifications') return <><Header title="الإشعارات" back onBack={()=>go('home')} action={<button className="text-action" onClick={()=>window.dispatchEvent(new Event('toast'))}>تحديد الكل كمقروء</button>}/>{[['تم إضافة درس جديد','أضيف درس المتغيرات إلى دورة البرمجة','منذ 5 دقائق'],['تذكير بالاختبار','اختبار الوحدة الثالثة متاح حتى الغد','منذ ساعتين'],['عملية دفع ناجحة','تمت إضافة دورة التسويق الرقمي','أمس']].map((n,i)=><button className={`notification ${i===0?'unread':''}`} onClick={()=>go(i===2?'courses':'lesson')} key={n[0]}><div><Icon name={i===2?'card':i===1?'check':'courses'}/></div><span><b>{n[0]}</b><p>{n[1]}</p><small>{n[2]}</small></span></button>)}</>
  return <><Header title="الإعدادات" back onBack={()=>go('profile')}/><section className="panel settings"><h3>إعدادات الحساب</h3>{['الإشعارات الفورية','التذكير بالدروس','التحديثات التسويقية'].map((x,i)=><button key={x} onClick={()=>setEnabled(v=>v.map((a,j)=>j===i?!a:a))}><span>{x}</span><i className={enabled[i]?'on':''}/></button>)}</section><section className="panel menu"><button onClick={()=>window.dispatchEvent(new Event('toast'))}><Icon name="user"/><div><b>تغيير كلمة المرور</b><span>آخر تغيير منذ 3 أشهر</span></div><i>‹</i></button><button onClick={()=>window.dispatchEvent(new Event('toast'))}><Icon name="file"/><div><b>سياسة الخصوصية</b><span>الشروط وحماية البيانات</span></div><i>‹</i></button></section><Button variant="secondary" onClick={()=>window.dispatchEvent(new Event('toast'))}>حفظ الإعدادات</Button></>
}

function Progress() {
  return <><Header title="تقدّمي" subtitle="نظرة شاملة على رحلة تعلّمك" /><div className="progress-hero"><div className="big-ring"><strong>68%</strong><span>إجمالي التقدّم</span></div><div><small>سلسلة التعلّم</small><b>12 يومًا متتاليًا</b><p>أفضل سلسلة لك حتى الآن</p></div></div><section className="panel"><SectionTitle title="نشاط هذا الأسبوع" /><div className="bars">{[45,72,52,88,64,92,38].map((n,i)=><div key={i}><i style={{height:`${n}%`}} className={i===5?'hot':''}/><span>{['س','ح','ن','ث','ر','خ','ج'][i]}</span></div>)}</div></section><SectionTitle title="تقدّم الدورات" />{courses.map(c=><div className="progress-row" key={c.title}><div className={`mini-art ${c.color}`}><Icon name="courses"/></div><div><b>{c.title}</b><span>{c.progress}%</span><div className="progress-bar"><i style={{width:`${c.progress}%`}}/></div></div></div>)}</>
}

function Wallet({ go }: { go: (s: Screen) => void }) {
  return <><Header title="المحفظة" subtitle="رصيدك ومعاملاتك" /><section className="wallet-card"><span>الرصيد المتاح</span><h2>1,250.00 <small>ج.م</small></h2><Button variant="secondary" icon="plus" onClick={()=>window.dispatchEvent(new Event('toast'))}>إضافة رصيد</Button><div className="card-orbit" /></section><div className="wallet-actions"><button onClick={()=>go('checkout')}><Icon name="card"/><span>شراء دورة</span></button><button onClick={()=>go('transfer')}><Icon name="upload"/><span>تحويل</span></button><button onClick={()=>go('statement')}><Icon name="file"/><span>كشف حساب</span></button></div><SectionTitle title="آخر المعاملات" action="عرض الكل" onClick={()=>go('statement')} /><Transaction title="شراء دورة أساسيات البرمجة" date="اليوم، 10:42 ص" amount="- 350 ج.م" /><Transaction title="إضافة رصيد للمحفظة" date="12 مايو، 6:15 م" amount="+ 1,000 ج.م" positive /><Transaction title="شراء دورة اللغة الإنجليزية" date="8 مايو، 9:30 م" amount="- 420 ج.م" /></>
}

function Transaction({title,date,amount,positive}:{title:string;date:string;amount:string;positive?:boolean}) {return <div className="transaction"><div className={positive?'positive tx-icon':'tx-icon'}><Icon name={positive?'plus':'card'}/></div><div><b>{title}</b><span>{date}</span></div><strong className={positive?'green':''}>{amount}</strong></div>}

function Transfer({go}:{go:(s:Screen)=>void}) {
  const [phone,setPhone]=useState(''); const [amount,setAmount]=useState(''); const [confirmed,setConfirmed]=useState(false); const [error,setError]=useState('')
  const submit=()=>{if(phone.length<8||!amount||Number(amount)<=0||Number(amount)>1250){setError('أدخل بيانات صحيحة، وتأكد أن المبلغ لا يتجاوز الرصيد المتاح.');return}setError('');setConfirmed(true)}
  if(confirmed)return <div className="success-screen"><div><Icon name="check" size={44}/></div><h1>تم التحويل بنجاح</h1><p>تم تحويل {amount} ج.م إلى الحساب المرتبط بالرقم {phone}.</p><Button onClick={()=>go('wallet')}>العودة إلى المحفظة</Button><button className="auth-link" onClick={()=>go('statement')}>عرض إيصال العملية</button></div>
  return <><Header title="تحويل رصيد" subtitle="تحويل آمن وفوري" back onBack={()=>go('wallet')}/><div className="balance-strip"><span>الرصيد المتاح</span><b>1,250.00 ج.م</b></div><section className="form-card transfer-form"><label className="field"><span>رقم هاتف أو معرّف المستلم</span><input value={phone} onChange={e=>setPhone(e.target.value)} inputMode="tel" placeholder="01xxxxxxxxx أو Student ID"/></label><label className="field"><span>المبلغ</span><div className="amount-input"><input value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} inputMode="decimal" placeholder="0.00"/><b>ج.م</b></div></label><div className="quick-amounts">{['100','250','500'].map(x=><button onClick={()=>setAmount(x)} key={x}>{x} ج.م</button>)}</div><label className="field"><span>ملاحظة (اختياري)</span><input placeholder="سبب التحويل"/></label>{error&&<div className="form-error">{error}</div>}</section><div className="transfer-security"><Icon name="shield"/><span>التحويل محمي ومشفّر. راجع بيانات المستلم قبل التأكيد.</span></div><Button onClick={submit}>مراجعة وتأكيد التحويل</Button></>
}

function Statement({go}:{go:(s:Screen)=>void}) {
  const [filter,setFilter]=useState('الكل')
  const items=[{type:'إيداع',title:'إضافة رصيد للمحفظة',date:'16 مايو 2025، 6:15 م',amount:'+ 1,000 ج.م',status:'مكتملة',positive:true},{type:'شراء',title:'شراء دورة أساسيات البرمجة',date:'16 مايو 2025، 10:42 ص',amount:'- 350 ج.م',status:'مكتملة'},{type:'تحويل',title:'تحويل إلى 010•••4832',date:'14 مايو 2025، 2:30 م',amount:'- 200 ج.م',status:'مكتملة'},{type:'شراء',title:'شراء دورة اللغة الإنجليزية',date:'8 مايو 2025، 9:30 م',amount:'- 420 ج.م',status:'مكتملة'},{type:'تحويل',title:'تحويل إلى STD-2094',date:'3 مايو 2025، 1:20 م',amount:'- 150 ج.م',status:'معلّقة'}]
  const shown=filter==='الكل'?items:items.filter(x=>x.type===filter)
  return <><Header title="كشف الحساب" subtitle="سجل جميع معاملات المحفظة" back onBack={()=>go('wallet')} action={<button className="icon-btn" onClick={()=>window.dispatchEvent(new Event('toast'))}><Icon name="download"/></button>}/><div className="statement-summary"><div><span>إجمالي الإيداع</span><b className="green">+ 2,400 ج.م</b></div><div><span>إجمالي المصروفات</span><b>- 1,150 ج.م</b></div></div><div className="chips scroll">{['الكل','إيداع','شراء','تحويل'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="history-date">مايو 2025</div>{shown.map((x,i)=><button className="history-item" onClick={()=>window.dispatchEvent(new Event('toast'))} key={i}><div className={`tx-icon ${x.positive?'positive':''}`}><Icon name={x.type==='إيداع'?'plus':x.type==='شراء'?'card':'upload'}/></div><span><b>{x.title}</b><small>{x.date}</small><i className={x.status==='معلّقة'?'pending':''}>{x.status}</i></span><strong className={x.positive?'green':''}>{x.amount}</strong></button>)}{shown.length===0&&<div className="empty"><Icon name="file"/><h3>لا توجد معاملات</h3><p>لم يتم العثور على معاملات ضمن هذا التصنيف.</p></div>}</>
}

function Profile({ admin }: { admin: boolean }) {
  return <>
    <Header title={admin ? 'ملف المحاضر' : 'حسابي'} />
    <div className="profile-head"><div className="avatar">{admin ? 'خ' : 'أ'}</div><h2>{admin ? 'د/ خالد أحمد' : 'أحمد محمد علي'}</h2><p>{admin ? 'khaled@academy.com' : 'ahmed.mohamed@email.com'}</p><span>{admin ? 'محاضر موثّق • 8 دورات' : 'طالب منذ مارس 2024'}</span></div>
    <section className="panel menu">
      <button onClick={() => navigateTo('settings')}><Icon name="user" /><div><b>البيانات الشخصية</b><span>الاسم، الهاتف، البريد</span></div><i>‹</i></button>
      <button onClick={() => navigateTo('notifications')}><Icon name="bell" /><div><b>الإشعارات</b><span>تفضيلات التنبيهات</span></div><i>‹</i></button>
      <button onClick={() => navigateTo(admin ? 'earnings' : 'checkout')}><Icon name="card" /><div><b>{admin ? 'الأرباح والتحويلات' : 'طرق الدفع'}</b><span>{admin ? 'تقارير الإيرادات' : 'البطاقات المحفوظة'}</span></div><i>‹</i></button>
    </section>
    <button className="logout" onClick={() => window.dispatchEvent(new Event('logout'))}>تسجيل الخروج</button>
  </>
}

function Lesson({ go }: { go: (s: Screen) => void }) {
  const [done,setDone]=useState(false); const [tab,setTab]=useState('ملاحظاتي'); const offline=localStorage.getItem('lessonMode')==='offline'
  return <><Header title="أساسيات البرمجة" back onBack={()=>go(offline?'downloads':'detail')} action={<span className="lesson-count">3 / 24</span>} />{offline&&<div className="offline-indicator"><Icon name="shield"/><span><b>تشغيل آمن دون إنترنت</b><small>هذا الفيديو مشفّر ويعمل داخل التطبيق فقط</small></span></div>}<div className="video"><div className="video-controls"><button aria-label="السابق">‹</button><button className="main-play" aria-label="تشغيل الفيديو"><Icon name="play" size={38}/></button><button aria-label="التالي">›</button></div><span>12:48 / 18:45</span><div className="video-line"><i/></div></div><div className="lesson-switcher"><button onClick={()=>go('detail')}>‹ الدرس السابق</button><span>الدرس 3 من 5</span><button onClick={()=>go('quiz')}>الدرس التالي ›</button></div><div className="lesson-title"><small>الوحدة الأولى • الدرس 3</small><h2>المتغيرات وأنواع البيانات</h2><p>في هذا الدرس سنتعرف على مفهوم المتغيرات وكيفية التعامل مع أنواع البيانات المختلفة.</p></div><div className="tabs">{['ملاحظاتي','الدروس','المرفقات'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>{tab==='ملاحظاتي'?<textarea className="notes" placeholder="اكتب ملاحظاتك هنا..." />:tab==='الدروس'?<div className="player-lessons"><LessonRow number={2} title="تجهيز بيئة العمل" duration="12:10" state="completed" onPlay={()=>{}}/><LessonRow number={3} title="المتغيرات وأنواع البيانات" duration="18:45" state={offline?'downloaded':'available'} onPlay={()=>{}}/><LessonRow number={4} title="تطبيق عملي قصير" duration="09:30" state="available" onPlay={()=>{}}/></div>:<button className="attachment" onClick={()=>window.dispatchEvent(new Event('toast'))}><Icon name="file"/><span><b>ملخص الدرس.pdf</b><small>2.4 MB</small></span><Icon name="download"/></button>}<div className="lesson-actions"><Button onClick={()=>setDone(!done)} variant={done?'secondary':'primary'} icon="check">{done?'تم إكمال الدرس':'وضع علامة كمكتمل'}</Button><Button onClick={()=>go('quiz')} variant="secondary">اختبار الدرس</Button></div></>
}

function Quiz({ go }: { go: (s: Screen) => void }) {
  const [answer,setAnswer]=useState<number|null>(null); const [submitted,setSubmitted]=useState(false)
  return <><Header title="اختبار الدرس" back onBack={()=>go('lesson')} action={<span className="lesson-count">1 من 5</span>} /><div className="quiz-progress"><i /></div><section className="quiz-card"><span>السؤال الأول</span><h2>أي من التالي يُستخدم لتعريف متغير ثابت في JavaScript؟</h2>{['var','let','const','static'].map((x,i)=><button key={x} onClick={()=>!submitted&&setAnswer(i)} className={`${answer===i?'selected':''} ${submitted&&i===2?'correct':''}`}><i>{['أ','ب','ج','د'][i]}</i>{x}{submitted&&i===2&&<Icon name="check" />}</button>)}</section>{submitted&&<div className="answer-note"><b>إجابة صحيحة</b><p>تُستخدم const لتعريف قيمة لا يمكن إعادة إسنادها بعد تعريفها.</p></div>}<Button onClick={()=>answer!==null&&setSubmitted(true)}>{submitted?'السؤال التالي':'تأكيد الإجابة'}</Button></>
}

function Checkout({ go }: { go: (s: Screen) => void }) {
  const [method,setMethod]=useState('wallet'); const [paid,setPaid]=useState(false)
  if(paid) return <div className="success-screen"><div><Icon name="check" size={44}/></div><h1>تم الدفع بنجاح</h1><p>أصبحت دورة «التسويق الرقمي» متاحة الآن ضمن دوراتك.</p><Button onClick={()=>go('courses')}>ابدأ التعلّم الآن</Button></div>
  return <><Header title="إتمام الشراء" back onBack={()=>go('wallet')} /><div className="order-course"><div className="mini-art orange"><Icon name="courses"/></div><div><small>دورة كاملة</small><b>التسويق الرقمي</b><span>د/ خالد أحمد</span></div><strong>350 ج.م</strong></div><SectionTitle title="طريقة الدفع" />{[['wallet','wallet','المحفظة','الرصيد: 1,250 ج.م'],['card','card','بطاقة بنكية','Visa / Mastercard'],['fawry','file','فوري / أمان','الدفع برقم مرجعي']].map(m=><button className={`pay-option ${method===m[0]?'selected':''}`} onClick={()=>setMethod(m[0])} key={m[0]}><Icon name={m[1]}/><div><b>{m[2]}</b><span>{m[3]}</span></div><i /></button>)}<div className="coupon"><input placeholder="كود الخصم" /><Button variant="secondary" onClick={()=>window.dispatchEvent(new Event('toast'))}>تطبيق</Button></div><div className="summary"><p><span>سعر الدورة</span><b>350 ج.م</b></p><p><span>الخصم</span><b className="green">- 0 ج.م</b></p><hr/><p className="total"><span>الإجمالي</span><b>350 ج.م</b></p></div><Button onClick={()=>setPaid(true)} icon="card">دفع آمن ومتابعة</Button><p className="secure">عملية الدفع مشفّرة ومؤمّنة بالكامل</p></>
}

function Admin({ go }: { go: (s: Screen) => void }) {
  return <><Header title="لوحة المحاضر" subtitle="الخميس، 16 مايو" /><section className="admin-welcome"><div><span>صباح الخير، د/ خالد</span><h2>طلابك يحققون تقدّمًا رائعًا</h2></div><Icon name="chart" size={40}/></section><div className="admin-stats"><div><span>إجمالي الطلاب</span><b>1,284</b><small>+12% هذا الشهر</small></div><div><span>الدورات النشطة</span><b>08</b><small>3 قيد الإعداد</small></div><div><span>متوسط الإكمال</span><b>74%</b><small>+5% هذا الشهر</small></div><button onClick={()=>go('earnings')}><span>الإيرادات</span><b>42k</b><small>ج.م هذا الشهر</small></button></div><SectionTitle title="أداء الدورات" action="عرض التقرير" onClick={()=>go('students')} />{courses.map(c=><div className="admin-course" key={c.title}><div className={`mini-art ${c.color}`}><Icon name="courses"/></div><div><b>{c.title}</b><span>{Math.round(c.lessons*14)} طالبًا</span></div><strong>{c.progress}%</strong></div>)}</>
}

function InstructorEarnings({go}:{go:(s:Screen)=>void}) {
  const [withdraw,setWithdraw]=useState(false); const [done,setDone]=useState(false)
  const sales=[['أساسيات البرمجة','سارة أحمد','16 مايو 2025','+ 350 ج.م'],['التسويق الرقمي','محمد علي','15 مايو 2025','+ 420 ج.م'],['اللغة الإنجليزية','نور خالد','14 مايو 2025','+ 280 ج.م'],['أساسيات البرمجة','يوسف محمود','12 مايو 2025','+ 350 ج.م']]
  return <><Header title="الأرباح والمحفظة" subtitle="إدارة إيرادات دوراتك" back onBack={()=>go('admin')}/><section className="earnings-hero"><span>إجمالي الأرباح</span><h2>128,450 <small>ج.م</small></h2><div><p><span>المتاح للسحب</span><b>42,680 ج.م</b></p><Button variant="secondary" onClick={()=>setWithdraw(true)}>سحب الأرباح</Button></div></section><div className="earnings-stats"><div><span>هذا الشهر</span><b>18,240 ج.م</b><small>+14.2%</small></div><div><span>عدد المبيعات</span><b>56</b><small>+8 هذا الأسبوع</small></div></div><SectionTitle title="آخر المبيعات" action="تصدير التقرير" onClick={()=>window.dispatchEvent(new Event('toast'))}/><div className="sales-table"><div className="sales-head"><span>الدورة / الطالب</span><span>التاريخ</span><span>المبلغ</span></div>{sales.map(x=><div className="sales-row" key={x[1]}><span><b>{x[0]}</b><small>{x[1]}</small></span><span>{x[2]}</span><strong>{x[3]}</strong></div>)}</div>{withdraw&&<div className="modal-backdrop"><section className="modal"><button className="modal-close" onClick={()=>setWithdraw(false)}>×</button>{done?<><div className="modal-success"><Icon name="check"/></div><h2>تم إرسال طلب السحب</h2><p>سيصل المبلغ إلى حسابك البنكي خلال 2–3 أيام عمل.</p><Button onClick={()=>setWithdraw(false)}>حسنًا</Button></>:<><h2>سحب الأرباح</h2><p>الرصيد المتاح: 42,680 ج.م</p><label className="field"><span>مبلغ السحب</span><input inputMode="decimal" placeholder="0.00 ج.م"/></label><label className="field"><span>الحساب البنكي</span><select><option>البنك الأهلي •••• 4821</option></select></label><Button onClick={()=>setDone(true)}>تأكيد طلب السحب</Button></>}</section></div>}</>
}

function InstructorContent({go}:{go:(s:Screen)=>void}) {
  const [visibility,setVisibility]=useState<Record<string,boolean>>({'أساسيات البرمجة':true,'اللغة الإنجليزية':true,'التسويق الرقمي':false,'مقدمة إلى عالم البرمجة':true,'تجهيز بيئة العمل':true,'المتغيرات وأنواع البيانات':true})
  const toggle=(name:string)=>setVisibility(v=>({...v,[name]:!v[name]}))
  const lessons=['مقدمة إلى عالم البرمجة','تجهيز بيئة العمل','المتغيرات وأنواع البيانات']
  return <><Header title="الدورات والمحتوى" subtitle="إدارة النشر والدروس" back onBack={()=>go('admin')} action={<button className="icon-btn" onClick={()=>go('add')}><Icon name="plus"/></button>}/><div className="management-actions"><Button onClick={()=>go('add')} icon="plus">إضافة دورة جديدة</Button><Button onClick={()=>go('addLesson')} variant="secondary" icon="upload">إضافة درس</Button></div><SectionTitle title="دوراتي"/>{courses.map((c,i)=><section className="manage-course" key={c.title}><div className="manage-course-head"><div className={`mini-art ${c.color}`}><Icon name="courses"/></div><span><b>{c.title}</b><small>{c.lessons} درسًا • {Math.round(c.lessons*14)} طالبًا</small></span><button className={`visibility ${visibility[c.title]?'on':''}`} onClick={()=>toggle(c.title)}><i/>{visibility[c.title]?'ظاهر':'مخفي'}</button></div>{i===0&&<div className="managed-lessons"><div className="managed-section-title"><span>الوحدة الأولى • 3 دروس</span><button onClick={()=>go('addLesson')}><Icon name="plus" size={16}/> درس</button></div>{lessons.map((l,j)=><div className="managed-lesson" key={l}><button className="lesson-analytics-link" onClick={()=>go('lessonAnalytics')}><i>{j+1}</i><span><b>{l}</b><small>{[84,126,190][j]} مشاهدة • {[22,48,63][j]} تنزيلًا</small></span></button><button className={`visibility compact ${visibility[l]?'on':''}`} onClick={()=>toggle(l)}><i/>{visibility[l]?'إظهار':'إخفاء'}</button></div>)}</div>}</section>)}</>
}

function LessonAnalytics({go}:{go:(s:Screen)=>void}) {
  const [tab,setTab]=useState('الوصول والتنزيل')
  const students=[['سارة أحمد','شاهدت • تنزيل دون إنترنت','18:45','92%'],['محمد علي','شاهدت عبر الإنترنت','16:20','84%'],['نور خالد','تنزيل دون إنترنت','18:45','76%'],['يوسف محمود','شاهد 68%','12:30','—']]
  return <><Header title="تحليلات الدرس" back onBack={()=>go('content')}/><section className="lesson-analytics-head"><small>أساسيات البرمجة • الوحدة الأولى</small><h2>المتغيرات وأنواع البيانات</h2><div><span><b>190</b> مشاهدة</span><span><b>63</b> تنزيلًا</span><span><b>82%</b> متوسط الدرجة</span></div></section><div className="tabs analytics-tabs">{['الوصول والتنزيل','الاختبارات والدرجات'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>{tab==='الوصول والتنزيل'?<><div className="analytics-filter"><span>الطلاب الذين وصلوا للدرس</span><b>190 طالبًا</b></div>{students.map((s,i)=><div className="analytics-student" key={s[0]}><div className="avatar small">{s[0][0]}</div><span><b>{s[0]}</b><small className={s[1].includes('تنزيل')?'offline-access':''}>{s[1].includes('تنزيل')&&<Icon name="shield" size={12}/>} {s[1]}</small></span><strong>{s[2]}</strong></div>)}</>:<><div className="grade-summary"><div><b>82%</b><span>متوسط الدرجات</span></div><div><b>142</b><span>أكملوا الاختبار</span></div><div><b>88%</b><span>نسبة النجاح</span></div></div><div className="grades-table"><div><span>الطالب</span><span>الدرجة</span><span>الأداء</span></div>{students.map((s,i)=><button onClick={()=>window.dispatchEvent(new Event('toast'))} key={s[0]}><span>{s[0]}</span><b>{s[3]}</b><i className={i===2?'average':i===3?'pending':''}>{i===3?'لم يؤدِ':i===2?'جيد':'ممتاز'}</i></button>)}</div></>}</>
}

function AddLesson({go}:{go:(s:Screen)=>void}) {
  const [videoType,setVideoType]=useState<'youtube'|'upload'>('youtube'); const [quiz,setQuiz]=useState(false); const [saved,setSaved]=useState(false)
  if(saved)return <div className="success-screen"><div><Icon name="check" size={44}/></div><h1>تمت إضافة الدرس</h1><p>حُفظ الدرس داخل دورة «أساسيات البرمجة» ويمكنك الآن نشره أو مراجعة تحليلاته لاحقًا.</p><Button onClick={()=>go('content')}>العودة إلى إدارة المحتوى</Button></div>
  return <><Header title="إضافة درس جديد" subtitle="أنشئ محتوى الدرس واربطه بالدورة" back onBack={()=>go('content')}/><div className="lesson-form-steps"><i className="active"/><i/><i/></div><section className="form-card"><label className="field"><span>اختر الدورة التدريبية</span><select defaultValue=""><option value="" disabled>حدد الدورة</option><option>أساسيات البرمجة</option><option>اللغة الإنجليزية</option><option>التسويق الرقمي</option></select></label><label className="field"><span>اختر الوحدة / السيكشن</span><select><option>الوحدة الأولى: البداية مع البرمجة</option><option>الوحدة الثانية: منطق البرمجة</option></select></label><Field label="عنوان الدرس" placeholder="مثال: المتغيرات وأنواع البيانات"/><Field label="وصف الدرس" placeholder="اكتب ملخصًا واضحًا لما سيتعلمه الطالب..." area/></section><SectionTitle title="فيديو الدرس"/><div className="video-type"><button className={videoType==='youtube'?'active':''} onClick={()=>setVideoType('youtube')}>رابط YouTube</button><button className={videoType==='upload'?'active':''} onClick={()=>setVideoType('upload')}>رفع إلى الخادم</button></div>{videoType==='youtube'?<label className="field video-link"><span>رابط الفيديو</span><input placeholder="https://youtube.com/watch?v=..."/></label>:<button className="lesson-upload" onClick={()=>window.dispatchEvent(new Event('toast'))}><Icon name="upload" size={30}/><b>اختر ملف الفيديو أو اسحبه هنا</b><span>MP4 حتى 2GB • يُعالج ويُشفّر تلقائيًا</span></button>}<SectionTitle title="مرفقات PDF"/><button className="lesson-upload compact-upload" onClick={()=>window.dispatchEvent(new Event('toast'))}><Icon name="file"/><b>إرفاق ملخص أو أوراق عمل</b><span>PDF حتى 25MB</span></button><section className="quiz-attach"><div><Icon name="check"/><span><b>إرفاق اختبار بهذا الدرس</b><small>اختياري • يظهر بعد إكمال الفيديو</small></span></div><button className={`visibility ${quiz?'on':''}`} onClick={()=>setQuiz(!quiz)}><i/>{quiz?'مفعّل':'غير مفعّل'}</button>{quiz&&<select><option>اختبار الوحدة الأولى — 10 أسئلة</option><option>إنشاء اختبار جديد</option></select>}</section><div className="publish-options"><label><input type="checkbox" defaultChecked/> إتاحة التنزيل الآمن دون إنترنت</label><label><input type="checkbox"/> نشر الدرس فور الحفظ</label></div><div className="form-actions"><Button variant="secondary" onClick={()=>go('content')}>حفظ كمسودة</Button><Button onClick={()=>setSaved(true)}>حفظ الدرس</Button></div></>
}

function AdminForm({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  const [saved,setSaved]=useState(false)
  const titles:Record<string,string>={add:'إضافة دورة جديدة',content:'إدارة المحتوى',students:'الطلاب والتحليلات',structure:'هيكل المنصة'}
  if(screen==='students') return <><Header title={titles[screen]} back onBack={()=>go('admin')} /><div className="admin-stats compact"><div><span>الطلاب النشطون</span><b>1,120</b></div><div><span>متوسط الأداء</span><b>82%</b></div></div><div className="search">ابحث عن طالب... <span>⌕</span></div>{['سارة أحمد','محمد علي','نور خالد','يوسف محمود'].map((x,i)=><div className="student" key={x}><div className="avatar small">{x[0]}</div><div><b>{x}</b><span>{3+i%2} دورات مشتركة</span></div><div><strong>{[92,76,68,54][i]}%</strong><span>التقدّم</span></div></div>)}</>
  if(screen==='structure') return <><Header title={titles[screen]} back onBack={()=>go('admin')} /><div className="structure-head"><div><b>8</b><span>دورات</span></div><div><b>42</b><span>وحدة</span></div><div><b>186</b><span>درسًا</span></div></div>{courses.map((c,i)=><section className="structure" key={c.title}><div><div className={`mini-art ${c.color}`}><Icon name="courses"/></div><div><h3>{c.title}</h3><span>{5+i} وحدات • {c.lessons} درسًا</span></div></div><button onClick={()=>go('content')}>إدارة المحتوى</button></section>)}</>
  if(screen==='content') return <><Header title={titles[screen]} back onBack={()=>go('admin')} /><label className="field"><span>اختر الدورة</span><select><option>أساسيات البرمجة</option><option>اللغة الإنجليزية</option></select></label><div className="upload-box"><Icon name="upload" size={34}/><b>اسحب الملفات هنا أو اختر من جهازك</b><span>فيديو، PDF، أو ملفات مضغوطة</span><Button variant="secondary">اختيار ملف</Button></div><SectionTitle title="محتوى الوحدة الثالثة" />{['فيديو: المتغيرات وأنواع البيانات','PDF: ملخص الوحدة','اختبار الوحدة الثالثة'].map((x,i)=><div className="content-item" key={x}><div><Icon name={i===0?'play':i===1?'file':'check'}/></div><span>{x}</span><button>•••</button></div>)}</>
  return <><Header title={titles[screen]} back onBack={()=>go('admin')} /><div className="form-card"><Field label="عنوان الدورة" placeholder="مثال: أساسيات البرمجة" /><Field label="وصف الدورة" placeholder="اكتب وصفًا واضحًا وجذابًا للدورة..." area /><label className="field"><span>التصنيف</span><select><option>اختر التصنيف</option><option>علوم الحاسب</option><option>إدارة الأعمال</option></select></label><div className="upload-box small-upload"><Icon name="upload"/><b>صورة غلاف الدورة</b><span>PNG أو JPG بحد أقصى 5MB</span></div></div><Button onClick={()=>setSaved(true)} icon="check">{saved?'تم حفظ المسودة':'حفظ ومتابعة'}</Button></>
}

const studentNav: { id: Screen; label: string; icon: string }[] = [{id:'home',label:'الرئيسية',icon:'home'},{id:'courses',label:'دوراتي',icon:'courses'},{id:'progress',label:'تقدّمي',icon:'chart'},{id:'wallet',label:'المحفظة',icon:'wallet'},{id:'profile',label:'حسابي',icon:'user'}]
const adminNav: { id: Screen; label: string; icon: string }[] = [{id:'admin',label:'الرئيسية',icon:'home'},{id:'content',label:'المحتوى',icon:'courses'},{id:'students',label:'الطلاب',icon:'users'},{id:'structure',label:'الهيكل',icon:'grid'},{id:'profile',label:'حسابي',icon:'user'}]

function DeviceFrame({ mode, onModeChange, children }: { mode: 'mobile' | 'tablet'; onModeChange: (mode: 'mobile' | 'tablet') => void; children: React.ReactNode }) {
  return <div className="device-demo">
    <div className="device-controls" role="group" aria-label="اختيار إطار الجهاز">
      <button className={mode === 'mobile' ? 'active' : ''} onClick={() => onModeChange('mobile')}>Mobile View <span>iPhone 15 Pro</span></button>
      <button className={mode === 'tablet' ? 'active' : ''} onClick={() => onModeChange('tablet')}>Tablet View <span>iPad Mini</span></button>
    </div>
    <div className={`device-frame ${mode}`}>
      <div className="device-screen">
        <div className="device-status"><span>9:41</span><i className="device-notch" /><span className="status-icons">● ● ▰</span></div>
        {children}
      </div>
    </div>
  </div>
}

export default function App() {
  const [screen,setScreen]=useState<Screen>('home'); const [admin,setAdmin]=useState(false); const [authenticated,setAuthenticated]=useState(false); const [toast,setToast]=useState(''); const [device,setDevice]=useState<'mobile'|'tablet'>('mobile')
  const go=(s:Screen)=>{setScreen(s); window.scrollTo({top:0,behavior:'smooth'})}
  useEffect(()=>{
    const navigate=(e:Event)=>go((e as CustomEvent).detail as Screen)
    const notify=()=>{setToast('تم تنفيذ الإجراء بنجاح');setTimeout(()=>setToast(''),2200)}
    const logout=()=>{setAuthenticated(false);setScreen('home');setAdmin(false)}
    window.addEventListener('navigate',navigate);window.addEventListener('toast',notify);window.addEventListener('logout',logout)
    return()=>{window.removeEventListener('navigate',navigate);window.removeEventListener('toast',notify);window.removeEventListener('logout',logout)}
  },[])
  if(!authenticated) return <DeviceFrame mode={device} onModeChange={setDevice}><DeviceAuthFlow onDone={isInstructor=>{setAdmin(isInstructor);setAuthenticated(true);setScreen(isInstructor?'admin':'home')}}/></DeviceFrame>
  const hidden=['lesson','quiz','checkout','transfer','statement','earnings','lessonAnalytics','addLesson','add','content','detail','catalog','downloads','settings','notifications'].includes(screen)
  let page:React.ReactNode
  if(screen==='home') page=<Home go={go}/>; else if(screen==='courses') page=<Courses go={go}/>; else if(screen==='catalog') page=<Catalog go={go}/>; else if(screen==='detail') page=<CourseDetail go={go}/>; else if(screen==='downloads') page=<Downloads go={go}/>; else if(screen==='progress') page=<Progress/>; else if(screen==='wallet') page=<Wallet go={go}/>; else if(screen==='transfer') page=<Transfer go={go}/>; else if(screen==='statement') page=<Statement go={go}/>; else if(screen==='earnings') page=<InstructorEarnings go={go}/>; else if(screen==='content') page=<InstructorContent go={go}/>; else if(screen==='lessonAnalytics') page=<LessonAnalytics go={go}/>; else if(screen==='addLesson') page=<AddLesson go={go}/>; else if(screen==='profile') page=<Profile admin={admin}/>; else if(screen==='settings'||screen==='notifications') page=<UtilityScreen screen={screen} go={go}/>; else if(screen==='lesson') page=<Lesson go={go}/>; else if(screen==='quiz') page=<Quiz go={go}/>; else if(screen==='checkout') page=<Checkout go={go}/>; else if(screen==='admin') page=<Admin go={go}/>; else page=<AdminForm screen={screen} go={go}/>
  const nav=admin?adminNav:studentNav
  return <DeviceFrame mode={device} onModeChange={setDevice}><div className="app" dir="rtl"><main>{page}</main>{!hidden&&<nav className="bottom-nav">{nav.map(n=><button className={screen===n.id?'active':''} onClick={()=>go(n.id)} key={n.id}><Icon name={n.icon}/><span>{n.label}</span></button>)}</nav>}{toast&&<div className="toast"><Icon name="check"/>{toast}</div>}</div></DeviceFrame>
}
