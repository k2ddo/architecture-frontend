'use client'

export default function WaitingBlock() {
  return (
    <main className="bg-[rgba(255,255,255,0.2)] rounded-lg text-xl">
      <div className="m-7 text-center">
        <h2 className="mb-5 font-semibold text-3xl">
          Ожидание одобрения аккаунта
        </h2>
        <div className="mb-3">
          Ваш аккаунт зарегистрирован, но его еще не одобрили администраторы
        </div>
        <div>Пожалуйста, ожидайте, пока ваш аккаунт будет подтвержден.</div>
      </div>
    </main>
  )
}
