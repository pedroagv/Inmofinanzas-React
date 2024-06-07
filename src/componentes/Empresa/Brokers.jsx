import React from 'react';

function Brokers() {
  return (
    <div className='container p-2'>
      <h3 className="font-bold my-4 border-bottom border-2">Conoce nuestros colaboradores</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <img src="https://www.shutterstock.com/shutterstock/photos/2307212331/display_1500/stock-photo-happy-mid-aged-business-man-ceo-standing-in-office-arms-crossed-smiling-mature-confident-2307212331.jpg" className="card-img-top" alt="Nombre del colaborador 1" />
            <div className="card-body">
              <h5 className="card-title">Nombre del colaborador 1</h5>
              <p className="card-text">Breve descripción del colaborador 1.</p>
              <a href="/" className="btn btn-primary">Ver perfil</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <img src="https://www.shutterstock.com/shutterstock/photos/1714666165/display_1500/stock-photo-head-shot-portrait-smiling-businessman-student-worker-wearing-glasses-looking-at-camera-happy-1714666165.jpg" className="card-img-top" alt="Nombre del colaborador 2" />
            <div className="card-body">
              <h5 className="card-title">Nombre del colaborador 2</h5>
              <p className="card-text">Breve descripción del colaborador 2.</p>
              <a href="/" className="btn btn-primary">Ver perfil</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <img src="https://www.shutterstock.com/shutterstock/photos/2343004161/display_1500/stock-photo--s-mid-age-european-business-woman-ceo-using-laptop-for-work-sitting-at-table-in-office-and-2343004161.jpg" className="card-img-top" alt="Nombre del colaborador 3" />
            <div className="card-body">
              <h5 className="card-title">Nombre del colaborador 3</h5>
              <p className="card-text">Breve descripción del colaborador 3.</p>
              <a href="/" className="btn btn-primary">Ver perfil</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brokers;
