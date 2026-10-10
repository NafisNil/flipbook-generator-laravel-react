import React from 'react';
import HTMLFlipBook from 'react-pageflip';

export default function Show({ flipbook }) {
    return (
        <div style={{ padding: '30px', textAlign: 'center', background: '#1e293b', minHeight: '100vh', color: '#fff' }}>
            <h1 style={{ marginBottom: '20px' }}>{flipbook.title}</h1>
            <p>Total Pages: {flipbook.total_pages}</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <HTMLFlipBook width={400} height={550} showCover={true} className="flipbook-canvas">
                    {flipbook.page_images && flipbook.page_images.map((imgUrl, index) => {
                        // Ensure leading slash for asset paths
                        const formattedUrl = imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`;

                        return (
                            <div key={index} className="page" style={{ background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
                                <img
                                    src={formattedUrl}
                                    alt={`Page ${index + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                        );
                    })}
                </HTMLFlipBook>
            </div>
        </div>
    );
}