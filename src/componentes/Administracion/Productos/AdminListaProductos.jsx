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
            <table className='table table-striped'>
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Nombre producto</th>
                        <th>Imágenes</th>
                        <th>Ver</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos && productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>
                                <input type="file" id={`file-upload-${producto.id}`} multiple />
                                <button className='btn btn-outline-success' onClick={() => handleUpload(producto.id)}>Cargar</button>
                            </td>
                            <td>
                                <button className='btn btn-outline-primary' onClick={() => handleEdit(producto.id)}>Ver detalle</button>
                            </td>
                            <td>
                                <button className='btn btn-outline-info' onClick={() => handleEdit(producto.id)}>Editar</button>
                            </td>
                            <td>
                                <button className='btn btn-outline-danger' onClick={() => handleDelete(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <AdminImagenPorProductoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                folder={currentFolder} // Asegúrate de pasar la carpeta correcta
                images={images} // Pasa las imágenes al modal
                favorite={favorite} // Pasa la imagen favorita al modal
                onDeleteImage={deleteImage} // Pasa la función para eliminar imágenes
                onMarkAsFavorite={markAsFavorite} // Pasa la función para marcar como favorita
            />
        </div>
    );
}

export default AdminListaProductos;
