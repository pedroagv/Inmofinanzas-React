import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';
import classNames from 'classnames';


function AdminImagenPorProductoModal({ isOpen, onClose, folder }) {
    const [images, setImages] = useState([]);
    const [favorite, setFavorite] = useState('');

    const fetchImages = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/images/${folder}`);
            setImages(response.data.imagenes);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }, [folder]);

    useEffect(() => {
        if (isOpen) {
            fetchImages();
        }
    }, [isOpen, fetchImages]);

    const deleteImage = async (filename) => {
        try {
            await axios.delete(`${apiUrl}/images/${folder}/${filename}`);
            alert('Accion ejecutada!');
            fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const markAsFavorite = async (filename) => {
        try {
            await axios.put(`${apiUrl}/images/${folder}`, { imagen_portada: filename });
            setFavorite(filename);
        } catch (error) {
            console.error('Error marking as favorite:', error);
        }
    };

    const renderImages = () => {
        return (
            <div className="row">
                {images.map((image, index) => (
                    <div key={index} className="col-12 col-md-4 mb-3">
                        <div className="card card-modal-image-admin">
                            <img src={image.src} alt={`Imagen ${index}`} className="card-img-top" />
                            <div className="card-body">
                                <button className="btn btn-sm btn-danger mx-2" onClick={() => deleteImage(image.src.split('/').pop())}>Eliminar</button>
                                <button className="btn btn-sm btn-primary" onClick={() => markAsFavorite(image.src)}>Portada</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={classNames('modal', { 'fade show': isOpen, 'd-block': isOpen })} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content bg-secondary">
                    <div className="modal-header">
                        <h5 className="modal-title">Administrar Imágenes - {folder}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {favorite && <div className='col-12 col-md-4 mb-3'><span>Imagen portada:</span> <img src={favorite} alt="Favorita" className="img-thumbnail" /></div>}
                        {renderImages()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminImagenPorProductoModal;
