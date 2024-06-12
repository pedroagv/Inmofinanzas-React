import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


function UploadImages() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className='p-3'>
            <form onSubmit={handleSubmit}>
                <input type="file" className='btn btn-outline-success' multiple onChange={handleFileChange} />
                <button className='btn btn-outline-success' type="submit">Cargar Imagenes del producto</button>
            </form>
        </div>
    );
}

export default UploadImages;
