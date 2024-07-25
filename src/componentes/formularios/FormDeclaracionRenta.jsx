import React, { useState } from 'react';
import { apiUrl } from '../../config';

function FormDeclaracionRenta() {
    const [dateLabel, setDateLabel] = useState('');

    const dates = [
        [[1, 2], "12 de agosto del 2024"],
        [[3, 4], "13 de agosto del 2024"],
        [[5, 6], "14 de agosto del 2024"],
        [[7, 8], "15 de agosto del 2024"],
        [[9, 10], "16 de agosto del 2024"],
        [[11, 12], "20 de agosto del 2024"],
        [[13, 14], "21 de agosto del 2024"],
        [[15, 16], "22 de agosto del 2024"],
        [[17, 18], "23 de agosto del 2024"],
        [[19, 20], "26 de agosto del 2024"],
        [[21, 22], "27 de agosto del 2024"],
        [[23, 24], "28 de agosto del 2024"],
        [[25, 26], "29 de agosto del 2024"],
        [[27, 28], "2 de septiembre del 2024"],
        [[29, 30], "3 de septiembre del 2024"],
        [[31, 32], "4 de septiembre del 2024"],
        [[33, 34], "5 de septiembre del 2024"],
        [[35, 36], "6 de septiembre del 2024"],
        [[37, 38], "9 de septiembre del 2024"],
        [[39, 40], "10 de septiembre del 2024"],
        [[41, 42], "11 de septiembre del 2024"],
        [[43, 44], "12 de septiembre del 2024"],
        [[45, 46], "13 de septiembre del 2024"],
        [[47, 48], "16 de septiembre del 2024"],
        [[49, 50], "17 de septiembre del 2024"],
        [[51, 52], "18 de septiembre del 2024"],
        [[53, 54], "19 de septiembre del 2024"],
        [[55, 56], "20 de septiembre del 2024"],
        [[57, 58], "23 de septiembre del 2024"],
        [[59, 60], "24 de septiembre del 2024"],
        [[61, 62], "25 de septiembre del 2024"],
        [[63, 64], "26 de septiembre del 2024"],
        [[65, 66], "27 de septiembre del 2024"],
        [[67, 68], "1 de octubre del 2024"],
        [[69, 70], "2 de octubre del 2024"],
        [[71, 72], "3 de octubre del 2024"],
        [[73, 74], "4 de octubre del 2024"],
        [[75, 76], "7 de octubre del 2024"],
        [[77, 78], "8 de octubre del 2024"],
        [[79, 80], "9 de octubre del 2024"],
        [[81, 82], "10 de octubre del 2024"],
        [[83, 84], "11 de octubre del 2024"],
        [[85, 86], "15 de octubre del 2024"],
        [[87, 88], "16 de octubre del 2024"],
        [[89, 90], "17 de octubre del 2024"],
        [[91, 92], "18 de octubre del 2024"],
        [[93, 94], "21 de octubre del 2024"],
        [[95, 96], "22 de octubre del 2024"],
        [[97, 98], "23 de octubre del 2024"],
        [[99, 0], "24 de octubre del 2024"],
    ];

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

    const detectFechaDeclaracion = (value) => {
        if (value.length >= 2) {
            const firstTwoChars = parseInt(value.slice(0, 2), 10);
            const matchingDate = dates.find(([range]) => range.includes(firstTwoChars));
            if (matchingDate) {
                setDateLabel(matchingDate[1]);
            } else {
                setDateLabel('No date found for the entered value');
            }
        } else {
            setDateLabel('');
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
        if (id === 'cedula') {
            detectFechaDeclaracion(value);
        }
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
                                    {dateLabel && <label>Ultimo dia para presentar la declaracion: <strong style={{ color: 'green' }}>{dateLabel}</strong></label> }

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
