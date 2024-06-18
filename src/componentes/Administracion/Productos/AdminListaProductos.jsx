import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';
import AdminImagenPorProductoModal from '../Imagenes/AdminImagenPorProductoModal';

function AdminListaProductos() {
    const [productos, setProductos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [images, setImages] = useState([]);
    const [favorite, setFavorite] = useState('');

    useEffect(() => {
        fetch(`${apiUrl}/productos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProductos(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (id) => {
        console.log(`Editar producto con id: ${id}`);
        // Lógica para manejar la edición del producto
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/productos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
            alert('Producto eliminado con éxito');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error eliminando el producto');
        }
    };

    const handleUpload = async (id) => {
        try {
            const formData = new FormData();
            const files = document.querySelector(`#file-upload-${id}`).files;
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            const response = await fetch(`${apiUrl}/upload?folder=${id}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Imágenes cargadas con éxito');
            setCurrentFolder(id);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error cargando las imágenes');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentFolder(null);
        setImages([]); // Limpiar imágenes cuando se cierra el modal
        setFavorite(''); // Limpiar favorito cuando se cierra el modal
    };

    const fetchImages = useCallback(async () => {
        if (currentFolder) {
            try {
                const response = await axios.get(`${apiUrl}/images/${currentFolder}`);
                setImages(response.data.imagenes);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
    }, [currentFolder]);

    useEffect(() => {
        if (isModalOpen) {
            fetchImages();
        }
    }, [isModalOpen, fetchImages]);

    const deleteImage = async (filename) => {
        try {
            await axios.delete(`${apiUrl}/images/${currentFolder}/${filename}`);
            fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const markAsFavorite = async (filename) => {
        try {
            await axios.put(`${apiUrl}/images/${currentFolder}`, { imagen_portada: filename });
            setFavorite(filename);
        } catch (error) {
            console.error('Error marking as favorite:', error);
        }
    };

    return (
        <div className='container'>
            <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Listado de productos en la BD</h3>
            <div className='row row-cols-1 row-cols-md-4 g-4'>
                {productos && productos.map(producto => (
                    <div key={producto.id} className='col'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <h5 className='card-title'>{producto.nombre}</h5>
                                <p className='card-text'>ID: {producto.id}</p>
                                <div className='mb-3'>
                                    <input type="file" id={`file-upload-${producto.id}`} multiple className="form-control" />
                                    <button className='btn btn-outline-success mt-2 w-100' onClick={() => handleUpload(producto.id)}>Cargar Imagenes</button>
                                </div>
                                <div className='d-grid gap-2'>
                                    <button className='btn btn-outline-primary' onClick={() => handleEdit(producto.id)}>Ver detalle</button>
                                    <button className='btn btn-outline-info' onClick={() => handleEdit(producto.id)}>Editar</button>
                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(producto.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AdminImagenPorProductoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                folder={currentFolder}
                images={images}
                favorite={favorite}
                onDeleteImage={deleteImage}
                onMarkAsFavorite={markAsFavorite}
            />
        </div>
    );
}

export default AdminListaProductos;
