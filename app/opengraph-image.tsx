import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Paper Shelves - Digital Library';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(to bottom right, #1a1a1a, #0a0a0a)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: 0,
              fontFamily: 'serif',
            }}
          >
            Paper Shelves
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: '#a3a3a3',
              marginTop: 24,
              letterSpacing: '0.02em',
            }}
          >
            A modern digital library application
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
