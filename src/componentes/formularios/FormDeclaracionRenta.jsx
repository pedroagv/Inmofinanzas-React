import React, { useState } from 'react';
import { apiUrl } from '../../config';

function FormDeclaracionRenta() {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        cedula: '',
        rut: '',
        diasColombia: '',
        declaroRenta: '',
        actividad: '',
        ingresos: '',
        patrimonio: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/formulario-contacto-declaracion-renta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            alert('Información enviada correctamente');
            document.location.reload();
            console.log(data);
        } catch (error) {
            alert('Error al enviar la información');
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card p-sm-1 p-md-4">
                <div className="card-header">
                    <h2 className="card-title">Declaración de Renta y Patrimonio</h2>
                    <p className="card-text">Por favor, ingresa la información requerida para tu declaración.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                                    <input id="nombre" type="text" className="form-control" placeholder="Ingresa tu nombre completo" value={formData.nombre} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Número de teléfono</label>
                                    <input id="telefono" type="tel" className="form-control" placeholder="Ingresa tu número de teléfono" value={formData.telefono} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                    <input id="correo" type="email" className="form-control" placeholder="Ingresa tu correo electrónico" value={formData.correo} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="cedula" className="form-label">Últimos 2 dígitos de la cédula</label>
                                    <input id="cedula" type="number" className="form-control" placeholder="00" value={formData.cedula} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="rut" className="form-label">¿Posees RUT?</label>
                                    <select id="rut" className="form-select" value={formData.rut} onChange={handleChange}>
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="diasColombia" className="form-label">¿Has residido en Colombia por más de 182 días?</label>
                                    <select id="diasColombia" className="form-select" value={formData.diasColombia} onChange={handleChange}>
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="declaroRenta" className="form-label">¿Declaraste renta en 2022?</label>
                                    <select id="declaroRenta" className="form-select" value={formData.declaroRenta} onChange={handleChange}>
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actividad" className="form-label">Actividad principal</label>
                            <select id="actividad" className="form-select" value={formData.actividad} onChange={handleChange}>
                                <option value="" disabled>Selecciona una actividad</option>
                                <option value="empleado">Empleado</option>
                                <option value="independiente">Independiente</option>
                                <option value="empresario">Empresario</option>
                                <option value="inversionista">Inversionista</option>
                                <option value="pensionado">Pensionado</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="ingresos" className="form-label">Ingresos</label>
                                    <p className="form-text">Indique el total de sus ingresos, incluyendo salario, ganancias de negocios, ingresos por inversiones, alquileres, y cualquier otra fuente de ingreso.</p>
                                    <input id="ingresos" type="number" className="form-control" placeholder="0" value={formData.ingresos} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="patrimonio" className="form-label">Patrimonio</label>
                                    <p className="form-text">Indique el valor total de su patrimonio, incluyendo vivienda, vehículo, propiedades, CDT, inversiones, ahorros, criptomonedas y otros bienes.</p>
                                    <input id="patrimonio" type="number" className="form-control" placeholder="0" value={formData.patrimonio} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-end">
                        <button type="submit" className="btn btn-dark w-100">Enviar información para ser contactado</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormDeclaracionRenta;
