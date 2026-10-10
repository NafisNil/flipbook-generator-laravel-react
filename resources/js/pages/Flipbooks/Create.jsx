import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        pdf: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/flipbooks');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h2>Upload PDF to Create Flipbook</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>PDF File:</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setData('pdf', e.target.files[0])}
                    />
                    {errors.pdf && <div style={{ color: 'red' }}>{errors.pdf}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {processing ? 'Processing & Converting PDF...' : 'Upload & Generate'}
                </button>
            </form>
        </div>
    );
}