type MenuHeaderProps = {
  mesa: number | null;
};

export default function MenuHeader({ mesa }: MenuHeaderProps) {
  return (
    <header className='card border-0 bg-light shadow-sm mb-5'>
      <div className='card-body p-4 p-md-5'>
        <p className='small fw-semibold text-secondary text-uppercase mb-2'>Carta de la casa</p>
        <h1 className='display-5 text-primary mb-0'>Cafetería Origen</h1>
        {mesa ? (
          <p className='badge bg-secondary fs-6 mt-3 mb-0'>Mesa {mesa}</p>
        ) : (
          <p className='badge bg-secondary fs-6 mt-3 mb-0'>Para retirar en barra</p>
        )}
      </div>
    </header>
  );
}
