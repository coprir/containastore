import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Containastore Self Access Storage — container storage near Inkberrow, Worcestershire';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1C1F22',
          color: '#F1F3F4',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, letterSpacing: 8, color: '#C6D0D8' }}>
            CONTAINASTORE
          </div>
          <div style={{ fontSize: 20, letterSpacing: 6, color: '#A4ACB3', marginTop: 6 }}>
            SELF ACCESS STORAGE
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Your local self access storage
          </div>
          <div style={{ fontSize: 30, color: '#A4ACB3', marginTop: 20 }}>
            Secure container storage near Inkberrow, Worcestershire · from £80 / month
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40, fontSize: 26, color: '#C6D0D8' }}>
          <span>24 hour access</span>
          <span>·</span>
          <span>1 month minimum</span>
          <span>·</span>
          <span>07851 435867</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
