export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <p>Сервис для обмена зашифрованными сообщениями</p>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © { new Date().getFullYear() } ItGid React course
        </div>
      </div>
    </footer>
  )
}
